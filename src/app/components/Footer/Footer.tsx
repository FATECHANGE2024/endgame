// components/Footer.tsx
import React from 'react';
import '@/app/citizen/citizen.css';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-lg-3 col-md-6">
            <h3>Samadhan Setu</h3>
            <p>Empowering communities for better neighborhoods.</p>
            <div className="social-links d-flex gap-3">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#"><i className="ri-arrow-right-line"></i> Home</a></li>
              <li><a href="#"><i className="ri-arrow-right-line"></i> Report Issue</a></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h3>Resources</h3>
            <ul>
              <li><a href="#"><i className="ri-arrow-right-line"></i> Help Center</a></li>
              <li><a href="#"><i className="ri-arrow-right-line"></i> Privacy Policy</a></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h3>Contact Us</h3>
            <ul>
              <li><i className="fas fa-envelope me-2"></i> support@samadhansetu.org</li>
              <li><i className="fas fa-phone me-2"></i> +91 123-456-7890</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2025 Samadhan Setu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
