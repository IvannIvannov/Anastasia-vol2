import { useEffect, useMemo, useRef, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import "./Reels.css";

type ReelCategory =
  | "cosmetics"
  | "accessories-outfits"
  | "procedures"
  | "unboxing"
  | "food-drinks"
  | "restaurants-hotels"
  | "other";

interface Reel {
  id: number;
  title: string;
  client?: string;
  category: ReelCategory;
  video: string;
  poster?: string;
  featured?: boolean;
}

const categories: {
  value: ReelCategory;
  label: string;
}[] = [
  {
    value: "cosmetics",
    label: "Cosmetics",
  },
  {
    value: "accessories-outfits",
    label: "Accessories & Outfits",
  },
  {
    value: "procedures",
    label: "Procedures",
  },
  {
    value: "unboxing",
    label: "Unboxing",
  },
  {
    value: "food-drinks",
    label: "Food & Drinks",
  },
  {
    value: "restaurants-hotels",
    label: "Restaurants & Hotels",
  },
  {
    value: "other",
    label: "Other",
  },
];

const reels: Reel[] = [
  {
    id: 1,
    title: "Beauty Story",
    client: "Beauty Brand",
    category: "cosmetics",
    featured: true,
    video:
      "https://res.cloudinary.com/mxjelcos/video/upload/v1786885539/yulia.mp4",
  },
  {
    id: 2,
    title: "Daily Look",
    client: "Fashion",
    category: "accessories-outfits",
    featured: true,
    video:
      "https://res.cloudinary.com/mxjelcos/video/upload/v1786885539/yulia.mp4",
  },
  {
    id: 3,
    title: "Beauty Procedure",
    client: "Studio",
    category: "procedures",
    featured: true,
    video:
      "https://res.cloudinary.com/mxjelcos/video/upload/v1786885539/yulia.mp4",
  },
  {
    id: 4,
    title: "Unboxing",
    client: "Brand Content",
    category: "unboxing",
    featured: true,
    video:
      "https://res.cloudinary.com/mxjelcos/video/upload/v1786885539/yulia.mp4",
  },
  {
    id: 5,
    title: "Food Story",
    client: "Food & Drinks",
    category: "food-drinks",
    featured: true,
    video:
      "https://res.cloudinary.com/mxjelcos/video/upload/v1786885539/yulia.mp4",
  },
  {
    id: 6,
    title: "Restaurant Experience",
    client: "Hospitality",
    category: "restaurants-hotels",
    featured: true,
    video:
      "https://res.cloudinary.com/mxjelcos/video/upload/v1786885539/yulia.mp4",
  },
  {
    id: 7,
    title: "Social Story",
    client: "Creative Content",
    category: "other",
    featured: true,
    video:
      "https://res.cloudinary.com/mxjelcos/video/upload/v1786885539/yulia.mp4",
  },
  {
    id: 8,
    title: "Skincare",
    client: "Beauty Brand",
    category: "cosmetics",
    featured: true,
    video:
      "https://res.cloudinary.com/mxjelcos/video/upload/v1786885539/yulia.mp4",
  },
  {
    id: 9,
    title: "Summer Outfit",
    client: "Fashion",
    category: "accessories-outfits",
    video:
      "https://res.cloudinary.com/mxjelcos/video/upload/v1786885539/yulia.mp4",
  },
  {
    id: 10,
    title: "Product Reveal",
    client: "Brand Content",
    category: "unboxing",
    video:
      "https://res.cloudinary.com/mxjelcos/video/upload/v1786885539/yulia.mp4",
  },
  {
    id: 11,
    title: "Cocktail Story",
    client: "Food & Drinks",
    category: "food-drinks",
    video:
      "https://res.cloudinary.com/mxjelcos/video/upload/v1786885539/yulia.mp4",
  },
  {
    id: 12,
    title: "Hotel Experience",
    client: "Hospitality",
    category: "restaurants-hotels",
    video:
      "https://res.cloudinary.com/mxjelcos/video/upload/v1786885539/yulia.mp4",
  },
];

const Reels = () => {
  const [activeCategory, setActiveCategory] = useState<ReelCategory | null>(
    null,
  );

  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const [manuallyPaused, setManuallyPaused] = useState<number | null>(null);

  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  useEffect(() => {
    const elements = document.querySelectorAll(".reels .fade-up");

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
        threshold: 0.1,
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const visibleReels = useMemo(() => {
    if (!activeCategory) {
      return reels.filter((reel) => reel.featured);
    }

    return reels.filter((reel) => reel.category === activeCategory);
  }, [activeCategory]);

  const stopAllVideos = () => {
    Object.values(videoRefs.current).forEach((video) => {
      if (!video) {
        return;
      }

      video.pause();
    });

    setPlayingVideo(null);
    setManuallyPaused(null);
  };

  const handleCategoryChange = (category: ReelCategory) => {
    stopAllVideos();

    if (activeCategory === category) {
      setActiveCategory(null);
      return;
    }

    setActiveCategory(category);
  };

  const playVideo = (video: HTMLVideoElement, id: number) => {
    if (manuallyPaused === id) {
      return;
    }

    Object.entries(videoRefs.current).forEach(([videoId, currentVideo]) => {
      if (currentVideo && Number(videoId) !== id) {
        currentVideo.pause();
      }
    });

    video
      .play()
      .then(() => {
        setPlayingVideo(id);
      })
      .catch(() => {
        setPlayingVideo(null);
      });
  };

  const pauseVideoOnLeave = (video: HTMLVideoElement, id: number) => {
    if (manuallyPaused === id) {
      return;
    }

    video.pause();

    if (playingVideo === id) {
      setPlayingVideo(null);
    }
  };

  const toggleVideo = (video: HTMLVideoElement, id: number) => {
    if (video.paused) {
      Object.entries(videoRefs.current).forEach(([videoId, currentVideo]) => {
        if (currentVideo && Number(videoId) !== id) {
          currentVideo.pause();
        }
      });

      setManuallyPaused(null);

      video
        .play()
        .then(() => {
          setPlayingVideo(id);
        })
        .catch(() => {
          setPlayingVideo(null);
        });

      return;
    }

    video.pause();

    setPlayingVideo(null);
    setManuallyPaused(id);
  };

  return (
    <section className="reels" id="reels">
      <div className="reels__header fade-up">
        <p className="reels__label">Work</p>
      </div>

      <div className="reels__intro">
        <div className="fade-up">
          <span className="reels__eyebrow">Selected short-form work</span>

          <h2 className="reels__title">Made to be watched.</h2>
        </div>

        <p className="reels__subtitle fade-up">
          A selection of reels I&apos;ve created across beauty, fashion,
          lifestyle, food, hospitality and branded content.
        </p>
      </div>

      <div className="reels__filters-wrapper fade-up">
        <div className="reels__filters">
          {categories.map((category) => {
            const count = reels.filter(
              (reel) => reel.category === category.value,
            ).length;

            const isActive = activeCategory === category.value;

            return (
              <button
                key={category.value}
                type="button"
                className={`reels__filter ${
                  isActive ? "reels__filter--active" : ""
                }`}
                onClick={() => handleCategoryChange(category.value)}
                aria-pressed={isActive}
              >
                <span>{category.label}</span>

                <sup>{String(count).padStart(2, "0")}</sup>
              </button>
            );
          })}
        </div>
      </div>

      <div className="reels__current fade-up">
        <span>
          {activeCategory
            ? categories.find((category) => category.value === activeCategory)
                ?.label
            : "Featured work"}
        </span>

        {activeCategory && (
          <button
            type="button"
            onClick={() => {
              stopAllVideos();
              setActiveCategory(null);
            }}
          >
            Back to featured
          </button>
        )}
      </div>

      <motion.div layout className="reels__grid">
        <AnimatePresence mode="popLayout">
          {visibleReels.map((reel, index) => {
            const isPlaying = playingVideo === reel.id;

            const isManuallyPaused = manuallyPaused === reel.id;

            const categoryLabel = categories.find(
              (category) => category.value === reel.category,
            )?.label;

            return (
              <motion.article
                layout
                key={reel.id}
                className={`reel-card ${isPlaying ? "reel-card--playing" : ""}`}
                initial={{
                  opacity: 0,
                  y: 16,
                  scale: 0.99,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  scale: 0.99,
                }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.03, 0.15),
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="reel-card__media">
                  <video
                    ref={(element) => {
                      videoRefs.current[reel.id] = element;
                    }}
                    className="reel-card__video"
                    src={reel.video}
                    poster={reel.poster}
                    muted
                    playsInline
                    loop
                    preload="none"
                    onMouseEnter={(event) =>
                      playVideo(event.currentTarget, reel.id)
                    }
                    onMouseLeave={(event) =>
                      pauseVideoOnLeave(event.currentTarget, reel.id)
                    }
                    onClick={(event) =>
                      toggleVideo(event.currentTarget, reel.id)
                    }
                  />

                  <button
                    className={`reel-card__control ${
                      isPlaying && !isManuallyPaused
                        ? "reel-card__control--hidden"
                        : ""
                    }`}
                    type="button"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    onClick={() => {
                      const video = videoRefs.current[reel.id];

                      if (video) {
                        toggleVideo(video, reel.id);
                      }
                    }}
                  >
                    {isManuallyPaused ? (
                      <span className="reel-card__pause">
                        <span />
                        <span />
                      </span>
                    ) : (
                      <span className="reel-card__play" />
                    )}
                  </button>

                  <span className="reel-card__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="reel-card__info">
                  <div>
                    <h3>{reel.title}</h3>

                    {reel.client && <p>{reel.client}</p>}
                  </div>

                  <span className="reel-card__category">{categoryLabel}</span>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {visibleReels.length === 0 && (
        <p className="reels__empty">More work coming soon.</p>
      )}
    </section>
  );
};

export default Reels;
