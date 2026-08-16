import { motion } from "motion/react";
import "./Services.css";

const services = [
  {
    number: "01",
    title: "Video Editing",
    description:
      "Dynamic and polished video content for social media, campaigns and digital storytelling.",
  },
  {
    number: "02",
    title: "Graphic Design",
    description:
      "Visual concepts, social media graphics and branded assets with a strong and consistent identity.",
  },
  {
    number: "03",
    title: "UGC Creation",
    description:
      "Natural and engaging content designed to connect brands with their audience in an authentic way.",
  },
  {
    number: "04",
    title: "Social Media Management",
    description:
      "Creative direction, content planning and social media management shaped around each brand.",
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
          Creative services built around strong visuals, clear ideas and
          meaningful digital communication.
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
