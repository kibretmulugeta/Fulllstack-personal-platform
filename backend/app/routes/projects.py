from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models.domain import ProjectSchema, ProjectCreate
from app.database.connection import get_database
from app.authentication.jwt_handler import get_current_user

router = APIRouter(prefix="/api/projects", tags=["Projects"])

@router.get("", response_model=List[ProjectSchema])
async def get_projects():
    db = get_database()
    projects_coll = db["projects"]
    cursor = await projects_coll.find({})
    projects = await cursor.to_list(100)
    for p in projects:
        if "_id" in p:
            p["_id"] = str(p["_id"])
    return projects

@router.post("", response_model=ProjectSchema)
async def create_project(project: ProjectCreate, current_user: dict = Depends(get_current_user)):
    db = get_database()
    projects_coll = db["projects"]
    doc = project.dict()
    res = await projects_coll.insert_one(doc)
    doc["_id"] = str(res.inserted_id)
    return doc

@router.put("/{project_id}", response_model=ProjectSchema)
async def update_project(project_id: str, project: ProjectCreate, current_user: dict = Depends(get_current_user)):
    db = get_database()
    projects_coll = db["projects"]
    doc = project.dict()
    res = await projects_coll.update_one({"_id": project_id}, {"$set": doc})
    if res.modified_count == 0:
        raise HTTPException(status_code=404, detail="Project not found or unchanged")
    doc["_id"] = project_id
    return doc

@router.delete("/{project_id}")
async def delete_project(project_id: str, current_user: dict = Depends(get_current_user)):
    db = get_database()
    projects_coll = db["projects"]
    res = await projects_coll.delete_one({"_id": project_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}
