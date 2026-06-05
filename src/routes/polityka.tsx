import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/polityka' as any)({
  component: Polityka,
})

function Polityka() {
  return (
    <div className="min-h-screen bg-bg text-white px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="text-accent text-sm hover:underline mb-8 inline-block">← Wróć do strony głównej</a>
        <h1 className="font-display font-bold text-4xl mb-2">Polityka prywatności</h1>
        <p className="text-white/40 text-sm mb-12">Ostatnia aktualizacja: czerwiec 2026</p>

        <div className="space-y-10 text-white/80 leading-relaxed">

          <section>
            <h2 className="text-white font-semibold text-xl mb-3">1. Czym jest BSDCheck?</h2>
            <p>BSDCheck to bezpłatne narzędzie online stworzone przez Biesiada Studio, które pomaga firmom ocenić jakość swojej obecności w internecie — w szczególności aktywność w mediach społecznościowych i skuteczność pozyskiwania klientów online. Narzędzie generuje spersonalizowany raport z rekomendacjami, który firma może wdrożyć samodzielnie lub przy wsparciu Biesiada Studio.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-xl mb-3">2. Jakie dane zbieramy?</h2>
            <p>BSDCheck <strong className="text-white">nie zbiera, nie przechowuje ani nie przetwarza żadnych danych osobowych</strong>. Informacje wpisane w formularzu audytu (nazwa firmy, branża, odpowiedzi na pytania) są wysyłane wyłącznie do API firmy Anthropic w celu wygenerowania raportu i nie są przez nas zapisywane na żadnym serwerze.</p>
            <p className="mt-3">Po wygenerowaniu raportu wszystkie dane są usuwane. Nie prowadzimy żadnej bazy danych użytkowników.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-xl mb-3">3. Technologia AI</h2>
            <p>Raport jest generowany przez model językowy Claude (Anthropic). Dane wpisane w formularzu są przekazywane do API Anthropic zgodnie z ich polityką prywatności dostępną na stronie anthropic.com. BSDCheck nie ma wpływu na przetwarzanie danych po stronie Anthropic.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-xl mb-3">4. Pliki cookie</h2>
            <p>Strona może używać technicznych plików cookie niezbędnych do jej prawidłowego działania (np. sesja przeglądarki). Nie używamy plików cookie do śledzenia ani celów reklamowych.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-xl mb-3">5. Cel narzędzia</h2>
            <p>BSDCheck powstało z myślą o małych i średnich firmach, które chcą poprawić swoją widoczność w internecie, zacząć pozyskiwać klientów z mediów społecznościowych i zbudować profesjonalny wizerunek online. Korzystanie z narzędzia jest całkowicie dobrowolne i bezpłatne.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-xl mb-3">6. Kontakt</h2>
            <p>Biesiada Studio</p>
            <p className="mt-2">Email: <button onClick={() => alert('dawidbiesiadastudio@gmail.com')} className="text-accent hover:underline cursor-pointer bg-transparent border-none">dawidbiesiadastudio@gmail.com</button></p>
            <p className="mt-1">WhatsApp: <a href="https://wa.me/48531629503" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">+48 531 629 503</a></p>
          </section>

        </div>
      </div>
    </div>
  )
}