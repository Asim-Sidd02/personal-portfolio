import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './contact.css';

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const BUTTON_COPY = {
  idle: 'Send Message',
  sending: 'Sending…',
  success: 'Message Sent',
  error: 'Try Again',
};

const FEEDBACK_COPY = {
  success: "Thank you — your message has landed in my inbox. I'll get back to you shortly.",
  error: 'Something went wrong on my end — please try again or email me directly.',
};

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

const Contact = React.forwardRef((props, ref) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');

  const updateField = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('sending');

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_email: 'asimsiddiqui8181@gmail.com',
        },
        { publicKey: PUBLIC_KEY }
      )
      .then(() => {
        setStatus('success');
        setForm(INITIAL_FORM);
      })
      .catch(() => setStatus('error'));
  };

  const feedback = FEEDBACK_COPY[status] ?? '';

  return (
    <section ref={ref} id="contact" className="contact section">
      <h2 className="section__title">Get In Touch</h2>
      <span className="section__subtitle">Let's Work Together</span>

      <div className="contact__container container grid">
        <div className="contact__info">
          <p className="contact__lede">
            Have a project in mind or just want to say hello? I read every
            message personally and typically reply within a day.
          </p>

          <div className="contact__detail">
            <span className="contact__detail-icon">
              <i className="uil uil-envelope" />
            </span>
            <div className="contact__detail-text">
              <span className="contact__detail-title">Email</span>
              <a
                href="mailto:asimsiddiqui8181@gmail.com"
                className="contact__detail-value"
              >
                asimsiddiqui8181@gmail.com
              </a>
            </div>
          </div>

          <div className="contact__detail">
            <span className="contact__detail-icon">
              <i className="uil uil-location-point" />
            </span>
            <div className="contact__detail-text">
              <span className="contact__detail-title">Location</span>
              <span className="contact__detail-value">Hyderabad, India</span>
            </div>
          </div>

          <div className="contact__detail">
            <span className="contact__detail-icon">
              <i className="uil uil-clock-three" />
            </span>
            <div className="contact__detail-text">
              <span className="contact__detail-title">Availability</span>
              <span className="contact__detail-value">
                Open to new projects
              </span>
            </div>
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="contact__form-row">
            <div className="contact__form-div">
              <input
                type="text"
                className="contact__form-input"
                placeholder=" "
                required
                value={form.name}
                onChange={updateField('name')}
              />
              <label className="contact__form-tag">Your Name</label>
            </div>

            <div className="contact__form-div">
              <input
                type="email"
                className="contact__form-input"
                placeholder=" "
                required
                value={form.email}
                onChange={updateField('email')}
              />
              <label className="contact__form-tag">Your Email</label>
            </div>
          </div>

          <div className="contact__form-div">
            <input
              type="text"
              className="contact__form-input"
              placeholder=" "
              required
              value={form.subject}
              onChange={updateField('subject')}
            />
            <label className="contact__form-tag">Subject</label>
          </div>

          <div className="contact__form-div contact__form-area">
            <textarea
              className="contact__form-input"
              placeholder=" "
              required
              value={form.message}
              onChange={updateField('message')}
            />
            <label className="contact__form-tag">Message</label>
          </div>

          <button
            type="submit"
            className="contact__button"
            disabled={status === 'sending'}
          >
            {BUTTON_COPY[status]}
            <i className="uil uil-message contact__button-icon" />
          </button>

          <p className={`contact__feedback contact__feedback--${status}`}>
            {feedback}
          </p>
        </form>
      </div>
    </section>
  );
});

export default Contact;
