from flask import Blueprint, render_template
from services.notification_service import NotificationService

notifications_bp = Blueprint('notifications', __name__)
settings_bp = Blueprint('settings', __name__)

@notifications_bp.route('/notifications')
def notifications():
    list_n = NotificationService.get_notifications()
    return render_template('notifications/notifications.html', notifications=list_n)

@settings_bp.route('/settings')
def settings():
    return render_template('settings/settings.html')
