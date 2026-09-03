import { useEffect, useState } from "react";
import {
  IconMed,
  IconLab,
  IconVisit,
  IconCross,
  IconCalendarCheck,
  IconCheckDouble,
  IconPlayFilled,
  IconChevronRight,
  IconHome,
  IconStethoscope,
  IconGrid,
  IconArticle,
  IconChat,
  IconSettings,
  IconArrowLeft,
  IconPhone,
  IconArrowUpRight,
  IconTelegram,
  IconWhatsApp,
} from "./components/Icons";

const waveBars = [6, 12, 18, 10, 22, 15, 26, 12, 20, 9, 16, 24, 11, 18, 8];

const services = [
  { title: "Shaxsiy maslahat", text: "Shikoyatlaringizni tinglaymiz va individual davolash yo‘lini tanlaymiz.", image: "/service-consultation.png", tag: "MASLAHAT", icon: IconVisit },
  { title: "UTT diagnostikasi", text: "Buyrak, siydik pufagi va prostata holatini zamonaviy UTT bilan aniqlaymiz.", image: "/service-ultrasound.png", tag: "DIAGNOSTIKA", icon: IconLab },
  { title: "Tahlil va nazorat", text: "Natijalarni tushuntirib, sog‘lig‘ingizni muntazam kuzatib boramiz.", image: "/service-results.png", tag: "NAZORAT", icon: IconMed },
];

const translations = {
  UZ: { home: "Bosh sahifa", doctor: "Shifokor", services: "Xizmatlar", portal: "Portal", heroA: "Zamonaviy urologik", heroB: "yordam", nameLine: "Dr. Xaydaraliyev S.A.", togetherLine: "bilan birga", doctorName: "Dr. Xaydaraliyev S.A.", desc: "Malakali urolog shifokor bilan onlayn va offline maslahatlashuv, aniq diagnostika va individual davolash rejasi.", appointment: "Qabulga yozilish", about: "Shifokor haqida", experience: "Tajriba va ta’lim", process: "Qabul jarayoni", info: "Foydali ma’lumotlar", blog: "Shifokor blogi", faq: "Savol-javob", online: "Onlayn xizmatlar", feedback: "Bemorlar fikri", contact: "Aloqa", consultation: "Online maslahat", close: "Menyuni yopish", servicesEyebrow: "UROcare xizmatlari", servicesTitle: "Sizga kerakli urologik yordam", details: "Batafsil", hint: "Kartani tanlang — xizmat haqida qisqacha ma’lumot ochiladi", patientChat: "Salom, o‘zimni yomon his qilyapman 🙁", doctorChat: "Assalomu alaykum! Qanday shikoyatingiz bor?" },
  RU: { home: "Главная", doctor: "Врач", services: "Услуги", portal: "Портал", heroA: "Современная", heroB: "урологическая помощь", nameLine: "вместе с доктором", togetherLine: "Хайдаралиевым С.А.", doctorName: "Д-р Хайдаралиев С.А.", desc: "Онлайн и очные консультации уролога, точная диагностика и индивидуальный план лечения.", appointment: "Записаться на приём", about: "О враче", experience: "Опыт и образование", process: "Как проходит приём", info: "Полезная информация", blog: "Блог врача", faq: "Вопросы и ответы", online: "Онлайн-сервисы", feedback: "Отзывы пациентов", contact: "Контакты", consultation: "Онлайн-консультация", close: "Закрыть меню", servicesEyebrow: "УСЛУГИ UROCARE", servicesTitle: "Нужная вам урологическая помощь", details: "Подробнее", hint: "Выберите карточку — откроется краткая информация об услуге", patientChat: "Здравствуйте, я плохо себя чувствую 🙁", doctorChat: "Здравствуйте! Что вас беспокоит?" },
  EN: { home: "Home", doctor: "Doctor", services: "Services", portal: "Portal", heroA: "Modern urological", heroB: "care", nameLine: "with Dr. Xaydaraliyev", togetherLine: "S.A.", doctorName: "Dr. Xaydaraliyev S.A.", desc: "Online and in-person consultations with an experienced urologist, accurate diagnostics and an individual treatment plan.", appointment: "Book an appointment", about: "About the doctor", experience: "Experience & education", process: "How appointments work", info: "Health guides", blog: "Doctor's blog", faq: "Questions & answers", online: "Online services", feedback: "Patient feedback", contact: "Contact", consultation: "Online consultation", close: "Close menu", servicesEyebrow: "UROCARE SERVICES", servicesTitle: "The urological support you need", details: "Learn more", hint: "Choose a card to see a short service overview", patientChat: "Hello, I don't feel well 🙁", doctorChat: "Hello! What symptoms are you experiencing?" },
};

