from services.job_service import MOCK_CANDIDATES

class CandidateService:
    @staticmethod
    def get_candidates(job_id=None, stage=None):
        list_c = list(MOCK_CANDIDATES)
        if job_id:
            list_c = [c for c in list_c if c['applied_job_id'] == job_id]
        if stage:
            list_c = [c for c in list_c if c['stage'] == stage]
        return list_c

    @staticmethod
    def get_candidate_by_id(candidate_id):
        for c in MOCK_CANDIDATES:
            if c['id'] == candidate_id:
                return c
        return None

    @staticmethod
    def submit_decision(candidate_id, status, notes=None):
        c = CandidateService.get_candidate_by_id(candidate_id)
        if c:
            c['decision_status'] = status
            if notes:
                c['recruiter_notes'] = notes
            if status == 'APPROVED':
                c['stage'] = 'Hired'
            elif status == 'REJECTED':
                c['stage'] = 'Archived'
            return c
        return None
