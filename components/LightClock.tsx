"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import {
  applyLight,
  lightNames,
  lights,
  portHarcourtMinutes,
  readSetting,
  resolveLight,
  saveSetting,
  subscribeSetting,
  type LightSetting,
} from "@/lib/light";

const GOLDEN_START = 17 * 60;
const GOLDEN_END = 19 * 60;

function subscribeMinute(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

function useMinutes() {
  return useSyncExternalStore(subscribeMinute, () => portHarcourtMinutes(), () => null);
}

function formatClock(m: number) {
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

function goldenHourLine(m: number) {
  if (m >= GOLDEN_START && m < GOLDEN_END) return "Golden hour, right now";
  const until = (GOLDEN_START - m + 24 * 60) % (24 * 60);
  const h = Math.floor(until / 60);
  const min = until % 60;
  return `Golden hour in ${h ? `${h}h ` : ""}${min}m`;
}

/** Local time in Port Harcourt, a countdown to golden hour, and a light picker. */
export default function LightClock() {
  const minutes = useMinutes();
  const setting = useSyncExternalStore(subscribeSetting, readSetting, () => "auto" as LightSetting);

  // In auto, follow the real light, but only when it actually turns, so a
  // light picked some other way (the "osan" egg) is left alone until then.
  const autoLight = minutes === null ? null : resolveLight("auto");
  const lastAuto = useRef<string | null>(null);
  useEffect(() => {
    if (setting !== "auto" || autoLight === null) return;
    if (lastAuto.current !== null && lastAuto.current !== autoLight) applyLight(autoLight);
    lastAuto.current = autoLight;
  }, [setting, autoLight]);

  const choose = (s: LightSetting) => saveSetting(s);

  const autoName = autoLight ? lightNames[autoLight] : "";

  return (
    <div className="space-y-6">
      <div>
        <p className="label mb-3 text-on-deep/50">Port Harcourt</p>
        <p className="text-4xl tabular-nums tracking-tight">{minutes === null ? "--:--" : formatClock(minutes)}</p>
        <p className="label mt-2 flex items-center gap-2 text-on-deep/70">
          <span className="size-1.5 rounded-full bg-sun" />
          {minutes === null ? " " : goldenHourLine(minutes)}
        </p>
      </div>

      <div>
        <p className="label mb-3 text-on-deep/50">Light</p>
        <div className="label flex flex-wrap gap-x-4 gap-y-2" role="radiogroup" aria-label="Site light">
          {(["auto", ...lights] as LightSetting[]).map((s) => (
            <button
              key={s}
              role="radio"
              aria-checked={setting === s}
              onClick={() => choose(s)}
              className={`relative py-1 transition-[color,scale] duration-150 ease-out enabled:active:scale-[0.96] ${
                setting === s ? "text-on-deep" : "text-on-deep/45 hover:text-on-deep/80"
              }`}
            >
              {s === "auto" ? `Auto${autoName ? ` · ${autoName}` : ""}` : lightNames[s]}
              {setting === s && (
                <motion.span
                  layoutId="light-underline"
                  className="absolute inset-x-0 bottom-0 h-px bg-sun"
                  transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
