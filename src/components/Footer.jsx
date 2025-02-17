import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="footer-links">
              <Link to="/gizlilik">Gizlilik ve Veri Güvenliği Politikası</Link>
              <Link to="/kosullar">Kullanım Koşulları</Link>
              <Link to="/bilgi-toplumu">Bilgi Toplumu Hizmetleri</Link>
            </div>
            
            <div className="social-links mt-4">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-foursquare"></i>
              </a>
            </div>
          </div>
          
          <div className="col-md-4 text-end">
            <div className="app-links">
              <span className="text-white me-2">McDonald's Uygulamasını indirin:</span>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="https://placehold.co/120x40" alt="App Store" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="https://placehold.co/120x40" alt="Google Play" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="copyright">
          Copyright © Anadolu Restoran İşletmeleri Ltd. Şti.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 