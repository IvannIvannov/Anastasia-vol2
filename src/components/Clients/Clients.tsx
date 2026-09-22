import { useEffect } from "react";

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
  useEffect(() => {
    const elements = document.querySelectorAll(".clients .fade-up");

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
    <section className="clients" aria-labelledby="clients-title">
      <div className="clients__header fade-up">
        <p className="clients__label">Selected clients</p>
      </div>

      <div className="clients__intro">
        <h2 id="clients-title" className="clients__title fade-up">
          Brands I&apos;ve
          <br />
          created for.
        </h2>

        <p className="clients__description fade-up">
          A selection of brands I&apos;ve worked with across fashion, beauty,
          hospitality, lifestyle and digital media.
        </p>
      </div>

      <div className="clients__marquee fade-up">
        <div className="clients__track">
          <div
            className="clients__group"
            role="list"
            aria-label="Selected client brands"
          >
            {clients.map((client) => (
              <span
                key={client}
                className="clients__marquee-item"
                role="listitem"
              >
                {client}

                <span className="clients__dot" aria-hidden="true">
                  •
                </span>
              </span>
            ))}
          </div>

          <div className="clients__group" aria-hidden="true">
            {clients.map((client) => (
              <span
                key={`duplicate-${client}`}
                className="clients__marquee-item"
              >
                {client}

                <span className="clients__dot" aria-hidden="true">
                  •
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
