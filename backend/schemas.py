from pydantic import BaseModel, EmailStr
from typing import Optional

# Kullanıcı kayıt olurken istenecek temel veriler
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    # Sıfır Zorunluluk İlkesi: Okul zorunlu değil, isteğe bağlı (Optional) yapıyoruz
    university: Optional[str] = None

# Kullanıcı verisi dışarıya (frontend'e) aktarılırken şifreyi gizlemek için kullanılacak şema
class UserResponse(BaseModel):
    id: int
    email: EmailStr
    university: Optional[str] = None
    is_active: bool

    class Config:
        from_attributes = True
