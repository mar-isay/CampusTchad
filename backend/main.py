from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .database import engine, SessionLocal, init_db
from . import models, schemas

app = FastAPI(title="Campus Tchad API")

# Uygulama başlarken veritabanı tablolarını otomatik oluşturur
@app.on_event("startup")
def on_startup():
    init_db()

# Veritabanı oturum yönetimi (Bağımlılık enjeksiyonu)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Test amaçlı hoş geldin endpoint'i
@app.get("/")
def read_root():
    return {"message": "Campus Tchad API sistemine hos geldiniz!"}

# Kullanıcı Kayıt Endpoint'i
@app.post("/register", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # 1. E-posta adresi sistemde zaten var mı kontrol et
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bu e-posta adresi ile daha once kayit olunmus."
        )
    
    # 2. Şifreyi güvenlik amacıyla (simüle ederek) hash'le 
    # (Hafta 5-6 JWT aşamasında burayı daha da güçlendireceğiz)
    fake_hashed_password = user.password + "notsecurehash"
    
    # 3. Yeni kullanıcı objesini oluştur (Okul alanı girilmediyse otomatik None/Null kalır)
    new_user = models.User(
        email=user.email,
        hashed_password=fake_hashed_password,
        university=user.university
    )
    
    # 4. Veritabanına kaydet
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

# Kullanıcı Giriş (Login) Endpoint'i
@app.post("/login")
def login_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # 1. Kullanıcıyı e-posta adresine göre veritabanında ara
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Hatali e-posta veya sifre."
        )
    
    # 2. Şifreyi kontrol et (Kayıttaki basit hash mantığımızla eşleştiriyoruz)
    fake_hashed_password = user.password + "notsecurehash"
    if db_user.hashed_password != fake_hashed_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Hatali e-posta veya sifre."
        )
    
    # 3. Giriş başarılıysa kullanıcıya esnek okul bilgisiyle birlikte mesaj dön
    return {
        "message": "Giris basarili!",
        "user": {
            "id": db_user.id,
            "email": db_user.email,
            "university": db_user.university # Seçmediyse None/Null döner
        }
    }