"use server";

import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Tell us your name."),
  email: z.email("That email doesn't look right."),
  kind: z.enum(["Portrait", "Editorial", "Bridal", "Something else"]),
  when: z.string().trim().max(60).optional(),
  message: z.string().trim().min(20, "A couple of sentences helps us reply properly."),
});

export type ContactState =
  | { status: "idle" }
  | {
      status: "error";
      errors: Partial<Record<keyof z.infer<typeof schema>, string>>;
      values: Record<string, string>;
    }
  | { status: "sent"; name: string };

export async function sendEnquiry(_: ContactState, form: FormData): Promise<ContactState> {
  const values = Object.fromEntries([...form].map(([k, v]) => [k, String(v)]));
  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[String(issue.path[0])] ??= issue.message;
    return { status: "error", errors, values };
  }

  const { name, email, kind, when, message } = parsed.data;
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;

  // Delivery is optional so the concept site works without any secrets.
  if (key && to) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Osan <onboarding@resend.dev>",
        to,
        reply_to: email,
        subject: `${kind} enquiry from ${name}`,
        text: `${message}\n\nWhen: ${when || "Flexible"}\nFrom: ${name} <${email}>`,
      }),
    });
    if (!res.ok) {
      return {
        status: "error",
        errors: { message: "Something went wrong sending that. Please try again." },
        values,
      };
    }
  }

  return { status: "sent", name: name.split(" ")[0] };
}
