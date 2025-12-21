import { api } from './api';
import type {
    Question,
    DailyResponseSubmit,
    BehaviorSignalSubmit,
    RiskAnalysis
} from '@/types/api.types';

export const burnoutService = {
    async getDailyQuestions(): Promise<Question[]> {
        const response = await api.get<Question[]>('/daily/questions');
        return response.data;
    },

    async submitResponse(response: DailyResponseSubmit): Promise<void> {
        await api.post('/daily/response', response);
    },

    async trackBehavior(signal: BehaviorSignalSubmit): Promise<void> {
        await api.post('/signals/track', signal);
    },

    async getDashboardStatus(): Promise<RiskAnalysis> {
        const response = await api.get<RiskAnalysis>('/dashboard/status');
        return response.data;
    },
};
