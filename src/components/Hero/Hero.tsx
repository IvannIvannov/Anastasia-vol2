import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__layout">
        <div className="hero__content">
          <h1 className="hero__title hero__animate hero__animate--title">
            Creative work,
            <br />
            made with
            <span> intention.</span>
          </h1>

          <p className="hero__description hero__animate hero__animate--description">
            I turn ideas into polished, engaging content — from video editing
            and graphic design to UGC and social media.
          </p>

          <div className="hero__roles hero__animate hero__animate--roles">
            <span>Video Editing</span>
            <span>Graphic Design</span>
            <span>UGC Creation</span>
            <span>Social Media</span>
          </div>
        </div>

        <div className="hero__visual hero__animate hero__animate--visual">
          <div className="hero__image-wrapper">
            <img
              src="/hero/anastasia-hero.jpg"
              alt="Anastasia Paskaleva"
              className="hero__image"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          <div className="hero__image-meta hero__animate hero__animate--meta">
            <span>Plovdiv / Sofia, Bulgaria</span>
            <span>Scroll to explore ↓</span>
          </div>
        </div>
      </div>

      <div className="hero__bottom hero__animate hero__animate--bottom">
        <span>Visual storytelling · Content · Creative direction</span>
      </div>
    </section>
  );
}
