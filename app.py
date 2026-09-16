from flask import Flask, redirect, url_for, render_template
from config import Config

# Import blueprints
from routes.auth_routes import auth_bp
from routes.recruiter_routes import recruiter_bp
from routes.candidate_routes import candidate_bp
from routes.admin_routes import admin_bp

app = Flask(__name__)
app.config.from_object(Config)

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(recruiter_bp, url_prefix='/recruiter')
app.register_blueprint(candidate_bp, url_prefix='/candidate')
app.register_blueprint(admin_bp, url_prefix='/admin')

@app.route('/')
def index():
    # Redirect to login page as the default entry point
    return redirect(url_for('auth.login'))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
