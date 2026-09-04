from dataclass import dataclass
from typing import List, Optional

class Job:
    def __init__(self, id: str, title: str, department: str, location: str, employment_type: str, 
                 experience_years: str, education: str, salary_range: str, description: str, 
                 required_skills: List[str], preferred_skills: List[str], responsibilities: List[str], 
                 status: str = 'ACTIVE', candidate_count: int = 0, created_at: str = '', extracted_keywords: Optional[List[str]] = None):
        self.id = id
        self.title = title
        self.department = department
        self.location = location
        self.employment_type = employment_type
        self.experience_years = experience_years
        self.education = education
        self.salary_range = salary_range
        self.description = description
        self.required_skills = required_skills
        self.preferred_skills = preferred_skills
        self.responsibilities = responsibilities
        self.status = status
        self.candidate_count = candidate_count
        self.created_at = created_at
        self.extracted_keywords = extracted_keywords or []

    def to_dict(self):
        return self.__dict__
