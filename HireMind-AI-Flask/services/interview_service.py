from services.job_service import MOCK_INTERVIEWS

class InterviewService:
    @staticmethod
    def get_interviews():
        return MOCK_INTERVIEWS

    @staticmethod
    def get_interview_by_id(session_id):
        for i in MOCK_INTERVIEWS:
            if i['id'] == session_id:
                return i
        return None
