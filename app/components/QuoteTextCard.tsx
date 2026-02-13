"use client";

import { useMemo, useState } from "react";
import PhoneActionButton from "./PhoneActionButton";

type QuoteFields = {
  name: string;
  address: string;
  propertyType: "Residential" | "Storefront" | "";
  windows: string;
  timing: string;
  notes: string;
};

const buildSmsBody = (fields: QuoteFields) => {
  const lines = [
    "QUOTE - Hi! I'd like a window cleaning quote.",
    `Name: ${fields.name}`,
    `Address/Area: ${fields.address}`,
    `Residential or Storefront: ${fields.propertyType}`,
    `Approx # of windows: ${fields.windows}`,
    `Preferred day/time: ${fields.timing}`,
    `Photos/notes: ${fields.notes}`,
  ];

  return lines.join("\n");
};

export default function QuoteTextCard() {
  const [fields, setFields] = useState<QuoteFields>({
    name: "",
    address: "",
    propertyType: "Residential",
    windows: "",
    timing: "",
    notes: "",
  });

  const smsBody = useMemo(() => buildSmsBody(fields), [fields]);

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Text me for a quote</h2>
          <p className="mt-1 text-sm text-zinc-800 font-medium">
            Fill this in and tap send. Your phone opens a pre-filled text to my number.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        <label className="grid gap-1 text-sm font-semibold text-zinc-800">
          Your name
          <input
            value={fields.name}
            onChange={(event) => setFields((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Full name"
            className="rounded-xl border border-line-strong px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm focus:border-line-strong focus:outline-none focus:ring-2 focus:ring-line-soft"
          />
        </label>

        <label className="grid gap-1 text-sm font-semibold text-zinc-800">
          Address or area
          <input
            value={fields.address}
            onChange={(event) => setFields((prev) => ({ ...prev, address: event.target.value }))}
            placeholder="Street address or neighborhood"
            className="rounded-xl border border-line-strong px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm focus:border-line-strong focus:outline-none focus:ring-2 focus:ring-line-soft"
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1 text-sm font-semibold text-zinc-800">
            Property type
            <select
              value={fields.propertyType}
              onChange={(event) =>
                setFields((prev) => ({
                  ...prev,
                  propertyType: event.target.value as QuoteFields["propertyType"],
                }))
              }
              className="rounded-xl border border-line-strong bg-white px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm focus:border-line-strong focus:outline-none focus:ring-2 focus:ring-line-soft"
            >
              <option value="Residential">Residential</option>
              <option value="Storefront">Storefront</option>
            </select>
          </label>

          <label className="grid gap-1 text-sm font-semibold text-zinc-800">
            Approx # of windows
            <input
              value={fields.windows}
              onChange={(event) => setFields((prev) => ({ ...prev, windows: event.target.value }))}
              placeholder="Ex: 12"
              className="rounded-xl border border-line-strong px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm focus:border-line-strong focus:outline-none focus:ring-2 focus:ring-line-soft"
            />
          </label>
        </div>

        <label className="grid gap-1 text-sm font-semibold text-zinc-800">
          Preferred day/time
          <input
            value={fields.timing}
            onChange={(event) => setFields((prev) => ({ ...prev, timing: event.target.value }))}
            placeholder="Ex: Tue after 4pm"
            className="rounded-xl border border-line-strong px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm focus:border-line-strong focus:outline-none focus:ring-2 focus:ring-line-soft"
          />
        </label>

        <label className="grid gap-1 text-sm font-semibold text-zinc-800">
          Photos or notes
          <textarea
            value={fields.notes}
            onChange={(event) => setFields((prev) => ({ ...prev, notes: event.target.value }))}
            placeholder="Add details or mention any photos"
            className="min-h-[90px] rounded-xl border border-line-strong px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm focus:border-line-strong focus:outline-none focus:ring-2 focus:ring-line-soft"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <PhoneActionButton
          kind="sms"
          body={smsBody}
          className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-zinc-800 sm:w-auto"
          ariaLabel="Send a pre-filled text message for a quote"
        >
          Send text with this info
        </PhoneActionButton>
        <p className="text-xs text-zinc-500">
          Tip: You can attach photos after the text opens.
        </p>
      </div>
    </div>
  );
}
