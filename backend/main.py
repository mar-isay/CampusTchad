# backend/main.py
from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from passlib.context import CryptContext
import jwt
import datetime
import os
import google.generativeai as genai

import models, schemas
from database import engine, get_db

# 1. GOOGLE GEMINI API YAPILANDIRMASI
# NOT: Kendi gerçek API anahtarını buraya koyabilirsin.
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY_HERE")
genai.configure(api_key=GEMINI_API_KEY)
# Hızlı ve etkili metin modelleri için gemini-2.5-flash idealdir
ai_model = genai.GenerativeModel('gemini-2.5-flash')

# Şifre hash'leme aracı
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# JWT Token ayarları
SECRET_KEY = "SUPER_SECRET_KEY_EDUTCHAD"
ALGORITHM = "HS256"

app = FastAPI(title="EduTchad API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

# Yardımcı Fonksiyonlar
def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(days=1)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# API ENDPOINT'LERİ

@app.get("/")
def read_root():
    return {"status": "success", "message": "EduTchad API Çalışıyor, Gemini Hazır!"}

@app.post("/api/register", response_model=schemas.Token)
def register_user(user: schemas.UserRegister, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Bu e-posta adresi zaten sisteme kayıtlı.")
    
    hashed_pwd = get_password_hash(user.password)
    new_user = models.User(
        fullname=user.fullname,
        email=user.email,
        hashed_password=hashed_pwd,
        university=user.university  
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = create_access_token(data={"sub": new_user.email, "id": new_user.id})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/login", response_model=schemas.Token)
def login_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Geçersiz e-posta veya şifre."
        )
    
    access_token = create_access_token(data={"sub": db_user.email, "id": db_user.id})
    return {"access_token": access_token, "token_type": "bearer"}


# --- YAPAY ZEKA (GEMINI) ENDPOINT'LERİ ---

@app.post("/api/ai/chat")
async def ai_chat(prompt: str, lang: str = "tr"):
    """
    Öğrencilerin AI Ders Asistanına sorduğu soruları yanıtlar.
    Gelen 'lang' parametresine göre senkronize dil desteği sağlar (tr, fr, en, ar).
    """
    try:
        system_instruction = f"Sen EduTchad platformunun akademik asistanısın. Lütfen şu dilde cevap ver: {lang}. Yanıtların akademik, destekleyici ve net olsun."
        response = ai_model.generate_content(f"{system_instruction}\n\nÖğrenci Sorusu: {prompt}")
        return {"status": "success", "response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Yapay zeka motoru hatası: {str(e)}")

@app.post("/api/ai/analyze-text")
async def analyze_text(text_content: str, mode: str = "summary", lang: str = "tr"):
    """
    Metin Düzenleme ve PDF döküman özetleme altyapısı.
    mode: 'summary' (özet) veya 'optimize' (akademik standartlara göre düzenleme)
    """
    try:
        if mode == "summary":
            prompt = f"Aşağıdaki akademik metni saniyeler içinde özetle ve önemli noktaları listele. Dil: {lang}\n\nMetin:\n{text_content}"
        else:
            prompt = f"Aşağıdaki ödev/makale metnini akademik standartlara göre optimize et, yazım hatalarını düzelt. Dil: {lang}\n\nMetin:\n{text_content}"
            
        response = ai_model.generate_content(prompt)
        return {"status": "success", "result": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Metin analiz hatası: {str(e)}")