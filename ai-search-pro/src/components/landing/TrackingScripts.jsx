import { useEffect } from "react";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

export function captureUTMParams() {
  const params = new URLSearchParams(window.location.search);
  const hasUTM = UTM_KEYS.some((k) => params.get(k));
  if (hasUTM) {
    const utm = {};
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) utm[k] = v;
    });
    sessionStorage.setItem("utm_params", JSON.stringify(utm));
  }
}

export function getStoredUTM() {
  try {
    return JSON.parse(sessionStorage.getItem("utm_params") || "{}");
  } catch {
    return {};
  }
}

export function trackEvent(eventName, params = {}) {
  // Push to GTM dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...params });
  }
  // Push to Meta Pixel
  if (window.fbq) {
    if (eventName === "Purchase") {
      window.fbq("track", "Purchase", { value: params.value || 1499, currency: "PLN" });
    } else if (eventName === "Lead") {
      window.fbq("track", "Lead");
    } else if (eventName === "InitiateCheckout") {
      window.fbq("track", "InitiateCheckout", { value: 1499, currency: "PLN" });
    } else {
      window.fbq("trackCustom", eventName, params);
    }
  }
}

export default function TrackingScripts() {
  useEffect(() => {
    captureUTMParams();
  }, []);

  return null;
}