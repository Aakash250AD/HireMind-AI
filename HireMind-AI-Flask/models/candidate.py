from typing import List, Dict, Any, Optional

class Candidate:
    def __init__(self, id: str, name: str, email: str, phone: str, location: str, current_role: str,
                 experience_years: int, education: str, resume_url: str, applied_job_id: str,
                 job_title: str, applied_date: str, stage: str, match_score: int, interview_score: int,
                 verification_score: int, overall_score: int, skills: List[str], verifications: List[Dict[str, Any]],
                 summary: str, recruiter_notes: Optional[str] = None, decision_status: str = 'PENDING'):
        self.id = id
        self.name = name
        self.email = email
        self.phone = phone
        self.location = location
        self.current_role = current_role
        self.experience_years = experience_years
        self.education = education
        self.resume_url = resume_url
        self.applied_job_id = applied_job_id
        self.job_title = job_title
        self.applied_date = applied_date
        self.stage = stage
        self.match_score = match_score
        self.interview_score = interview_score
        self.verification_score = verification_score
        self.overall_score = overall_score
        self.skills = skills
        self.verifications = verifications
        self.summary = summary
        self.recruiter_notes = recruiter_notes
        self.decision_status = decision_status

    def to_dict(self):
        return self.__dict__
