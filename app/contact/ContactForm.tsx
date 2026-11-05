"use client";

import { useActionState, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sendEnquiry, type ContactState } from "./actions";

const kinds = ["Portrait", "Editorial", "Bridal", "Something else"] as const;
const ease = [0.16, 1, 0.3, 1] as const;

export default function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendEnquiry, { status: "idle" });
  const [kind, setKind] = useState<(typeof kinds)[number]>("Portrait");
  const errors = state.status === "error" ? state.errors : {};
  const values = state.status === "error" ? state.values : {};

  return (
    <AnimatePresence mode="wait">
      {state.status === "sent" ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="flex min-h-[28rem] flex-col justify-end border-t border-line pt-8"
        >
          <p className="label mb-6 text-mute">Received</p>
          <p className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.04em]">
            Thank you, {state.name}. <span className="accent">We&apos;ll write back</span> within two days.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          action={action}
          exit={{ opacity: 0, y: -16, transition: { duration: 0.4 } }}
          className="space-y-10"
          noValidate
        >
          <fieldset>
            <legend className="label mb-4 text-mute">What are we making?</legend>
            <input type="hidden" name="kind" value={kind} />
            <div className="flex flex-wrap gap-2">
              {kinds.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKind(k)}
                  aria-pressed={kind === k}
                  className="relative rounded-full border border-line px-4 py-2 text-sm transition-colors aria-pressed:text-paper"
                >
                  {kind === k && (
                    <motion.span
                      layoutId="kind-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{k}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-10 sm:grid-cols-2">
            <Field name="name" defaultValue={values.name} label="Your name" autoComplete="name" error={errors.name} />
            <Field name="email" defaultValue={values.email} label="Email" type="email" autoComplete="email" error={errors.email} />
          </div>
          <Field name="when" defaultValue={values.when} label="Roughly when? (optional)" placeholder="March, a Saturday, flexible…" error={errors.when} />
          <Field name="message" defaultValue={values.message} label="Tell us about it" textarea error={errors.message} />

          <button
            type="submit"
            disabled={pending}
            className="group flex w-full items-center justify-between border-t border-ink pt-5 text-[clamp(1.5rem,3vw,2.5rem)] tracking-[-0.03em] disabled:opacity-50"
          >
            {pending ? "Sending…" : "Send enquiry"}
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">→</span>
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  name,
  label,
  error,
  textarea,
  ...rest
}: {
  name: string;
  label: string;
  error?: string;
  textarea?: boolean;
  defaultValue?: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  const id = `f-${name}`;
  const cls =
    "peer w-full border-b border-line bg-transparent pb-3 pt-1 text-lg outline-none transition-colors placeholder:text-mute/60 focus:border-ink";

  return (
    <div>
      <label htmlFor={id} className="label mb-2 block text-mute">
        {label}
      </label>
      {textarea ? (
        <textarea id={id} name={name} rows={4} aria-invalid={!!error} className={`${cls} resize-none`} {...rest} />
      ) : (
        <input id={id} name={name} aria-invalid={!!error} className={cls} {...rest} />
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="label mt-2 text-[#9b3b2a]"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
