from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.backend.routers import auth, users, trips
from src.backend.database import engine
from src.backend import models

app = FastAPI(title="Dosepack Travel API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(trips.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 