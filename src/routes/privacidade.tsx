import { createFileRoute, Link } from "@tanstack/react-router";
import { PIXEL_ID } from "@/lib/meta-pixel";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Privacidade | Radar de Perfumes" },
      { name: "description", content: "Uso do Meta Pixel na medição de visitas e cliques do Radar de Perfumes." },
      { property: "og:title", content: "Privacidade | Radar de Perfumes" },
      { property: "og:description", content: "Informações sobre o uso do Meta Pixel no Radar de Perfumes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="lux-bg min-h-screen px-5 py-10 text-foreground">
      <article className="mx-auto max-w-xl space-y-4 text-sm leading-relaxed text-muted-foreground">
        <h1 className="font-display text-3xl text-foreground">Privacidade e cookies</h1>
        <p>Esta página carrega automaticamente o Meta Pixel (ID {PIXEL_ID}) para medir visitas (PageView) e cliques no botão do WhatsApp (Lead), com finalidade de análise e campanhas publicitárias no Facebook e Instagram.</p>
        <p>Esses eventos podem compartilhar com a Meta informações sobre a página visitada, navegador, dispositivo, rede e identificadores ou cookies gerados pelo Pixel. Não enviamos diretamente nome, email, telefone nem listas de clientes por meio desses eventos.</p>
        <p>Para reduzir eventos duplicados, armazenamos localmente neste navegador que um Lead já foi enviado. Isso não permite identificar a mesma pessoa em dispositivos diferentes ou após a exclusão dos dados locais.</p>
        <p>Configurações do navegador e bloqueadores de anúncios podem impedir o funcionamento do Pixel. O acesso ao grupo do WhatsApp permanece disponível.</p>
        <p>Veja também a <a className="underline" href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Política de Privacidade da Meta</a>.</p>
        <p><Link to="/" className="underline">Voltar</Link></p>
      </article>
    </main>
  );
}
