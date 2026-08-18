import { Resend } from "resend";

const allowedProjectTypes = [
  "video-editing",
  "graphic-design",
  "ugc",
  "social-media",
  "other",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default {
  async fetch(request: Request) {
    if (request.method !== "POST") {
      return Response.json(
        {
          success: false,
          error: "Method not allowed.",
        },
        {
          status: 405,
        }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!resendApiKey || !contactEmail) {
      console.error("Missing server environment variables.");

      return Response.json(
        {
          success: false,
          error: "Server configuration error.",
        },
        {
          status: 500,
        }
      );
    }

    const resend = new Resend(resendApiKey);

    try {
      const body = (await request.json()) as {
        name?: unknown;
        email?: unknown;
        brand?: unknown;
        projectType?: unknown;
        message?: unknown;
        website?: unknown;
      };

      const {
        name,
        email,
        brand,
        projectType,
        message,
        website,
      } = body;

      // Honeypot
      if (
        typeof website === "string" &&
        website.trim() !== ""
      ) {
        return Response.json(
          {
            success: true,
            message: "Inquiry sent successfully.",
          },
          {
            status: 200,
          }
        );
      }

      if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof projectType !== "string" ||
        typeof message !== "string"
      ) {
        return Response.json(
          {
            success: false,
            error: "Please complete all required fields.",
          },
          {
            status: 400,
          }
        );
      }

      const cleanName = name.trim();
      const cleanEmail = email.trim().toLowerCase();

      const cleanBrand =
        typeof brand === "string" ? brand.trim() : "";

      const cleanProjectType = projectType.trim();
      const cleanMessage = message.trim();

      if (
        !cleanName ||
        !cleanEmail ||
        !cleanProjectType ||
        !cleanMessage
      ) {
        return Response.json(
          {
            success: false,
            error: "Please complete all required fields.",
          },
          {
            status: 400,
          }
        );
      }

      if (cleanName.length > 100) {
        return Response.json(
          {
            success: false,
            error: "Name is too long.",
          },
          {
            status: 400,
          }
        );
      }

      if (
        cleanEmail.length > 150 ||
        !emailRegex.test(cleanEmail)
      ) {
        return Response.json(
          {
            success: false,
            error: "Please enter a valid email address.",
          },
          {
            status: 400,
          }
        );
      }

      if (cleanBrand.length > 150) {
        return Response.json(
          {
            success: false,
            error: "Company or brand name is too long.",
          },
          {
            status: 400,
          }
        );
      }

      if (
        !allowedProjectTypes.includes(cleanProjectType)
      ) {
        return Response.json(
          {
            success: false,
            error: "Please select a valid project type.",
          },
          {
            status: 400,
          }
        );
      }

      if (cleanMessage.length > 3000) {
        return Response.json(
          {
            success: false,
            error: "Message is too long.",
          },
          {
            status: 400,
          }
        );
      }

      const projectTypeLabels: Record<string, string> = {
        "video-editing": "Video Editing",
        "graphic-design": "Graphic Design",
        ugc: "UGC Creation",
        "social-media": "Social Media Management",
        other: "Other",
      };

      const projectLabel =
        projectTypeLabels[cleanProjectType] ||
        cleanProjectType;

      const { data, error } =
        await resend.emails.send({
          from: "Anastasia Portfolio <onboarding@resend.dev>",
          to: [contactEmail],
          replyTo: cleanEmail,
          subject: `New portfolio inquiry from ${cleanName}`,

          html: `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0"
                />
                <title>New Portfolio Inquiry</title>
              </head>

              <body
                style="
                  margin: 0;
                  padding: 0;
                  background-color: #f3efe8;
                  font-family: Arial, Helvetica, sans-serif;
                  color: #181714;
                "
              >
                <div
                  style="
                    width: 100%;
                    padding: 40px 20px;
                    box-sizing: border-box;
                  "
                >
                  <div
                    style="
                      max-width: 620px;
                      margin: 0 auto;
                      background-color: #ffffff;
                      padding: 40px;
                      border-radius: 16px;
                      box-sizing: border-box;
                    "
                  >
                    <p
                      style="
                        margin: 0 0 12px;
                        font-size: 12px;
                        text-transform: uppercase;
                        letter-spacing: 0.16em;
                        opacity: 0.55;
                      "
                    >
                      Anastasia Portfolio
                    </p>

                    <h1
                      style="
                        margin: 0 0 32px;
                        font-size: 32px;
                        line-height: 1.1;
                        font-weight: 500;
                      "
                    >
                      New inquiry
                    </h1>

                    <div
                      style="
                        border-top: 1px solid #dedbd5;
                        padding-top: 24px;
                      "
                    >
                      <p style="margin: 0 0 18px;">
                        <strong>Name</strong><br />
                        ${escapeHtml(cleanName)}
                      </p>

                      <p style="margin: 0 0 18px;">
                        <strong>Email</strong><br />
                        ${escapeHtml(cleanEmail)}
                      </p>

                      <p style="margin: 0 0 18px;">
                        <strong>
                          Company / Brand
                        </strong>
                        <br />

                        ${
                          cleanBrand
                            ? escapeHtml(cleanBrand)
                            : "Not provided"
                        }
                      </p>

                      <p style="margin: 0 0 18px;">
                        <strong>Project type</strong><br />
                        ${escapeHtml(projectLabel)}
                      </p>

                      <p style="margin: 0 0 8px;">
                        <strong>Message</strong>
                      </p>

                      <div
                        style="
                          font-size: 15px;
                          line-height: 1.7;
                          white-space: pre-wrap;
                        "
                      >${escapeHtml(cleanMessage)}</div>
                    </div>
                  </div>
                </div>
              </body>
            </html>
          `,
        });

      if (error) {
        console.error(
          "[Resend API Error]:",
          error
        );

        return Response.json(
          {
            success: false,
            error:
              "Unable to send your inquiry. Please try again.",
          },
          {
            status: 500,
          }
        );
      }

      console.log(
        "Contact email sent:",
        data?.id
      );

      return Response.json(
        {
          success: true,
          message: "Inquiry sent successfully.",
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error(
        "Contact API error:",
        error
      );

      return Response.json(
        {
          success: false,
          error: "An unexpected error occurred.",
        },
        {
          status: 500,
        }
      );
    }
  },
};