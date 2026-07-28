import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Divider } from "@/components/el-gallo-ornaments";

export const Route = createFileRoute("/consent")({
  head: () => ({
    meta: [
      { title: "Consent Form — Tattoos By El Gallo" },
      {
        name: "description",
        content:
          "Sign the tattoo consent and release form for your appointment with El Gallo. Required before every session.",
      },
      { property: "og:title", content: "Consent Form — Tattoos By El Gallo" },
      {
        property: "og:description",
        content: "Sign the tattoo consent and release form before your appointment with El Gallo.",
      },
    ],
  }),
  component: ConsentPage,
});

type Status = "idle" | "submitting" | "success" | "error";

function ConsentPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  const today = new Date().toISOString().slice(0, 10);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = {};
    fd.forEach((v, k) => {
      if (typeof v === "string") payload[k] = v;
    });
    // Convert checkbox presence to booleans
    const ackKeys = [
      "ackAge",
      "ackSober",
      "ackNotPregnant",
      "ackNoConditions",
      "ackAftercare",
      "ackPermanent",
      "ackHealing",
      "ackPhotos",
      "ackRelease",
    ];
    ackKeys.forEach((k) => {
      payload[k] = fd.get(k) === "on";
    });

    try {
      const res = await fetch("/api/public/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Submission failed. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <main className="min-h-screen text-ink">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h1 className="font-display text-5xl text-blood">Consent Received</h1>
          <Divider className="my-8" />
          <p className="font-sans text-lg">
            Thanks — your signed consent form has been sent to the shop. We'll see you at your appointment. If anything changes, reach out directly.
          </p>
          <a
            href="/"
            className="mt-10 inline-block border-2 border-ink px-6 py-3 font-sans text-sm uppercase tracking-[0.2em] hover:bg-ink hover:text-cream"
          >
            Back to Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-ink">
      <header className="border-b-2 border-blood/70">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <a href="/" className="font-display text-2xl">
            El <span className="text-blood italic">Gallo</span>
          </a>
          <a
            href="/"
            className="font-sans text-xs uppercase tracking-[0.2em] hover:text-blood"
          >
            ← Home
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="relative border-2 sm:border-4 border-double border-blood/80 p-5 sm:p-8 md:p-12">
          <div className="text-center">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-blood">
              Tattoos By El Gallo
            </p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl">
              Consent & Release Form
            </h1>
            <Divider className="my-6" />
            <p className="mx-auto max-w-xl font-sans text-sm text-ink/80">
              Please complete this form before your appointment. All fields marked with an asterisk are required.
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-10 space-y-10 font-sans">
            <Section title="Client Information">
              <Field label="Full Legal Name *" name="fullName" required />
              <Row>
                <Field label="Date of Birth *" name="dateOfBirth" type="date" required />
                <Field label="Phone" name="phone" type="tel" />
              </Row>
              <Field label="Email *" name="email" type="email" required />
              <Field label="Street Address" name="address" />
              <Row>
                <Field label="City" name="city" />
                <Field label="State" name="state" />
                <Field label="Zip" name="zip" />
              </Row>
              <Row>
                <Field label="Emergency Contact Name" name="emergencyName" />
                <Field label="Emergency Contact Phone" name="emergencyPhone" type="tel" />
              </Row>
            </Section>

            <Section title="Tattoo Details">
              <Field label="Artist" name="artist" defaultValue="El Gallo" />
              <Field label="Placement on Body" name="tattooLocation" placeholder="e.g. right forearm" />
              <TextArea
                label="Description of Design"
                name="tattooDescription"
                placeholder="What are we tattooing today?"
              />
              <TextArea
                label="Medical Conditions, Allergies, or Medications"
                name="medicalConditions"
                placeholder="List anything relevant — diabetes, blood thinners, allergies to latex/ink, etc."
              />
            </Section>

            <Section title="Acknowledgments & Release">
              <p className="text-sm text-ink/70">
                Read each statement carefully. Check the box to confirm.
              </p>
              <div className="space-y-3">
                <Check name="ackAge" required>
                  I am at least <strong>18 years of age</strong> and can provide valid government-issued photo identification upon request.
                </Check>
                <Check name="ackSober" required>
                  I am <strong>not under the influence</strong> of alcohol, drugs, or any impairing substance.
                </Check>
                <Check name="ackNotPregnant" required>
                  I am <strong>not pregnant or nursing</strong>.
                </Check>
                <Check name="ackNoConditions" required>
                  I do not have any medical condition (including but not limited to hemophilia, heart condition, diabetes, hepatitis, HIV, or skin disorder) that would prevent me from safely being tattooed, or I have disclosed such conditions above.
                </Check>
                <Check name="ackAftercare" required>
                  I have received and understand the <strong>aftercare instructions</strong>, and I accept full responsibility for the care of my tattoo after leaving the studio.
                </Check>
                <Check name="ackPermanent" required>
                  I understand that a tattoo is a <strong>permanent modification</strong> of my skin, and that removal, if desired later, may be costly, painful, and imperfect.
                </Check>
                <Check name="ackHealing" required>
                  I understand that <strong>healing varies</strong> by individual and that the final appearance of my tattoo — including color saturation, line clarity, and touch-up needs — is not guaranteed.
                </Check>
                <Check name="ackPhotos">
                  I <strong>consent to photographs</strong> of my tattoo being used for portfolio, social media, and promotional purposes. (Optional)
                </Check>
                <Check name="ackRelease" required>
                  I hereby <strong>release, discharge, and hold harmless</strong> the artist, El Gallo, and the studio, its owners, employees, and agents from any and all claims, liabilities, damages, or causes of action arising from or related to this tattoo procedure.
                </Check>
              </div>
            </Section>

            <Section title="Signature">
              <p className="text-sm text-ink/70">
                By typing your full name below, you are signing this document electronically and agreeing that your electronic signature is the legal equivalent of a handwritten signature.
              </p>
              <Row>
                <Field label="Typed Signature *" name="signature" required placeholder="Type your full legal name" />
                <Field label="Date *" name="signedDate" type="date" required defaultValue={today} />
              </Row>
            </Section>

            {status === "error" && (
              <p className="border-2 border-blood bg-blood/5 p-4 text-sm text-blood">
                {error}
              </p>
            )}

            <div className="flex flex-col items-center gap-4 border-t-2 border-ink/20 pt-8">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="border-2 border-blood bg-blood px-10 py-4 font-sans text-sm uppercase tracking-[0.25em] text-cream transition hover:bg-ink hover:border-ink disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Submit Consent Form"}
              </button>
              <p className="text-xs text-ink/60">
                A copy will be emailed directly to the shop.
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl text-blood">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-[0.18em] text-ink/70">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full border-b-2 border-ink/40 bg-transparent py-2 text-base outline-none focus:border-blood"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-[0.18em] text-ink/70">
        {label}
      </span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={3}
        className="w-full border-2 border-ink/30 bg-cream/40 p-3 text-base outline-none focus:border-blood"
      />
    </label>
  );
}

function Check({
  name,
  children,
  required,
}: {
  name: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="flex items-start gap-3 border border-ink/15 bg-cream/40 p-3 text-sm leading-relaxed hover:border-blood/50">
      <input
        type="checkbox"
        name={name}
        required={required}
        className="mt-1 h-4 w-4 accent-blood"
      />
      <span>{children}</span>
    </label>
  );
}