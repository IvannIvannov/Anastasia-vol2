import { useEffect, useRef, useState } from "react";
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

interface TurnstileInstance {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      theme?: "light" | "dark" | "auto";
      size?: "normal" | "compact" | "flexible";
      callback?: (token: string) => void;
      "error-callback"?: () => void;
      "expired-callback"?: () => void;
    },
  ) => string;

  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileInstance;
  }
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  brand: "",
  projectType: "",
  message: "",
  website: "",
};

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);

  const [status, setStatus] = useState<FormStatus>("idle");

  const [turnstileToken, setTurnstileToken] = useState("");

  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);

  const turnstileWidgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

    if (!siteKey) {
      console.error("Missing VITE_TURNSTILE_SITE_KEY.");

      return;
    }

    const renderTurnstile = () => {
      if (
        !window.turnstile ||
        !turnstileContainerRef.current ||
        turnstileWidgetIdRef.current
      ) {
        return;
      }

      turnstileWidgetIdRef.current = window.turnstile.render(
        turnstileContainerRef.current,
        {
          sitekey: siteKey,
          theme: "dark",
          size: "flexible",

          callback: (token) => {
            setTurnstileToken(token);
          },

          "expired-callback": () => {
            setTurnstileToken("");
          },

          "error-callback": () => {
            setTurnstileToken("");
          },
        },
      );
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src*="challenges.cloudflare.com/turnstile"]',
    );

    if (existingScript) {
      if (window.turnstile) {
        renderTurnstile();
      } else {
        existingScript.addEventListener("load", renderTurnstile);
      }

      return () => {
        existingScript.removeEventListener("load", renderTurnstile);
      };
    }

    const script = document.createElement("script");

    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

    script.async = true;
    script.defer = true;

    script.addEventListener("load", renderTurnstile);

    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", renderTurnstile);

      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetIdRef.current);

        turnstileWidgetIdRef.current = null;
      }
    };
  }, []);

  const resetTurnstile = () => {
    if (window.turnstile && turnstileWidgetIdRef.current) {
      window.turnstile.reset(turnstileWidgetIdRef.current);
    }

    setTurnstileToken("");
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (status === "success" || status === "error") {
      setStatus("idle");
    }
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "sending") {
      return;
    }

    if (!turnstileToken) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      let data: {
        success?: boolean;
        message?: string;
        error?: string;
      } = {};

      try {
        data = await response.json();
      } catch {
        // Невалиден server response.
      }

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");

      setFormData(initialFormData);

      resetTurnstile();
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus("error");

      resetTurnstile();
    }
  };

  return (
    <section className="contact" id="contact">
      <motion.div
        className="contact__header"
        initial={{
          opacity: 0,
          y: 15,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <p className="contact__label">Contact</p>

        <p className="contact__number">(07)</p>
      </motion.div>

      <div className="contact__layout">
        <motion.div
          className="contact__intro"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
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
                <p>Projects &amp; collaborations</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="contact-form__row">
            <div className="contact-form__field">
              <label htmlFor="name">Name *</label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={100}
                autoComplete="name"
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="email">Email *</label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={150}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="contact-form__row">
            <div className="contact-form__field">
              <label htmlFor="brand">Company / Brand</label>

              <input
                id="brand"
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                maxLength={150}
                autoComplete="organization"
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
              required
              maxLength={3000}
              rows={6}
            />
          </div>

          <input
            className="contact-form__honeypot"
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div
            className="contact-form__turnstile"
            ref={turnstileContainerRef}
          />

          <div className="contact-form__bottom">
            <div className="contact-form__status">
              {status === "success" && (
                <motion.p
                  className="contact-form__success"
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                >
                  Thank you! Your inquiry has been sent successfully.
                </motion.p>
              )}

              {status === "error" && (
                <motion.p
                  className="contact-form__error"
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                >
                  Please complete the verification and try again.
                </motion.p>
              )}
            </div>

            <button
              className="contact-form__submit"
              type="submit"
              disabled={status === "sending"}
            >
              <span>
                {status === "sending" ? "Sending..." : "Send inquiry"}
              </span>

              <span className="contact-form__arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          </div>
        </motion.form>
      </div>

      <div className="contact__footer">
        <p>© 2026 Anastasia Paskaleva</p>

        <a href="#top" className="contact__back-top" aria-label="Back to top">
          Back to top
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </section>
  );
}
