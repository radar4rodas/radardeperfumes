CREATE TABLE public.page_stats (
  day date NOT NULL DEFAULT (now() AT TIME ZONE 'America/Sao_Paulo')::date,
  metric text NOT NULL,
  count bigint NOT NULL DEFAULT 0,
  PRIMARY KEY (day, metric)
);
GRANT ALL ON public.page_stats TO service_role;
ALTER TABLE public.page_stats ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.increment_metric(_metric text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF _metric NOT IN ('page_view','whatsapp_click','meta_pageview','meta_lead') THEN RETURN; END IF;
  INSERT INTO public.page_stats(day, metric, count)
  VALUES ((now() AT TIME ZONE 'America/Sao_Paulo')::date, _metric, 1)
  ON CONFLICT (day, metric) DO UPDATE SET count = public.page_stats.count + 1;
END $$;
REVOKE ALL ON FUNCTION public.increment_metric(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_metric(text) TO anon, authenticated;