const awarenessCopy = {
  UZ: [
    { image: "/no-smoking-clean.png", tone: "smoke", kicker: "PROFILAKTIKA", title: "Chekish — urologik salomatlik uchun xavf.", text: "Chekishni tashlash sog‘lig‘ingiz uchun muhim qadamdir." },
    { image: "/uro-cleaned.png", tone: "men", kicker: "ERKAKLAR SALOMATLIGI", title: "Erektil disfunktsiya har qanday yoshda uchrashi mumkin.", text: "Uyalmang — urolog bilan ochiq suhbatdan boshlang." },
    { image: "/kidney-clean.png", tone: "kidney", kicker: "BUYRAKLARNI ASRANG", title: "Buyraklaringizga imkon bering.", text: "Suv iching, to‘g‘ri ovqatlaning va tekshiruvdan o‘ting." },
  ],
  RU: [
    { image: "/no-smoking-clean.png", tone: "smoke", kicker: "ПРОФИЛАКТИКА", title: "Курение — риск для урологического здоровья.", text: "Отказ от курения — важный шаг к здоровью." },
    { image: "/uro-cleaned.png", tone: "men", kicker: "МУЖСКОЕ ЗДОРОВЬЕ", title: "Эректильная дисфункция возможна в любом возрасте.", text: "Не стесняйтесь — начните с открытого разговора с урологом." },
    { image: "/kidney-clean.png", tone: "kidney", kicker: "БЕРЕГИТЕ ПОЧКИ", title: "Дайте почкам шанс на здоровье.", text: "Пейте воду, правильно питайтесь и проходите обследования." },
  ],
  EN: [
    { image: "/no-smoking-clean.png", tone: "smoke", kicker: "PREVENTION", title: "Smoking is a risk to urological health.", text: "Quitting is an important step towards better health." },
    { image: "/uro-cleaned.png", tone: "men", kicker: "MEN'S HEALTH", title: "Erectile dysfunction can occur at any age.", text: "Do not hesitate — start with an open conversation with a urologist." },
    { image: "/kidney-clean.png", tone: "kidney", kicker: "KIDNEY HEALTH", title: "Give your kidneys a healthier future.", text: "Stay hydrated, eat well and have regular check-ups." },
  ],
};

const demoBlogPosts = [
  { id: "demo-1", number: "01", label: "DR. XAYDARALIYEV TAVSIYASI", title: "Urologga qachon murojaat qilish kerak?", minutes: "5", image: "/doctor-xaydaraliyev-hero-v2.png" },
  { id: "demo-2", number: "02", label: "DR. XAYDARALIYEV TUSHUNTIRADI", title: "UTT tekshiruviga tayyorgarlik bo‘yicha qisqa qo‘llanma", minutes: "4", image: "/service-ultrasound.png" },
  { id: "demo-3", number: "03", label: "SHIFOKOR MASLAHATI", title: "Buyrak salomatligi uchun 6 oddiy tavsiya", minutes: "3", image: "/service-results.png" },
];

const fallbackBlogImages = ["/doctor-xaydaraliyev-hero-v2.png", "/service-ultrasound.png", "/service-results.png"];

