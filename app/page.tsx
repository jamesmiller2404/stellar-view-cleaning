import type { Metadata } from "next";
import PricingCalculator from "./components/PricingCalculator";
import { pricingConfig } from "./pricingConfig";

const BUSINESS_NAME = "Stellar View Services";
const SERVICE_AREA = "Sacramento & Surrounding Areas"; // <-- change this
const PHONE = "9165551234"; // <-- change (digits only, include country code 1)
const DISPLAY_PHONE = "(916) 555-1234"; // <-- change (pretty format)
const SMS_PREFILL = encodeURIComponent(
  "QUOTE - Hi! I'd like a window cleaning quote.\nAddress/Area:\nResidential or Storefront:\nApprox # of windows:\nPreferred day/time:\nAny photos/notes:"
);

// Optional (Formspree): replace with your endpoint or set to "" to hide the form.
const FORMSPREE_ENDPOINT = ""; // e.g. "https://formspree.io/f/abcdwxyz"

export const metadata: Metadata = {
  title: `${BUSINESS_NAME} | Window Cleaning in ${SERVICE_AREA}`,
  description:
    "Residential and small business window cleaning with clear pricing, fast quotes by text, and a satisfaction fix guarantee.",
  openGraph: {
    title: `${BUSINESS_NAME}`,
    description:
      "Streak-free window cleaning for homes and small businesses. Clear pricing. Fast quotes.",
    type: "website",
  },
};

