from flask import Blueprint, render_template
from services.analytics_service import AnalyticsService

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/analytics')
def analytics():
    summary = AnalyticsService.get_summary()
    return render_template('analytics/analytics.html', analytics=summary)
