import { motion } from "motion/react";

import photoOne from "../../assets/anastasia.png";
import photoTwo from "../../assets/anastasia.png";
import photoThree from "../../assets/anastasia.png";

import "./MoreAbout.css";

interface MoreAboutProps {
  onClose: () => void;
}

const MoreAbout = ({ onClose }: MoreAboutProps) => {
  return (
    <section id="more-about" className="more-about">
      <div className="more-about__header">
        <p className="more-about__label">More about me</p>
      </div>

      <div className="more-about__layout">
        <div className="more-about__left">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="more-about__title"
          >
            I care about the idea
            <br />
            behind the visual.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="more-about__gallery"
          >
            <div className="more-about__photo more-about__photo--large">
              <img src={photoOne} alt="Anastasia portrait 1" />
            </div>

            <div className="more-about__gallery-side">
              <div className="more-about__photo more-about__photo--small-top">
                <img src={photoTwo} alt="Anastasia portrait 2" />
              </div>

              <div className="more-about__photo more-about__photo--small-bottom">
                <img src={photoThree} alt="Anastasia portrait 3" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="more-about__details">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="more-about__description"
          >
            <p>
              For me, good content is not only about how it looks. It should
              have a clear idea, a purpose and a feeling behind it.
            </p>

            <p>
              I enjoy being part of the whole creative process — developing the
              concept, shaping the visual direction, editing the details and
              bringing everything together into content that feels complete.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="more-about__info"
          >
            <div className="more-about__info-item">
              <span>Based in</span>
              <p>Plovdiv / Sofia, Bulgaria</p>
            </div>

            <div className="more-about__info-item">
              <span>Working across</span>
              <p>Video · Design · UGC · Social Media</p>
            </div>

            <div className="more-about__info-item">
              <span>Open to</span>
              <p>Freelance projects & brand collaborations</p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="more-about__close"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <button
          type="button"
          className="more-about__close-button"
          onClick={onClose}
        >
          <span>Back to about</span>
          <span className="more-about__close-arrow">↑</span>
        </button>
      </motion.div>
    </section>
  );
};

export default MoreAbout;
