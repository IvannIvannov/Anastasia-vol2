import { useEffect, useRef, useState } from "react";

import type { ChangeEvent, SubmitEvent } from "react";

import { motion } from "motion/react";

import "./Contact.css";

type FormStatus = "idle" | "sending" | "success" | "error";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
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
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  website: "",
};

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    ...initialFormData,
  });

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

      try {
        const widgetId = window.turnstile.render(
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

        turnstileWidgetIdRef.current = widgetId;
      } catch (error) {
        console.error("Unable to render Turnstile:", error);
      }
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

        const widgetId = turnstileWidgetIdRef.current;

        if (widgetId && window.turnstile) {
          try {
            window.turnstile.remove(widgetId);
          } catch {
            // Widget may already be removed.
          }
        }

        turnstileWidgetIdRef.current = null;
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

      const widgetId = turnstileWidgetIdRef.current;

      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          // Widget may already be removed.
        }
      }

      turnstileWidgetIdRef.current = null;
    };
  }, []);

  const resetTurnstile = () => {
    const widgetId = turnstileWidgetIdRef.current;

    if (!widgetId || !window.turnstile) {
      setTurnstileToken("");
      return;
    }

    try {
      window.turnstile.reset(widgetId);
    } catch (error) {
      console.warn("Turnstile widget could not be reset:", error);

      turnstileWidgetIdRef.current = null;
    }

    setTurnstileToken("");
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
          name: `${formData.firstName} ${formData.lastName}`.trim(),

          email: formData.email,

          brand: formData.phone,

          projectType: "other",

          message: `Subject: ${formData.subject}\n\n${formData.message}`,

          website: formData.website,

          turnstileToken,
        }),
      });

      let data: {
        success?: boolean;
        error?: string;
      } = {};

      try {
        data = await response.json();
      } catch {
        // Invalid API response.
      }

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setFormData({
        ...initialFormData,
      });

      setStatus("success");

      resetTurnstile();
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus("error");

      resetTurnstile();
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__header">
        <p className="contact__label">Contact</p>

        <span className="contact__number">05</span>
      </div>

      <motion.div
        className="contact__content"
        initial={{
          opacity: 0,
          y: 35,
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
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span className="contact__eyebrow">Start a conversation</span>

        <h2 className="contact__title">Get in touch</h2>

        <p className="contact__subtitle">
          Have a project, collaboration or idea in mind? I&apos;d love to hear
          about it.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form__row">
            <div className="contact-form__field">
              <label htmlFor="firstName">First name *</label>

              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName ?? ""}
                onChange={handleChange}
                required
                maxLength={60}
                autoComplete="given-name"
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="lastName">Last name *</label>

              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName ?? ""}
                onChange={handleChange}
                required
                maxLength={60}
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="contact-form__row">
            <div className="contact-form__field">
              <label htmlFor="email">Email address *</label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email ?? ""}
                onChange={handleChange}
                required
                maxLength={150}
                autoComplete="email"
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="phone">Phone number</label>

              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone ?? ""}
                onChange={handleChange}
                maxLength={30}
                autoComplete="tel"
              />
            </div>
          </div>

          <div className="contact-form__field">
            <label htmlFor="subject">What is your inquiry about? *</label>

            <input
              id="subject"
              type="text"
              name="subject"
              value={formData.subject ?? ""}
              onChange={handleChange}
              required
              maxLength={150}
            />
          </div>

          <div className="contact-form__field">
            <label htmlFor="message">Your message *</label>

            <textarea
              id="message"
              name="message"
              value={formData.message ?? ""}
              onChange={handleChange}
              required
              maxLength={3000}
              rows={7}
            />
          </div>

          {/* Honeypot */}
          <input
            className="contact-form__honeypot"
            type="text"
            name="website"
            value={formData.website ?? ""}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Cloudflare Turnstile */}
          <div
            className="contact-form__turnstile"
            ref={turnstileContainerRef}
          />

          <button
            className="contact-form__submit"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>

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
                Thank you! Your message has been sent successfully.
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
        </form>
      </motion.div>

      <div className="contact__footer">
        <p>© 2026 Anastasia Paskaleva</p>

        <a href="#top" className="contact__back-top">
          Back to top
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </section>
  );
};

export default Contact;
