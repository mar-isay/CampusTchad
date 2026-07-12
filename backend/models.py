# backend/models.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime
import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    
    # Esnek Okul Politikası: Boş bırakılabilir (Zorunlu değil)
    university = Column(String, nullable=True) 
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)