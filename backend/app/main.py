import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database.connection import connect_to_mongo, close_mongo_connection
from app.routes import auth, projects, skills, blogs, contact, chat, analytics
from app.seed import seed_database_if_empty

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("kibret_portfolio")

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting KibretAI Portfolio API service...")
    await connect_to_mongo()
    await seed_database_if_empty()
    yield
    logger.info("Shutting down KibretAI Portfolio API service...")
    await close_mongo_connection()

app = FastAPI(
    title=settings.APP_NAME,
    description="Full-stack AI Engineer Portfolio & RAG Knowledge API for Kibret Mulugeta Alemu",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(projects.router)
app.include_router(skills.router)
app.include_router(blogs.router)
app.include_router(contact.router)
app.include_router(chat.router)
app.include_router(analytics.router)

@app.get("/")
async def root():
    return {
        "title": "KibretAI Portfolio API",
        "owner": "Kibret Mulugeta Alemu",
        "role": "AI Engineer & ML Researcher",
        "status": "Online",
        "docs": "/docs"
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "database": "active"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.PORT, reload=True)
