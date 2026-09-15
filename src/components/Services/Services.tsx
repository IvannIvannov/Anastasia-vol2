import { useEffect } from "react";

import "./Services.css";

const services = [
  {
    number: "01",
    title: "Video Editing",
    description:
      "Engaging, polished videos shaped around the story, the platform and the way your audience actually watches.",
  },
  {
    number: "02",
    title: "Graphic Design",
    description:
      "Clean, cohesive visuals for social media, campaigns and branded content that feel recognisable and consistent.",
  },
  {
    number: "03",
    title: "UGC Creation",
    description:
      "Natural, relatable content that presents products and services in a way that feels genuine, not overly produced.",
  },
  {
    number: "04",
    title: "Social Media Management",
    description:
      "Content planning, creative direction and day-to-day social media support built around the voice and goals of each brand.",
  },
];

const Services = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".services .fade-up");

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
        threshold: 0.12,
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="services" className="services">
      <div className="services__header fade-up">
        <p className="services__label">Services</p>
      </div>

      <div className="services__intro">
        <h2 className="services__title fade-up">What I do.</h2>

        <p className="services__subtitle fade-up">
          From the first idea to the final detail, I create content that looks
          good, feels right and works for the brand behind it.
        </p>
      </div>

      <div className="services__list">
        {services.map((service) => (
          <article key={service.title} className="service fade-up">
            <div className="service__main">
              <span className="service__number">{service.number}</span>

              <h3 className="service__title">{service.title}</h3>

              <span className="service__arrow" aria-hidden="true">
                ↗
              </span>
            </div>

            <div className="service__description">
              <p>{service.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
