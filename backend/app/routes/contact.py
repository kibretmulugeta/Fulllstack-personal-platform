from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models.domain import ContactSchema, ContactCreate
from app.database.connection import get_database
from app.authentication.jwt_handler import get_current_user

router = APIRouter(prefix="/api/contact", tags=["Contact"])

@router.post("", response_model=ContactSchema)
async def submit_contact_form(contact_in: ContactCreate):
    db = get_database()
    contacts_coll = db["contacts"]
    doc = contact_in.dict()
    res = await contacts_coll.insert_one(doc)
    doc["_id"] = str(res.inserted_id)
    return doc

@router.get("", response_model=List[ContactSchema])
async def get_contact_messages(current_user: dict = Depends(get_current_user)):
    db = get_database()
    contacts_coll = db["contacts"]
    cursor = await contacts_coll.find({})
    messages = await cursor.to_list(100)
    for m in messages:
        if "_id" in m:
            m["_id"] = str(m["_id"])
    return messages
