import requests
from config import Config

class APIService:
    @staticmethod
    def get(endpoint: str, params: dict = None, headers: dict = None):
        url = f"{Config.AUTOMATION_BASE_URL}{endpoint}"
        default_headers = {
            'Authorization': f"Bearer {Config.AUTOMATION_API_KEY}",
            'Content-Type': 'application/json'
        }
        if headers:
            default_headers.update(headers)
        try:
            response = requests.get(url, params=params, headers=default_headers, timeout=5)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"API Call failed for GET {endpoint}: {e}")
            return None

    @staticmethod
    def post(endpoint: str, data: dict = None, headers: dict = None):
        url = f"{Config.AUTOMATION_BASE_URL}{endpoint}"
        default_headers = {
            'Authorization': f"Bearer {Config.AUTOMATION_API_KEY}",
            'Content-Type': 'application/json'
        }
        if headers:
            default_headers.update(headers)
        try:
            response = requests.post(url, json=data, headers=default_headers, timeout=5)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"API Call failed for POST {endpoint}: {e}")
            return None
