from flask import Blueprint, render_template
from services.automation_service import AutomationService

automation_bp = Blueprint('automation', __name__)

@automation_bp.route('/automations')
def automations():
    workflows = AutomationService.get_automations()
    return render_template('automations/automations.html', workflows=workflows)
