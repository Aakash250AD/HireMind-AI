from flask import Blueprint, render_template

candidate_bp = Blueprint('candidate', __name__)

@candidate_bp.route('/dashboard')
def dashboard():
    return render_template('candidate/dashboard.html')

@candidate_bp.route('/jobs')
def jobs():
    return render_template('candidate/jobs.html')

@candidate_bp.route('/applications')
def applications():
    return render_template('candidate/applications.html')
