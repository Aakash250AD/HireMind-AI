class NotificationService:
    @staticmethod
    def get_notifications():
        return [
            {'id': 'n1', 'title': '5 New Candidates Applied', 'message': 'New applications received for Senior AI Engineer.', 'time': '10 mins ago', 'unread': True, 'url': '/candidates'},
            {'id': 'n2', 'title': 'AI Screening Completed', 'message': 'Processed 48 resumes with average 84% match score.', 'time': '35 mins ago', 'unread': True, 'url': '/automations'},
            {'id': 'n3', 'title': 'Skill Verification Finalized', 'message': '3 candidates ready for final recruiter review.', 'time': '2 hours ago', 'unread': False, 'url': '/shortlist'}
        ]
