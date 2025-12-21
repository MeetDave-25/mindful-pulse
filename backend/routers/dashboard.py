from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models import User
from ..routers.auth import get_current_user
from ..database import get_db
from .. import db_models
from ..logic.analysis import calculate_risk

router = APIRouter()

@router.get("/status")
async def get_status(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get the current burnout risk analysis for the user.
    """
    # Calculate risk analysis (this function will need to be updated to use db)
    analysis = calculate_risk(current_user.username, db)
    return analysis
