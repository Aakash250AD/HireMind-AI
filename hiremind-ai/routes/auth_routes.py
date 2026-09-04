from flask import Blueprint, render_template, request, redirect, url_for, session

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        role = request.form.get('role')
        session['role'] = role
        if role == 'recruiter':
            return redirect(url_for('recruiter.dashboard'))
        elif role == 'candidate':
            return redirect(url_for('candidate.dashboard'))
        elif role == 'admin':
            return redirect(url_for('admin.dashboard'))
    return render_template('auth/login.html')

@auth_bp.route('/register')
def register():
    return render_template('auth/register.html')

@auth_bp.route('/forgot-password')
def forgot_password():
    return render_template('auth/forgot_password.html')

@auth_bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('auth.login'))
