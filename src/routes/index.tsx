import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Eye, AlertTriangle, Map, Instagram, Music2, ArrowRight } from "lucide-react";

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
type FormData = {
  nazwa: string;
  platformy: string[];
  czestotliwosc: string;
  strona: string;
  zdjecie: string;
  zrodloKlientow: string;
  problemOnline: string;
  problemOnlineCustom: string;
  celOnline: string;
  celOnlineCustom: string;
  opisKlienta: string;
  email: string;
};

function AuditForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<null | {
    wynik: number;
    werdykt: string;
    co_robisz_dobrze: string;
    co_traci_klientow: string;
    plan_dzialania: { nazwa: string; opis: string }[];
    cta: string;
  }>(null);

  const [form, setForm] = useState<FormData>({
    nazwa: '',
    platformy: [],
    czestotliwosc: '',
    strona: '',
    zdjecie: '',
    zrodloKlientow: '',
    problemOnline: '',
    problemOnlineCustom: '',
    celOnline: '',
    celOnlineCustom: '',
    opisKlienta: '',
    email: '',
  });

  const totalSteps = 9;

  const updateForm = (key: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const togglePlatform = (p: string) => {
    setForm(prev => ({
      ...prev,
      platformy: prev.platformy.includes(p)
        ? prev.platformy.filter(x => x !== p)
        : [...prev.platformy, p],
    }));
  };

  const calcScore = () => {
    let score = 0;
    const p = form.platformy.length;
    if (p === 0) score += 0;
    else if (p === 1) score += 8;
    else if (p === 2) score += 14;
    else score += 20;

    if (form.czestotliwosc === 'rzadko') score += 0;
    else if (form.czestotliwosc === 'kilka_miesiac') score += 8;
    else if (form.czestotliwosc === 'raz_tydzien') score += 15;
    else if (form.czestotliwosc === 'kilka_tydzien') score += 25;

    if (!form.strona) score += 0;
    else if (form.strona.length > 3) score += 15;

    if (form.zrodloKlientow === 'polecenia') score += 5;
    else if (form.zrodloKlientow === 'po_rowno') score += 15;
    else if (form.zrodloKlientow === 'internet') score += 25;
    else score += 3;

    if (form.platformy.includes('TikTok')) score += 3;
    if (form.strona && form.platformy.length > 0) score += 3;
    if (form.opisKlienta.length > 30) score += 2;

    return Math.min(score, 100);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      updateForm('zdjecie', base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const score = calcScore();
    try {
      const response = await fetch('api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, score }),
      });
      const data = await response.json();
      setReport(data);
    } catch {
      setReport({
        wynik: score,
        werdykt: 'Wystąpił błąd. Spróbuj ponownie.',
        co_robisz_dobrze: '',
        co_traci_klientow: '',
        plan_dzialania: [],
        cta: '',
      });
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%',
    background: '#0D1420',
    border: '1.5px solid #1A2540',
    borderRadius: '12px',
    padding: '14px 18px',
    color: '#F0F4FF',
    fontSize: '15px',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
  } as const;

  const optionStyle = (selected: boolean) => ({
    width: '100%',
    background: selected ? 'rgba(0,212,180,0.1)' : '#0D1420',
    border: selected ? '1.5px solid #00D4B4' : '1.5px solid #1A2540',
    borderRadius: '12px',
    padding: '14px 18px',
    color: selected ? '#00D4B4' : '#F0F4FF',
    fontSize: '15px',
    textAlign: 'left' as const,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.2s ease',
  });

  const btnPrimary = {
    background: '#00D4B4',
    color: '#080C14',
    border: 'none',
    borderRadius: '12px',
    padding: '14px 32px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.2s ease',
  } as const;

  const btnSecondary = {
    background: 'transparent',
    color: '#8892A4',
    border: '1.5px solid #1A2540',
    borderRadius: '12px',
    padding: '14px 24px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
  } as const;

  if (report) {
    const scoreColor = report.wynik >= 70 ? '#4ade80' : report.wynik >= 40 ? '#00D4B4' : '#ff6b35';
    return (
      <div style={{ background: '#0D1420', border: '1.5px solid #1A2540', borderRadius: '20px', padding: '40px', textAlign: 'left' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '80px', fontWeight: 900, color: scoreColor, lineHeight: 1, fontFamily: 'Inter, sans-serif' }}>{report.wynik}</div>
          <div style={{ color: '#8892A4', fontSize: '14px', marginBottom: '12px' }}>/ 100 punktów</div>
          <div style={{ background: '#1A2540', borderRadius: '100px', height: '6px', overflow: 'hidden', marginBottom: '16px' }}>
            <div style={{ width: `${report.wynik}%`, height: '100%', background: scoreColor, borderRadius: '100px', transition: 'width 1s ease' }} />
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#F0F4FF', fontFamily: 'Syne, sans-serif' }}>{report.werdykt}</div>
        </div>

        {report.co_robisz_dobrze && (
          <div style={{ background: '#111C2E', border: '1.5px solid #1A2540', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#8892A4', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>✅ Co robisz dobrze</div>
            <p style={{ color: '#F0F4FF', fontSize: '15px', lineHeight: 1.7, fontWeight: 300 }}>{report.co_robisz_dobrze}</p>
          </div>
        )}

        {report.co_traci_klientow && (
          <div style={{ background: '#111C2E', border: '1.5px solid #1A2540', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#8892A4', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>⚠️ Co traci dla ciebie klientów</div>
            {report.co_traci_klientow.split('\n\n').map((p, i) => (
              <p key={i} style={{ color: '#F0F4FF', fontSize: '15px', lineHeight: 1.7, fontWeight: 300, marginBottom: '10px' }}>{p}</p>
            ))}
          </div>
        )}

        {report.plan_dzialania?.length > 0 && (
          <div style={{ background: '#111C2E', border: '1.5px solid #1A2540', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#8892A4', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>📋 Plan działania</div>
            {report.plan_dzialania.map((krok, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <div style={{ color: '#00D4B4', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>Krok {i + 1} — {krok.nazwa}</div>
                <p style={{ color: '#F0F4FF', fontSize: '15px', lineHeight: 1.7, fontWeight: 300 }}>{krok.opis}</p>
              </div>
            ))}
          </div>
        )}

        {report.cta && (
          <div style={{ background: '#00D4B4', borderRadius: '16px', padding: '32px', textAlign: 'center', marginTop: '24px' }}>
            <p style={{ color: '#080C14', fontSize: '15px', lineHeight: 1.6, marginBottom: '20px', fontWeight: 500 }}>{report.cta}</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#kontakt" style={{ background: '#080C14', color: '#00D4B4', borderRadius: '10px', padding: '12px 20px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>Umów konsultację</a>
              <a href="mailto:kontakt@biesiadastudio.pl" style={{ background: '#080C14', color: '#00D4B4', borderRadius: '10px', padding: '12px 20px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>Napisz na email</a>
              <a href="https://wa.me/48000000000" style={{ background: '#080C14', color: '#00D4B4', borderRadius: '10px', padding: '12px 20px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>WhatsApp</a>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ background: '#0D1420', border: '1.5px solid #1A2540', borderRadius: '20px', padding: '60px', textAlign: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #1A2540', borderTopColor: '#00D4B4', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 20px' }} />
        <div style={{ color: '#F0F4FF', fontSize: '18px', fontWeight: 700, marginBottom: '8px', fontFamily: 'Syne, sans-serif' }}>Analizujemy twoją firmę...</div>
        <div style={{ color: '#8892A4', fontSize: '14px' }}>Przygotowujemy spersonalizowany raport</div>
      </div>
    );
  }

  return (
    <div style={{ background: '#0D1420', border: '1.5px solid #1A2540', borderRadius: '20px', padding: '40px', textAlign: 'left' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#8892A4', fontSize: '13px' }}>Krok {step} z {totalSteps}</span>
          <span style={{ color: '#00D4B4', fontSize: '13px', fontWeight: 600 }}>{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div style={{ background: '#1A2540', borderRadius: '100px', height: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${(step / totalSteps) * 100}%`, height: '100%', background: '#00D4B4', borderRadius: '100px', transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {step === 1 && (
        <div>
          <div style={{ color: '#8892A4', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Krok 1 — Twoja firma</div>
          <h3 style={{ color: '#F0F4FF', fontSize: '22px', fontWeight: 700, marginBottom: '24px', fontFamily: 'Syne, sans-serif' }}>Jak się nazywa twoja firma i czym się zajmujesz?</h3>
          <textarea value={form.nazwa} onChange={e => updateForm('nazwa', e.target.value)} placeholder="Np. Salon fryzjerski Anna — strzyżenie, koloryzacja, stylizacja..." style={{ ...inputStyle, minHeight: '100px', resize: 'none' }} />
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
            <button style={btnPrimary} onClick={() => form.nazwa.trim() && setStep(2)} disabled={!form.nazwa.trim()}>Dalej →</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div style={{ color: '#8892A4', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Krok 2 — Social Media</div>
          <h3 style={{ color: '#F0F4FF', fontSize: '22px', fontWeight: 700, marginBottom: '24px', fontFamily: 'Syne, sans-serif' }}>Na jakich platformach jesteś aktywny?</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['Instagram', 'Facebook', 'TikTok', 'LinkedIn', 'YouTube', 'Inne'].map(p => (
              <button key={p} style={optionStyle(form.platformy.includes(p))} onClick={() => togglePlatform(p)}>{p}</button>
            ))}
          </div>
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            <button style={btnSecondary} onClick={() => setStep(1)}>← Wróć</button>
            <button style={btnPrimary} onClick={() => setStep(3)}>Dalej →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div style={{ color: '#8892A4', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Krok 3 — Regularność</div>
          <h3 style={{ color: '#F0F4FF', fontSize: '22px', fontWeight: 700, marginBottom: '24px', fontFamily: 'Syne, sans-serif' }}>Jak często publikujesz treści?</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { val: 'kilka_tydzien', label: 'Kilka razy w tygodniu' },
              { val: 'raz_tydzien', label: 'Raz w tygodniu' },
              { val: 'kilka_miesiac', label: 'Kilka razy w miesiącu' },
              { val: 'rzadko', label: 'Rzadko lub wcale' },
            ].map(o => (
              <button key={o.val} style={optionStyle(form.czestotliwosc === o.val)} onClick={() => updateForm('czestotliwosc', o.val)}>{o.label}</button>
            ))}
          </div>
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            <button style={btnSecondary} onClick={() => setStep(2)}>← Wróć</button>
            <button style={btnPrimary} onClick={() => form.czestotliwosc && setStep(4)} disabled={!form.czestotliwosc}>Dalej →</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <div style={{ color: '#8892A4', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Krok 4 — Strona internetowa</div>
          <h3 style={{ color: '#F0F4FF', fontSize: '22px', fontWeight: 700, marginBottom: '24px', fontFamily: 'Syne, sans-serif' }}>Czy masz stronę internetową?</h3>
          <input value={form.strona} onChange={e => updateForm('strona', e.target.value)} placeholder="Wklej link do strony (opcjonalnie)" style={{ ...inputStyle, marginBottom: '16px' }} />
          <div style={{ border: '1.5px dashed #1A2540', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer' }} onClick={() => document.getElementById('zdjecie-input')?.click()}>
            <input id="zdjecie-input" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            <div style={{ color: form.zdjecie ? '#00D4B4' : '#8892A4', fontSize: '14px' }}>
              {form.zdjecie ? '✅ Zdjęcie dodane' : '📷 Dodaj zdjęcie profilu lub posta (opcjonalnie)'}
            </div>
          </div>
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            <button style={btnSecondary} onClick={() => setStep(3)}>← Wróć</button>
            <button style={btnPrimary} onClick={() => setStep(5)}>Dalej →</button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <div style={{ color: '#8892A4', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Krok 5 — Klienci</div>
          <h3 style={{ color: '#F0F4FF', fontSize: '22px', fontWeight: 700, marginBottom: '24px', fontFamily: 'Syne, sans-serif' }}>Skąd głównie pozyskujesz klientów?</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { val: 'polecenia', label: 'Głównie z polecień od znajomych i obecnych klientów' },
              { val: 'po_rowno', label: 'Po równo — i z internetu i z polecień' },
              { val: 'internet', label: 'Głównie z internetu — social media lub strona mi sprzedają' },
              { val: 'nie_wiem', label: 'Szczerze nie wiem skąd przychodzą moi klienci' },
            ].map(o => (
              <button key={o.val} style={optionStyle(form.zrodloKlientow === o.val)} onClick={() => updateForm('zrodloKlientow', o.val)}>{o.label}</button>
            ))}
          </div>
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            <button style={btnSecondary} onClick={() => setStep(4)}>← Wróć</button>
            <button style={btnPrimary} onClick={() => form.zrodloKlientow && setStep(6)} disabled={!form.zrodloKlientow}>Dalej →</button>
          </div>
        </div>
      )}

      {step === 6 && (
        <div>
          <div style={{ color: '#8892A4', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Krok 6 — Problem</div>
          <h3 style={{ color: '#F0F4FF', fontSize: '22px', fontWeight: 700, marginBottom: '24px', fontFamily: 'Syne, sans-serif' }}>Co najbardziej przeszkadza ci w pozyskiwaniu klientów przez internet?</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { val: 'czas', label: 'Brak czasu — prowadzenie firmy zajmuje mi cały dzień' },
              { val: 'pomysly', label: 'Nie wiem co publikować żeby przyciągać klientów a nie tylko lajki' },
              { val: 'efekty', label: 'Publikuję regularnie ale to nie przekłada się na zapytania od klientów' },
            ].map(o => (
              <button key={o.val} style={optionStyle(form.problemOnline === o.val)} onClick={() => updateForm('problemOnline', o.val)}>{o.label}</button>
            ))}
            <input value={form.problemOnlineCustom} onChange={e => { updateForm('problemOnlineCustom', e.target.value); updateForm('problemOnline', 'custom'); }} placeholder="Opisz swoimi słowami..." style={inputStyle} />
          </div>
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            <button style={btnSecondary} onClick={() => setStep(5)}>← Wróć</button>
            <button style={btnPrimary} onClick={() => (form.problemOnline || form.problemOnlineCustom) && setStep(7)} disabled={!form.problemOnline && !form.problemOnlineCustom}>Dalej →</button>
          </div>
        </div>
      )}

      {step === 7 && (
        <div>
          <div style={{ color: '#8892A4', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Krok 7 — Cel</div>
          <h3 style={{ color: '#F0F4FF', fontSize: '22px', fontWeight: 700, marginBottom: '24px', fontFamily: 'Syne, sans-serif' }}>Co chcesz poprawić w swojej obecności online?</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { val: 'social_klienci', label: 'Social media które przynoszą klientów' },
              { val: 'strona', label: 'Profesjonalna strona która sprzedaje' },
              { val: 'content', label: 'Wiedzieć co publikować żeby to działało' },
              { val: 'wizerunek', label: 'Profesjonalny i spójny wygląd w internecie' },
            ].map(o => (
              <button key={o.val} style={optionStyle(form.celOnline === o.val)} onClick={() => updateForm('celOnline', o.val)}>{o.label}</button>
            ))}
            <input value={form.celOnlineCustom} onChange={e => { updateForm('celOnlineCustom', e.target.value); updateForm('celOnline', 'custom'); }} placeholder="Opisz swoimi słowami..." style={inputStyle} />
          </div>
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            <button style={btnSecondary} onClick={() => setStep(6)}>← Wróć</button>
            <button style={btnPrimary} onClick={() => (form.celOnline || form.celOnlineCustom) && setStep(8)} disabled={!form.celOnline && !form.celOnlineCustom}>Dalej →</button>
          </div>
        </div>
      )}

      {step === 8 && (
        <div>
          <div style={{ color: '#8892A4', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Krok 8 — Twój klient</div>
          <h3 style={{ color: '#F0F4FF', fontSize: '22px', fontWeight: 700, marginBottom: '12px', fontFamily: 'Syne, sans-serif' }}>Opisz swojego typowego klienta</h3>
          <p style={{ color: '#8892A4', fontSize: '14px', marginBottom: '20px' }}>Kto to jest i dlaczego kupuje u ciebie? Czy próbowałeś już coś robić żeby poprawić swoją obecność online i co z tego wyszło?</p>
          <textarea value={form.opisKlienta} onChange={e => updateForm('opisKlienta', e.target.value)} placeholder="Np. Moi klienci to głównie kobiety 25-45 lat które szukają salonu w okolicy. Próbowałem prowadzić Instagram ale nie miałem czasu na regularne posty..." style={{ ...inputStyle, minHeight: '140px', resize: 'none' }} />
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            <button style={btnSecondary} onClick={() => setStep(7)}>← Wróć</button>
            <button style={btnPrimary} onClick={() => form.opisKlienta.trim() && setStep(9)} disabled={!form.opisKlienta.trim()}>Dalej →</button>
          </div>
        </div>
      )}

      {step === 9 && (
        <div>
          <div style={{ color: '#8892A4', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Krok 9 — Twój raport</div>
          <h3 style={{ color: '#F0F4FF', fontSize: '22px', fontWeight: 700, marginBottom: '12px', fontFamily: 'Syne, sans-serif' }}>Na jaki email wysłać ci raport?</h3>
          <p style={{ color: '#8892A4', fontSize: '14px', marginBottom: '20px' }}>Raport pojawi się od razu na stronie. Email zostawiamy tylko do kontaktu.</p>
          <input type="email" value={form.email} onChange={e => updateForm('email', e.target.value)} placeholder="twoj@email.pl" style={{ ...inputStyle, marginBottom: '24px' }} />
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            <button style={btnSecondary} onClick={() => setStep(8)}>← Wróć</button>
            <button
              style={{ ...btnPrimary, opacity: form.email.includes('@') ? 1 : 0.5 }}
              onClick={() => form.email.includes('@') && handleSubmit()}
              disabled={!form.email.includes('@')}
            >
              Wygeneruj mój raport →
            </button>
          </div>
        </div>
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

        <div className="mt-14">
          <AuditForm />
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
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 rounded-md border border-border-card flex items-center justify-center text-text-secondary hover:text-accent hover:border-border-active transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="w-10 h-10 rounded-md border border-border-card flex items-center justify-center text-text-secondary hover:text-accent hover:border-border-active transition-colors"
            >
              <Music2 className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border-card flex flex-col sm:flex-row justify-between gap-3 text-xs text-text-muted">
          <span>© 2025 Biesiada Studio</span>
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