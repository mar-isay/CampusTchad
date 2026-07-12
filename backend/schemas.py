# backend/schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional

class UserRegister(BaseModel):
    fullname: str
    email: EmailStr
    password: str
    university: Optional[str] = None  # İsteğe bağlı alan

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
