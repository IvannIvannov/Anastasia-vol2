import { motion } from "motion/react";

import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__layout">
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="hero__eyebrow">Creative portfolio · 2026</span>

          <h1 className="hero__title">
            Creative work,
            <br />
            made with
            <span> intention.</span>
          </h1>

          <p className="hero__description">
            I turn ideas into polished, engaging content — from video editing
            and graphic design to UGC and social media.
          </p>

          <div className="hero__roles">
            <span>Video Editing</span>
            <span>Graphic Design</span>
            <span>UGC Creation</span>
            <span>Social Media</span>
          </div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="hero__image-wrapper">
            <img
              src="/hero/anastasia-hero.jpg"
              alt="Anastasia Paskaleva"
              className="hero__image"
            />
          </div>

          <div className="hero__image-meta">
            <span>Plovdiv/Sofia, Bulgaria</span>
            <span>Scroll to explore ↓</span>
          </div>
        </motion.div>
      </div>

      <div className="hero__bottom">
        <span>Visual storytelling · Content · Creative direction</span>

        <a href="#reels">Explore my work ↘</a>
      </div>
    </section>
  );
}
