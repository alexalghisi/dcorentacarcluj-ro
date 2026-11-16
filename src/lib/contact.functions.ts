import { createServerFn } from "@tanstack/react-start";
import { contactMessageSchema } from "./contact";

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input) => contactMessageSchema.parse(input))
  .handler(async ({ data }) => {
    const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
    const templateData = { name: data.name, email: data.email, message: data.message };
    const key = crypto.randomUUID();
    const send = async (name: string, recipient: string, replyTo?: string) => {
      try {
        return (
          await sendTemplateEmail(name, recipient, {
            templateData,
            idempotencyKey: `${name}-${key}`,
            ...(replyTo ? { replyTo } : {}),
          })
        ).sent;
      } catch {
        return false;
      }
    };
    const ownerSent = await send("contact-message-owner", "", data.email);
    if (!ownerSent) {
      return {
        ok: false as const,
        error: "Nu am putut trimite mesajul. Sună la (0742) 925 934.",
      };
    }
    const customerEmailSent = await send("contact-message", data.email);
    return { ok: true as const, customerEmailSent };
  });
