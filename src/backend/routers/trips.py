from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import models, schemas, database
from datetime import datetime
from sqlalchemy import or_

router = APIRouter(prefix="/api/trips", tags=["trips"])

@router.post("/", response_model=schemas.TripResponse)
async def create_trip(trip: schemas.TripCreate, db: Session = Depends(database.get_db)):
    try:
        # Create main trip record
        db_trip = models.TripDetails(
            **trip.dict(exclude={'travelers'}),
            total_travelers=len(trip.travelers)
        )
        db.add(db_trip)
        db.flush()  # Get the ID without committing

        # Create traveler records
        for traveler in trip.travelers:
            db_traveler = models.TripTravelers(
                trip_id=db_trip.id,
                **traveler.dict()
            )
            db.add(db_traveler)

        db.commit()
        db.refresh(db_trip)
        return db_trip

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[schemas.TripResponse])
async def get_trips(
    db: Session = Depends(database.get_db),
    status: Optional[str] = Query(None),
    employee_id: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    try:
        query = db.query(models.TripDetails)
        
        if status:
            query = query.filter(models.TripDetails.status == status)
        if employee_id:
            query = query.filter(models.TripDetails.employee_id == employee_id)
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                or_(
                    models.TripDetails.purpose.ilike(search_term),
                    models.TripDetails.from_city.ilike(search_term),
                    models.TripDetails.to_city.ilike(search_term),
                    models.TripDetails.employee_id.ilike(search_term)
                )
            )
        
        trips = query.order_by(models.TripDetails.created_at.desc()).all()
        return trips
    except Exception as e:
        logger.error(f"Error fetching trips: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching trips: {str(e)}"
        ) 