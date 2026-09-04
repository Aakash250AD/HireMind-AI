from flask import Blueprint, render_template, request, jsonify
from services.candidate_service import CandidateService

candidate_bp = Blueprint('candidate', __name__)

@candidate_bp.route('/candidates')
def candidates():
    cand_list = CandidateService.get_candidates()
    return render_template('candidates/candidates.html', candidates=cand_list)

@candidate_bp.route('/candidates/<candidate_id>')
def candidate_details(candidate_id):
    candidate = CandidateService.get_candidate_by_id(candidate_id) or CandidateService.get_candidates()[0]
    return render_template('candidates/candidate_details.html', candidate=candidate)

@candidate_bp.route('/api/candidates/<candidate_id>/decision', methods=['POST'])
def submit_decision(candidate_id):
    data = request.get_json() or {}
    status = data.get('status', 'APPROVED')
    notes = data.get('notes', '')
    res = CandidateService.submit_decision(candidate_id, status, notes)
    return jsonify({'success': True, 'candidate': res})
