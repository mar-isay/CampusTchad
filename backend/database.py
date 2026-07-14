# backend/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# CANLIYA GEÇİŞ AYARI: Sunucu bölgesi (Sidney) ve Şifre düzeltildi!
DATABASE_URL = os.environ.get(
    "DATABASE_URL", 
    "postgresql://postgres.nsepkkqcssrswhahsgid:Abouzougoum@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres"
)

if "sqlite" in DATABASE_URL:
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(
        DATABASE_URL, 
        pool_size=10, 
        max_overflow=20,
        connect_args={"sslmode": "require"}
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()