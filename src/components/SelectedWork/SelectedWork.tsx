import "./SelectedWork.css";
import { motion } from "motion/react";

const projects = [
  {
    title: "Radapola",
    category: "Social Media · Video · Content",
    image: "/projects/anastasia.jpeg",
  },
  {
    title: "Mazu Beach",
    category: "Social Media Management · Content",
    image: "/projects/217790.jpeg",
  },
  {
    title: "Influencer Media",
    category: "Creative Direction · Graphic Design",
    image: "/projects/228760.jpeg",
  },
  {
    title: "Studio ELITA",
    category: "Content Creation · Video Editing",
    image: "/projects/test.jpeg",
  },
];

const SelectedWork = () => {
  return (
    <section id="work" className="selected-work">
      <div className="selected-work__header">
        <p className="selected-work__eyebrow">Selected work</p>

        <h2 className="selected-work__title">
          A selection of work
          <br />
          across content & design.
        </h2>
      </div>

      <div className="selected-work__grid">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            className={`project-card project-card--${index + 1}`}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.8,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <a href="#" className="project-card__link">
              <div className="project-card__image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-card__image"
                />
              </div>

              <div className="project-card__info">
                <div>
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__category">{project.category}</p>
                </div>

                <span className="project-card__arrow">↗</span>
              </div>
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default SelectedWork;
