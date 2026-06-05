import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Eye, AlertTriangle, Map, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { generateAuditReport } from './api/-audit'

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Biesiada Studio — Bezpłatny audyt obecności online" },
      {
        name: "description",
        content:
          "Bezpłatny audyt pokaże ci gdzie jest twoja firma w internecie i co zrobić, żeby była widoczna dla klientów.",
      },
      { property: "og:title", content: "Biesiada Studio — Bezpłatny audyt online" },
      {
        property: "og:description",
        content:
          "Sprawdź swoją firmę w 3 minuty. Konkretny raport i plan działania.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Syne:wght@600;700;800&display=swap",
      },
    ],
  }),
  component: Index,
});
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const timeout = setTimeout(() => obs.observe(el), 100);
    return () => {
      clearTimeout(timeout);
      obs.disconnect();
    };
  }, []);
  return ref;
}

const CONSTELLATION_NODES = (() => {
  const seed = [
    [40, 60], [120, 30], [200, 80], [280, 40], [350, 110],
    [60, 140], [160, 120], [240, 170], [320, 200], [380, 60],
    [30, 220], [110, 230], [190, 260], [270, 290], [350, 280],
    [50, 320], [140, 350], [220, 380], [300, 360], [370, 400],
    [80, 410], [170, 70], [260, 230], [340, 340], [90, 270],
    [200, 200], [120, 410], [310, 130], [40, 380],
  ];
  return seed.map(([x, y], i) => ({
    cx: x,
    cy: y,
    r: 1.6 + ((i * 13) % 18) / 10,
    delay: ((i * 37) % 50) / 10,
  }));
})();

const CONSTELLATION_LINES = (() => {
  const pairs: Array<[number, number]> = [];
  const n = CONSTELLATION_NODES.length;
  const maxDist = 95;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dx = CONSTELLATION_NODES[i].cx - CONSTELLATION_NODES[j].cx;
      const dy = CONSTELLATION_NODES[i].cy - CONSTELLATION_NODES[j].cy;
      if (Math.hypot(dx, dy) < maxDist) pairs.push([i, j]);
    }
  }
  return pairs;
})();

