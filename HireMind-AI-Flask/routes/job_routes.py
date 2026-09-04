from flask import Blueprint, render_template, request, jsonify
from services.job_service import MOCK_JOBS

job_bp = Blueprint('job', __name__)

@job_bp.route('/jobs')
def jobs():
    return render_template('jobs/jobs.html', jobs=MOCK_JOBS)

@job_bp.route('/jobs/create')
def create_job():
    return render_template('jobs/create_job.html')

@job_bp.route('/jobs/<job_id>')
def job_details(job_id):
    job = next((j for j in MOCK_JOBS if j['id'] == job_id), MOCK_JOBS[0])
    return render_template('jobs/job_details.html', job=job)

@job_bp.route('/api/jobs/<job_id>/analyze', methods=['POST'])
def analyze_job(job_id):
    return jsonify({
        'success': True,
        'message': 'AI job description analysis completed successfully.',
        'extracted': {
            'keywords': ['PyTorch', 'LLMs', 'Agentic AI', 'FastAPI'],
            'suggested_skills': ['Vector DBs', 'RAG Architecture']
        }
    })
