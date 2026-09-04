from flask import Blueprint, render_template

recruiter_bp = Blueprint('recruiter', __name__)

@recruiter_bp.route('/dashboard')
def dashboard():
    return render_template('recruiter/dashboard.html')

@recruiter_bp.route('/jobs')
def jobs():
    return render_template('recruiter/jobs.html')

@recruiter_bp.route('/candidates')
def candidates():
    return render_template('recruiter/candidates.html')
