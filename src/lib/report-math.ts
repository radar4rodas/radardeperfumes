export type StatRow = { day: string; metric: string; count: number };

export function summarize(rows: StatRow[]) {
  const t = { page_view: 0, whatsapp_click: 0, meta_pageview: 0, meta_lead: 0 } as Record<string, number>;
  for (const r of rows) if (r.metric in t) t[r.metric] += r.count;
  const conversion = t.page_view > 0 ? (t.whatsapp_click / t.page_view) * 100 : 0;
  return { visits: t.page_view, clicks: t.whatsapp_click, metaPageViews: t.meta_pageview, metaLeads: t.meta_lead, conversion };
}
