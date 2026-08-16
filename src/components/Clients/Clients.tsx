import { motion } from "motion/react";
import "./Clients.css";

const clients = [
  "Radapola",
  "Mazu Beach",
  "Influencer Media",
  "Studio ELITA",
  "Eucerin",
  "CCC",
  "Nine West",
  "AreL Clothing",
];

const Clients = () => {
  return (
    <section className="clients">
      <div className="clients__header">
        <p className="clients__label">Selected clients</p>
        <span className="clients__number">03</span>
      </div>

      <div className="clients__intro">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="clients__title"
        >
          Brands I've
          <br />
          created for.
        </motion.h2>

        <p className="clients__description">
          Selected collaborations across fashion, beauty, hospitality, lifestyle
          and digital media.
        </p>
      </div>

      <div className="clients__marquee">
        <div className="clients__track">
          {[...clients, ...clients].map((client, index) => (
            <span key={`${client}-${index}`} className="clients__marquee-item">
              {client}
              <span className="clients__dot">•</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Clients;
