import React from 'react';
import styled from 'styled-components';
import './Preloader.css';

const Preloader = () => {
  return (
    <StyledWrapper>
      <div className="loader-container">
        <div className="traffic-light">
          <div className="light-row">
            <div className="light red-light" />
          </div>
          <div className="light-row">
            <div className="light yellow-light" />
          </div>
          <div className="light-row">
            <div className="light green-light" />
          </div>
        </div>

        <div className="loading-status" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* 🔥 Fullscreen dark background */
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: #0b0b0b; /* Pure dark theme */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999; /* Above everything */
  animation: fadeIn 0.5s ease-out forwards;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Centering container */
  .loader-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    z-index: 2;
  }

  /* Your existing styles below */
  .traffic-light {
    background: linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 40%, #1e1e1e 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 28px;
    padding: 24px;
    box-shadow:
      0 40px 80px rgba(0, 0, 0, 0.5),
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 8px 16px rgba(0, 0, 0, 0.2),
      inset 0 2px 0 rgba(255, 255, 255, 0.05),
      inset 0 -2px 20px rgba(0, 0, 0, 0.8);
    width: 110px;
  }

  .light-row {
    margin: 18px 0;
    display: flex;
    justify-content: center;
  }

  .light {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.06);
    overflow: hidden;
    transition: 0.6s;
  }

  /* Text below signals */
  .loading-status {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
    text-align: center;
    letter-spacing: 0.5px;
  }

  /* Responsive */
  @media (max-width: 480px) {
    .traffic-light {
      width: 90px;
      padding: 18px;
    }
    .light {
      width: 34px;
      height: 34px;
    }
    .loading-status {
      font-size: 12px;
    }
  }
`;

export default Preloader;
