from typing import List, Tuple
import datetime
from ..models import Question

# Question Pool (Indirect questions)
QUESTIONS_POOL = [
    # Sleep
    Question(id="s1", text="How refreshed did you feel after waking up?", category="Sleep"),
    Question(id="s2", text="Did you find it hard to get out of bed today?", category="Sleep"),
    
    # Focus
    Question(id="f1", text="How easy was it to focus on one task today?", category="Focus"),
    Question(id="f2", text="Did you find yourself switching tasks often?", category="Focus"),
    
    # Mood/Stress
    Question(id="m1", text="Did you feel mentally tired before noon today?", category="Mood"),
    Question(id="m2", text="How easy was it to smile at a joke today?", category="Mood"),
    
    # Energy
    Question(id="e1", text="Did screens feel exhausting today?", category="Energy"),
    Question(id="e2", text="Do you feel like doing a hobby this evening?", category="Energy"),
]

def get_daily_questions(username: str) -> List[Question]:
    """
    Selects 2 questions based on the day of the year to ensure rotation.
    In a real app, we might persist rotation state per user.
    Here we use a deterministic hash of (date + username) or just date.
    """
    today = datetime.date.today()
    # Simple rotation: use day of year % len(pool/2)
    # We want 2 distinct questions.
    
    day_hash = today.toordinal()
    
    # Logic:
    # Day 1: Sleep + Focus
    # Day 2: Mood + Energy
    # ...
    
    # Let's just rotate pairs for simplicity in this MVP
    pair_index = (day_hash % 4) # 4 pairs if we have 8 questions
    
    # Pair 1: s1, f1
    # Pair 2: m1, e1
    # Pair 3: s2, f2
    # Pair 4: m2, e2
    
    # Actually, let's mix it up dynamically
    idx1 = (day_hash) % len(QUESTIONS_POOL)
    idx2 = (day_hash + 4) % len(QUESTIONS_POOL) # Offset to ensure different category usually
    
    q1 = QUESTIONS_POOL[idx1]
    q2 = QUESTIONS_POOL[idx2]
    
    return [q1, q2]
