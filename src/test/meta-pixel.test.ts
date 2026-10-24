import { beforeEach, describe, expect, it, vi } from "vitest";
import { PIXEL_ID, PIXEL_SNIPPET, permitsAdvertising } from "@/lib/meta-pixel";

describe("Radar Pixel rules", () => {
  beforeEach(() => { vi.resetModules(); localStorage.clear(); });

  it("uses only the requested Pixel", () => {
    expect(PIXEL_ID).toBe("1104208202495234");
    expect(PIXEL_SNIPPET).toContain("fbq('init','1104208202495234'");
    expect(PIXEL_SNIPPET).not.toContain("1576330420624489");
  });

  it("blocks consent regions, unresolved locations and opt-outs without a banner", () => {
    expect(permitsAdvertising("BR")).toBe(false);
    expect(permitsAdvertising("DE")).toBe(false);
    expect(permitsAdvertising("XX")).toBe(false);
    expect(permitsAdvertising("T1")).toBe(false);
    expect(permitsAdvertising("")).toBe(false);
    expect(permitsAdvertising("US", true)).toBe(false);
    expect(permitsAdvertising("US")).toBe(true);
  });

  it("sends no automatic Lead and deduplicates available-group clicks", async () => {
    const fbq = vi.fn();
    Object.assign(window, { fbq, __radarAdvertisingAllowed: true });
    const { trackLeadOnce, LEAD_KEY, WHATSAPP_GROUP_URL } = await import("@/lib/meta-lead");
    expect(fbq).not.toHaveBeenCalled();
    expect(LEAD_KEY).toContain("1104208202495234");
    expect(WHATSAPP_GROUP_URL).toBe("https://chat.whatsapp.com/GcNVB35EeMFGNIf8VlYAQV");
    await Promise.all([trackLeadOnce(), trackLeadOnce(), trackLeadOnce()]);
    expect(fbq).toHaveBeenCalledTimes(1);
    expect(fbq.mock.calls[0].slice(0, 2)).toEqual(["track", "Lead"]);
    await trackLeadOnce();
    expect(fbq).toHaveBeenCalledTimes(1);
  });

  it("does not queue or replay a click blocked by regional permission", async () => {
    const fbq = vi.fn();
    Object.assign(window, { fbq, __radarAdvertisingAllowed: false });
    const { trackLeadOnce, LEAD_KEY } = await import("@/lib/meta-lead");
    await trackLeadOnce();
    expect(fbq).not.toHaveBeenCalled();
    expect(localStorage.getItem(LEAD_KEY)).toBeNull();
    Object.assign(window, { __radarAdvertisingAllowed: true });
    expect(fbq).not.toHaveBeenCalled();
  });
});