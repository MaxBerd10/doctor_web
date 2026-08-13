export const doctor = {
  name: "Dr. Sherzod Sultonov",
  role: "Urolog, tibbiyot fanlari nomzodi",
  clinic: "NovaUro klinikasi",
};

export const patient = {
  name: "Aziz Rahimov",
  sex: "Erkak",
  age: 58,
  photo:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=256&h=256&fit=crop&crop=faces",
  diagnosis: "Prostata bezining xavfsiz gipertrofiyasi (BPH)",
  mrn: "UZ-2026-00842",
  vitals: [
    { label: "PSA daraja", value: "4.2", unit: "ng/mL", trend: "up" },
    { label: "Siydik oqimi (Qmax)", value: "11", unit: "ml/s", trend: "down" },
    { label: "Qon bosimi", value: "128/82", unit: "", trend: "flat" },
    { label: "Prostata hajmi", value: "42", unit: "cm³", trend: "up" },
  ],
};

export const categories = [
  { key: "visits", label: "Tashriflar", icon: "visit" },
  { key: "meds", label: "Dorilar", icon: "med" },
  { key: "labs", label: "Tahlillar", icon: "lab" },
  { key: "procedures", label: "Muolajalar", icon: "procedure" },
  { key: "hosp", label: "Statsionar", icon: "hosp" },
  { key: "imaging", label: "Tasvirlash", icon: "imaging" },
];

export const tabs = [
  "Davolash dinamikasi",
  "Tashriflar",
  "Dorilar",
  "Tahlillar",
  "Allergiya",
  "Genetika",
];

// Wave-style trend data for mini area charts (0-100 scale)
const psaWave = [30, 34, 32, 40, 45, 42, 50, 55, 52, 60, 58, 64];
const psaWaveDown = [70, 65, 60, 58, 52, 48, 44, 40, 38, 34, 30, 26];
const flowWave = [20, 60, 85, 92, 78, 55, 30, 15, 40, 70, 88, 60, 25];
const bladderWave = [40, 44, 42, 50, 55, 58, 54, 60, 62, 58, 64, 68];

export const timeline = [
  {
    id: "fev",
    month: "Fev",
    year: 2026,
    week: "1-hafta",
    accent: "border-orange-400",
    meds: [{ name: "Tamsulosin", dose: "x1", icon: "med" }],
    cards: [
      {
        type: "metric",
        title: "PSA darajasi",
        day: "Payshanba",
        value: "5.6",
        unit: "ng/mL",
        avgLabel: "O'rtacha",
        avg: "4.9",
        delta: "+0.6",
        deltaUp: true,
        data: psaWave,
      },
      {
        type: "symptom",
        title: "Simptomlar (IPSS)",
        tags: ["Tez-tez siyish", "Kechqurun siyish", "Zaif oqim"],
        score: "18 / 35 — o'rtacha og'ir",
      },
    ],
  },
  {
    id: "iyul",
    month: "Iyul",
    year: 2026,
    week: "3-hafta",
    accent: "border-lime-500",
    meds: [
      { name: "Tamsulosin", dose: "x1", icon: "med" },
      { name: "Finasterid", dose: "x1", icon: "med" },
    ],
    cards: [
      {
        type: "metric",
        title: "Siydik pufagi qoldig'i (UZI)",
        day: "Seshanba",
        value: "38",
        unit: "ml",
        avgLabel: "O'rtacha",
        avg: "52",
        delta: "-14",
        deltaUp: false,
        data: bladderWave,
      },
      {
        type: "flow",
        title: "Uroflowmetriya",
        value: "16.4",
        unit: "ml/s Qmax",
        avgLabel: "O'rtacha",
        avg: "11.0",
        delta: "+5.4",
        deltaUp: true,
        data: flowWave,
      },
    ],
  },
];

export const scrubberMonths = [
  { m: "Yan", counts: {} },
  { m: "Fev", counts: { visit: 1, med: 1, lab: 3 } },
  { m: "Mar", counts: {} },
  { m: "Apr", counts: { lab: 2 } },
  { m: "May", counts: {} },
  { m: "Iyun", counts: { visit: 1 } },
  { m: "Iyul", counts: { visit: 1, med: 2, lab: 2 } },
  { m: "Avg", counts: {} },
];
