from pydantic import BaseModel, EmailStr
from typing import List, Optional, Any
from datetime import datetime
from enum import Enum

# --- Enums ---
class RiskLevel(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"

class BehaviorType(str, Enum):
    APP_OPEN = "app_open"
    RESPONSE_DELAY = "response_delay"       # Time taken to answer
    LATE_NIGHT_USAGE = "late_night_usage"   # Usage between 12AM-5AM
    MISSED_CHECKIN = "missed_checkin"       # Explicitly missed a day

# --- Shared Models ---

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# --- User Models ---

class UserBase(BaseModel):
    username: str
    email: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    pass

class UserInDB(User):
    hashed_password: str

# --- Data Models ---

class Question(BaseModel):
    id: str
    text: str
    category: str  # Sleep, Focus, Mood, Energy

class DailyResponse(BaseModel):
    username: str
    date: str  # YYYY-MM-DD
    question_id: str
    answer_value: int # 1-5 scale usually
    timestamp: datetime = datetime.now()

class DailyResponseSubmit(BaseModel):
    question_id: str
    answer_value: int

class BehaviorSignal(BaseModel):
    username: str
    type: BehaviorType
    value: float # e.g., delay in seconds, or 1.0 for occurrence
    timestamp: datetime = datetime.now()

class BehaviorSignalSubmit(BaseModel):
    type: BehaviorType
    value: float

class RiskAnalysis(BaseModel):
    username: str
    date: str
    risk_level: RiskLevel
    risk_score: float # 0-100
    insights: List[str]
    timestamp: datetime = datetime.now()
