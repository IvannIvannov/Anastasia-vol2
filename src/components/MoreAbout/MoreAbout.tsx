import { motion } from "motion/react";
import photoOne from "../../assets/anastasia.png";
import photoTwo from "../../assets/anastasia.png";
import photoThree from "../../assets/anastasia.png";
import "./MoreAbout.css";

const MoreAbout = () => {
  return (
    <section id="more-about" className="more-about">
      <div className="more-about__header">
        <p className="more-about__label">More about me</p>
        <span className="more-about__number">01.1</span>
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
            Creating with purpose,
            <br />
            not just for attention.
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
              My work lives at the intersection of creativity, visual
              storytelling and digital communication.
            </p>

            <p>
              From shaping the visual direction of a brand to editing the final
              frame of a video, I enjoy being involved in the entire creative
              process and turning ideas into content that feels considered,
              relevant and memorable.
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
              <p>Plovdiv, Bulgaria</p>
            </div>

            <div className="more-about__info-item">
              <span>Working across</span>
              <p>Content · Design · Video · Social</p>
            </div>

            <div className="more-about__info-item">
              <span>Available for</span>
              <p>Freelance projects & collaborations</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MoreAbout;