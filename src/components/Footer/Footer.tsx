import {
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <a href="#top" className="footer__brand">
          Anastasia
        </a>

        <div className="footer__socials">
          <a href="mailto:your@email.com" aria-label="Email">
            <FaEnvelope />
          </a>

          <a href="#" target="_blank" rel="noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>

          <a href="#" target="_blank" rel="noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>

          <a href="#" target="_blank" rel="noreferrer" aria-label="TikTok">
            <FaTiktok />
          </a>

          <a href="#" target="_blank" rel="noreferrer" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>

        <nav className="footer__nav">
          <a href="#reels">Work</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="footer__bottom">
          <p>© 2026 Anastasia Paskaleva. All rights reserved.</p>

          <a href="#top" className="footer__back-top" aria-label="Back to top">
            Back to top
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
