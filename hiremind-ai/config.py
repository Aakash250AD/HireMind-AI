import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-hiremind-ai'
    MOCK_MODE = os.environ.get('MOCK_MODE', 'true').lower() == 'true'
    AUTOMATION_BASE_URL = os.environ.get('AUTOMATION_BASE_URL')
    AUTOMATION_API_KEY = os.environ.get('AUTOMATION_API_KEY')
    WEBHOOK_SECRET = os.environ.get('WEBHOOK_SECRET')
