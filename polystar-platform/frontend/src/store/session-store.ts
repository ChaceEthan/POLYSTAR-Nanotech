"use client";

import { useSyncExternalStore } from "react";

type SessionSnapshot = {
  accessToken?: string;
  userName?: string;
};

let snapshot: SessionSnapshot = {};
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function setSession(next: SessionSnapshot) {
  snapshot = next;
  if (typeof window !== "undefined") {
    if (next.accessToken) window.localStorage.setItem("polystar_access_token", next.accessToken);
    if (next.userName) window.localStorage.setItem("polystar_user_name", next.userName);
  }
  emit();
}

export function clearSession() {
  snapshot = {};
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("polystar_access_token");
    window.localStorage.removeItem("polystar_user_name");
  }
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  if (typeof window !== "undefined") {
    snapshot = {
      accessToken: window.localStorage.getItem("polystar_access_token") ?? undefined,
      userName: window.localStorage.getItem("polystar_user_name") ?? undefined
    };
  }
  return snapshot;
}

export function useSessionStore() {
  return useSyncExternalStore(subscribe, getSnapshot, () => snapshot);
}
