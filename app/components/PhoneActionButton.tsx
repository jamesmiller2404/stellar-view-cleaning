"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type PhoneActionButtonProps = {
  kind: "sms" | "tel";
  body?: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

const isIOS = () => {
  if (typeof navigator === "undefined") {
    return false;
  }

  const ua = navigator.userAgent || navigator.vendor || "";
  const isAppleDevice = /iPad|iPhone|iPod/.test(ua);
  const isIpadOs = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;

  return isAppleDevice || isIpadOs;
};

const buildSmsHref = (phone: string, body?: string) => {
  if (!body) {
    return `sms:+${phone}`;
  }

  const glue = isIOS() ? "&" : "?";
  return `sms:+${phone}${glue}body=${encodeURIComponent(body)}`;
};

const buildTelHref = (phone: string) => `tel:+${phone}`;

export default function PhoneActionButton({
  kind,
  body,
  className,
  ariaLabel,
  children,
}: PhoneActionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ intent: kind }),
      });

      if (!response.ok) {
        let message = "Try again in a moment.";

        if (response.status === 403) {
          message = "Blocked. Please refresh and try again.";
        } else if (response.status === 429) {
          message = "Too many requests. Try again in a minute.";
        } else if (response.status === 503) {
          message = "Phone temporarily unavailable.";
        }

        setError(message);
        return;
      }

      const payload = (await response.json()) as { phone?: string };
      const phone = payload.phone;

      if (!phone) {
        setError("Phone temporarily unavailable.");
        return;
      }

      const href = kind === "tel" ? buildTelHref(phone) : buildSmsHref(phone, body);
      window.location.href = href;
    } catch (err) {
      setError("Try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="inline-flex flex-col items-start">
      <button
        type="button"
        onClick={handleClick}
        className={className}
        aria-label={ariaLabel}
        disabled={isLoading}
      >
        {isLoading ? "One moment..." : children}
      </button>
      {error ? (
        <span className="mt-2 text-xs text-zinc-500" role="status">
          {error}
        </span>
      ) : null}
    </div>
  );
}
