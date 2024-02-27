import React, { useEffect } from 'react';
import "./contact.css"
import emailjs from '@emailjs/browser'

const Contact = () => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
    script.async = true;

    // Append the script to the document body
    document.body.appendChild(script);

    // Clean up by removing the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="visme_d" data-title="Mobile Friendly Contact Form" data-url="pvmw7jow-mobile-friendly-contact-form" data-domain="forms" data-full-page="false" data-min-height="500px" data-form-id="26805"></div>
  );
};


export default Contact
