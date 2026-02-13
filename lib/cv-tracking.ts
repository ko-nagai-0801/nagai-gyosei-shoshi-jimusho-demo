"use client";

import { track } from "@vercel/analytics";

type CvEventName =
  | "contact_page_view"
  | "contact_form_submit"
  | "contact_method_click"
  | "contact_cta_click";

type CvPayload = string | number | boolean | null | undefined;

export function trackCvEvent(
  event: CvEventName,
  payload?: Record<string, CvPayload>,
) {
  try {
    track(event, payload);
  } catch {
    // Analytics is non-critical. UI should continue even if tracking fails.
  }
}
