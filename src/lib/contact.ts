import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z.string().trim().min(1, "Completează numele.").max(120),
  email: z
    .string()
    .trim()
    .email("Completează un e-mail valid.")
    .max(255)
    .transform((value) => value.toLowerCase()),
  message: z.string().trim().min(1, "Scrie mesajul.").max(2000),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