function Constellation() {
  return (
    <svg viewBox="0 0 400 440" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <g stroke="#00D4B4" strokeWidth="0.7" opacity="0.3">
        {CONSTELLATION_LINES.map(([a, b], i) => (
          <line
            key={i}
            x1={CONSTELLATION_NODES[a].cx}
            y1={CONSTELLATION_NODES[a].cy}
            x2={CONSTELLATION_NODES[b].cx}
            y2={CONSTELLATION_NODES[b].cy}
            className="constellation-line"
            style={{ animationDelay: `${(i * 0.2) % 4}s` }}
          />
        ))}
      </g>
      <g fill="#00D4B4">
        {CONSTELLATION_NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            className="constellation-dot"
            style={{ animationDelay: `${n.delay}s` }}
          />
        ))}
      </g>
    </svg>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden pt-16 pb-10 md:pb-0"
    >
      <div className="relative w-full px-6 sm:px-10 lg:px-16 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 lg:pl-4">
          <h1 className="font-display font-bold text-[2rem] sm:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-tight text-left text-text-primary">
            Twoja firma jest w internecie.
            <br />
            Ale czy ktoś ją <span className="text-accent">widzi?</span>
          </h1>
          <p className="mt-7 max-w-xl text-base sm:text-lg text-text-secondary leading-relaxed text-left">
            Bezpłatny audyt pokaże ci gdzie jesteś teraz i co zrobić żeby twoja firma
            była widoczna dla klientów którzy szukają właśnie ciebie.
          </p>
          <div className="mt-9 flex">
            <a
              href="#audyt"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-7 py-4 text-base font-semibold text-bg transition-all hover:bg-accent-hover hover:shadow-[0_0_40px_rgba(0,212,180,0.4)]"
            >
              Sprawdź swoją firmę <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative h-[440px] hidden lg:block">
          <Constellation />
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Eye,
    title: "Ocenę obecności online",
    desc: "Sprawdź czy twoje social media i strona naprawdę przyciągają klientów.",
  },
  {
    icon: AlertTriangle,
    title: "Konkretną listę problemów",
    desc: "Dowiedz się co blokuje twój rozwój online i traci dla ciebie klientów.",
  },
  {
    icon: Map,
    title: "Gotowy plan działania",
    desc: "Otrzymasz plan dopasowany do twojej branży, który możesz wdrożyć od zaraz.",
  },
];
function Navbar() {
  return (
    <div style={{ position: 'fixed', top: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ background: 'transparent', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', whiteSpace: 'nowrap' }}>
        <a href="#audyt" style={{ fontSize: '14px', fontWeight: 600, color: 'white', textDecoration: 'none' }}>Sprawdź swoją firmę</a>
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
        <a href="#kontakt" style={{ fontSize: '14px', fontWeight: 600, color: 'white', textDecoration: 'none' }}>Kontakt</a>
      </div>
    </div>
  );
}
function Features() {
  const ref = useFadeIn();
  return (
    <section className="py-16 md:py-28 px-6">
      <div ref={ref} className="mx-auto max-w-7xl">
        <p className="text-[17px] tracking-tight normal-case md:text-[18px] md:tracking-normal md:uppercase text-[#F0F4FF] font-medium mb-6 whitespace-nowrap md:whitespace-normal">
          Co dostaniesz w darmowym audycie:
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative rounded-xl border border-border-card border-l-[3px] border-l-[#00D4B4] bg-[#111C2E] p-8 transition-all duration-300 hover:bg-bg-card-hover hover:border-accent/60 hover:-translate-y-1 hover:shadow-[0_0_30px_-8px_rgba(0,212,180,0.35),0_12px_40px_-12px_rgba(0,0,0,0.5)]"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-t from-accent/15 to-accent-subtle flex items-center justify-center mb-7">
                <Icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display font-bold text-[1.35rem] leading-snug mb-4">{title}</h3>
              <p className="text-text-secondary leading-relaxed text-base">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function useCountUp(target: number, start: boolean, duration = 1600, delay = 0) {
  const [value, setValue] = useState(1);
  useEffect(() => {
    if (!start) {
      setValue(1);
      return;
    }
    let raf = 0;
    let startTs = 0;
    const timeout = window.setTimeout(() => {
      const tick = (ts: number) => {
        if (!startTs) startTs = ts;
        const p = Math.min(1, (ts - startTs) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.max(1, Math.round(target * eased)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [target, start, duration, delay]);
  return value;
}

function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(false);
          setTimeout(() => setInView(true), 50);
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const n1 = useCountUp(3, inView, 2000, 0);
  const n2 = useCountUp(67, inView, 2000, 200);

  const bigNum = {
    fontFamily: "Inter, system-ui, sans-serif",
    fontWeight: 900,
    fontSize: "80px",
    lineHeight: 1,
    color: "#00D4B4",
    letterSpacing: "-0.02em",
  } as const;

  const smallText = {
    fontFamily: "Inter, system-ui, sans-serif",
    fontWeight: 900,
    fontSize: "36px",
    lineHeight: 1,
    color: "#00D4B4",
  } as const;

  const labelStyle = {
    color: "#8892A4",
    fontSize: "16px",
  } as const;

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className="border-t border-b border-border-card py-16">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="inline-flex items-baseline gap-2">
                <span style={bigNum}>{n1}</span>
                <span style={smallText}>na </span>
                <span style={bigNum}>5</span>
              </div>
              <p style={labelStyle} className="mt-5 leading-snug max-w-xs mx-auto">
                firm pozyskuje klientów głównie z polecień
              </p>
            </div>
            <div className="text-center">
              <div style={bigNum}>{n2}%</div>
              <p style={labelStyle} className="mt-5 leading-snug max-w-xs mx-auto">
                klientów sprawdza firmę online zanim zadzwoni
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-baseline gap-2">
                <span style={bigNum}>0</span>
                <span style={smallText}> zł</span>
              </div>
              <p style={labelStyle} className="mt-5 leading-snug max-w-xs mx-auto">
                kosztuje sprawdzenie gdzie jesteś teraz
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function AuditForm() {
const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nazwa: '',
    platformy: [] as string[],
    czestotliwosc: '',
    strona: '',
    zrodloKlientow: '',
    problemOnline: '',
    problemOnlineCustom: '',
    celOnline: '',
    celOnlineCustom: '',
    opisKlienta: '',
    email: '',
  });

  const totalSteps = 8;
  const progress = Math.round((step / totalSteps) * 100);

  function calcScore(): number {
    let score = 0;
    const platformPts: Record<string, number> = {
      facebook: 5, instagram: 6, tiktok: 6, linkedin: 5, youtube: 5, inne: 3,
    };
    (formData.platformy || []).forEach((p) => { score += platformPts[p] || 0; });
    score = Math.min(score, 20);
    const freqPts: Record<string, number> = {
      rzadko: 2, kilka_miesiac: 8, raz_tydzien: 16, kilka_tydzien: 25,
    };
    score += freqPts[formData.czestotliwosc] || 0;
    if (formData.strona) score += 20;
    const srcPts: Record<string, number> = {
      polecenia: 10, po_rowno: 18, internet: 25, nie_wiem: 2,
    };
    score += srcPts[formData.zrodloKlientow] || 0;
    if (formData.celOnline) score += 5;
    if (formData.problemOnline) score += 5;
    return Math.min(score, 100);
  }

  function togglePlatform(val: string) {
    setFormData((prev) => ({
      ...prev,
      platformy: prev.platformy.includes(val)
        ? prev.platformy.filter((p) => p !== val)
        : [...prev.platformy, val],
    }));
  }

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    try {
      const score = calcScore();
      const result = await generateAuditReport({ data: { ...formData, score } as any })
      if (result?.error) {
        setError('Błąd generowania raportu. Spróbuj ponownie.');
      } else {
        setReport(result);
      }
    } catch (e) {
      setError('Coś poszło nie tak. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  }

  const canNext = () => {
    if (step === 1) return formData.nazwa.trim().length > 0;
    if (step === 2) return formData.platformy.length > 0;
    if (step === 3) return formData.czestotliwosc !== '';
    if (step === 4) return true;
    if (step === 5) return formData.zrodloKlientow !== '';
    if (step === 6) return formData.problemOnline !== '';
    if (step === 7) return formData.celOnline !== '';
    if (step === 8) return formData.opisKlienta.trim().length > 0;
    return true;
  };
  const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/60 focus:bg-white/8 transition-all duration-200 resize-none";
  const optionCls = (active: boolean) =>
    `cursor-pointer rounded-xl border px-5 py-4 text-left text-sm font-medium transition-all duration-200 ${
      active
        ? 'border-accent bg-accent/15 text-accent'
        : 'border-white/10 bg-white/5 text-white/80 hover:border-white/25 hover:bg-white/8'
    }`;

  if (report) {
    const score = report.wynik ?? 0;
    const scoreColor = score >= 70 ? '#00D4B4' : score >= 40 ? '#f59e0b' : '#ef4444';
    return (
      <div className="space-y-8 text-left">
        {/* Wynik */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-8">
          <p className="text-sm uppercase tracking-widest text-white/40 mb-4">Twój wynik</p>
          <div className="flex items-end gap-4 mb-4">
            <span className="font-display font-bold text-5xl sm:text-7xl" style={{ color: scoreColor }}>{score}</span>
            <span className="text-white/40 text-2xl mb-3">/100</span>
          </div>
          <p className="text-white/80 text-sm sm:text-lg leading-relaxed">{report.werdykt}</p>
          {/* Progress bar */}
          <div className="mt-6 h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${score}%`, backgroundColor: scoreColor }}
            />
          </div>
        </div>

        {/* Co robisz dobrze */}
        {report.co_robisz_dobrze && (
          <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5 sm:p-8">
            <p className="text-sm uppercase tracking-widest text-accent mb-3">Co robisz dobrze</p>
            <p className="text-white/80 leading-relaxed">{report.co_robisz_dobrze}</p>
          </div>
        )}

        {/* Co traci klientów */}
        {(report.co_traci_klientow || report.co_traca_klientow) && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-8">"
            <p className="text-sm uppercase tracking-widest text-white/40 mb-3">Co traci dla ciebie klientów</p>
            <div className="space-y-4">
              {report.co_traci_klientow.split('\n\n').map((para: string, i: number) => (
                <p key={i} className="text-white/80 leading-relaxed">{para}</p>
              ))}
            </div>
          </div>
        )}

        {/* Plan działania */}
        {report.plan_dzialania?.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-8">
            <p className="text-sm uppercase tracking-widest text-white/40 mb-6">Plan działania</p>
            <div className="space-y-6">
              {report.plan_dzialania.map((krok: any, i: number) => (
                <div key={i} className="flex gap-5">
                  <div className="shrink-0 w-8 h-8 rounded-full border border-accent/40 flex items-center justify-center text-accent font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm mb-1">{krok.nazwa}</p>
                    <p className="text-white/70 leading-relaxed text-xs sm:text-sm">{krok.opis}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="rounded-2xl border border-accent/30 bg-accent/8 p-5 sm:p-8">
          <p className="text-white/80 leading-relaxed mb-6">{report.cta}</p>
          <div className="flex flex-col gap-3">
            <a
             href="https://wa.me/48531629503"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-xl bg-accent px-6 py-3 text-center text-sm font-semibold text-bg-dark transition-all hover:bg-accent/90 hover:scale-[1.02]"
            >
              Umów rozmowę
            </a>
            
            <a
              href="#" onClick={(e) => { e.preventDefault(); alert('dawidbiesiadastudio@gmail.com'); }}
              className="w-full rounded-xl border border-accent/40 px-6 py-3 text-center text-sm font-semibold text-accent transition-all hover:bg-accent/10"
            >
              Napisz email
            </a>
            <a
              href="https://wa.me/48531629503"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-xl border border-white/10 px-6 py-3 text-center text-sm font-semibold text-white/70 transition-all hover:border-white/25 hover:text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-white/40">Krok {step} z {totalSteps}</span>
          <span className="text-sm font-medium text-accent">{progress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="min-h-[280px]">

        {step === 1 && (
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-accent/70">Krok 1 — Twoja firma</p>
            <h3 className="font-display font-bold text-2xl text-white">Jak się nazywa twoja firma i czym się zajmujesz?</h3>
            <textarea
              rows={4}
              placeholder="Np. Salon fryzjerski Anna — strzyżenie, koloryzacja, stylizacja..."
              className={inputCls}
              value={formData.nazwa}
              onChange={(e) => setFormData({ ...formData, nazwa: e.target.value })}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-accent/70">Krok 2 — Social media</p>
            <h3 className="font-display font-bold text-2xl text-white">Na których platformach jesteś aktywny?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { val: 'facebook', label: 'Facebook' },
                { val: 'instagram', label: 'Instagram' },
                { val: 'tiktok', label: 'TikTok' },
                { val: 'linkedin', label: 'LinkedIn' },
                { val: 'youtube', label: 'YouTube' },
                { val: 'inne', label: 'Inne' },
              ].map(({ val, label }) => (
                <button key={val} onClick={() => togglePlatform(val)} className={optionCls(formData.platformy.includes(val))}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
 {step === 3 && (
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-accent/70">Krok 3 — Aktywność</p>
            <h3 className="font-display font-bold text-2xl text-white">Jak często publikujesz treści?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { val: 'rzadko', label: 'Rzadko lub wcale' },
                { val: 'kilka_miesiac', label: 'Kilka razy w miesiącu' },
                { val: 'raz_tydzien', label: 'Raz w tygodniu' },
                { val: 'kilka_tydzien', label: 'Kilka razy w tygodniu' },
              ].map(({ val, label }) => (
                <button key={val} onClick={() => setFormData({ ...formData, czestotliwosc: val })} className={optionCls(formData.czestotliwosc === val)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-accent/70">Krok 4 — Strona internetowa</p>
            <h3 className="font-display font-bold text-2xl text-white">Czy masz stronę internetową?</h3>
            <input
              type="url"
              placeholder="https://twojastrona.pl (zostaw puste jeśli nie masz)"
              className={inputCls}
              value={formData.strona}
              onChange={(e) => setFormData({ ...formData, strona: e.target.value })}
            />
            <p className="text-white/30 text-sm">Pole opcjonalne — wpisz link jeśli masz stronę.</p>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-accent/70">Krok 5 — Źródło klientów</p>
            <h3 className="font-display font-bold text-2xl text-white">Skąd głównie pozyskujesz klientów?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { val: 'polecenia', label: 'Głównie z polecień' },
                { val: 'po_rowno', label: 'Po równo — internet i polecenia' },
                { val: 'internet', label: 'Głównie z internetu' },
                { val: 'nie_wiem', label: 'Szczerze — nie wiem' },
              ].map(({ val, label }) => (
                <button key={val} onClick={() => setFormData({ ...formData, zrodloKlientow: val })} className={optionCls(formData.zrodloKlientow === val)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-accent/70">Krok 6 — Główny problem</p>
            <h3 className="font-display font-bold text-2xl text-white">Co najbardziej przeszkadza ci w internecie?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { val: 'czas', label: 'Brak czasu na regularność' },
                { val: 'pomysly', label: 'Nie wiem co publikować' },
                { val: 'efekty', label: 'Publikuję, ale bez efektów' },
                { val: 'custom', label: 'Coś innego' },
              ].map(({ val, label }) => (
                <button key={val} onClick={() => setFormData({ ...formData, problemOnline: val })} className={optionCls(formData.problemOnline === val)}>
                  {label}
                </button>
              ))}
            </div>
            {formData.problemOnline === 'custom' && (
              <input
                type="text"
                placeholder="Opisz swój problem..."
                className={inputCls}
                value={formData.problemOnlineCustom}
                onChange={(e) => setFormData({ ...formData, problemOnlineCustom: e.target.value })}
              />
            )}
          </div>
        )}

        {step === 7 && (
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-accent/70">Krok 7 — Cel</p>
            <h3 className="font-display font-bold text-2xl text-white">Co chcesz poprawić w pierwszej kolejności?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { val: 'social_klienci', label: 'Social media które przynoszą klientów' },
                { val: 'strona', label: 'Profesjonalna strona która sprzedaje' },
                { val: 'content', label: 'Wiedzieć co publikować' },
                { val: 'wizerunek', label: 'Profesjonalny wygląd w sieci' },
                { val: 'custom', label: 'Coś innego' },
              ].map(({ val, label }) => (
                <button key={val} onClick={() => setFormData({ ...formData, celOnline: val })} className={optionCls(formData.celOnline === val)}>
                  {label}
                </button>
              ))}
            </div>
            {formData.celOnline === 'custom' && (
              <input
                type="text"
                placeholder="Opisz swój cel..."
                className={inputCls}
                value={formData.celOnlineCustom}
                onChange={(e) => setFormData({ ...formData, celOnlineCustom: e.target.value })}
              />
            )}
          </div>
        )}

        {step === 8 && (
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-accent/70">Krok 8 — Twój klient</p>
            <h3 className="font-display font-bold text-2xl text-white">Kim jest twój typowy klient i co już próbowałeś?</h3>
            <textarea
              rows={5}
              placeholder="Np. Kobiety 25-45 lat zainteresowane pielęgnacją. Próbowałem postować na Instagramie ale rzuciłem po miesiącu..."
              className={inputCls}
              value={formData.opisKlienta}
              onChange={(e) => setFormData({ ...formData, opisKlienta: e.target.value })}
            />
          </div>
        )}
      </div>

      {/* Nawigacja */}
      <div className="flex justify-between items-center pt-4">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-white/60 hover:border-white/25 hover:text-white transition-all"
          >
            ← Wstecz
          </button>
        ) : (
          <div />
        )}

        {step < totalSteps ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canNext()}
            className="rounded-xl bg-accent px-7 py-2.5 text-sm font-semibold text-bg-dark transition-all hover:bg-accent/90 hover:scale-[1.02] disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100"
          >
            Dalej →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canNext() || loading}
            className="rounded-xl bg-accent px-7 py-2.5 text-sm font-semibold text-bg-dark transition-all hover:bg-accent/90 hover:scale-[1.02] disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100"
          >
            {loading ? 'Generuję raport...' : 'Wygeneruj raport →'}
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}
    </div>
  );
}
function Tool() {
  const ref = useFadeIn();
  return (
    <section id="audyt" className="py-16 md:py-28 px-6 scroll-mt-20">
      <div ref={ref} className="mx-auto max-w-4xl text-center">
        <p className="text-sm uppercase tracking-[0.18em] text-accent font-medium mb-6">
          Audyt online
        </p>
        <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
          Sprawdź swoją firmę w <span className="text-accent">3 minuty</span>
        </h2>
        <p className="mt-6 text-lg text-text-secondary">
          Odpowiedz na kilka pytań i otrzymaj bezpłatny raport.
        </p>

        <div className="mt-14 relative rounded-2xl border border-accent/40 bg-bg-card p-8 sm:p-12 shadow-[0_0_60px_-20px_rgba(0,212,180,0.4)] text-left">
          <div className="absolute inset-0 rounded-2xl bg-accent-subtle pointer-events-none" />
          <div className="relative">
            <AuditForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function Radar({ size = 340 }: { size?: number }) {
  const [angle, setAngle] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  const blips = [
    { cx: 80, cy: 55, offset: 0 },
    { cx: 245, cy: 120, offset: 72 },
    { cx: 210, cy: 250, offset: 144 },
    { cx: 55, cy: 210, offset: 216 },
    { cx: 260, cy: 60, offset: 288 },
  ];

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      setAngle((elapsed / 4000) * 360 % 360);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const toRad = (deg: number) => (deg - 90) * Math.PI / 180;
  const sweepX = 150 + 140 * Math.cos(toRad(angle));
  const sweepY = 150 + 140 * Math.sin(toRad(angle));
  const trailAngle = angle - 70;
  const trailX = 150 + 140 * Math.cos(toRad(trailAngle));
  const trailY = 150 + 140 * Math.sin(toRad(trailAngle));
  const largeArc = 70 > 180 ? 1 : 0;

  const getBlipOpacity = (blip: typeof blips[0]) => {
    const blipAngle = ((Math.atan2(blip.cy - 150, blip.cx - 150) * 180 / Math.PI) + 90 + 360) % 360;
    const diff = (angle - blipAngle + 360) % 360;
    if (diff < 5) return 1;
    if (diff < 200) return Math.max(0, 1 - (diff - 5) / 195);
    return 0;
  };

  return (
    <div className="relative flex items-center justify-center" style={{ height: size + 40 }}>
      <div
        className="absolute rounded-full bg-accent/10 blur-3xl"
        style={{ width: size * 0.94, height: size * 0.94 }}
      />
      <svg
        viewBox="0 0 300 300"
        className="relative"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sweep-grad" gradientUnits="userSpaceOnUse"
            x1="150" y1="150" x2={sweepX} y2={sweepY}>
            <stop offset="0%" stopColor="#00D4B4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00D4B4" stopOpacity="0.05" />
          </linearGradient>
          <clipPath id="radar-clip-3">
            <circle cx="150" cy="150" r="140" />
          </clipPath>
        </defs>

        <circle cx="150" cy="150" r="140" fill="none" stroke="#00D4B4" strokeOpacity="0.35" />
        <circle cx="150" cy="150" r="105" fill="none" stroke="#00D4B4" strokeOpacity="0.22" />
        <circle cx="150" cy="150" r="70" fill="none" stroke="#00D4B4" strokeOpacity="0.18" />
        <circle cx="150" cy="150" r="35" fill="none" stroke="#00D4B4" strokeOpacity="0.15" />
        <line x1="10" y1="150" x2="290" y2="150" stroke="#00D4B4" strokeOpacity="0.1" />
        <line x1="150" y1="10" x2="150" y2="290" stroke="#00D4B4" strokeOpacity="0.1" />

        <g clipPath="url(#radar-clip-3)">
          <path
            d={`M150,150 L${sweepX},${sweepY} A140,140 0 ${largeArc},0 ${trailX},${trailY} Z`}
            fill="#00D4B4"
            fillOpacity="0.12"
          />
        </g>
        <line
          x1="150" y1="150"
          x2={sweepX} y2={sweepY}
          stroke="#00D4B4"
          strokeWidth="1.5"
          strokeOpacity="0.9"
        />

        <circle cx="150" cy="150" r="2.5" fill="#00D4B4" />

        {blips.map((b, i) => {
          const opacity = getBlipOpacity(b);
          return opacity > 0 ? (
            <circle
              key={i}
              cx={b.cx}
              cy={b.cy}
              r="3.5"
              fill="#00D4B4"
              opacity={opacity}
              style={{ filter: "drop-shadow(0 0 6px rgba(0,212,180,1))" }}
            />
          ) : null;
        })}
      </svg>
    </div>
  );
}

function About() {
  return (
    <section className="py-16 md:py-28 px-6">
      <div className="mx-auto max-w-7xl grid gap-10 md:gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-accent font-medium mb-6">
            Kim jesteśmy
          </p>
          <h2 className="font-display font-bold text-[2rem] sm:text-5xl tracking-tight">
            Dwóch przyjaciół. <span className="text-accent">Jedna misja.</span>
          </h2>
          <p className="mt-8 text-text-secondary leading-normal text-base md:leading-relaxed md:text-lg">
            Sprawić żeby twoja firma była widoczna tam, gdzie szukają jej klienci.
            Tworzymy strony które sprzedają i prowadzimy social media które przyciągają
            klientów. Wiemy co sprawia, że obecność online przynosi klientów — i wiemy
            co ją blokuje. Stworzyliśmy ten audyt, żeby firmy takie jak twoja mogły
            zobaczyć gdzie naprawdę stoją. A jeśli jest co poprawić, wiemy dokładnie
            jak to zrobić.
          </p>
          <a
            href="#audyt"
            className="mt-10 inline-flex items-center gap-2 rounded-md border border-accent px-6 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-bg"
          >
            Porozmawiajmy <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="flex justify-center md:block">
          <div className="md:hidden"><Radar size={200} /></div>
          <div className="hidden md:block"><Radar /></div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="kontakt" className="border-t border-border-card bg-bg/60 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3 md:items-center">
          <div className="font-display font-bold text-xl">
            <span className="text-accent">BS</span>
          </div>
          <p className="text-sm text-text-secondary text-center">
            Biesiada Studio — strony i social media, które sprzedają
          </p>
          <div className="flex gap-3 md:justify-end">
            <a
              href="https://wa.me/48531629503"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-md border border-border-card flex items-center justify-center text-text-secondary hover:text-accent hover:border-border-active transition-colors"
            >
           <MessageCircle className="w-4 h-4" />
            </a>
            <a
             href="#"
              onClick={(e: React.MouseEvent) => { e.preventDefault(); alert('dawidbiesiadastudio@gmail.com'); }}
              aria-label="Email"
              className="w-10 h-10 rounded-md border border-border-card flex items-center justify-center text-text-secondary hover:text-accent hover:border-border-active transition-colors"
            >
           <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border-card flex flex-col sm:flex-row justify-between gap-3 text-xs text-text-muted">
          <span>© 2026 Biesiada Studio</span>
          <a href="#" className="hover:text-accent transition-colors">
            Polityka prywatności
          </a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Stats />
        <Tool />
        <About />
      </main>
      <Footer />
    </div>
  );
}