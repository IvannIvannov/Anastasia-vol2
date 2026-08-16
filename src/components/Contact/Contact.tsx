import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { motion } from "motion/react";
import "./Contact.css";

type FormStatus = "idle" | "sending" | "success" | "error";

interface ContactFormData {
  name: string;
  email: string;
  brand: string;
  projectType: string;
  message: string;
  website: string;
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  brand: "",
  projectType: "",
  message: "",
  website: "",
};

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "sending") {
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong. Please try again.",
        );
      }

      setStatus("success");
      setFormData(initialFormData);
    } catch (error) {
      setStatus("error");

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__header">
        <p className="contact__label">Contact</p>
        <span className="contact__number">06</span>
      </div>

      <div className="contact__layout">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="contact__intro"
        >
          <h2 className="contact__title">
            Let&apos;s work
            <br />
            together.
          </h2>

          <div className="contact__intro-bottom">
            <p>
              Have a project, campaign or collaboration in mind? Tell me a
              little about it and I&apos;ll get back to you.
            </p>

            <div className="contact__meta">
              <div>
                <span>Based in</span>
                <p>Plovdiv, Bulgaria</p>
              </div>

              <div>
                <span>Available for</span>
                <p>Projects & collaborations</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: 0.85,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <div className="contact-form__row">
            <div className="contact-form__field">
              <label htmlFor="name">Name *</label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
                maxLength={80}
                required
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="email">Email *</label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                maxLength={120}
                required
              />
            </div>
          </div>

          <div className="contact-form__row">
            <div className="contact-form__field">
              <label htmlFor="brand">Company / Brand</label>

              <input
                id="brand"
                name="brand"
                type="text"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Your brand"
                maxLength={100}
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="projectType">Project type *</label>

              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a service
                </option>

                <option value="video-editing">Video Editing</option>

                <option value="graphic-design">Graphic Design</option>

                <option value="ugc">UGC Creation</option>

                <option value="social-media">Social Media Management</option>

                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="contact-form__field contact-form__field--message">
            <label htmlFor="message">Tell me about your project *</label>

            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="A few details about your project, timeline and what you're looking for..."
              rows={6}
              minLength={10}
              maxLength={2000}
              required
            />
          </div>

          {/* Honeypot - hidden from real visitors */}

          <div className="contact-form__honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>

            <input
              id="website"
              name="website"
              type="text"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="contact-form__bottom">
            <div className="contact-form__status" aria-live="polite">
              {status === "success" && (
                <p className="contact-form__success">
                  Thank you — your message has been sent.
                </p>
              )}

              {status === "error" && (
                <p className="contact-form__error">{errorMessage}</p>
              )}
            </div>

            <button
              type="submit"
              className="contact-form__submit"
              disabled={status === "sending"}
            >
              <span>
                {status === "sending" ? "Sending..." : "Send inquiry"}
              </span>

              <span className="contact-form__arrow">↗</span>
            </button>
          </div>
        </motion.form>
      </div>

      <footer className="contact__footer">
        <p>© 2026 Anastasia Paskaleva</p>

        <a href="#" className="contact__back-top">
          Back to top
          <span>↑</span>
        </a>
      </footer>
    </section>
  );
};

export default Contact;
