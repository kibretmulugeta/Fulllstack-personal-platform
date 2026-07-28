import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "KibretAI Portfolio API"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    PORT: int = int(os.getenv("PORT", "8000"))
    
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    DB_NAME: str = os.getenv("DB_NAME", "kibret_portfolio")
    
    JWT_SECRET: str = os.getenv("JWT_SECRET", "super-secret-key-change-this-in-production-kibret-ai-2025")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))
    
    ADMIN_EMAIL: str = os.getenv("ADMIN_EMAIL", "admin@kibret.ai")
    ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "AdminKibret2025!")
    
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
