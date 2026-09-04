from flask import Blueprint, render_template
from services.shortlist_service import ShortlistService

shortlist_bp = Blueprint('shortlist', __name__)

@shortlist_bp.route('/shortlist')
def shortlist():
    shortlist_data = ShortlistService.get_shortlist()
    return render_template('shortlist/shortlist.html', shortlist=shortlist_data)
