import { createServerFn } from '@tanstack/react-start'


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

ZASADY:
- Pisz po polsku, naturalnym językiem, bez korporacyjnego bełkotu
- Bądź szczery — jeśli coś jest słabe, powiedz to wprost ale konstruktywnie
- NIE mów że wszystko jest świetne jeśli wynik jest niski
- Personalizuj pod branżę i odpowiedzi firmy
- Każda sekcja to 2-4 zdania, konkretne i na temat
- Nie używaj bullet pointów, pisz płynnym tekstem

Napisz raport w formacie JSON (tylko JSON, bez markdown, bez backticks):
{
  "wynik": ${data.score},
  "werdykt": "jedno zdanie podsumowujące sytuację firmy",
  "co_robisz_dobrze": "2-3 zdania o tym co firma robi dobrze",
  "co_traci_klientow": "3-5 akapitów oddzielonych \\n\\n o konkretnych problemach",
  "plan_dzialania": [
    {"nazwa": "nazwa kroku", "opis": "3-4 zdania opisu"}
  ],
  "cta": "4-6 zdań zachęcających do kontaktu z Biesiada Studio"
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
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    })

    const result = await response.json()
    const text = result.content?.[0]?.text || ''
    const clean = text.replace(/```json\n?|```/g, '').trim()
    
    try {
      return JSON.parse(clean)
    } catch {
      return { error: 'Parse error', raw: text }
    }
  })