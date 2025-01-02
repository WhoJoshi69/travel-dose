from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional
from sqlalchemy.orm import Session
from . import models, database
from datetime import datetime

router = APIRouter()

@router.post("/api/trips/", response_model=models.TripResponse)
async def create_trip(trip: models.TripCreate, db: Session = Depends(database.get_db)):
    try:
        # Create main trip record
        query = """
            INSERT INTO trip_details (
                purpose, from_city, to_city, start_date, end_date,
                booking_type, mode, selected_flight_id, selected_hotel_id,
                document_url, employee_id, employee_email, employee_phone,
                company, total_travelers
            ) VALUES (
                :purpose, :from_city, :to_city, :from_date, :to_date,
                :booking_type, :mode, :selected_flight_id, :selected_hotel_id,
                :document_url, :employee_id, :employee_email, :employee_phone,
                :company, :total_travelers
            )
        """
        result = await db.execute(query, {
            **trip.dict(exclude={'travelers'}),
            'total_travelers': len(trip.travelers)
        })
        
        return await get_trip(result.lastrowid, db)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/api/trips/", response_model=List[models.TripResponse])
async def get_trips(
    db: Session = Depends(database.get_db),
    status: Optional[str] = Query(None),
    employee_id: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    query = """
        SELECT * FROM trip_details
        WHERE (:status IS NULL OR status = :status)
        AND (:employee_id IS NULL OR employee_id = :employee_id)
        AND (:search IS NULL OR 
             purpose LIKE :search OR 
             destination LIKE :search OR 
             employee_id LIKE :search)
        ORDER BY created_at DESC
    """
    search_param = f"%{search}%" if search else None
    trips = await db.execute(query, {
        'status': status, 
        'employee_id': employee_id,
        'search': search_param
    })
    return trips.fetchall()