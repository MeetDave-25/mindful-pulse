// TypeScript types matching backend models

export interface Question {
  id: string;
  text: string;
  category: string;
}

export interface DailyResponseSubmit {
  question_id: string;
  answer_value: number;
}

export interface BehaviorSignalSubmit {
  type: 'app_open' | 'response_delay' | 'late_night_usage' | 'missed_checkin';
  value: number;
}

export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface RiskAnalysis {
  username: string;
  date: string;
  risk_level: RiskLevel;
  risk_score: number;
  insights: string[];
  timestamp: string;
}

export interface UserCreate {
  username: string;
  email?: string;
  password: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface User {
  username: string;
  email?: string;
}
