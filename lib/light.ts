export const lights = ["morning", "afternoon", "golden", "night"] as const;
export type Light = (typeof lights)[number];
export type LightSetting = Light | "auto";

export const LIGHT_KEY = "osan-light";
export const TIME_ZONE = "Africa/Lagos";

export const lightNames: Record<Light, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  golden: "Golden hour",
  night: "After dark",
};

/** Port Harcourt sits near the equator, so the light keeps roughly the same hours all year. */
export function lightForHour(hour: number): Light {
  if (hour >= 6 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 19) return "golden";
  return "night";
}

/** Minutes past midnight in Port Harcourt. */
export function portHarcourtMinutes(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return get("hour") * 60 + get("minute");
}

/**
 * Inlined in <head>: picks the light before first paint so there is no flash.
 * Kept dependency-free on purpose; it mirrors lightForHour above.
 */
export const lightScript = `(function(){try{var s=localStorage.getItem("${LIGHT_KEY}");var l=s&&s!=="auto"?s:null;if(!l){var h=+new Intl.DateTimeFormat("en-GB",{timeZone:"${TIME_ZONE}",hour:"2-digit",hourCycle:"h23"}).format(new Date());l=h>=6&&h<11?"morning":h>=11&&h<17?"afternoon":h>=17&&h<19?"golden":"night"}document.documentElement.dataset.light=l}catch(e){}})()`;

export function readSetting(): LightSetting {
  try {
    const s = localStorage.getItem(LIGHT_KEY);
    if (s && (s === "auto" || (lights as readonly string[]).includes(s))) return s as LightSetting;
  } catch {}
  return "auto";
}

export function resolveLight(setting: LightSetting): Light {
  return setting === "auto" ? lightForHour(Math.floor(portHarcourtMinutes() / 60)) : setting;
}

/** Swap the light with a cross-fade, never a smear of competing colour transitions. */
export function applyLight(light: Light) {
  const root = document.documentElement;
  if (root.dataset.light === light) return;

  const swap = () => {
    root.classList.add("light-switching");
    root.dataset.light = light;
    void root.offsetHeight; // flush styles while transitions are off
    requestAnimationFrame(() => root.classList.remove("light-switching"));
  };

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "startViewTransition" in document) document.startViewTransition(swap);
  else swap();
}

export function saveSetting(setting: LightSetting) {
  try {
    localStorage.setItem(LIGHT_KEY, setting);
  } catch {}
  applyLight(resolveLight(setting));
  window.dispatchEvent(new Event(LIGHT_EVENT));
}

const LIGHT_EVENT = "osan:light";

export function subscribeSetting(onChange: () => void) {
  window.addEventListener(LIGHT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(LIGHT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}
