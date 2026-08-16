import { motion } from "motion/react";
import "./Reels.css";

const reels = [
  {
    video: "/reels/reel-1.mp4",
    client: "Radapola",
    type: "Video Editing",
  },
  {
    video: "/reels/reel-2.mp4",
    client: "Mazu Beach",
    type: "Social Content",
  },
  {
    video: "/reels/reel-3.mp4",
    client: "Studio ELITA",
    type: "Video Editing",
  },
  {
    video: "/reels/reel-4.mp4",
    client: "UGC",
    type: "Content Creation",
  },
  {
    video: "/reels/reel-5.mp4",
    client: "Radapola",
    type: "Fashion Content",
  },
  {
    video: "/reels/reel-6.mp4",
    client: "Mazu Beach",
    type: "Social Media",
  },
];

const Reels = () => {
  const playVideo = (video: HTMLVideoElement) => {
    video.play().catch(() => {});
  };

  const pauseVideo = (video: HTMLVideoElement) => {
    video.pause();
  };

  const toggleVideo = (video: HTMLVideoElement) => {
    if (video.paused) {
      playVideo(video);
    } else {
      video.pause();
    }
  };

  return (
    <section id="reels" className="reels">
      <div className="reels__header">
        <p className="reels__label">Short-form work</p>
        <span className="reels__number">04</span>
      </div>

      <div className="reels__intro">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="reels__title"
        >
          Made to
          <br />
          move.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="reels__intro-right"
        >
          <p className="reels__description">
            Selected reels, edits and short-form content created for brands,
            campaigns and social media.
          </p>

          <span className="reels__hint">Scroll to explore →</span>
        </motion.div>
      </div>

      <div className="reels__scroller">
        <div className="reels__track">
          {reels.map((reel, index) => (
            <motion.article
              key={`${reel.client}-${index}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="reel-card"
            >
              <div className="reel-card__video-wrapper">
                <video
                  src={reel.video}
                  className="reel-card__video"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onMouseEnter={(event) => playVideo(event.currentTarget)}
                  onMouseLeave={(event) => pauseVideo(event.currentTarget)}
                  onClick={(event) => toggleVideo(event.currentTarget)}
                />

                <div className="reel-card__overlay">
                  <span className="reel-card__play">▶</span>
                </div>

                <span className="reel-card__index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="reel-card__info">
                  <h3>{reel.client}</h3>
                  <p>{reel.type}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reels;
