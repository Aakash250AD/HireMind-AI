from flask import Flask, redirect, url_for
from flask_cors import CORS
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    # Register Blueprints
    from routes.auth_routes import auth_bp
    from routes.dashboard_routes import dashboard_bp
    from routes.job_routes import job_bp
    from routes.candidate_routes import candidate_bp
    from routes.interview_routes import interview_bp
    from routes.shortlist_routes import shortlist_bp
    from routes.analytics_routes import analytics_bp
    from routes.automation_routes import automation_bp
    from routes.copilot_routes import copilot_bp
    from routes.webhook_routes import webhook_bp
    from routes.notification_routes import notifications_bp, settings_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(job_bp)
    app.register_blueprint(candidate_bp)
    app.register_blueprint(interview_bp)
    app.register_blueprint(shortlist_bp)
    app.register_blueprint(analytics_bp)
    app.register_blueprint(automation_bp)
    app.register_blueprint(copilot_bp)
    app.register_blueprint(webhook_bp)
    app.register_blueprint(notifications_bp)
    app.register_blueprint(settings_bp)

    @app.route('/')
    def index():
        return redirect(url_for('dashboard.dashboard'))

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
