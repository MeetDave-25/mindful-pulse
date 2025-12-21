from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models import BehaviorSignalSubmit, User
from ..routers.auth import get_current_user
from ..database import get_db
from .. import db_models

router = APIRouter()

@router.post("/track")
async def track_signal(
    signal_data: BehaviorSignalSubmit, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Track a passive behavioral signal (e.g., late night usage).
    """
    # Get user from database
    db_user = db.query(db_models.User).filter(db_models.User.username == current_user.username).first()
    
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Create signal object
    new_signal = db_models.BehaviorSignal(
        user_id=db_user.id,
        type=signal_data.type.value,  # Convert enum to string
        value=signal_data.value
    )
    
    # Save to PostgreSQL
    db.add(new_signal)
    db.commit()
    db.refresh(new_signal)
    
    return {"status": "recorded", "id": new_signal.id}
