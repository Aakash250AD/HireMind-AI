from flask import Blueprint, render_template, session, redirect, url_for
from services.candidate_service import CandidateService
from services.job_service import MOCK_JOBS

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/dashboard')
def dashboard():
    candidates = CandidateService.get_candidates()
    return render_template('dashboard/dashboard.html', candidates=candidates, jobs=MOCK_JOBS, role='hr')

@dashboard_bp.route('/candidate-dashboard')
def candidate_dashboard():
    candidates = CandidateService.get_candidates()
    return render_template('dashboard/dashboard.html', candidates=candidates, jobs=MOCK_JOBS, role='candidate')
