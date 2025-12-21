from typing import List
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from ..models import RiskLevel, BehaviorType
from .. import db_models

def calculate_risk(username: str, db: Session) -> dict:
    """
    Core Rule: Burnout = Indirect Inputs + Behavior + Trends
    """
    today = datetime.now()
    cutoff_date = today - timedelta(days=7) # Look at last 7 days
    
    # Get user from database
    user = db.query(db_models.User).filter(db_models.User.username == username).first()
    
    if not user:
        return {
            "username": username,
            "date": today.strftime("%Y-%m-%d"),
            "risk_level": RiskLevel.LOW.value,
            "risk_score": 0.0,
            "insights": ["User not found"]
        }
    
    # Get recent responses
    responses = db.query(db_models.DailyResponse).filter(
        db_models.DailyResponse.user_id == user.id,
        db_models.DailyResponse.timestamp >= cutoff_date
    ).all()
    
    # Get recent signals
    signals = db.query(db_models.BehaviorSignal).filter(
        db_models.BehaviorSignal.user_id == user.id,
        db_models.BehaviorSignal.timestamp >= cutoff_date
    ).all()
    
    if not responses and not signals:
        return {
            "username": username,
            "date": today.strftime("%Y-%m-%d"),
            "risk_level": RiskLevel.LOW.value,
            "risk_score": 0.0,
            "insights": ["Not enough data yet. Keep using the app!"]
        }

    # 1. Input Score (Higher answer = Better state usually, assuming 1=Bad, 5=Good. 
    # BUT wait, some questions are negative: "Did screens feel exhausting?" 5=Very exhausting.
    # We need to normalize. For MVP, let's assume specific mapping or just sum for now.)
    # Let's simplify: Questions should be phrased so 5 is HEALTHY and 1 is BURNOUT RISK?
    # Or we handle specific question IDs? 
    # "Did you feel mentally tired?" -> Yes (Risk)
    # Let's assume input is 1-5.
    # We need a map of positive/negative questions.
    
    negative_questions = ["s2", "f2", "m1", "e1"] # IDs where HIGH score = HIGH RISK
    positive_questions = ["s1", "f1", "m2", "e2"] # IDs where LOW score = HIGH RISK
    
    input_risk_sum = 0
    input_count = 0
    
    for r in responses:
        val = r.answer_value
        if r.question_id in negative_questions:
            # 5 = High Risk. Risk contribution = val
            input_risk_sum += val
        else:
            # 5 = Healthy. Risk contribution = (6 - val) -> 1 becomes 5 (High Risk)
            input_risk_sum += (6 - val)
        input_count += 1
        
    avg_input_risk = (input_risk_sum / input_count) if input_count > 0 else 0
    # avg_input_risk is between 1 (Low) and 5 (High)
    
    # 2. Behavioral Signals
    # Late night usage -> Increase risk
    # Response delay -> Increase risk
    behavior_score = 0
    for s in signals:
        if s.type == BehaviorType.LATE_NIGHT_USAGE.value:
            behavior_score += 1.0 # Significant penalty
        elif s.type == BehaviorType.RESPONSE_DELAY.value:
            if s.value > 10.0: # Took > 10s to answer
                behavior_score += 0.5
    
    # Limit behavior influence for MVP
    behavior_penalty = min(behavior_score, 5.0) 
    
    # 3. Total Score
    # Map 1-5 base + behavior to 0-100
    # Base: avg_input_risk (1-5). (avg - 1) / 4 * 100?
    
    base_score_normalized = ((avg_input_risk - 1) / 4) * 100 if avg_input_risk > 0 else 0
    # Add behavior penalty (each point adds 10%)
    total_score = base_score_normalized + (behavior_penalty * 10)
    
    total_score = min(max(total_score, 0), 100)
    
    # Determine Level
    level = RiskLevel.LOW
    insights = []
    
    if total_score > 75:
        level = RiskLevel.HIGH
        insights.append("High mental fatigue detected.")
    elif total_score > 40:
        level = RiskLevel.MEDIUM
        insights.append("Early signs of stress detected.")
    else:
        insights.append("Your mental energy seems stable.")
        
    # Trend Check (Simple)
    # If yesterday's score was lower, warn? (Need historical analysis, skipping for simplified MVP)
    
    if behavior_penalty > 2:
        insights.append("Late night activity is impacting your score.")
    
    # Save analysis to database
    new_analysis = db_models.RiskAnalysis(
        user_id=user.id,
        date=today.strftime("%Y-%m-%d"),
        risk_level=level.value,
        risk_score=round(total_score, 1),
        insights=str(insights)  # Store as JSON string
    )
    db.add(new_analysis)
    db.commit()
    db.refresh(new_analysis)
        
    return {
        "username": username,
        "date": today.strftime("%Y-%m-%d"),
        "risk_level": level.value,
        "risk_score": round(total_score, 1),
        "insights": insights
    }
