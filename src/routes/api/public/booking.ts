import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const BookingSchema = z.object({
  name: z.string().min(1).max(200),
  phone: z.string().min(1).max(200),
  email: z.string().max(200).optional().default(""),
  placement: z.string().max(200).optional().default(""),
  size: z.string().max(200).optional().default(""),
  idea: z.string().max(2000).optional().default(""),
});

export const Route = createFileRoute("/api/public/booking")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const json = await request.json();
          const data = BookingSchema.parse(json);

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

          const html = `
<div style="font-family:Georgia,serif;max-width:720px;margin:0 auto;color:#1a1a1a;">
  <h1 style="border-bottom:3px double #7a1a1a;padding-bottom:8px;color:#7a1a1a;">Tattoo Booking Request</h1>
  <p style="color:#555;">Submitted via tattoosbyelgallo.com — ${new Date().toUTCString()}</p>

  <h2 style="color:#7a1a1a;margin-top:24px;">Client Request</h2>
  <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
    ${row("Name", data.name)}
    ${row("Phone / Email", data.contact)}
    ${row("Placement", data.placement)}
    ${row("Approx. Size", data.size)}
    ${row("Idea / Description", data.idea)}
  </table>

  <p style="margin-top:24px;font-size:12px;color:#666;">This request was submitted through the website booking form.</p>
</div>`;

          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              from: "El Gallo Booking <website@send.wytacticaltech.com>",
              to: ["tattoo@wytacticaltech.com"],
              reply_to: data.contact.includes("@") ? data.contact : undefined,
              subject: `Tattoo Booking Request — ${data.name}`,
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
            return Response.json({ error: message }, { status: 502 });
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
