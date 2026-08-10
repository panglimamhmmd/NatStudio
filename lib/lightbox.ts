"use client";

import { useSyncExternalStore } from "react";

const CHANGE_EVENT = "natstudio-lightbox-change";

// Counter (not a boolean) so nested/StrictMode-doubled mount+unmount pairs
// can't leave the flag stuck open if they ever overlap.
let openCount = 0;

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

function getSnapshot() {
  return openCount > 0;
}

function getServerSnapshot() {
  return false;
}

export function setLightboxOpen(open: boolean) {
  openCount = Math.max(0, openCount + (open ? 1 : -1));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useLightboxOpen() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
