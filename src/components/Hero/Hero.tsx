import { useEffect } from "react";

import "./Hero.css";

export default function Hero() {
  useEffect(() => {
    const elements = document.querySelectorAll(".hero .hero__fade-up");

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
    <section className="hero" id="top">
      <div className="hero__layout">
        <div className="hero__content">
          <h1 className="hero__title hero__fade-up">
            Creative work,
            <br />
            made with
            <span> intention.</span>
          </h1>

          <p className="hero__description hero__fade-up">
            I turn ideas into polished, engaging content — from video editing
            and graphic design to UGC and social media.
          </p>

          <div className="hero__roles hero__fade-up">
            <span>Video Editing</span>
            <span>Graphic Design</span>
            <span>UGC Creation</span>
            <span>Social Media</span>
          </div>
        </div>

        <div className="hero__visual hero__fade-up">
          <div className="hero__image-wrapper">
            <img
              src="/hero/anastasia-hero.jpg"
              alt="Anastasia Paskaleva"
              className="hero__image"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          <div className="hero__image-meta">
            <span>Plovdiv / Sofia, Bulgaria</span>
            <span>Scroll to explore ↓</span>
          </div>
        </div>
      </div>

      <div className="hero__bottom hero__fade-up">
        <span>Visual storytelling · Content · Creative direction</span>
      </div>
    </section>
  );
}
