import { useEffect, useRef, useState } from "react";

import type { ChangeEvent, SubmitEvent } from "react";

import useRevealOnScroll from "../../hooks/useRevealOnScroll";

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

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
  verification?: string;
}

interface TurnstileInstance {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      theme?: "light" | "dark" | "auto";
      size?: "normal" | "compact" | "flexible";
      appearance?: "always" | "execute" | "interaction-only";
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

const emailRegex =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

const isValidEmail = (email: string) => {
  const cleanEmail = email.trim();

  if (!emailRegex.test(cleanEmail)) {
    return false;
  }

  const atCount = (cleanEmail.match(/@/g) ?? []).length;

  if (atCount !== 1) {
    return false;
  }

  if (
    cleanEmail.includes("..") ||
    cleanEmail.startsWith(".") ||
    cleanEmail.endsWith(".")
  ) {
    return false;
  }

  const [localPart, domain] = cleanEmail.split("@");

  if (!localPart || !domain) {
    return false;
  }

  if (domain.startsWith("-") || domain.endsWith("-")) {
    return false;
  }

  return true;
};

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    ...initialFormData,
  });

  const [status, setStatus] = useState<FormStatus>("idle");

  const [errors, setErrors] = useState<FormErrors>({});

  const [turnstileToken, setTurnstileToken] = useState("");

  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);

  const turnstileWidgetIdRef = useRef<string | null>(null);

  useRevealOnScroll({
    selector: ".contact .fade-up",
    threshold: 0.12,
  });

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
            appearance: "interaction-only",

            callback: (token) => {
              setTurnstileToken(token);

              setErrors((prev) => ({
                ...prev,
                verification: undefined,
              }));
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

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    if (status === "success" || status === "error") {
      setStatus("idle");
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Please enter your first name.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Please enter your last name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Please tell me what your inquiry is about.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    }

    if (!turnstileToken) {
      newErrors.verification = "Please complete the verification.";
    }

    setErrors(newErrors);

    return newErrors;
  };

  const focusFirstError = (validationErrors: FormErrors) => {
    const fieldOrder: Array<keyof FormErrors> = [
      "firstName",
      "lastName",
      "email",
      "subject",
      "message",
    ];

    const firstInvalidField = fieldOrder.find(
      (field) => validationErrors[field],
    );

    if (firstInvalidField) {
      document.getElementById(firstInvalidField)?.focus();

      return;
    }

    if (validationErrors.verification) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      turnstileContainerRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "center",
      });
    }
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "sending") {
      return;
    }

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setStatus("idle");

      window.setTimeout(() => {
        focusFirstError(validationErrors);
      }, 0);

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

          email: formData.email.trim(),

          brand: formData.phone.trim(),

          projectType: "other",

          message: `Subject: ${formData.subject.trim()}\n\n${formData.message.trim()}`,

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

      setErrors({});

      setStatus("success");

      resetTurnstile();
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus("error");

      resetTurnstile();
    }
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__header fade-up">
        <p className="contact__label">Contact</p>
      </div>

      <div className="contact__content">
        <div className="contact__intro fade-up">
          <span className="contact__eyebrow">Start a conversation</span>

          <h2 id="contact-title" className="contact__title">
            Get in touch
          </h2>

          <p id="contact-description" className="contact__subtitle">
            Have a project, collaboration or idea in mind? I&apos;d love to hear
            about it.
          </p>
        </div>

        <form
          className="contact-form fade-up"
          onSubmit={handleSubmit}
          noValidate
          aria-labelledby="contact-title"
          aria-describedby="contact-description"
        >
          <div className="contact-form__row">
            <div
              className={`contact-form__field ${
                errors.firstName ? "contact-form__field--error" : ""
              }`}
            >
              <label htmlFor="firstName">First name *</label>

              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName ?? ""}
                onChange={handleChange}
                maxLength={60}
                autoComplete="given-name"
                required
                aria-invalid={Boolean(errors.firstName)}
                aria-describedby={
                  errors.firstName ? "firstName-error" : undefined
                }
              />

              {errors.firstName && (
                <p id="firstName-error" className="contact-form__field-error">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div
              className={`contact-form__field ${
                errors.lastName ? "contact-form__field--error" : ""
              }`}
            >
              <label htmlFor="lastName">Last name *</label>

              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName ?? ""}
                onChange={handleChange}
                maxLength={60}
                autoComplete="family-name"
                required
                aria-invalid={Boolean(errors.lastName)}
                aria-describedby={
                  errors.lastName ? "lastName-error" : undefined
                }
              />

              {errors.lastName && (
                <p id="lastName-error" className="contact-form__field-error">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="contact-form__row">
            <div
              className={`contact-form__field ${
                errors.email ? "contact-form__field--error" : ""
              }`}
            >
              <label htmlFor="email">Email address *</label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email ?? ""}
                onChange={handleChange}
                maxLength={150}
                autoComplete="email"
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />

              {errors.email && (
                <p id="email-error" className="contact-form__field-error">
                  {errors.email}
                </p>
              )}
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

          <div
            className={`contact-form__field ${
              errors.subject ? "contact-form__field--error" : ""
            }`}
          >
            <label htmlFor="subject">What is your inquiry about? *</label>

            <input
              id="subject"
              type="text"
              name="subject"
              value={formData.subject ?? ""}
              onChange={handleChange}
              maxLength={150}
              required
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? "subject-error" : undefined}
            />

            {errors.subject && (
              <p id="subject-error" className="contact-form__field-error">
                {errors.subject}
              </p>
            )}
          </div>

          <div
            className={`contact-form__field ${
              errors.message ? "contact-form__field--error" : ""
            }`}
          >
            <label htmlFor="message">Your message *</label>

            <textarea
              id="message"
              name="message"
              value={formData.message ?? ""}
              onChange={handleChange}
              maxLength={3000}
              rows={7}
              required
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
            />

            {errors.message && (
              <p id="message-error" className="contact-form__field-error">
                {errors.message}
              </p>
            )}
          </div>

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

          <div className="contact-form__turnstile-wrapper">
            <div
              className="contact-form__turnstile"
              ref={turnstileContainerRef}
              aria-describedby={
                errors.verification ? "verification-error" : undefined
              }
            />

            {errors.verification && (
              <p
                id="verification-error"
                className="contact-form__field-error contact-form__verification-error"
              >
                {errors.verification}
              </p>
            )}
          </div>

          <button
            className="contact-form__submit"
            type="submit"
            disabled={status === "sending"}
            aria-busy={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>

          <div
            className="contact-form__status"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {status === "success" && (
              <p className="contact-form__success">
                Thank you! Your message has been sent successfully.
              </p>
            )}

            {status === "error" && (
              <p className="contact-form__error">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
