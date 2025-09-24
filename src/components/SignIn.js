import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';

const SignIn = ({ onSignInSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { login, signInWithGoogle, signInWithGitHub } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await login(email, password);
      setMessage('Login successful!');
      setIsSuccess(true);
      if (onSignInSuccess) {
        setTimeout(onSignInSuccess, 1500);
      }
    } catch (error) {
      setMessage(error.message);
      setIsSuccess(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      await provider();
      setMessage('Login successful!');
      setIsSuccess(true);
      if (onSignInSuccess) {
        setTimeout(onSignInSuccess, 1500);
      }
    } catch (error) {
      setMessage(error.message);
      setIsSuccess(false);
    }
  };

  return (
    <div className="signin-form p-3">
      {message && (
        <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="signin-email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="signin-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signin-password" className="form-label">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="signin-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign In</button>
      </form>
      <div className="text-center my-3">OR</div>
      <button className="btn btn-outline-danger w-100 mb-2" onClick={() => handleSocialLogin(signInWithGoogle)}>
        <i className="bi bi-google me-2"></i>Sign in with Google
      </button>
      <button className="btn btn-outline-dark w-100" onClick={() => handleSocialLogin(signInWithGitHub)}>
        <i className="bi bi-github me-2"></i>Sign in with GitHub
      </button>
    </div>
  );
};

export default SignIn;
