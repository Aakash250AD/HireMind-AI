import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'default_secret_key')
    AUTOMATION_BASE_URL = os.getenv('AUTOMATION_BASE_URL', 'https://api.hiremind.ai/v1')
    AUTOMATION_API_KEY = os.getenv('AUTOMATION_API_KEY', 'mock_key')
    WEBHOOK_SECRET = os.getenv('WEBHOOK_SECRET', 'mock_webhook_secret')
    DEBUG = os.getenv('FLASK_ENV') == 'development'
