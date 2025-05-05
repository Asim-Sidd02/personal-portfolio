import React from 'react';
import './Preloader.css';

const Preloader = () => {
  const text = 'LOADING';
  return (
    <div className="preloader-container">
      <h2>
        {text.split('').map((letter, index) => (
          <span key={index} data-text={letter}>
            {letter}
          </span>
        ))}
      </h2>
    </div>
  );
};

export default Preloader;
