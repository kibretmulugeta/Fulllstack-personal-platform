from fastapi import APIRouter, HTTPException, status, Depends
import httpx
from app.models.domain import UserLogin, TokenResponse, GoogleLoginRequest
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

@router.post("/google", response_model=TokenResponse)
async def google_login(req: GoogleLoginRequest):
    # Verify Google ID Token with Google OAuth tokeninfo service
    try:
        async with httpx.AsyncClient() as client:
            res = await client.get(f"https://oauth2.googleapis.com/tokeninfo?id_token={req.credential}", timeout=8.0)
            if res.status_code != 200:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Google OAuth credential")
            google_data = res.json()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Google token verification failed: {str(e)}")

    email = google_data.get("email")
    if not email:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Email missing in Google ID token")

    db = get_database()
    users_coll = db["users"]
    user = await users_coll.find_one({"email": email})

    role = "admin" if email == settings.ADMIN_EMAIL else "user"

    if not user:
        # Create Google authenticated user record in MongoDB
        new_user = {
            "email": email,
            "name": google_data.get("name", email.split("@")[0]),
            "picture": google_data.get("picture", ""),
            "google_id": google_data.get("sub"),
            "role": role,
            "provider": "google"
        }
        await users_coll.insert_one(new_user)
        user = new_user

    token = create_access_token({"sub": email, "role": role})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "email": email,
            "name": google_data.get("name"),
            "picture": google_data.get("picture"),
            "role": role
        }
    }

@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return current_user