export default function Page() {
  const smsHref = `sms:+${PHONE}?&body=${SMS_PREFILL}`;
  const telHref = `tel:+${PHONE}`;
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: pricingConfig.currency,
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#5f2dfe] text-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src="/static/images/SVC_logo_3a.png"
              alt={`${BUSINESS_NAME} logo`}
              className="h-[3.9rem] w-[3.9rem] object-contain shadow-[0_6px_10px_rgba(0,0,0,0.35)]"
            />
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-black tracking-tight text-[#ffb703] drop-shadow-[0_4px_2px_rgba(0,0,0,0.95)]">
                {BUSINESS_NAME}
              </span>
              <span className="text-xs text-white/80">{SERVICE_AREA}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={smsHref}
              className="rounded-xl bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Text for Quote
            </a>
            <a
              href={telHref}
              className="rounded-xl border border-white/70 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Call
            </a>
          </div>
        </div>
        <hr className="h-[3px] w-full border-0 bg-[#0000ab]" />
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Residential & Small Business Window Cleaning
            </h1>
            <p className="mt-3 text-base text-zinc-800 font-medium">
              Streak-free windows, clear pricing, and reliable service. Text for a fast quote.
            </p>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <a
                href={smsHref}
                className="rounded-xl bg-zinc-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Text "QUOTE" for a price
              </a>
              <a
                href={telHref}
                className="rounded-xl border border-zinc-300 px-5 py-3 text-center text-sm font-semibold hover:bg-zinc-50"
              >
                Call {DISPLAY_PHONE}
              </a>
            </div>

            <ul className="mt-6 grid gap-2 text-sm text-zinc-800 font-medium">
              <li>- Clear pricing</li>
              <li>- Edges detailed by hand</li>
              <li>- Satisfaction fix guarantee</li>
            </ul>


          </div>

          {/* Credibility card */}
          <div className="rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Fast quote by text</h2>
            <p className="mt-1 text-sm text-zinc-800 font-medium">
              Send your address/area and (if possible) a couple photos. I'll reply with a clear price before I start.
            </p>
            <div className="mt-4 rounded-xl bg-zinc-50 p-4">
              <p className="text-sm font-semibold">Text template</p>
              <p className="mt-2 whitespace-pre-line text-sm text-zinc-800 font-medium">
                QUOTE - My address is:
                {"\n"}Residential or storefront
                {"\n"}Approx # of windows
                {"\n"}Preferred day/time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-5xl px-4 pb-10">
        <div className="rounded-2xl border border-zinc-200 p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Budget Pricing</h2>
              <p className="mt-1 text-sm text-zinc-800 font-medium">
                Exact price before I start. No surprise fees.
              </p>
              <p className="mt-1 text-xs text-zinc-500">{pricingConfig.uiCopy.accessDisclaimer}</p>
            </div>
            <div className="flex gap-2">
              <a
                href={smsHref}
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Text for Quote
              </a>
              <a
                href={telHref}
                className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
              >
                Call
              </a>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <PricingCalculator />

            <div className="grid gap-4">
              <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200">
                <h3 className="text-lg font-semibold">Residential rates</h3>
                <ul className="mt-3 space-y-2 text-sm text-zinc-800 font-medium">
                  <li>
                    <span className="font-semibold">Exterior:</span>{" "}
                    {formatCurrency(pricingConfig.rates.residential.exterior.standard)} standard,{" "}
                    {formatCurrency(pricingConfig.rates.residential.exterior.large)} large,{" "}
                    {formatCurrency(pricingConfig.rates.residential.exterior.slider)} slider
                  </li>
                  <li>
                    <span className="font-semibold">In & out:</span>{" "}
                    {formatCurrency(pricingConfig.rates.residential.inOut.standard)} standard,{" "}
                    {formatCurrency(pricingConfig.rates.residential.inOut.large)} large,{" "}
                    {formatCurrency(pricingConfig.rates.residential.inOut.slider)} slider
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200">
                <h3 className="text-lg font-semibold">Commercial rates</h3>
                <ul className="mt-3 space-y-2 text-sm text-zinc-800 font-medium">
                  <li>
                    <span className="font-semibold">Exterior:</span>{" "}
                    {formatCurrency(pricingConfig.rates.commercial.exterior.standard)} standard,{" "}
                    {formatCurrency(pricingConfig.rates.commercial.exterior.large)} large,{" "}
                    {formatCurrency(pricingConfig.rates.commercial.exterior.slider)} slider
                  </li>
                  <li>
                    <span className="font-semibold">In & out:</span>{" "}
                    {formatCurrency(pricingConfig.rates.commercial.inOut.standard)} standard,{" "}
                    {formatCurrency(pricingConfig.rates.commercial.inOut.large)} large,{" "}
                    {formatCurrency(pricingConfig.rates.commercial.inOut.slider)} slider
                  </li>
                </ul>
                <p className="mt-3 text-xs text-zinc-500">Storefront or small business glass.</p>
              </div>

              <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200">
                <h3 className="text-lg font-semibold">Add-ons</h3>
                <ul className="mt-3 space-y-2 text-sm text-zinc-800 font-medium">
                  {Object.entries(pricingConfig.addOns).map(([key, addOn]) => (
                    <li key={key}>
                      <span className="font-semibold">
                        {addOn.label}:
                      </span>{" "}
                      {formatCurrency(addOn.price)} per {addOn.unit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="mt-5 text-xs text-zinc-500">{pricingConfig.uiCopy.minimumDisclaimer}</p>
          <p className="mt-2 text-xs text-zinc-500">
            Note: High-rise work and pressure washing are not offered.
          </p>
        </div>
      </section>

      {/* Services + Process */}
      <section className="mx-auto max-w-5xl px-4 pb-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 p-6">
            <h2 className="text-xl font-bold">Services</h2>
            <div className="mt-4 grid gap-4">
              <div>
                <h3 className="font-semibold">Residential</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-zinc-800 font-medium">
                  <li>Exterior window cleaning</li>
                  <li>Interior window cleaning (optional)</li>
                  <li>Screens and tracks add-ons</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Commercial</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-zinc-800 font-medium">
                  <li>Storefront glass cleaning</li>
                  <li>Weekly/bi-weekly maintenance</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 p-6">
            <h2 className="text-xl font-bold">How it works</h2>
            <ol className="mt-4 space-y-3 text-sm text-zinc-800 font-medium">
              <li>
                <span className="font-semibold">1) Text me</span> your address/area + what you need.
              </li>
              <li>
                <span className="font-semibold">2) I confirm the price</span> before starting.
              </li>
              <li>
                <span className="font-semibold">3) We schedule</span> (often same-day).
              </li>
              <li>
                <span className="font-semibold">4) Clean windows</span> - squeegee finish + detailed edges.
              </li>
            </ol>

            <div className="mt-5 rounded-xl bg-zinc-50 p-4">
              <p className="text-sm font-semibold">Satisfaction Fix Guarantee</p>
              <p className="mt-1 text-sm text-zinc-800 font-medium">
                If you notice a missed spot within 24 hours, text a photo and I'll come back and fix it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof / Photos */}
      <section className="mx-auto max-w-5xl px-4 pb-10">
        <div className="rounded-2xl border border-zinc-200 p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Recent Work</h2>
              <p className="mt-1 text-sm text-zinc-800 font-medium">
                Before and After
              </p>
            </div>
            <a
              href={smsHref}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
            >
              Text for Quote
            </a>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <img
                src="/static/images/example1_dirty.png"
                alt="Before cleaning: dirty windows"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <figcaption className="px-4 py-3 text-sm font-semibold text-zinc-800">
                Before
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <img
                src="/static/images/example1_clear.png"
                alt="After cleaning: clear windows"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <figcaption className="px-4 py-3 text-sm font-semibold text-zinc-800">
                After
              </figcaption>
            </figure>
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            Example: exterior storefront glass.
          </p>
        </div>
      </section>

      {/* About + Contact */}
      <section className="mx-auto max-w-5xl px-4 pb-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 p-6">
            <h2 className="text-xl font-bold">About</h2>
            <p className="mt-3 text-sm text-zinc-800 font-medium">
              Hi, I'm James. I run {BUSINESS_NAME}. I focus on clear pricing, professional results, and reliable service
              for homes and small businesses.
            </p>
            <p className="mt-3 text-sm text-zinc-800 font-medium">
              If you're not ready today, save this page--when your windows start looking rough, text me and I'll take
              care of it.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 p-6">
            <h2 className="text-xl font-bold">Get a quote</h2>
            <p className="mt-2 text-sm text-zinc-800 font-medium">
              Fastest: text me your address/area and what you need.
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <a
                href={smsHref}
                className="rounded-xl bg-zinc-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Text for Quote
              </a>
              <a
                href={telHref}
                className="rounded-xl border border-zinc-300 px-5 py-3 text-center text-sm font-semibold hover:bg-zinc-50"
              >
                Call {DISPLAY_PHONE}
              </a>
            </div>

            {/* Optional form (no backend) */}
            {FORMSPREE_ENDPOINT ? (
              <form action={FORMSPREE_ENDPOINT} method="POST" className="mt-6 grid gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    name="name"
                    required
                    placeholder="Name"
                    className="rounded-xl border border-zinc-300 px-3 py-2 text-sm"
                  />
                  <input
                    name="phone"
                    required
                    placeholder="Phone"
                    className="rounded-xl border border-zinc-300 px-3 py-2 text-sm"
                  />
                </div>
                <input
                  name="location"
                  required
                  placeholder="Address or neighborhood"
                  className="rounded-xl border border-zinc-300 px-3 py-2 text-sm"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <select
                    name="type"
                    className="rounded-xl border border-zinc-300 px-3 py-2 text-sm"
                    defaultValue="Residential"
                  >
                    <option>Residential</option>
                    <option>Storefront</option>
                  </select>
                  <input
                    name="windows"
                    placeholder="Approx # of windows (optional)"
                    className="rounded-xl border border-zinc-300 px-3 py-2 text-sm"
                  />
                </div>
                <textarea
                  name="notes"
                  placeholder="Notes (optional)"
                  className="min-h-[90px] rounded-xl border border-zinc-300 px-3 py-2 text-sm"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  Request Quote
                </button>
                <p className="text-xs text-zinc-500">
                  This form sends to my email. No spam, no nonsense.
                </p>
              </form>
            ) : (
              <p className="mt-5 text-xs text-zinc-500">
                Optional: add a free quote form (Formspree/Basin) later. Texting works great at the start.
              </p>
            )}
          </div>
        </div>

      </section>

      <footer className="mt-6 bg-[#5f2dfe] pb-6 text-xs text-white shadow-sm">
        <hr className="h-[3px] w-full border-0 bg-[#0000ab]" />
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            (c) {new Date().getFullYear()} {BUSINESS_NAME}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <a href={telHref} className="hover:text-white/80">
              Call {DISPLAY_PHONE}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
