import { useEffect } from "react";

import {
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";

import "./Footer.css";

const Footer = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".footer .fade-up");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer__inner">
        <a
          href="#top"
          className="footer__brand fade-up"
          aria-label="Anastasia Paskaleva — back to top"
        >
          Anastasia
        </a>

        <div
          className="footer__socials fade-up"
          aria-label="Social media links"
        >
          <a href="mailto:your@email.com" aria-label="Send Anastasia an email">
            <FaEnvelope aria-hidden="true" />
          </a>

          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Anastasia's Instagram in a new tab"
          >
            <FaInstagram aria-hidden="true" />
          </a>

          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Anastasia's Facebook in a new tab"
          >
            <FaFacebookF aria-hidden="true" />
          </a>

          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Anastasia's TikTok in a new tab"
          >
            <FaTiktok aria-hidden="true" />
          </a>

          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Anastasia's YouTube in a new tab"
          >
            <FaYoutube aria-hidden="true" />
          </a>
        </div>

        <nav className="footer__nav fade-up" aria-label="Footer navigation">
          <a href="#about">About</a>

          <a href="#services">Services</a>

          <a href="#reels">Work</a>

          <a href="#contact">Contact</a>
        </nav>

        <div className="footer__bottom fade-up">
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