function App() {
  const [message, setMessage] = useState("");
  const [portalOpen, setPortalOpen] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [language, setLanguage] = useState("UZ");
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [blogEditorOpen, setBlogEditorOpen] = useState(false);
  const [blogDraft, setBlogDraft] = useState({ label: "SHIFOKOR MASLAHATI", title: "", minutes: "3" });
  const [blogPosts, setBlogPosts] = useState(() => {
    try {
      const saved = localStorage.getItem("xaydaraliyev-blog-posts");
      return saved ? JSON.parse(saved) : demoBlogPosts;
    } catch {
      return demoBlogPosts;
    }
  });
  const t = translations[language];
  const localizedServices = language === "RU" ? [
    { ...services[0], title: "Персональная консультация", text: "Выслушаем жалобы и подберём индивидуальный путь лечения.", tag: "КОНСУЛЬТАЦИЯ" },
    { ...services[1], title: "УЗИ-диагностика", text: "Оценим состояние почек, мочевого пузыря и простаты на современном УЗИ.", tag: "ДИАГНОСТИКА" },
    { ...services[2], title: "Анализы и наблюдение", text: "Объясним результаты и будем регулярно следить за вашим здоровьем.", tag: "НАБЛЮДЕНИЕ" },
  ] : language === "EN" ? [
    { ...services[0], title: "Personal consultation", text: "We listen to your concerns and choose an individual treatment path.", tag: "CONSULTATION" },
    { ...services[1], title: "Ultrasound diagnostics", text: "We assess the kidneys, bladder and prostate with modern ultrasound.", tag: "DIAGNOSTICS" },
    { ...services[2], title: "Tests and follow-up", text: "We explain results and monitor your health over time.", tag: "FOLLOW-UP" },
  ] : services;
  const nextLanguage = () => setLanguage((current) => ({ UZ: "RU", RU: "EN", EN: "UZ" })[current]);
  const book = () => setMessage("Qabul so‘rovi yuborildi. Tez orada siz bilan bog‘lanamiz.");
  const finishDrag = (event) => {
    if (dragStart !== null && event.clientX - dragStart > 48) setPortalOpen(true);
    setDragStart(null);
  };
  const goTo = (selector) => {
    setPortalOpen(false);
    window.setTimeout(() => document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" }), 220);
  };
  const submitAppointment = (event) => {
    event.preventDefault();
    setMessage("Demo qabul so‘rovi qabul qilindi. Tez orada siz bilan bog‘lanamiz.");
  };
  const publishPost = (event) => {
    event.preventDefault();
    const title = blogDraft.title.trim();
    if (!title) return;
    const post = {
      id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
      number: String(blogPosts.length + 1).padStart(2, "0"),
      label: blogDraft.label.trim() || "SHIFOKOR MASLAHATI",
      title,
      minutes: blogDraft.minutes || "3",
    };
    setBlogPosts((current) => [post, ...current]);
    setBlogDraft({ label: "SHIFOKOR MASLAHATI", title: "", minutes: "3" });
    setBlogEditorOpen(false);
    setMessage(language === "RU" ? "Новая статья опубликована в демо-блоге." : "Yangi maqola demo blogga joylandi.");
  };
  const nextQuiz = (points) => {
    const next = quizScore + points;
    if (quizStep === 2) { setQuizScore(next); setQuizDone(true); return; }
    setQuizScore(next); setQuizStep(quizStep + 1);
  };
  const moveHero = (event) => {
    const hero = event.currentTarget;
    const bounds = hero.getBoundingClientRect();
    hero.style.setProperty("--hero-x", `${((event.clientX - bounds.left) / bounds.width - .5) * 2}`);
    hero.style.setProperty("--hero-y", `${((event.clientY - bounds.top) / bounds.height - .5) * 2}`);
  };
  const resetHero = (event) => {
    event.currentTarget.style.setProperty("--hero-x", "0");
    event.currentTarget.style.setProperty("--hero-y", "0");
  };
  useEffect(() => {
    const sections = document.querySelectorAll(".reveal-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("xaydaraliyev-blog-posts", JSON.stringify(blogPosts));
    } catch {
      // Demo blog still works during the active visit if browser storage is unavailable.
    }
  }, [blogPosts]);

  return (
    <main className={`clinic-page ${portalOpen ? "page-shifted" : ""}`}>
      <section className="hero2" id="top" onPointerMove={moveHero} onPointerLeave={resetHero}>
        <svg className="hero2-shape" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="goldGrad" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#f2dcab" />
              <stop offset="45%" stopColor="#e3ac60" />
              <stop offset="100%" stopColor="#c07f3e" />
            </linearGradient>
          </defs>
          <path d="M69,0 L100,0 L100,100 L44,100 C54,74 58,32 69,0 Z" fill="url(#goldGrad)" />
        </svg>

        <nav className="nav2">
          <a className="brand2" href="#top">
            <span className="brand-icon"><IconCross /></span>
            UROcare
          </a>
          <div className="nav-links2">
            <a href="#top">{t.home}</a><a href="#shifokor">{t.doctor}</a><a href="#xizmatlar">{t.services}</a><button className="nav-portal-link" onClick={() => setPortalOpen(true)}>{t.portal}</button>
          </div>
        </nav>

        <div className="hero2-grid">
          <div className="hero2-left">
            <h1 className="hero2-title">
              <span className="grad-line">{t.heroA}</span><span className="grad-line">{t.heroB}</span>
              <span className="black-line">{t.nameLine}</span>
              <span className="black-line">{t.togetherLine}</span>
            </h1>
            <p className="hero2-desc">
              {t.desc}
            </p>
            <button className="hero2-cta" onClick={book}>
              <span className="cta-arrow"><IconCalendarCheck /></span>
              {t.appointment}
            </button>
          </div>

          <div className="hero2-right">
            <img className="hero2-doctor" src="/doctor-xaydaraliyev-hero-v2.png" alt={`${t.doctorName} — ${language === "RU" ? "уролог" : "urolog"}`} />

            <div className="float-card call-card card-d1">
              <img src="/doctor-hero-bust.png" alt="" />
              <span className="call-time">10:57</span>
              <span className="call-mini-avatar" />
            </div>

            <div className="float-card doc-chip card-d2">
              <img src="/doctor-hero-bust.png" alt="" />
              <span>{t.doctorName}</span>
            </div>

            <div className="float-card chat-bubble bubble-in card-d3">
              <p>{t.patientChat}</p>
              <span className="bubble-meta">11:34 <IconCheckDouble /></span>
            </div>
            <div className="float-card voice-bubble card-d4">
              <button className="voice-play" aria-label="Ovozli xabarni tinglash"><IconPlayFilled /></button>
              <span className="voice-wave" aria-hidden="true">
                {waveBars.map((h, i) => (
                  <i key={i} style={{ height: `${h}px` }} />
                ))}
              </span>
              <span className="voice-time">0:32</span>
            </div>

            <div className="float-card chat-bubble bubble-out card-greeting">
              <p>{t.doctorChat}</p>
              <span className="bubble-meta">10:57 <IconCheckDouble /></span>
            </div>
          </div>
        </div>
      </section>

      <div className={`portal-overlay ${portalOpen ? "is-open" : ""}`} onClick={() => setPortalOpen(false)}>
        <aside className="portal-drawer portal-side" aria-label="Bosh sahifa menyusi" onClick={(event) => event.stopPropagation()}>
          <div className="drawer-handle" onPointerDown={(event) => setDragStart(event.clientX)} onPointerUp={finishDrag}><span /> Yopish</div>
          <div className="portal-logo"><span><IconCross /></span> UROcare <small>menu</small></div>
          <button className="side-current" onClick={() => goTo('#top')}><IconHome /> {t.home}</button><button onClick={() => goTo('#shifokor')}><IconStethoscope /> {t.about}</button><button onClick={() => goTo('#tajriba')}><IconArticle /> {t.experience}</button><button onClick={() => goTo('#xizmatlar')}><IconGrid /> {t.services}</button><button onClick={() => goTo('#jarayon')}><IconCalendarCheck /> {t.process}</button><button onClick={() => goTo('#foydali')}><IconArticle /> {t.info}</button><button onClick={() => goTo('#blog')}><IconArticle /> {t.blog}</button><button onClick={() => goTo('#savollar')}><IconChat /> {t.faq}</button><button onClick={() => goTo('#raqamli')}><IconCalendarCheck /> {t.online}</button><button onClick={() => goTo('#fikrlar')}><IconArticle /> {t.feedback}</button><button onClick={() => goTo('#boglanish')}><IconPhone /> {t.contact}</button><button onClick={() => { setPortalOpen(false); book(); }}><IconChat /> {t.consultation}</button><div className="side-bottom"><button><IconSettings /> Sozlamalar</button><button onClick={() => setPortalOpen(false)}><IconArrowLeft /> {t.close}</button></div>
        </aside>
      </div>
      <button className="portal-drag" aria-label="Bemor portalini chapdan ochish" onClick={() => setPortalOpen(true)} onPointerDown={(event) => setDragStart(event.clientX)} onPointerUp={finishDrag}>
        <b className="portal-drag-chevron"><IconChevronRight /></b>
      </button>
      <button className="language-switch" onClick={nextLanguage} aria-label="Tilni almashtirish"><b>{language}</b><span>{language === "UZ" ? "РУС" : language === "RU" ? "ENG" : "O‘ZB"}</span></button>

      <section className="services reveal-section" id="xizmatlar">
        <div className="services-heading">
          <div>
            <p className="eyebrow dark">{t.servicesEyebrow}</p><h2>{t.servicesTitle}</h2>
          </div>
          <div>
            <a className="call-link" href="tel:+998901234567">
              <span className="call-icon"><IconPhone /></span>
              +998 90 123 45 67
            </a>
            <button className="outline-button" onClick={book}>
              <span className="outline-arrow"><IconCalendarCheck /></span>
              {t.appointment}
            </button>
          </div>
        </div>
        <div className="service-grid">
          {localizedServices.map(({ title, text, image, tag, icon: Icon }) => (
            <article className="service-card" key={title}>
              <div className="service-visual">
                <img src={image} alt="" />
                <div className="service-tint" />
                <div className="service-icon"><Icon /></div>
                <span className="service-tag">{tag}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <button className="service-link" onClick={() => setMessage(`${title}: mutaxassis maslahatiga yozilish`)}>
                {t.details} <IconArrowUpRight />
              </button>
            </article>
          ))}
        </div>
        <p className="service-hint"><i /> {t.hint}</p>
      </section>
      <section className="doctor-profile reveal-section" id="tajriba">
        <div className="profile-intro"><p className="eyebrow dark">Mutaxassis haqida</p><h2>Urologik masalalarda<br /><em>aniq va xotirjam</em><br />yondashuv.</h2><p><b>{t.doctorName}</b> {language === "RU" ? "придерживается открытого диалога, тщательного обследования и индивидуального плана лечения." : "bemor bilan ochiq muloqot, puxta tekshiruv va individual davolash rejasiga e’tibor qaratadi."}</p><button className="profile-cta" onClick={book}>Qabulga yozilish <IconArrowUpRight /></button></div>
        <div className="profile-stats"><div><b>10+</b><span>yillik klinik amaliyot</span></div><div><b>1000+</b><span>mamnun bemorlar</span></div><div><b>1:1</b><span>individual yondashuv</span></div></div>
        <div className="profile-timeline"><p>TAJRIBA VA TA’LIM · DEMO</p><article><span>2014</span><div><b>Toshkent tibbiyot akademiyasi</b><small>Davolash ishi yo‘nalishi bo‘yicha oliy tibbiy ta’lim.</small></div></article><article><span>2017</span><div><b>Urologiya bo‘yicha klinik ordinatura</b><small>Urologik kasalliklarni tashxislash va davolash bo‘yicha amaliy tayyorgarlik.</small></div></article><article><span>2019–hozir</span><div><b>Urolog shifokor</b><small>Xususiy klinikada ambulator qabul, UTT diagnostikasi va davolash nazorati.</small></div></article></div>
      </section>
      <section className="care-flow reveal-section" id="jarayon"><div><p className="eyebrow dark">Qabul jarayoni</p><h2>Ko‘rikdan aniq<br />rejagacha — 3 qadam.</h2></div><div className="flow-steps"><article><span>01</span><b>Qabulga yoziling</b><p>Telefon yoki onlayn forma orqali qulay vaqtni tanlang.</p></article><article><span>02</span><b>Ko‘rik va tekshiruv</b><p>Shikoyatlarni muhokama qilamiz va kerakli tekshiruvni belgilaymiz.</p></article><article><span>03</span><b>Davolash rejasi</b><p>Natijalarga tayangan holda sizga mos reja tuziladi.</p></article></div></section>
      <section className="mens-health-story reveal-section" aria-labelledby="mens-health-title">
        <div className="mens-health-intro"><p className="eyebrow">ERKAKLAR SALOMATLIGI</p><h2 id="mens-health-title">Uyalmang.<br /><em>Vaqtida</em> gaplashing.</h2><p>Urologik savollar juda shaxsiy bo‘lishi mumkin. Qabul esa aynan shunday suhbat uchun xotirjam, maxfiy va professional makon.</p><button onClick={book}>Maxfiy maslahat olish <IconArrowUpRight /></button></div>
        <figure className="mens-health-image"><img src="/uro-mens-health.png" alt="Erkaklar salomatligi bo‘yicha urolog bilan ochiq suhbat" /><figcaption>Har bir savol muhim.</figcaption></figure>
        <div className="symptom-story-card"><img src="/uro-symptoms.png" alt="Tez-tez siyish urologik ko‘rikka sabab bo‘lishi mumkin" /><div><span>ALOMATLARNI KECHIKTIRMANG</span><h3>Tez-tez hojatga chiqish — e’tiborga loyiq belgi.</h3><p>Ayniqsa tunda uyg‘onish yoki siyishdagi noqulaylik davom etsa, urolog bilan maslahatlashish foydali.</p><button onClick={book}>Ko‘rikka yozilish <IconArrowUpRight /></button></div></div>
      </section>
      <section className="urology-explainer reveal-section" aria-labelledby="urology-explainer-title"><div className="explainer-copy"><p className="eyebrow dark">SODDA TUSHUNTIRISH</p><h2 id="urology-explainer-title">Urologiya faqat bitta alomat emas.</h2><p>Buyraklar, siydik yo‘llari, siydik pufagi va prostata bir-biri bilan bog‘liq tizim. To‘g‘ri tashxis muammoning manbasini aniqlashdan boshlanadi.</p><ul><li>Buyraklar va siydik yo‘llari</li><li>Siydik pufagi faoliyati</li><li>Prostata salomatligi</li></ul></div><img className="anatomy-poster" src="/uro-anatomy.png" alt="Siydik chiqarish tizimi anatomiyasi" /></section>
      <section className="insights reveal-section" id="foydali" aria-label="Urologiya bo‘yicha foydali ma'lumotlar">
        <div className="insights-lead">
          <p className="eyebrow dark">Foydali ma’lumotlar</p>
          <h2>Salomatlikni<br /><em>vaqtida</em> eshiting.</h2>
          <p>Oddiy alomatlarni e’tiborsiz qoldirmang. Urolog ko‘rigi sizga xotirjamlik va aniq yo‘l-yo‘riq beradi.</p>
          <button className="insight-cta" onClick={book}>Ko‘rikka yozilish <IconArrowUpRight /></button>
          <span className="insight-caption">01 — profilaktika har doim davolashdan oson</span>
        </div>
        <div className="insights-feature insights-feature-doctor">
          <img src="/doctor-xaydaraliyev-hero-v2.png" alt={`${t.doctorName} — ${language === "RU" ? "уролог" : language === "EN" ? "urologist" : "urolog shifokor"}`} />
          <div className="feature-fade" />
          <div className="feature-label"><span>UROCARE GUIDE</span><b>Har bir savol<br />muhim.</b></div>
        </div>
        <div className="post-grid">
          {[
            ["/guide-consultation.png", "Tekshiruv", "Qachon urologga murojaat qilish kerak?"],
            ["/guide-prevention.png", "Oldini olish", "Kundalik odatlar salomatlikka qanday ta’sir qiladi?"],
            ["/guide-ultrasound.png", "Diagnostika", "UTT tekshiruviga qanday tayyorlanish kerak?"],
            ["/guide-care.png", "G‘amxo‘rlik", "Ochiq suhbat — to‘g‘ri tashxisning boshlanishi"],
          ].map(([image, label, title]) => (
            <button className="post-card" key={title} onClick={() => setMessage(`${title}: maqola tez orada ochiladi`)}>
              <img src={image} alt="" />
              <span>{label}</span><b>{title}</b><IconArrowUpRight />
            </button>
          ))}
        </div>
        <div className="awareness-grid" aria-label={language === "RU" ? "Материалы по профилактике" : language === "EN" ? "Prevention resources" : "Profilaktika bo‘yicha materiallar"}>
          {awarenessCopy[language].map((item) => (
            <article className={`awareness-card ${item.tone}`} key={item.tone}>
              <img src={item.image} alt="" />
              <div className="awareness-mask" aria-hidden="true" />
              <div className="awareness-copy">
                <span>{item.kicker}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <button onClick={() => setMessage(`${item.title}: ${language === "EN" ? "article coming soon" : language === "RU" ? "статья скоро будет доступна" : "maqola tez orada ochiladi"}`)}>{t.details} <IconArrowUpRight /></button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="doctor-note reveal-section" id="shifokor">
        <div className="note-mark">“</div>
        <div><p>{t.doctorName} · {language === "RU" ? "уролог" : "Urolog"}</p><h2>Salomatlik haqida ochiq gaplashish — to‘g‘ri davolashning birinchi qadami.</h2></div>
        <button className="note-button" onClick={book}>Muloqotni boshlash <IconArrowUpRight /></button>
      </section>
      <section className="prevention-callout reveal-section" aria-label="Profilaktik ko‘rikka yozilish"><img src="/uro-prevention.png" alt="Profilaktik ko‘rik urologik muammolarni erta aniqlashga yordam beradi" /><div><p className="eyebrow dark">PROFILAKTIK KO‘RIK</p><h2>Sog‘lig‘ingizni<br />nazoratga oling.</h2><p>Alomatlar kuchayishini kutmang. Oddiy profilaktik ko‘rik sizga xotirjamlik va keyingi qadamlar bo‘yicha aniq tavsiya beradi.</p><button onClick={book}>Profilaktik ko‘rikka yozilish <IconArrowUpRight /></button></div></section>
      <section className="digital-care reveal-section" id="raqamli">
        <div className="digital-heading"><p className="eyebrow dark">Onlayn xizmatlar</p><h2>Qabul, natija va maslahat —<br />bir joyda.</h2><p>Bu demo shakllar. Keyin ularni Telegram, WhatsApp yoki klinika tizimiga bog‘laymiz.</p><div className="messenger-links"><a href="https://t.me/urocare_demo" target="_blank" rel="noreferrer"><IconTelegram /> Telegram <IconArrowUpRight /></a><a href="https://wa.me/998901234567" target="_blank" rel="noreferrer"><IconWhatsApp /> WhatsApp <IconArrowUpRight /></a></div></div>
        <form className="appointment-form" onSubmit={submitAppointment}><b>Onlayn qabulga yozilish</b><label>Ismingiz<input required placeholder="Ismingizni kiriting" /></label><label>Telefon raqamingiz<input required type="tel" placeholder="+998 90 123 45 67" /></label><div className="form-row"><label>Sana<input required type="date" /></label><label>Vaqt<select value={selectedTime} onChange={(event) => setSelectedTime(event.target.value)}><option>10:00</option><option>11:30</option><option>14:00</option><option>16:30</option></select></label></div><div className="available-times"><span>Bugun bo‘sh vaqtlar</span>{["10:00", "11:30", "14:00", "16:30"].map((time) => <button type="button" className={selectedTime === time ? "is-picked" : ""} onClick={() => setSelectedTime(time)} key={time}>{time}</button>)}</div><button className="form-submit" type="submit">So‘rov yuborish <IconArrowUpRight /></button></form>
        <div className="upload-card"><p>TAHLIL YOKI UTT NATIJASI</p><h3>Natijangizni yuboring</h3><span>PDF, JPG yoki PNG formatda. Shifokor ko‘rib chiqishidan oldin maxfiy saqlanadi.</span><label className="file-control">Fayl tanlash<input type="file" accept="image/*,.pdf" onChange={(event) => event.target.files?.[0] && setMessage(`${event.target.files[0].name} demo tarzida tanlandi`)} /></label></div>
      </section>
      <section className="proof-section reveal-section" id="fikrlar"><div className="proof-heading"><p className="eyebrow dark">Ishonch va shaffoflik</p><h2>Har bir qadam —<br />tushunarli.</h2></div><div className="testimonial-card"><span>“</span><p>Qabul juda xotirjam o‘tdi. Hamma savollarimga tushunarli javob oldim va keyingi qadamlar aniq tushuntirildi.</p><b>— Bemor fikri, 34 yosh</b><small>Anonim demo sharh</small></div><div className="result-card"><p>NATIJA VA DAVOLASH JARAYONI</p><h3>Muammo → tekshiruv → reja → nazorat</h3><span>Biz “oldin/keyin” rasmlar o‘rniga davolash jarayonini, belgilangan tekshiruvlar va kuzatuv natijalarini bemor roziligi bilan anonim tarzda tushuntiramiz.</span><button onClick={() => setMessage("Davolash jarayoni haqidagi demo maqola tez orada ochiladi")}>Jarayonni ko‘rish <IconArrowUpRight /></button></div><div className="certificate-gallery"><p>SERTIFIKATLAR · DEMO</p>{["Urologiya bo‘yicha sertifikat", "UTT diagnostikasi", "Klinik amaliyot"].map((title, index) => <button key={title} onClick={() => setMessage(`${title}: demo hujjat`)}><span>{String(index + 1).padStart(2, "0")}</span><b>{title}</b><small>Ko‘rish <IconArrowUpRight /></small></button>)}</div></section>
      <section className="blog-section reveal-section" id="blog">
        <div className="blog-heading">
          <p className="eyebrow dark">{language === "RU" ? `Блог врача · ${t.doctorName}` : `${t.doctorName} blogi`}</p>
          <h2>{language === "RU" ? <>Полезные советы<br />от врача.</> : <>Shifokordan<br />foydali maslahatlar.</>}</h2>
          <p>{language === "RU" ? "Личные статьи врача об урологическом здоровье, профилактике и подготовке к осмотру." : "Urologik salomatlik, profilaktika va ko‘rikka tayyorgarlik haqida shifokorning shaxsiy maqolalari."}</p>
          <div className="blog-actions">
            <button className="blog-manage" onClick={() => setBlogEditorOpen(true)}>{language === "RU" ? "Добавить новость" : "Yangilik qo‘shish"} <span>+</span></button>
            <button onClick={() => setMessage(language === "RU" ? "Показаны все демо-статьи." : "Barcha demo maqolalar ko‘rsatildi")}>{language === "RU" ? "Все статьи" : "Barcha maqolalar"} <IconArrowUpRight /></button>
          </div>
        </div>
        <div className="blog-editorial-grid">
          {blogPosts.map((post, index) => <button key={post.id} className={`blog-story ${index === 0 ? "is-lead" : ""}`} onClick={() => setMessage(`${post.title}: ${language === "RU" ? "демо-статья открыта" : language === "EN" ? "demo article opened" : "demo maqola ochildi"}`)}>
            <img src={post.image || fallbackBlogImages[index % fallbackBlogImages.length]} alt="" />
            <span className="story-shade" />
            <span className="story-index">{post.number}</span>
            <div className="story-content">
              <small>{post.label}</small>
              <b>{post.title}</b>
              <em>{t.doctorName} <i /> {post.minutes} {language === "RU" ? "мин. чтения" : language === "EN" ? "min read" : "daqiqa o‘qish"}</em>
            </div>
            <span className="story-arrow"><IconArrowUpRight /></span>
          </button>)}
        </div>
      </section>

      {blogEditorOpen && <div className="blog-editor-overlay" role="presentation" onClick={() => setBlogEditorOpen(false)}>
        <form className="blog-editor" onSubmit={publishPost} onClick={(event) => event.stopPropagation()}>
          <button className="editor-close" type="button" aria-label="Yopish" onClick={() => setBlogEditorOpen(false)}>×</button>
          <p>{language === "RU" ? "ЛИЧНЫЙ БЛОГ ВРАЧА" : "SHIFOKORNING SHAXSIY BLOGI"}</p>
          <h3>{language === "RU" ? "Новая статья или новость" : "Yangi maqola yoki yangilik"}</h3>
          <label>{language === "RU" ? "Рубрика" : "Bo‘lim"}<input value={blogDraft.label} onChange={(event) => setBlogDraft({ ...blogDraft, label: event.target.value })} placeholder="SHIFOKOR MASLAHATI" /></label>
          <label>{language === "RU" ? "Заголовок" : "Sarlavha"}<input required value={blogDraft.title} onChange={(event) => setBlogDraft({ ...blogDraft, title: event.target.value })} placeholder={language === "RU" ? "Напишите тему статьи" : "Maqola mavzusini yozing"} /></label>
          <label>{language === "RU" ? "Время чтения (мин.)" : "O‘qish vaqti (daqiqa)"}<input type="number" min="1" max="60" value={blogDraft.minutes} onChange={(event) => setBlogDraft({ ...blogDraft, minutes: event.target.value })} /></label>
          <button type="submit">{language === "RU" ? "Опубликовать" : "Joylash"} <IconArrowUpRight /></button>
        </form>
      </div>}
      <section className="symptom-test reveal-section"><div><p className="eyebrow dark">Mini-test</p><h2>Urologik alomatlar<br />bo‘yicha qisqa savol.</h2><p>Bu tashxis emas. U faqat qabulga yozilish kerakligini tushunishga yordam beradi.</p></div><div className="quiz-card">{quizDone ? <><p>TEST NATIJASI</p><h3>{quizScore >= 3 ? "Mutaxassis bilan maslahatlashish tavsiya qilinadi." : "Profilaktik ko‘rikni rejalashtirish foydali bo‘lishi mumkin."}</h3><button onClick={() => { setQuizStep(0); setQuizScore(0); setQuizDone(false); }}>Qayta boshlash</button></> : <><span>{quizStep + 1} / 3</span><h3>{["Siyishda achishish yoki noqulaylik bo‘ladimi?", "Tunda tez-tez uyg‘onib siyishga to‘g‘ri keladimi?", "Bu belgilar 7 kundan ortiq davom etyaptimi?"][quizStep]}</h3><div><button onClick={() => nextQuiz(2)}>Ha</button><button onClick={() => nextQuiz(0)}>Yo‘q</button><button onClick={() => nextQuiz(1)}>Ba’zan</button></div></>}</div></section>
      <section className="faq-section reveal-section" id="savollar"><div><p className="eyebrow dark">Savol-javob</p><h2>Eng ko‘p beriladigan savollar</h2></div><div className="faq-list"><details><summary>Qachon urologga murojaat qilish kerak?<IconChevronRight /></summary><p>Siyishda noqulaylik, og‘riq, tez-tez siyish yoki belgilarning uzoq davom etishi bo‘lsa, ko‘rik tavsiya qilinadi.</p></details><details><summary>UTT tekshiruviga qanday tayyorlanaman?<IconChevronRight /></summary><p>Tayyorgarlik tekshiruv turiga bog‘liq. Qabulga yozilganda sizga aniq ko‘rsatma beriladi.</p></details><details><summary>Online maslahat qanday ishlaydi?<IconChevronRight /></summary><p>Sizga qulay vaqtda bog‘lanamiz, shikoyatlaringizni tinglaymiz va keyingi qadamlarni belgilaymiz.</p></details></div></section>
      <footer id="boglanish"><div><b>URO<span>care</span></b><p>Urologik maslahat va zamonaviy diagnostika</p></div><div><a href="tel:+998901234567">+998 90 123 45 67</a><small>Demo aloqa raqami · Qabul: Du–Sh, 09:00–18:00</small></div><div className="footer-copy">Demo manzil: Toshkent shahri,<br />Yunusobod tumani · © 2026 UROcare</div></footer>
      {message && <button className="toast" onClick={() => setMessage("")}>{message} <b>×</b></button>}
    </main>
  );
}

export default App;
