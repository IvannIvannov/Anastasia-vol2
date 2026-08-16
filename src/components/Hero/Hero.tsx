import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import "./Hero.css";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={sectionRef} className="hero">
      <div className="hero__container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero__description-wrapper"
        >
          <p className="hero__description">
            Video Editor · Graphic Designer · UGC Creator · Social Media Manager
          </p>
        </motion.div>

        <motion.div style={{ y: titleY }} className="hero__title-wrapper">
          <div className="hero__title-line">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hero__title"
            >
              Anastasia
            </motion.h1>
          </div>

          <div className="hero__title-line">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hero__title"
            >
              Paskaleva
            </motion.h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1,
            duration: 0.8,
          }}
          className="hero__bottom"
        >
          <p className="hero__location">Plovdiv · Bulgaria</p>

          <a href="#work" className="hero__work-link">
            Selected work
            <span className="hero__arrow">↓</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;