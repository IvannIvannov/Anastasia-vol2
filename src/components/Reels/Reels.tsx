import { useState } from "react";
import { motion } from "motion/react";
import "./Reels.css";

const reels = [
  {
    video:
      "https://res.cloudinary.com/mxjelcos/video/upload/v1786885539/yulia.mp4",
    client: "Yulia",
    type: "Video Editing",
  },
  {
    video:
      "https://res.cloudinary.com/mxjelcos/video/upload/v1786885539/yulia.mp4",
    client: "Yulia",
    type: "Video Editing",
  },
  {
    video:
      "https://res.cloudinary.com/mxjelcos/video/upload/v1786885539/yulia.mp4",
    client: "Yulia",
    type: "Video Editing",
  },
  {
    video:
      "https://res.cloudinary.com/mxjelcos/video/upload/v1786885539/yulia.mp4",
    client: "Yulia",
    type: "Video Editing",
  },
  {
    video:
      "https://res.cloudinary.com/mxjelcos/video/upload/v1786885539/yulia.mp4",
    client: "Yulia",
    type: "Video Editing",
  },
];

const Reels = () => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [manuallyPaused, setManuallyPaused] = useState<number | null>(null);

  const playVideo = (video: HTMLVideoElement, index: number) => {
    if (manuallyPaused === index) return;

    video
      .play()
      .then(() => {
        setPlayingVideo(index);
      })
      .catch(() => {});
  };

  const pauseVideoOnLeave = (video: HTMLVideoElement, index: number) => {
    if (manuallyPaused === index) return;

    video.pause();

    if (playingVideo === index) {
      setPlayingVideo(null);
    }
  };

  const toggleVideo = (video: HTMLVideoElement, index: number) => {
    if (video.paused) {
      setManuallyPaused(null);

      video
        .play()
        .then(() => {
          setPlayingVideo(index);
        })
        .catch(() => {});
    } else {
      video.pause();

      setPlayingVideo(null);
      setManuallyPaused(index);
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
          {reels.map((reel, index) => {
            const isPlaying = playingVideo === index;
            const isManuallyPaused = manuallyPaused === index;

            return (
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
                className={`reel-card ${isPlaying ? "reel-card--playing" : ""}`}
              >
                <div className="reel-card__video-wrapper">
                  <video
                    src={reel.video}
                    className="reel-card__video"
                    muted
                    loop
                    playsInline
                    preload="none"
                    onMouseEnter={(event) =>
                      playVideo(event.currentTarget, index)
                    }
                    onMouseLeave={(event) =>
                      pauseVideoOnLeave(event.currentTarget, index)
                    }
                    onClick={(event) => toggleVideo(event.currentTarget, index)}
                  />

                  <div
                    className={`reel-card__overlay ${
                      isManuallyPaused ? "reel-card__overlay--paused" : ""
                    }`}
                  >
                    <span className="reel-card__play">
                      {isManuallyPaused ? (
                        <span className="reel-card__pause-icon">
                          <span></span>
                          <span></span>
                        </span>
                      ) : (
                        <span className="reel-card__play-icon"></span>
                      )}
                    </span>
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Reels;
