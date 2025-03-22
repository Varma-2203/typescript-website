
import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <div className="contact-section">
      <h2>Contact Us</h2>
      <div className="contact-content">
        <div className="contact-images">
          <img src="/lovable-uploads/756eb9a7-8def-43a7-a490-2abb0faed5c4.png" alt="Motivational Image" className="contact-image" />
        </div>
        <div className="contact-info">
          <p>For inquiries, please reach out to:</p>
          <p>M. Keerthi</p>
          <p>
            <span className="email-icon">✉</span> Email: sreeja1052031@gmail.com
          </p>
        </div>
        <div className="contact-images">
          <img src="/lovable-uploads/756eb9a7-8def-43a7-a490-2abb0faed5c4.png" alt="Inspiring Image" className="contact-image" />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
