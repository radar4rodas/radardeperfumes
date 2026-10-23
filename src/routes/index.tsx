import { createFileRoute } from "@tanstack/react-router";
import bottles from "@/assets/bottles.jpg.asset.json";
import { WHATSAPP_GROUP_URL, trackLeadOnce } from "@/lib/meta-lead";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Perfumes masculinos originais com preço que surpreende" },
      { name: "description", content: "Receba ofertas selecionadas de perfumes masculinos originais direto no WhatsApp." },
      { property: "og:title", content: "Perfumes masculinos originais com preço que surpreende" },
      { property: "og:description", content: "Ofertas e cupons de perfumes masculinos no grupo VIP do WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const onClick = () => {
    // Fire-and-forget: navigation never waits for Meta.
    void trackLeadOnce();
  };
  return (
    <main className="lux-bg flex min-h-screen justify-center px-5 py-12 text-foreground">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <p className="flex items-center gap-3 text-xs tracking-[0.4em] text-gold">
          <span className="h-px w-10 bg-gold/60" /> PERFUMES MASCULINOS <span className="h-px w-10 bg-gold/60" />
        </p>
        <h1 className="font-display mt-6 text-5xl leading-[1.05]">
          Seu próximo perfume original por um preço <span className="text-gold-gradient">que surpreende.</span>
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Receba ofertas selecionadas de perfumes masculinos direto no WhatsApp.
        </p>
        <img src={bottles.url} alt="Perfumes Sauvage, 1 Million e Bleu de Chanel" className="mt-6 w-full" />
        <a
          href={WHATSAPP_GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          className="cta-whatsapp mt-6 flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-5 text-xl font-bold uppercase"
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden>
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.3Z" />
          </svg>
          Entrar no grupo VIP
        </a>
        <p className="mt-5 text-muted-foreground">Ofertas e cupons em um só lugar.</p>
      </div>
    </main>
  );
}
