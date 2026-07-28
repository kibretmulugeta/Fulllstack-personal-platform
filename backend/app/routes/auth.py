from fastapi import APIRouter, HTTPException, status, Depends
from app.models.domain import UserLogin, TokenResponse
from app.database.connection import get_database
from app.authentication.jwt_handler import verify_password, create_access_token, get_current_user
from app.config import settings

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    db = get_database()
    users_coll = db["users"]
    user = await users_coll.find_one({"email": credentials.email})
    
    if not user:
        # Fallback check against default admin credentials
        if credentials.email == settings.ADMIN_EMAIL and credentials.password == settings.ADMIN_PASSWORD:
            token = create_access_token({"sub": credentials.email, "role": "admin"})
            return {
                "access_token": token,
                "token_type": "bearer",
                "user": {"email": credentials.email, "role": "admin"}
            }
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    
    if not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    
    token = create_access_token({"sub": user["email"], "role": user.get("role", "admin")})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"email": user["email"], "role": user.get("role", "admin")}
    }

@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return current_user
