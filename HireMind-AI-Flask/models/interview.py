from typing import List, Dict, Any, Optional

class InterviewSession:
    def __init__(self, id: str, candidate_id: str, candidate_name: str, job_id: str, job_title: str,
                 status: str, scheduled_at: str, duration_minutes: int, mode: str, current_question_index: int,
                 questions: List[Dict[str, Any]], technical_score: Optional[int] = None,
                 communication_score: Optional[int] = None, problem_solving_score: Optional[int] = None,
                 role_fit_score: Optional[int] = None, overall_score: Optional[int] = None,
                 ai_summary: Optional[Dict[str, Any]] = None):
        self.id = id
        self.candidate_id = candidate_id
        self.candidate_name = candidate_name
        self.job_id = job_id
        self.job_title = job_title
        self.status = status
        self.scheduled_at = scheduled_at
        self.duration_minutes = duration_minutes
        self.mode = mode
        self.current_question_index = current_question_index
        self.questions = questions
        self.technical_score = technical_score
        self.communication_score = communication_score
        self.problem_solving_score = problem_solving_score
        self.role_fit_score = role_fit_score
        self.overall_score = overall_score
        self.ai_summary = ai_summary

    def to_dict(self):
        return self.__dict__
