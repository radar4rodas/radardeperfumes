import { advertisingPermittedNow } from "./meta-pixel";
export { PIXEL_ID } from "./meta-pixel";
export const LEAD_KEY = "meta_lead_1104208202495234_perfumes_vip_v1";
export const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/GcNVB35EeMFGNIf8VlYAQV";

type LeadRecord = { eventId: string; createdAt: string; dispatch: "queued" | "failed" };

let inMemoryLead: LeadRecord | null = null;
let clickLock = false;

function readRecord(): LeadRecord | null {
  try {
    const raw = window.localStorage.getItem(LEAD_KEY);
    if (raw) return JSON.parse(raw) as LeadRecord;
  } catch {
    /* storage unavailable */
  }
  try {
    const raw = window.sessionStorage.getItem(LEAD_KEY);
    if (raw) return JSON.parse(raw) as LeadRecord;
  } catch {
    /* ignore */
  }
  return inMemoryLead;
}

function writeRecord(rec: LeadRecord) {
  inMemoryLead = rec;
  try {
    window.localStorage.setItem(LEAD_KEY, JSON.stringify(rec));
    return;
  } catch {
    /* fall back */
  }
  try {
    window.sessionStorage.setItem(LEAD_KEY, JSON.stringify(rec));
  } catch {
    /* memory only, no persistence */
  }
}

function newId() {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

function sendLeadOnce() {
  if (!advertisingPermittedNow() || readRecord()) return;
  const rec: LeadRecord = { eventId: newId(), createdAt: new Date().toISOString(), dispatch: "queued" };
  writeRecord(rec);
  try {
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (typeof fbq !== "function") throw new Error("fbq missing");
    // "queued" = handed to the browser Pixel; Meta gives no receipt confirmation.
    fbq(
      "track",
      "Lead",
      { content_name: "Grupo VIP - Perfumes Masculinos", content_category: "Perfumes" },
      { eventID: rec.eventId },
    );
  } catch {
    writeRecord({ ...rec, dispatch: "failed" });
  }
}

/** Records the Lead at most once; never blocks or throws. */
export async function trackLeadOnce(): Promise<void> {
  if (!advertisingPermittedNow() || clickLock) return;
  clickLock = true;
  try {
    if (readRecord()) return;
    const locks = (navigator as Navigator & { locks?: LockManager }).locks;
    if (locks?.request) {
      await locks.request(LEAD_KEY, async () => sendLeadOnce());
    } else {
      sendLeadOnce();
    }
  } catch {
    /* tracking must never block access */
  } finally {
    clickLock = false;
  }
}
