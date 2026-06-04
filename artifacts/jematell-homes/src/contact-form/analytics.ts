export interface TrackingData {
  gclid: string;
  utm_source: string;
  utm_medium: string;
  trigger_url: string;
}

export function getTrackingData(): TrackingData {
  if (typeof window === "undefined") {
    return { gclid: "", utm_source: "", utm_medium: "", trigger_url: "" };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    gclid: params.get("gclid") || "",
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    trigger_url: window.location.href,
  };
}

export function loadGTM(): void {}

export function reportConversion(
  _formData: { name: string; email: string; phone: string },
  _eventName: string,
  _isNew: boolean,
  _value: number,
): void {}
