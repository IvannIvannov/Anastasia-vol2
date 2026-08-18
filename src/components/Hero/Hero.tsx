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
            Creating visuals
            <br />
            that feel
            <span> intentional.</span>
          </h1>

          <p className="hero__description">
            Video editor, graphic designer, UGC creator and social media manager
            creating thoughtful visual content for brands and people.
          </p>

          <div className="hero__roles">
            <span>Video Editing</span>
            <span>Graphic Design</span>
            <span>UGC</span>
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
            <span>Plovdiv, Bulgaria</span>
            <span>Scroll to explore ↓</span>
          </div>
        </motion.div>
      </div>

      <div className="hero__bottom">
        <span>Visual storytelling · Content · Direction</span>

        <a href="#reels">Explore my work ↘</a>
      </div>
    </section>
  );
}
