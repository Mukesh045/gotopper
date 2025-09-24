import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';

const SignUp = ({ onSignUpSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { signUp, updateUserProfile } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);

    if (!name.trim()) {
      setMessage('Please enter your name.');
      return;
    }

    try {
      const userCredential = await signUp(email, password);
      await updateUserProfile({ displayName: name });
      setMessage('Sign up successful! You are now logged in.');
      setIsSuccess(true);
      setName('');
      setEmail('');
      setPassword('');
      // Optionally call a success handler to close the modal
      if (onSignUpSuccess) {
        setTimeout(onSignUpSuccess, 1500);
      }
    } catch (error) {
      setMessage(error.message);
      setIsSuccess(false);
    }
  };

  return (
    <div className="signup-form p-3">
      <h5>Create Account</h5>
      {message && (
        <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="signup-name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="signup-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signup-email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signup-password" className="form-label">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="signup-password"
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
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
