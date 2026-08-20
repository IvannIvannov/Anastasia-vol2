import { motion } from "motion/react";

import "./YouTube.css";

const channels = [
  {
    name: "Channel One",
    role: "My YouTube Channel · Video Editing · Content Creation",
    description:
      "My own YouTube channel, where I share lifestyle, beauty and personal content while taking care of everything from the idea to the final edit.",
    image: "/youtube/anaria.png",
    link: "https://www.youtube.com/@anastasiapaskaleva",
  },
  {
    name: "Channel Two",
    role: "Video Editing · Content Management",
    description:
      "Lifestyle, fashion and travel videos edited to feel natural, engaging and true to the creator behind the channel.",
    image: "/youtube/yuliaR.png",
    link: "https://www.youtube.com/@YuliaSalakina",
  },
];

const YouTube = () => {
  return (
    <section id="youtube" className="youtube">
      <div className="youtube__header">
        <p className="youtube__label">YouTube</p>
        <span className="youtube__number">05</span>
      </div>

      <div className="youtube__intro">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="youtube__title"
        >
          Beyond
          <br />
          short-form.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="youtube__description"
        >
          A selection of YouTube channels I work on, from video editing to
          ongoing content and channel management.
        </motion.p>
      </div>

      <div className="youtube__grid">
        {channels.map((channel, index) => (
          <motion.article
            key={channel.name}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.85,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="youtube-card"
          >
            <a
              href={channel.link}
              target="_blank"
              rel="noreferrer"
              className="youtube-card__image-link"
            >
              <div className="youtube-card__image-wrapper">
                <img
                  src={channel.image}
                  alt={channel.name}
                  className="youtube-card__image"
                />
              </div>
            </a>

            <div className="youtube-card__content">
              <div>
                <span className="youtube-card__index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{channel.name}</h3>

                <p className="youtube-card__role">{channel.role}</p>
              </div>

              <div className="youtube-card__content-bottom">
                <p className="youtube-card__description">
                  {channel.description}
                </p>

                <a
                  href={channel.link}
                  target="_blank"
                  rel="noreferrer"
                  className="youtube-card__button"
                >
                  Explore channel
                  <span>↗</span>
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default YouTube;
