export interface AssessmentData {
    userId: string;
    responses: Record<string, number>;
}

export interface AssessmentResults {
    userId: string;
    score: number;
    interpretation: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
}