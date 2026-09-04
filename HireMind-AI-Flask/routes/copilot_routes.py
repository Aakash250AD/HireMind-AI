from flask import Blueprint, render_template, request, jsonify
from services.copilot_service import CopilotService

copilot_bp = Blueprint('copilot', __name__)

@copilot_bp.route('/copilot')
def copilot():
    return render_template('copilot/copilot.html')

@copilot_bp.route('/api/copilot/chat', methods=['POST'])
def copilot_chat():
    data = request.get_json() or {}
    message = data.get('message', '')
    res = CopilotService.ask(message)
    return jsonify({'success': True, 'response': res})
