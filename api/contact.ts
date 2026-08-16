import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 120;
const MAX_BRAND_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 2000;

interface ContactRequest {
  name?: unknown;
  email?: unknown;
  brand?: unknown;
  projectType?: unknown;
  message?: unknown;
  website?: unknown;
}

const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const escapeHtml = (value: string) => {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

export default {
  async fetch(request: Request) {
    if (request.method !== "POST") {
      return Response.json(
        {
          message: "Method not allowed.",
        },
        {
          status: 405,
        },
      );
    }

    try {
      const body = (await request.json()) as ContactRequest;

      const { name, email, brand, projectType, message, website } = body;

      /*
       * Honeypot.
       * Real users never see this field.
       * Basic bots often fill it automatically.
       */
      if (isString(website) && website.trim() !== "") {
        return Response.json({
          message: "Message sent successfully.",
        });
      }

      if (
        !isString(name) ||
        !isString(email) ||
        !isString(projectType) ||
        !isString(message)
      ) {
        return Response.json(
          {
            message: "Please complete all required fields.",
          },
          {
            status: 400,
          },
        );
      }

      const cleanName = name.trim();
      const cleanEmail = email.trim().toLowerCase();
      const cleanBrand = isString(brand) ? brand.trim() : "";
      const cleanProjectType = projectType.trim();
      const cleanMessage = message.trim();

      if (cleanName.length < 2 || cleanName.length > MAX_NAME_LENGTH) {
        return Response.json(
          {
            message: "Please enter a valid name.",
          },
          {
            status: 400,
          },
        );
      }

      if (cleanEmail.length > MAX_EMAIL_LENGTH || !isValidEmail(cleanEmail)) {
        return Response.json(
          {
            message: "Please enter a valid email address.",
          },
          {
            status: 400,
          },
        );
      }

      if (cleanBrand.length > MAX_BRAND_LENGTH) {
        return Response.json(
          {
            message: "Company or brand name is too long.",
          },
          {
            status: 400,
          },
        );
      }

      if (
        cleanMessage.length < 10 ||
        cleanMessage.length > MAX_MESSAGE_LENGTH
      ) {
        return Response.json(
          {
            message: "Your message must be between 10 and 2000 characters.",
          },
          {
            status: 400,
          },
        );
      }

      const allowedProjectTypes = [
        "video-editing",
        "graphic-design",
        "ugc",
        "social-media",
        "other",
      ];

      if (!allowedProjectTypes.includes(cleanProjectType)) {
        return Response.json(
          {
            message: "Please select a valid project type.",
          },
          {
            status: 400,
          },
        );
      }

      if (!process.env.CONTACT_EMAIL) {
        console.error("CONTACT_EMAIL is missing.");

        return Response.json(
          {
            message: "Contact service is temporarily unavailable.",
          },
          {
            status: 500,
          },
        );
      }

      const safeName = escapeHtml(cleanName);
      const safeEmail = escapeHtml(cleanEmail);
      const safeBrand = escapeHtml(cleanBrand || "Not provided");
      const safeProjectType = escapeHtml(cleanProjectType);
      const safeMessage = escapeHtml(cleanMessage).replaceAll("\n", "<br />");

      const { error } = await resend.emails.send({
        /*
         * Temporary sender while developing.
         * We'll replace this with Anastasia's verified domain.
         */
        from: "Anastasia Portfolio <onboarding@resend.dev>",

        to: [process.env.CONTACT_EMAIL],

        replyTo: cleanEmail,

        subject: `New portfolio inquiry from ${cleanName}`,

        html: `
          <div
            style="
              max-width: 640px;
              margin: 0 auto;
              padding: 40px;
              font-family: Arial, Helvetica, sans-serif;
              color: #181714;
              background: #f3efe8;
            "
          >
            <p
              style="
                margin: 0 0 40px;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 2px;
              "
            >
              Anastasia Paskaleva · Portfolio Inquiry
            </p>

            <h1
              style="
                margin: 0 0 40px;
                font-size: 38px;
                font-weight: 400;
                line-height: 1.1;
              "
            >
              New project inquiry
            </h1>

            <table
              style="
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 40px;
              "
            >
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #d2cdc5;">
                  <strong>Name</strong>
                </td>

                <td
                  style="
                    padding: 12px 0;
                    border-bottom: 1px solid #d2cdc5;
                    text-align: right;
                  "
                >
                  ${safeName}
                </td>
              </tr>

              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #d2cdc5;">
                  <strong>Email</strong>
                </td>

                <td
                  style="
                    padding: 12px 0;
                    border-bottom: 1px solid #d2cdc5;
                    text-align: right;
                  "
                >
                  ${safeEmail}
                </td>
              </tr>

              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #d2cdc5;">
                  <strong>Brand</strong>
                </td>

                <td
                  style="
                    padding: 12px 0;
                    border-bottom: 1px solid #d2cdc5;
                    text-align: right;
                  "
                >
                  ${safeBrand}
                </td>
              </tr>

              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #d2cdc5;">
                  <strong>Project</strong>
                </td>

                <td
                  style="
                    padding: 12px 0;
                    border-bottom: 1px solid #d2cdc5;
                    text-align: right;
                  "
                >
                  ${safeProjectType}
                </td>
              </tr>
            </table>

            <p
              style="
                margin: 0 0 12px;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 2px;
              "
            >
              Message
            </p>

            <div
              style="
                font-size: 16px;
                line-height: 1.7;
              "
            >
              ${safeMessage}
            </div>
          </div>
        `,
      });

      if (error) {
        console.error("Resend error:", error);

        return Response.json(
          {
            message: "Your message could not be sent. Please try again.",
          },
          {
            status: 500,
          },
        );
      }

      return Response.json({
        message: "Message sent successfully.",
      });
    } catch (error) {
      console.error("Contact API error:", error);

      return Response.json(
        {
          message: "Something went wrong. Please try again.",
        },
        {
          status: 500,
        },
      );
    }
  },
};
