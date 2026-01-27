"use client";

import { useMemo, useState } from "react";
import { pricingConfig } from "../pricingConfig";

const windowLabels: Record<string, string> = {
  standard: "Standard window",
  large: "Large window",
  slider: "Slider window",
};

const serviceLevelLabels: Record<string, string> = {
  exterior: "Exterior only",
  inOut: "In & out",
};

const customerTypeLabels: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
};

const addOnKeys = Object.keys(pricingConfig.addOns);

const buildZeroMap = (keys: string[]) =>
  keys.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {} as Record<string, number>);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: pricingConfig.currency,
    maximumFractionDigits: 0,
  }).format(value);

const sanitizeCount = (value: string) => {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 0) {
    return 0;
  }
  return parsed;
};

export default function PricingCalculator() {
  const [customerType, setCustomerType] = useState("residential");
  const [serviceLevel, setServiceLevel] = useState("exterior");
  const [accessConfirmed, setAccessConfirmed] = useState(false);
  const [windowCounts, setWindowCounts] = useState(() =>
    buildZeroMap(pricingConfig.windowTypes)
  );
  const [addOnCounts, setAddOnCounts] = useState(() => buildZeroMap(addOnKeys));

  const totals = useMemo(() => {
    const rateTable = pricingConfig.rates[customerType][serviceLevel];
    const windowSubtotal = pricingConfig.windowTypes.reduce((sum, type) => {
      return sum + windowCounts[type] * rateTable[type];
    }, 0);
    const addOnSubtotal = addOnKeys.reduce((sum, key) => {
      return sum + addOnCounts[key] * pricingConfig.addOns[key].price;
    }, 0);
    const subtotal = windowSubtotal + addOnSubtotal;
    const total = Math.max(subtotal, pricingConfig.minimumCharge);
    const lineItems =
      pricingConfig.windowTypes.reduce((sum, type) => sum + windowCounts[type], 0) +
      addOnKeys.reduce((sum, key) => sum + addOnCounts[key], 0);
    return { subtotal, total, lineItems };
  }, [addOnCounts, customerType, serviceLevel, windowCounts]);

  const updateWindowCount = (key: string, value: string) => {
    setWindowCounts((prev) => ({
      ...prev,
      [key]: sanitizeCount(value),
    }));
  };

  const updateAddOnCount = (key: string, value: string) => {
    setAddOnCounts((prev) => ({
      ...prev,
      [key]: sanitizeCount(value),
    }));
  };

  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Instant estimate</h3>
        <p className="text-sm text-zinc-700">{pricingConfig.uiCopy.accessDisclaimer}</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm text-zinc-700">
          <span className="font-semibold">Customer type</span>
          <select
            className="rounded-xl border border-zinc-300 px-3 py-2 text-sm"
            value={customerType}
            onChange={(event) => setCustomerType(event.target.value)}
          >
            {Object.keys(pricingConfig.rates).map((type) => (
              <option key={type} value={type}>
                {customerTypeLabels[type] ?? type}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm text-zinc-700">
          <span className="font-semibold">Service level</span>
          <select
            className="rounded-xl border border-zinc-300 px-3 py-2 text-sm"
            value={serviceLevel}
            onChange={(event) => setServiceLevel(event.target.value)}
          >
            {pricingConfig.serviceLevels.map((level) => (
              <option key={level} value={level}>
                {serviceLevelLabels[level] ?? level}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-700">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-zinc-300"
            checked={accessConfirmed}
            onChange={(event) => setAccessConfirmed(event.target.checked)}
          />
          <span>{pricingConfig.constraints.accessConfirmationText}</span>
        </label>
      </div>

      <div className="mt-4">
        <p className="text-sm font-semibold">Windows</p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {pricingConfig.windowTypes.map((type) => (
            <label
              key={type}
              className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 px-3 py-2 text-sm"
            >
              <span className="font-medium">{windowLabels[type] ?? type}</span>
              <input
                type="number"
                min={0}
                step={1}
                inputMode="numeric"
                className="w-20 rounded-lg border border-zinc-300 px-2 py-1 text-right text-sm"
                value={windowCounts[type]}
                onChange={(event) => updateWindowCount(type, event.target.value)}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-semibold">Add-ons</p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {addOnKeys.map((key) => {
            const addOn = pricingConfig.addOns[key];
            return (
              <div
                key={key}
                className="flex items-start justify-between gap-3 rounded-xl border border-zinc-200 px-3 py-2 text-sm"
              >
                <div>
                  <p className="font-medium">{addOn.label}</p>
                  <p className="text-xs text-zinc-500">
                    {formatCurrency(addOn.price)} per {addOn.unit}
                  </p>
                  {addOn.note ? (
                    <p className="mt-1 text-xs text-zinc-500">{addOn.note}</p>
                  ) : null}
                </div>
                <input
                  type="number"
                  min={0}
                  step={1}
                  inputMode="numeric"
                  className="w-20 rounded-lg border border-zinc-300 px-2 py-1 text-right text-sm"
                  value={addOnCounts[key]}
                  onChange={(event) => updateAddOnCount(key, event.target.value)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-zinc-50 p-4">
        <div className="flex items-center justify-between text-sm text-zinc-700">
          <span>Subtotal</span>
          <span className="font-semibold">{formatCurrency(totals.subtotal)}</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-sm text-zinc-700">
          <span>Minimum charge</span>
          <span className="font-semibold">
            {formatCurrency(pricingConfig.minimumCharge)}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-base font-semibold">
          <span>Estimated total</span>
          <span aria-live="polite">
            {accessConfirmed
              ? totals.lineItems > 0
                ? formatCurrency(totals.total)
                : "Add window counts"
              : "Confirm access"}
          </span>
        </div>
        {!accessConfirmed || totals.lineItems === 0 ? (
          <p className="mt-2 text-xs text-amber-700">
            {!accessConfirmed
              ? "Confirm access to unlock the estimate."
              : "Add window counts to see the estimate."}
          </p>
        ) : null}
      </div>

      <p className="mt-3 text-xs text-zinc-500">{pricingConfig.uiCopy.estimateDisclaimer}</p>
      <p className="mt-1 text-xs text-zinc-500">{pricingConfig.uiCopy.minimumDisclaimer}</p>
    </div>
  );
}
