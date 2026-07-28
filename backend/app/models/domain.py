from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime

# --- USER & AUTH ---
class UserSchema(BaseModel):
    email: str
    password_hash: str
    role: str = "admin"
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

class UserLogin(BaseModel):
    email: str
    password: str

class GoogleLoginRequest(BaseModel):
    credential: str  # Google ID Token

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

# --- PROJECT ---
class ProjectSchema(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    title: str
    description: str
    technologies: List[str]
    image: str
    github: str
    demo: str
    featured: bool = False
    metrics: Optional[dict] = None
    highlights: Optional[List[str]] = None

class ProjectCreate(BaseModel):
    title: str
    description: str
    technologies: List[str]
    image: str
    github: str
    demo: str
    featured: bool = False
    metrics: Optional[dict] = None
    highlights: Optional[List[str]] = None

# --- SKILL ---
class SkillSchema(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    name: str
    category: str  # "Programming", "AI/ML", "Backend", "Tools"
    percentage: int
    icon: Optional[str] = None

class SkillCreate(BaseModel):
    name: str
    category: str
    percentage: int
    icon: Optional[str] = None

# --- BLOG ---
class BlogSchema(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    title: str
    summary: str
    content: str
    category: str
    read_time: str = "5 min read"
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    slug: Optional[str] = None
    image: Optional[str] = None

class BlogCreate(BaseModel):
    title: str
    summary: str
    content: str
    category: str
    read_time: str = "5 min read"
    image: Optional[str] = None

# --- CONTACT ---
class ContactSchema(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    name: str
    email: str
    message: str
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    read: bool = False

class ContactCreate(BaseModel):
    name: str
    email: str
    message: str

# --- CHAT / RAG ---
class ChatRequest(BaseModel):
    message: str
    language: Optional[str] = "en"  # "en" or "am" (Amharic)
    conversation_history: Optional[List[dict]] = None

class ChatResponse(BaseModel):
    reply: str
    sources: Optional[List[str]] = None
    language: str = "en"

# --- ANALYTICS ---
class AnalyticsRecord(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    visitor_ip: str
    page: str
    user_agent: Optional[str] = None
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
