import { motion } from "motion/react";

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
  return (
    <section id="services" className="services">
      <div className="services__header">
        <p className="services__label">Services</p>
        <span className="services__section-number">02</span>
      </div>

      <div className="services__intro">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="services__title"
        >
          What I do.
        </motion.h2>

        <p className="services__subtitle">
          From the first idea to the final detail, I create content that looks
          good, feels right and works for the brand behind it.
        </p>
      </div>

      <div className="services__list">
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.7,
              delay: index * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="service"
          >
            <div className="service__main">
              <span className="service__number">{service.number}</span>
              <h3 className="service__title">{service.title}</h3>
              <span className="service__arrow">↗</span>
            </div>

            <div className="service__description">
              <p>{service.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Services;
