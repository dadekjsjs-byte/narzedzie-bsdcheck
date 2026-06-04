import { createServerFn } from '@tanstack/react-start'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)


export const generateAuditReport = createServerFn({ method: 'POST' })
  .handler(async (ctx) => {
    const data = (ctx.data as unknown) as Record<string, any>

    const regularnosc: Record<string, string> = {
      rzadko: 'rzadko lub wcale',
      kilka_miesiac: 'kilka razy w miesiącu',
      raz_tydzien: 'raz w tygodniu',
      kilka_tydzien: 'kilka razy w tygodniu'
    }
    const zrodla: Record<string, string> = {
      polecenia: 'głównie z polecień',
      po_rowno: 'po równo z internetu i polecień',
      internet: 'głównie z internetu',
      nie_wiem: 'nie wie skąd przychodzą klienci'
    }
    const problemy: Record<string, string> = {
      czas: 'brak czasu na regularność',
      pomysly: 'brak pomysłów na content',
      efekty: 'brak efektów mimo publikowania',
      custom: data.problemOnlineCustom || 'inny problem'
    }
    const cele: Record<string, string> = {
      social_klienci: 'social media które przynoszą klientów',
      strona: 'profesjonalna strona która sprzedaje',
      content: 'wiedzieć co publikować',
      wizerunek: 'profesjonalny wygląd w internecie',
      custom: data.celOnlineCustom || 'inny cel'
    }

    const prompt = `Jesteś ekspertem od marketingu cyfrowego dla małych firm w Polsce. Tworzysz krótki, szczery i konkretny raport audytu obecności online dla firmy.

DANE FIRMY:
- Firma: ${data.nazwa}
- Platformy social media: ${data.platformy?.join(', ') || 'brak'}
- Częstotliwość publikowania: ${regularnosc[data.czestotliwosc] || 'nieznana'}
- Strona internetowa: ${data.strona || 'brak'}
- Źródło klientów: ${zrodla[data.zrodloKlientow] || 'nieznane'}
- Główny problem: ${problemy[data.problemOnline] || 'nieznany'}
- Cel do osiągnięcia: ${cele[data.celOnline] || 'nieznany'}
- Opis klienta i historia działań: ${data.opisKlienta}
- Wynik audytu: ${data.score}/100

ZASADY TONU:
- Pisz po polsku, naturalnym językiem, bez korporacyjnego bełkotu
- Ton ma być jak od doświadczonego mentora — szczery ale życzliwy, nie oceniający
- Zamiast "to jest złe" pisz "tu jest przestrzeń do poprawy, bo..."
- Nigdy nie używaj słów: "niewystarczające", "zbyt słabe", "tylko" w negatywnym kontekście
- Problemy przedstawiaj jako szanse: "to oznacza że jest gdzie rosnąć"
- NIE mów że wszystko jest świetne jeśli wynik jest niski — bądź szczery przez pryzmat możliwości
- Personalizuj pod branżę i konkretne odpowiedzi firmy
- Pisz płynnym tekstem, bez bullet pointów
- Klucz w JSON musi być dokładnie "co_traci_klientow" — nie "co_traca_klientow" ani żadna inna wersja
- Pisz prostą, poprawną polszczyzną — unikaj angielskich wtrętów jak "habit", "scheduling", "content" — zamiast tego użyj "nawyk", "planowanie", "treści"
- Zdania mają być logicznie ułożone i zrozumiałe dla właściciela małej firmy bez wiedzy marketingowej
- Unikaj skomplikowanych konstrukcji zdaniowych — krótko i na temat

WAŻNE — FORMAT JSON:
Odpowiedz WYŁĄCZNIE czystym JSON bez żadnego markdown, bez backticks, bez tekstu przed ani po. Zacznij odpowiedź od { i zakończ na }.

{
  "wynik": ${data.score},
  "werdykt": "jedno zdanie podsumowujące sytuację firmy z perspektywy możliwości",
  "co_robisz_dobrze": "2-3 zdania o konkretnych mocnych stronach firmy",
  "co_traci_klientow": "OBOWIĄZKOWO napisz dokładnie 3-5 akapitów oddzielonych \\n\\n. Użyj dokładnie klucza co_traci_klientow. Każdy akapit to osobny konkretny obszar gdzie firma traci potencjalnych klientów — pisz o tym jako o szansie do wykorzystania.",
  "plan_dzialania": [
    {"nazwa": "nazwa kroku", "opis": "3-4 zdania co konkretnie zrobić i dlaczego to ważne"}
  ],
  "cta": "4-6 zdań zachęcających do kontaktu z Biesiada Studio — naturalnie, bez sprzedażowego bełkotu"
}`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      })
    })

    const result = await response.json()
    const text = result.content?.[0]?.text || ''
  const stripped = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()
const jsonMatch = stripped.match(/\{[\s\S]*\}/)
const clean = jsonMatch ? jsonMatch[0] : stripped
    
 try {
      const report = JSON.parse(clean)
// Zapisz do Google Sheets


      return report
    } catch {
      return { error: 'Parse error', raw: text }
    }
  })