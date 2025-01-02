from pydantic import BaseModel, EmailStr
from datetime import date, datetime
from typing import List, Optional

class UserBase(BaseModel):
    email: EmailStr
    employee_id: str
    designation: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class TokenData(BaseModel):
    email: Optional[str] = None

class TripTravelerBase(BaseModel):
    employee_id: str
    email: EmailStr
    designation: Optional[str] = None

class TripTravelerCreate(TripTravelerBase):
    pass

class TripTravelerResponse(TripTravelerBase):
    id: int
    trip_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class TripCreate(BaseModel):
    purpose: str
    from_city: str
    to_city: str
    from_date: date
    to_date: date
    booking_type: str
    selected_flight_id: str
    selected_hotel_id: str
    document_url: Optional[str] = None
    employee_id: str
    employee_email: EmailStr
    employee_phone: Optional[str] = None
    company: str
    travelers: List[TripTravelerCreate]

class TripResponse(BaseModel):
    id: int
    request_date: datetime
    purpose: str
    from_city: str
    to_city: str
    from_date: date
    to_date: date
    booking_type: str
    selected_flight_id: str
    selected_hotel_id: str
    document_url: Optional[str]
    status: str
    approved_by: Optional[str]
    employee_id: str
    employee_email: str
    employee_phone: Optional[str]
    company: str
    total_travelers: int
    created_at: datetime
    updated_at: Optional[datetime]
    travelers: List[TripTravelerResponse]

    class Config:
        from_attributes = True 