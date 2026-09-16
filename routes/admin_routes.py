from flask import Blueprint, render_template

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/dashboard')
def dashboard():
    return render_template('admin/dashboard.html')

@admin_bp.route('/agents')
def agents():
    return render_template('admin/agents.html')

@admin_bp.route('/automations')
def automations():
    return render_template('admin/automations.html')
