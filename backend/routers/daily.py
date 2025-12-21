from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from ..models import Question, DailyResponseSubmit, User
from ..logic.rotation import get_daily_questions
from ..routers.auth import get_current_user
from ..database import get_db
from .. import db_models
import datetime

router = APIRouter()

@router.get("/questions", response_model=List[Question])
async def get_questions(current_user: User = Depends(get_current_user)):
    """
    Get the 2 rotating questions for today.
    """
    questions = get_daily_questions(current_user.username)
    return questions

@router.post("/response")
async def submit_response(
    response_data: DailyResponseSubmit, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Submit an answer to a daily question.
    """
    # Get user from database
    db_user = db.query(db_models.User).filter(db_models.User.username == current_user.username).first()
    
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Create Response Object
    new_response = db_models.DailyResponse(
        user_id=db_user.id,
        date=datetime.date.today().strftime("%Y-%m-%d"),
        question_id=response_data.question_id,
        answer_value=response_data.answer_value
    )
    
    # Save to PostgreSQL
    db.add(new_response)
    db.commit()
    db.refresh(new_response)
    
    return {"status": "recorded", "message": "Response saved successfully", "id": new_response.id}
