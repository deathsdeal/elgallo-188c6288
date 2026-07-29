import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const ConsentSchema = z.object({
  fullName: z.string().min(1).max(200),
  dateOfBirth: z.string().min(1).max(50),
  address: z.string().max(500).optional().default(""),
  city: z.string().max(100).optional().default(""),
  state: z.string().max(100).optional().default(""),
  zip: z.string().max(20).optional().default(""),
  phone: z.string().max(50).optional().default(""),
  email: z.string().email().max(200),
  emergencyName: z.string().max(200).optional().default(""),
  emergencyPhone: z.string().max(50).optional().default(""),
  tattooDescription: z.string().max(2000).optional().default(""),
  tattooLocation: z.string().max(200).optional().default(""),
  artist: z.string().max(100).optional().default("El Gallo"),
  ackAge: z.boolean(),
  ackSober: z.boolean(),
  ackNotPregnant: z.boolean(),
  ackNoConditions: z.boolean(),
  ackAftercare: z.boolean(),
  ackPermanent: z.boolean(),
  ackHealing: z.boolean(),
  ackPhotos: z.boolean().optional().default(false),
  ackRelease: z.boolean(),
  medicalConditions: z.string().max(2000).optional().default(""),
  signature: z.string().min(1).max(200),
  signedDate: z.string().min(1).max(50),
});

export const Route = createFileRoute("/api/public/consent")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const json = await request.json();
          const data = ConsentSchema.parse(json);

          const required = [
            data.ackAge,
            data.ackSober,
            data.ackNotPregnant,
            data.ackNoConditions,
            data.ackAftercare,
            data.ackPermanent,
            data.ackHealing,
            data.ackRelease,
          ];
          if (!required.every(Boolean)) {
            return Response.json(
              { error: "All required acknowledgments must be checked." },
              { status: 400 },
            );
          }

          const apiKey = process.env.RESEND_API_KEY;
          if (!apiKey) {
            return Response.json(
              { error: "Email service is not configured." },
              { status: 500 },
            );
          }

          const esc = (s: string) =>
            s
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;");

          const row = (label: string, value: string) =>
            `<tr><td style="padding:6px 12px;border:1px solid #ddd;background:#faf7f0;font-weight:600;width:220px;">${esc(label)}</td><td style="padding:6px 12px;border:1px solid #ddd;">${esc(value || "—")}</td></tr>`;

          const check = (label: string, v: boolean) =>
            `<li style="margin:4px 0;">${v ? "☑" : "☐"} ${esc(label)}</li>`;

          const html = `
<div style="font-family:Georgia,serif;max-width:720px;margin:0 auto;color:#1a1a1a;">
  <h1 style="border-bottom:3px double #7a1a1a;padding-bottom:8px;color:#7a1a1a;">Tattoo Consent & Release Form</h1>
  <p style="color:#555;">Submitted via tattoosbyelgallo.com — ${new Date().toUTCString()}</p>

  <h2 style="color:#7a1a1a;margin-top:24px;">Client Information</h2>
  <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
    ${row("Full Name", data.fullName)}
    ${row("Date of Birth", data.dateOfBirth)}
    ${row("Email", data.email)}
    ${row("Phone", data.phone)}
    ${row("Address", data.address)}
    ${row("City / State / Zip", `${data.city} ${data.state} ${data.zip}`.trim())}
    ${row("Emergency Contact", `${data.emergencyName} — ${data.emergencyPhone}`)}
  </table>

  <h2 style="color:#7a1a1a;margin-top:24px;">Tattoo Details</h2>
  <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
    ${row("Artist", data.artist)}
    ${row("Placement", data.tattooLocation)}
    ${row("Description", data.tattooDescription)}
    ${row("Medical Conditions / Meds", data.medicalConditions)}
  </table>

  <h2 style="color:#7a1a1a;margin-top:24px;">Acknowledgments</h2>
  <ul style="font-family:Arial,sans-serif;font-size:14px;list-style:none;padding-left:0;">
    ${check("I am at least 18 years of age and have provided valid ID.", data.ackAge)}
    ${check("I am not under the influence of alcohol or drugs.", data.ackSober)}
    ${check("I am not pregnant or nursing.", data.ackNotPregnant)}
    ${check("I do not have any medical conditions that would prevent me from being tattooed (or have disclosed them above).", data.ackNoConditions)}
    ${check("I have received and understand aftercare instructions.", data.ackAftercare)}
    ${check("I understand a tattoo is a permanent modification of my skin.", data.ackPermanent)}
    ${check("I understand healing varies and results are not guaranteed.", data.ackHealing)}
    ${check("I consent to photographs of my tattoo being used for portfolio/promotional purposes.", data.ackPhotos)}
    ${check("I release the artist and studio from all liability related to this procedure.", data.ackRelease)}
  </ul>

  <h2 style="color:#7a1a1a;margin-top:24px;">Signature</h2>
  <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
    ${row("Signed (typed)", data.signature)}
    ${row("Date", data.signedDate)}
  </table>

  <p style="margin-top:24px;font-size:12px;color:#666;">This consent was submitted electronically. The typed signature above serves as the client's legally binding signature under applicable electronic signature laws.</p>
</div>`;

          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              from: "El Gallo Consent <website@send.wytacticaltech.com>",
              to: ["tattoo@wytacticaltech.com"],
              reply_to: data.email,
              subject: `Tattoo Consent — ${data.fullName}`,
              html,
            }),
          });

          if (!res.ok) {
            const body = await res.text();
            console.error(`Resend failed [${res.status}]: ${body}`);
            let message = `Email failed (${res.status}).`;
            try {
              const parsed = JSON.parse(body) as { message?: string };
              if (parsed.message) message = parsed.message;
            } catch {
              // ignore
            }
            return Response.json(
              { error: message },
              { status: 502 },
            );
          }

          return Response.json({ ok: true });
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Invalid request";
          return Response.json({ error: msg }, { status: 400 });
        }
      },
    },
  },
});