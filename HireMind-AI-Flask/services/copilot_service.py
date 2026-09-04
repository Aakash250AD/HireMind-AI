class CopilotService:
    @staticmethod
    def ask(prompt: str):
        prompt_lower = prompt.lower()
        if 'arun' in prompt_lower or 'shortlist' in prompt_lower:
            return {
                'text': "**Arun Kumar** is ranked **#1** for Senior AI Engineer with an **Overall Score of 93%**.\n\n- **94% Match**: Direct LLM & PyTorch alignment.\n- **95% Verification**: Confirmed Python and Vector DB capabilities.",
                'actions': [{'label': 'View Profile', 'url': '/candidates/cand-1'}]
            }
        return {
            'text': f"**AI Recommendation for '{prompt}':**\n\n- 12 Active Jobs under monitoring.\n- 348 Total Candidates screened.\n- 3 Candidates pending recruiter review.",
            'actions': [{'label': 'View Shortlist', 'url': '/shortlist'}]
        }
