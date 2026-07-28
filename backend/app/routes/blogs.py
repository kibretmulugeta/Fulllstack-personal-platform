from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from app.models.domain import BlogSchema, BlogCreate
from app.database.connection import get_database
from app.authentication.jwt_handler import get_current_user

router = APIRouter(prefix="/api/blogs", tags=["Blogs"])

@router.get("", response_model=List[BlogSchema])
async def get_blogs(category: Optional[str] = None):
    db = get_database()
    blogs_coll = db["blogs"]
    query = {}
    if category and category != "All":
        query["category"] = category
    cursor = await blogs_coll.find(query)
    blogs = await cursor.to_list(100)
    for b in blogs:
        if "_id" in b:
            b["_id"] = str(b["_id"])
    return blogs

@router.get("/{blog_id}", response_model=BlogSchema)
async def get_blog(blog_id: str):
    db = get_database()
    blogs_coll = db["blogs"]
    blog = await blogs_coll.find_one({"_id": blog_id})
    if not blog:
        raise HTTPException(status_code=404, detail="Blog article not found")
    blog["_id"] = str(blog["_id"])
    return blog

@router.post("", response_model=BlogSchema)
async def create_blog(blog: BlogCreate, current_user: dict = Depends(get_current_user)):
    db = get_database()
    blogs_coll = db["blogs"]
    doc = blog.dict()
    slug = blog.title.lower().replace(" ", "-").replace(":", "").replace("?", "")
    doc["slug"] = slug
    res = await blogs_coll.insert_one(doc)
    doc["_id"] = str(res.inserted_id)
    return doc

@router.delete("/{blog_id}")
async def delete_blog(blog_id: str, current_user: dict = Depends(get_current_user)):
    db = get_database()
    blogs_coll = db["blogs"]
    res = await blogs_coll.delete_one({"_id": blog_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog article not found")
    return {"message": "Blog article deleted"}
