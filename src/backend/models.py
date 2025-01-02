from sqlalchemy import Column, Integer, String, DateTime, Date, Enum, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    password_hash = Column(String(255))
    employee_id = Column(String(50), unique=True, index=True)
    designation = Column(String(100))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class TripDetails(Base):
    __tablename__ = "trip_details"

    id = Column(Integer, primary_key=True, index=True)
    request_date = Column(DateTime(timezone=True), server_default=func.now())
    purpose = Column(String(255), nullable=False)
    from_city = Column(String(100), nullable=False)
    to_city = Column(String(100), nullable=False)
    from_date = Column(Date, nullable=False)
    to_date = Column(Date, nullable=False)
    booking_type = Column(Enum('self', 'team', 'other', name='booking_type'), nullable=False)
    selected_flight_id = Column(String(50), nullable=False)
    selected_hotel_id = Column(String(50), nullable=False)
    document_url = Column(String(255))
    status = Column(
        Enum('ongoing', 'upcoming', 'rejected', 'pending', 'to_be_approved', name='status'),
        default='pending'
    )
    approved_by = Column(String(100))
    employee_id = Column(String(50), nullable=False)
    employee_email = Column(String(255), nullable=False)
    employee_phone = Column(String(20))
    company = Column(String(100), nullable=False)
    total_travelers = Column(Integer, default=1)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    travelers = relationship("TripTravelers", back_populates="trip")

class TripTravelers(Base):
    __tablename__ = "trip_travelers"

    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey('trip_details.id'), nullable=False)
    employee_id = Column(String(50), nullable=False)
    email = Column(String(255), nullable=False)
    designation = Column(String(100))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    trip = relationship("TripDetails", back_populates="travelers") 