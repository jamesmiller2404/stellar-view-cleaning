// pricingConfig.js
// Budget pricing for ground-reachable windows using a step stool or extension pole.
// Totals: total = Math.max(subtotal, pricingConfig.minimumCharge)

export const pricingConfig = {
  currency: "USD",
  minimumCharge: 40,

  // UI/validation gate: step-stool / extension pole access only.
  constraints: {
    accessMode: "step-stool-only",
    accessConfirmationText:
      "All windows are reachable from the ground or with a step stool/extension pole.",
  },

  windowTypes: ["standard", "large", "slider"],
  serviceLevels: ["exterior", "inOut"],

  rates: {
    residential: {
      exterior: { standard: 4, large: 6, slider: 10 },
      inOut: { standard: 7, large: 10, slider: 16 },
    },
    commercial: {
      exterior: { standard: 3, large: 5, slider: 9 },
      inOut: { standard: 6, large: 9, slider: 14 },
    },
  },

  addOns: {
    screens: { label: "Screen cleaning", unit: "each", price: 1 },
    tracks: { label: "Track/sill quick detail", unit: "each", price: 1 },
    hardWater: {
      label: "Hard-water spot treatment",
      unit: "each",
      price: 3,
      note: "Only if needed; final confirmed after inspection.",
    },
  },

  uiCopy: {
    estimateDisclaimer:
      "Estimate only. Final price may change with heavy buildup, paint/stickers, or hard-water staining.",
    minimumDisclaimer: "A $40 minimum service charge applies.",
    accessDisclaimer:
      "Note: I currently service windows reachable with a step stool and extension pole (no ladder work yet).",
  },
};
