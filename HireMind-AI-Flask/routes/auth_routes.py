from flask import Blueprint, render_template, request, redirect, url_for, session, flash

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        role = request.form.get('role', 'hr')
        session['user'] = {'email': email, 'role': role, 'name': 'Sarah Jenkins' if role == 'hr' else 'Arun Kumar'}
        if role == 'candidate':
            return redirect('/candidate-dashboard')
        return redirect('/dashboard')
    return render_template('auth/login.html')

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form.get('email')
        role = request.form.get('role', 'hr')
        session['user'] = {'email': email, 'role': role, 'name': request.form.get('full_name', 'User')}
        if role == 'candidate':
            return redirect('/candidate-dashboard')
        return redirect('/dashboard')
    return render_template('auth/register.html')

@auth_bp.route('/forgot-password')
def forgot_password():
    return render_template('auth/forgot_password.html')

@auth_bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('auth.login'))
