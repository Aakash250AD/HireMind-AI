from flask import Blueprint, render_template, jsonify, request
from services.interview_service import InterviewService

interview_bp = Blueprint('interview', __name__)

@interview_bp.route('/interviews')
def interviews():
    list_int = InterviewService.get_interviews()
    return render_template('interviews/interviews.html', interviews=list_int)

@interview_bp.route('/interview/<session_id>')
def interview_room(session_id):
    interview = InterviewService.get_interview_by_id(session_id) or InterviewService.get_interviews()[0]
    return render_template('interviews/interview_room.html', interview=interview)

@interview_bp.route('/interviews/<session_id>/result')
def interview_result(session_id):
    interview = InterviewService.get_interview_by_id(session_id) or InterviewService.get_interviews()[0]
    return render_template('interviews/interview_result.html', interview=interview)
