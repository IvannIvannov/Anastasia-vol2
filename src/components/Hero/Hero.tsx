import useRevealOnScroll from "../../hooks/useRevealOnScroll";

import "./Hero.css";

export default function Hero() {
  useRevealOnScroll({
    selector: ".hero .hero__fade-up",
    threshold: 0.12,
  });

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__layout">
        <div className="hero__content">
          <h1 id="hero-title" className="hero__title hero__fade-up">
            Creative work,
            <br />
            made with
            <span> intention.</span>
          </h1>

          <p className="hero__description hero__fade-up">
            I turn ideas into polished, engaging content — from video editing
            and graphic design to UGC and social media.
          </p>

          <div
            className="hero__roles hero__fade-up"
            role="list"
            aria-label="Creative services"
          >
            <span role="listitem">Video Editing</span>

            <span role="listitem">Graphic Design</span>

            <span role="listitem">UGC Creation</span>

            <span role="listitem">Social Media</span>
          </div>
        </div>

        <div className="hero__visual hero__fade-up">
          <div className="hero__image-wrapper">
            <img
              src="/hero/anastasia-hero.jpg"
              alt="Portrait of Anastasia Paskaleva"
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
