import useRevealOnScroll from "../../hooks/useRevealOnScroll";

import "./YouTube.css";

const channels = [
  {
    name: "Anastasia Paskaleva",
    role: "My YouTube Channel · Video Editing · Content Creation",
    description:
      "My own YouTube channel, where I share lifestyle, beauty and personal content while taking care of everything from the idea to the final edit.",
    image: "/youtube/anaria.png",
    link: "https://www.youtube.com/@anastasiapaskaleva",
  },
  {
    name: "Yulia Salakina",
    role: "Video Editing · Content Management",
    description:
      "Lifestyle, fashion and travel videos edited to feel natural, engaging and true to the creator behind the channel.",
    image: "/youtube/yuliaR.png",
    link: "https://www.youtube.com/@YuliaSalakina",
  },
];

const YouTube = () => {
  useRevealOnScroll({
    selector: ".youtube .fade-up",
    threshold: 0.12,
  });

  return (
    <section id="youtube" className="youtube" aria-labelledby="youtube-title">
      <div className="youtube__header fade-up">
        <p className="youtube__label">YouTube</p>
      </div>

      <div className="youtube__intro">
        <h2 id="youtube-title" className="youtube__title fade-up">
          Beyond
          <br />
          short-form.
        </h2>

        <p className="youtube__description fade-up">
          A selection of YouTube channels I work on, from video editing to
          ongoing content and channel management.
        </p>
      </div>

      <div className="youtube__grid" role="list" aria-label="YouTube channels">
        {channels.map((channel, index) => {
          const titleId = `youtube-channel-${index + 1}`;

          return (
            <article
              key={channel.name}
              className="youtube-card fade-up"
              role="listitem"
              aria-labelledby={titleId}
            >
              <a
                href={channel.link}
                target="_blank"
                rel="noreferrer"
                className="youtube-card__image-link"
                aria-label={`Open ${channel.name} YouTube channel in a new tab`}
              >
                <div className="youtube-card__image-wrapper">
                  <img
                    src={channel.image}
                    alt={`${channel.name} YouTube channel preview`}
                    className="youtube-card__image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </a>

              <div className="youtube-card__content">
                <div>
                  <span className="youtube-card__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 id={titleId}>{channel.name}</h3>

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
                    aria-label={`Explore ${channel.name} YouTube channel in a new tab`}
                  >
                    Explore channel
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default YouTube;
