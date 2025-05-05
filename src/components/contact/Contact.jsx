import React, { useEffect, useRef } from 'react';
import './contact.css';

const Contact = React.forwardRef((props, ref) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section ref={ref} id="contact" className="contact-section">
   
      <div
        className="visme_d"
        data-title="Mobile Friendly Contact Form"
        data-url="pvmw7jow-mobile-friendly-contact-form"
        data-domain="forms"
        data-full-page="false"
        data-min-height="500px"
        data-form-id="26805"
        id="contact"
      />
    </section>
  );
});

export default Contact;
