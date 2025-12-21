from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=True)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    daily_responses = relationship("DailyResponse", back_populates="user", cascade="all, delete-orphan")
    behavior_signals = relationship("BehaviorSignal", back_populates="user", cascade="all, delete-orphan")
    risk_analyses = relationship("RiskAnalysis", back_populates="user", cascade="all, delete-orphan")

class DailyResponse(Base):
    __tablename__ = "daily_responses"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    date = Column(String(10), nullable=False)  # YYYY-MM-DD format
    question_id = Column(String(50), nullable=False)
    answer_value = Column(Integer, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Relationship
    user = relationship("User", back_populates="daily_responses")

class BehaviorSignal(Base):
    __tablename__ = "behavior_signals"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    type = Column(String(50), nullable=False)  # app_open, response_delay, etc.
    value = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Relationship
    user = relationship("User", back_populates="behavior_signals")

class RiskAnalysis(Base):
    __tablename__ = "risk_analyses"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    date = Column(String(10), nullable=False)  # YYYY-MM-DD format
    risk_level = Column(String(20), nullable=False)  # Low, Medium, High
    risk_score = Column(Float, nullable=False)  # 0-100
    insights = Column(Text, nullable=True)  # JSON string of insights list
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Relationship
    user = relationship("User", back_populates="risk_analyses")
