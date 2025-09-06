import { useEffect } from 'react';
import './Register.css'; // We'll create this CSS file

function Register() {
  useEffect(() => {
    // Toggle password visibility
    const passwordToggle = document.getElementById('passwordToggle');
    const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    const togglePassword = (toggle, input) => {
      toggle.addEventListener('click', function() {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
      });
    };
    
    if (passwordToggle && passwordInput) {
      togglePassword(passwordToggle, passwordInput);
    }
    
    if (confirmPasswordToggle && confirmPasswordInput) {
      togglePassword(confirmPasswordToggle, confirmPasswordInput);
    }
    
    // Form validation
    const form = document.getElementById('registrationForm');
    const handleSubmit = (e) => {
      e.preventDefault();
      
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      
      // If validation passes, show success message
      alert('Registration successful! Welcome to CodeLab.');
      form.reset();
    };
    
    if (form) {
      form.addEventListener('submit', handleSubmit);
    }
    
    // Cleanup
    return () => {
      if (form) {
        form.removeEventListener('submit', handleSubmit);
      }
    };
  }, []);

  return (
    <div className="register-container">
      <div className="left-panel">
        <h2>Join the CodeLab Community</h2>
        <p>CodeLab: Where ideas become digital reality through collaborative coding and innovation.</p>
        <p>Already have an account? <a href="#" style={{color: "#4fc3f7", fontWeight: "500"}}>Login here</a></p>
      </div>
      
      <div className="right-panel">
        <div className="logo">
          <h1><span className="logo-icon">{`{ }`}</span>CodeLab</h1>
        </div>
        
        <div className="form-title">
          <h2>Create Your Account</h2>
          <p>Fill in your details to get started with CodeLab</p>
        </div>
        
        <form id="registrationForm">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-with-icon">
              <i className="fas fa-user"></i>
              <input type="text" id="username" name="username" placeholder="Enter your username" required />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <i className="fas fa-envelope"></i>
              <input type="email" id="email" name="email" placeholder="Enter your email" required />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="regNumber">Register Number</label>
            <div className="input-with-icon">
              <i className="fas fa-id-card"></i>
              <input type="text" id="regNumber" name="regNumber" placeholder="Enter your register number" required />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input type="password" id="password" name="password" placeholder="Create a strong password" required />
              <span className="password-toggle" id="passwordToggle">
                <i className="far fa-eye"></i>
              </span>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required />
              <span className="password-toggle" id="confirmPasswordToggle">
                <i className="far fa-eye"></i>
              </span>
            </div>
          </div>
          
          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="terms" name="terms" required />
              <label htmlFor="terms">I agree to the Terms & Conditions</label>
            </div>
          </div>
          
          <button type="submit" className="btn-register">Create Account</button>
        </form>
        
        <div className="login-link">
          Already have an account? <a href="#">Log in</a>
        </div>
      </div>
    </div>
  );
}

export default Register;