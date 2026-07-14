import React from "react";
import styled from "styled-components";

const Card = () => {
  return (
    <StyledWrapper>
      <div className="login-card">
        <h2 className="card-title">Welcome</h2>
        <p className="card-subtitle">Sign in to manage your account</p>

        <div className="action-group">
          <a href="/login" className="btn btn-primary">
            Sign In
          </a>

          <div className="divider">
            <span>or</span>
          </div>

          <a href="/register" className="btn btn-secondary">
            Create Account
          </a>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;

  .login-card {
    width: 320px;
    padding: 2.5rem 2rem;
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid #eaeaea;
    box-sizing: border-box;
  }

  .card-title {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #111111;
    text-align: center;
    letter-spacing: -0.025em;
  }

  .card-subtitle {
    margin: 0 0 2rem 0;
    font-size: 0.875rem;
    color: #666666;
    text-align: center;
  }

  .action-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .btn {
    width: 100%;
    padding: 0.875rem;
    font-size: 0.95rem;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    box-sizing: border-box;
  }

  .btn-primary {
    background-color: #111111;
    color: #ffffff;
    border: 1px solid #111111;
  }

  .btn-primary:hover {
    background-color: #222222;
    border-color: #222222;
  }

  .btn-secondary {
    background-color: transparent;
    color: #111111;
    border: 1px solid #e2e8f0;
  }

  .btn-secondary:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
  }

  .divider {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 0.5rem 0;
    color: #94a3b8;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .divider::before,
  .divider::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
  }

  .divider:not(:empty)::before {
    margin-right: 0.75em;
  }

  .divider:not(:empty)::after {
    margin-left: 0.75em;
  }
`;

export default Card;
