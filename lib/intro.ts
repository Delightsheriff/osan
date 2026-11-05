export const INTRO_SECONDS = 1.9;
export const INTRO_KEY = "osan-intro";

/** Runs before paint so returning visitors in the same session never see the intro. */
export const introScript = `try{if(sessionStorage.getItem("${INTRO_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("intro-skip")}catch(e){}`;

/** Seconds to hold first-screen animations so they start as the intro curtain lifts. */
export function introDelay() {
  if (typeof document === "undefined") return 0;
  return document.documentElement.classList.contains("intro-skip") ? 0 : INTRO_SECONDS - 0.3;
}
