from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import logging
from src.backend.database import get_db
from src.backend.models import User
from src.backend.schemas import UserResponse

router = APIRouter(prefix="/api/users", tags=["users"])
logger = logging.getLogger(__name__)

@router.get("/employees", response_model=List[UserResponse])
async def get_employees(
    db: Session = Depends(get_db)
):
    try:
        logger.info("Fetching all employees")
        users = db.query(User).all()
        logger.info(f"Found {len(users)} employees")
        return users
    except Exception as e:
        logger.error(f"Error fetching employees: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching employees: {str(e)}"
        ) 