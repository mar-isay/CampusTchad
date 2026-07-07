from sqlalchemy import create_base, create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base

# Yerel PostgreSQL bağlantı adresi (İleride canlıya geçerken güncellenebilir)
DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/campustchad"

# Veritabanı motorunu oluşturuyoruz
engine = create_engine(DATABASE_URL)

# Veritabanı ile konuşacak oturum fabrikası (Session)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    # Tabloları veritabanında otomatik olarak oluşturur
    Base.metadata.create_all(bind=engine)