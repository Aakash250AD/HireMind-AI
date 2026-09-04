from flask import Blueprint, request, jsonify
from config import Config

webhook_bp = Blueprint('webhook', __name__)

def verify_webhook():
    auth_header = request.headers.get('Authorization')
    if auth_header != f"Bearer {Config.WEBHOOK_SECRET}":
        return False
    return True

@webhook_bp.route('/webhooks/job-created', methods=['POST'])
def webhook_job_created():
    if not verify_webhook():
        return jsonify({'success': False, 'message': 'Unauthorized webhook signature'}), 401
    data = request.get_json() or {}
    return jsonify({'success': True, 'message': f"Job {data.get('job_id')} received for AI analysis."}), 200

@webhook_bp.route('/webhooks/resume-uploaded', methods=['POST'])
def webhook_resume_uploaded():
    if not verify_webhook():
        return jsonify({'success': False, 'message': 'Unauthorized webhook signature'}), 401
    data = request.get_json() or {}
    return jsonify({'success': True, 'message': f"Resume for candidate {data.get('candidate_id')} queued for screening."}), 200
