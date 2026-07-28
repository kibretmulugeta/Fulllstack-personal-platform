from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models.domain import SkillSchema, SkillCreate
from app.database.connection import get_database
from app.authentication.jwt_handler import get_current_user

router = APIRouter(prefix="/api/skills", tags=["Skills"])

@router.get("", response_model=List[SkillSchema])
async def get_skills():
    db = get_database()
    skills_coll = db["skills"]
    cursor = await skills_coll.find({})
    skills = await cursor.to_list(100)
    for s in skills:
        if "_id" in s:
            s["_id"] = str(s["_id"])
    return skills

@router.post("", response_model=SkillSchema)
async def create_skill(skill: SkillCreate, current_user: dict = Depends(get_current_user)):
    db = get_database()
    skills_coll = db["skills"]
    doc = skill.dict()
    res = await skills_coll.insert_one(doc)
    doc["_id"] = str(res.inserted_id)
    return doc

@router.delete("/{skill_id}")
async def delete_skill(skill_id: str, current_user: dict = Depends(get_current_user)):
    db = get_database()
    skills_coll = db["skills"]
    res = await skills_coll.delete_one({"_id": skill_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Skill not found")
    return {"message": "Skill deleted successfully"}
