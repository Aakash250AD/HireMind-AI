from services.job_service import MOCK_CANDIDATES

class ShortlistService:
    @staticmethod
    def get_shortlist():
        return [
            {
                'rank': 1,
                'candidate': MOCK_CANDIDATES[0],
                'reasoning': 'Matches 94% of required skills, outstanding LLM agent architecture knowledge, 95% verification confidence.'
            },
            {
                'rank': 2,
                'candidate': MOCK_CANDIDATES[1],
                'reasoning': '92% skill alignment with deep React & TypeScript experience. High interview communication score (89%).'
            }
        ]
