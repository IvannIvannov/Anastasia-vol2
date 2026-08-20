import { useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import aboutImage from "../../assets/anastasia.png";

import MoreAbout from "../MoreAbout/MoreAbout";

import "./About.css";

const About = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <section id="about" className="about">
        <div className="about__header">
          <p className="about__label">About</p>
        </div>

        <div className="about__layout">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="about__image-wrapper"
          >
            <img
              src={aboutImage}
              alt="Anastasia Paskaleva"
              className="about__image"
            />
          </motion.div>

          <div className="about__content">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="about__title"
            >
              Ideas shaped
              <br />
              into something visual.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="about__text"
            >
              <p>
                I&apos;m Anastasia — a creative working across video editing,
                graphic design, UGC creation and social media.
              </p>

              <p>
                I love turning ideas into content that feels polished, natural
                and true to the brand behind it. For me, the details matter —
                from the first concept to the final frame.
              </p>
            </motion.div>

            <button
              type="button"
              className="about__link"
              onClick={() => setShowMore((current) => !current)}
              aria-expanded={showMore}
            >
              <span>{showMore ? "Show less" : "More about me"}</span>

              <motion.span
                animate={{ rotate: showMore ? 180 : 0 }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="about__link-arrow"
              >
                ↓
              </motion.span>
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence initial={false}>
        {showMore && (
          <motion.div
            key="more-about"
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              height: {
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.45,
              },
            }}
            style={{ overflow: "hidden" }}
          >
            <MoreAbout />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default About;
