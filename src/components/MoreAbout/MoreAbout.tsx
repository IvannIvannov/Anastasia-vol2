import photoOne from "../../assets/anastasia.png";
import photoTwo from "../../assets/anastasia.png";
import photoThree from "../../assets/anastasia.png";

import useRevealOnScroll from "../../hooks/useRevealOnScroll";

import "./MoreAbout.css";

interface MoreAboutProps {
  onClose: () => void;
}

const MoreAbout = ({ onClose }: MoreAboutProps) => {
  useRevealOnScroll({
    selector: ".more-about .fade-up",
    threshold: 0.12,
  });

  return (
    <section
      id="more-about"
      className="more-about"
      aria-labelledby="more-about-title"
    >
      <div className="more-about__header fade-up">
        <p className="more-about__label">More about me</p>
      </div>

      <div className="more-about__layout">
        <div className="more-about__left">
          <h2 id="more-about-title" className="more-about__title fade-up">
            I care about the idea
            <br />
            behind the visual.
          </h2>

          <div
            className="more-about__gallery fade-up"
            aria-label="Photos of Anastasia Paskaleva"
          >
            <div className="more-about__photo more-about__photo--large">
              <img src={photoOne} alt="Anastasia Paskaleva" loading="lazy" />
            </div>

            <div className="more-about__gallery-side">
              <div className="more-about__photo more-about__photo--small-top">
                <img src={photoTwo} alt="Anastasia Paskaleva" loading="lazy" />
              </div>

              <div className="more-about__photo more-about__photo--small-bottom">
                <img
                  src={photoThree}
                  alt="Anastasia Paskaleva"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="more-about__details">
          <div className="more-about__description fade-up">
            <p>
              For me, good content is not only about how it looks. It should
              have a clear idea, a purpose and a feeling behind it.
            </p>

            <p>
              I enjoy being part of the whole creative process — developing the
              concept, shaping the visual direction, editing the details and
              bringing everything together into content that feels complete.
            </p>
          </div>

          <div
            className="more-about__info fade-up"
            aria-label="Professional information"
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
          </div>
        </div>
      </div>

      <div className="more-about__close fade-up">
        <button
          type="button"
          className="more-about__close-button"
          onClick={onClose}
          aria-label="Close more about section and return to About"
        >
          <span>Back to about</span>

          <span className="more-about__close-arrow" aria-hidden="true">
            ↑
          </span>
        </button>
      </div>
    </section>
  );
};

export default MoreAbout;
