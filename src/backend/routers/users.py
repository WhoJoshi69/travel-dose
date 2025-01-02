from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from src.backend.database import get_db
from src.backend.models import User
from src.backend.utils import get_current_user
from pydantic import BaseModel

router = APIRouter(prefix="/api/users", tags=["users"])

class UserResponse(BaseModel):
    id: int
    email: str
    employee_id: str
    designation: str
    
    class Config:
        from_attributes = True

@router.get("/", response_model=List[UserResponse])
async def get_users(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    users = db.query(User).all()
    return users

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_user)
):
    return current_user 

@router.get("/employees", response_model=List[UserResponse])
async def get_employees(
    db: Session = Depends(get_db)
):
    users = db.query(User).all()
    return users 