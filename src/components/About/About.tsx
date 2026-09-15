import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import aboutImage from "../../assets/anastasia.png";

import MoreAbout from "../MoreAbout/MoreAbout";

import "./About.css";

const About = () => {
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll(".about .fade-up");

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
        threshold: 0.15,
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleCloseMoreAbout = () => {
    setShowMore(false);
  };

  return (
    <>
      <section id="about" className="about">
        <div className="about__header fade-up">
          <p className="about__label">About</p>
        </div>

        <div className="about__layout">
          <div className="about__image-wrapper fade-up">
            <img
              src={aboutImage}
              alt="Anastasia Paskaleva"
              className="about__image"
              loading="lazy"
            />
          </div>

          <div className="about__content">
            <h2 className="about__title fade-up">
              Ideas shaped
              <br />
              into something visual.
            </h2>

            <div className="about__text fade-up">
              <p>
                I&apos;m Anastasia — a creative working across video editing,
                graphic design, UGC creation and social media.
              </p>

              <p>
                I love turning ideas into content that feels polished, natural
                and true to the brand behind it. For me, the details matter —
                from the first concept to the final frame.
              </p>
            </div>

            <button
              type="button"
              className="about__link fade-up"
              onClick={() => setShowMore((current) => !current)}
              aria-expanded={showMore}
            >
              <span>{showMore ? "Show less" : "More about me"}</span>

              <span className="about__link-arrow">↓</span>
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence
        initial={false}
        onExitComplete={() => {
          document.getElementById("services")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
      >
        {showMore && (
          <motion.div
            key="more-about"
            initial={{
              height: 0,
            }}
            animate={{
              height: "auto",
            }}
            exit={{
              height: 0,
            }}
            transition={{
              height: {
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            style={{
              overflow: "hidden",
            }}
          >
            <MoreAbout onClose={handleCloseMoreAbout} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default About;
