export type College = {
  name: string;
  city: string;
  state: string;
  website: string;
  formUrl: string;
  fees: string;
  exam: string;
};

export type Course = {
  name: string;
  duration: string;
  exam: string;
};

export type Stream = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  accent: string;
  courses: Course[];
  colleges: College[];
};

const JOSAA = "https://josaa.nic.in";
const CUET = "https://exams.nta.nic.in";
const MCC = "https://mcc.nic.in";
const CLAT = "https://consortiumofnlus.ac.in";
const DU = "https://admission.uod.ac.in";

export const streams: Stream[] = [
  {
    id: "science-pcm",
    index: "01",
    name: "Science (PCM)",
    tagline: "Engineering, technology and the hard sciences",
    accent: "#B34724",
    courses: [
      { name: "B.Tech / B.E.", duration: "4 years", exam: "JEE Main + JEE Advanced" },
      { name: "B.Sc (Hons)", duration: "3 years", exam: "CUET-UG / merit" },
      { name: "Integrated M.Sc (IISER)", duration: "5 years", exam: "IISER Aptitude Test" },
      { name: "B.Math (ISI)", duration: "3 years", exam: "ISI B.Math Entrance" },
    ],
    colleges: [
      { name: "IIT Bombay", city: "Mumbai", state: "Maharashtra", website: "https://www.iitb.ac.in", formUrl: JOSAA, fees: "≈ ₹2.1L / year", exam: "JEE Advanced" },
      { name: "IIT Delhi", city: "New Delhi", state: "Delhi", website: "https://www.iitd.ac.in", formUrl: JOSAA, fees: "≈ ₹2.0L / year", exam: "JEE Advanced" },
      { name: "NIT Trichy", city: "Tiruchirappalli", state: "Tamil Nadu", website: "https://www.nitt.edu", formUrl: JOSAA, fees: "≈ ₹1.5L / year", exam: "JEE Main" },
    ],
  },
  {
    id: "science-pcb",
    index: "02",
    name: "Science (PCB)",
    tagline: "Medicine, dentistry and health sciences",
    accent: "#14424A",
    courses: [
      { name: "MBBS", duration: "5.5 years", exam: "NEET-UG" },
      { name: "BDS", duration: "5 years", exam: "NEET-UG" },
      { name: "BPT", duration: "4.5 years", exam: "NEET-UG / university test" },
      { name: "B.Sc Nursing", duration: "4 years", exam: "CUET-UG / state counselling" },
      { name: "BAMS / B.V.Sc", duration: "5.5 years", exam: "NEET-UG" },
    ],
    colleges: [
      { name: "AIIMS New Delhi", city: "New Delhi", state: "Delhi", website: "https://www.aiims.edu", formUrl: MCC, fees: "≈ ₹6,700 / year", exam: "NEET-UG" },
      { name: "PGIMER Chandigarh", city: "Chandigarh", state: "Chandigarh", website: "https://www.pgimer.edu.in", formUrl: MCC, fees: "≈ ₹2,000 / year", exam: "NEET-UG" },
      { name: "CMC Vellore", city: "Vellore", state: "Tamil Nadu", website: "https://www.cmch-vellore.edu", formUrl: "https://www.cmch-vellore.edu", fees: "≈ ₹55,000 / year", exam: "NEET-UG" },
    ],
  },
  {
    id: "commerce",
    index: "03",
    name: "Commerce",
    tagline: "Business, finance and accountancy",
    accent: "#C8552E",
    courses: [
      { name: "B.Com (Hons)", duration: "3 years", exam: "CUET-UG" },
      { name: "BBA", duration: "3 years", exam: "CUET-UG / university entrance" },
      { name: "BCA", duration: "3 years", exam: "CUET-UG / university entrance" },
      { name: "BA (Hons) Economics", duration: "3 years", exam: "CUET-UG" },
      { name: "IPM / IPMAT", duration: "5 years", exam: "IPMAT (IIM Indore / Rohtak)" },
    ],
    colleges: [
      { name: "SRCC, University of Delhi", city: "New Delhi", state: "Delhi", website: "https://www.srcc.edu", formUrl: DU, fees: "≈ ₹28,000 / year", exam: "CUET-UG" },
      { name: "Lady Shri Ram College", city: "New Delhi", state: "Delhi", website: "https://lsr.edu.in", formUrl: DU, fees: "≈ ₹30,000 / year", exam: "CUET-UG" },
      { name: "St. Xavier's College Mumbai", city: "Mumbai", state: "Maharashtra", website: "https://www.xaviers.edu", formUrl: "https://www.xaviers.edu", fees: "≈ ₹60,000 / year", exam: "College merit" },
    ],
  },
  {
    id: "arts-humanities",
    index: "04",
    name: "Arts & Humanities",
    tagline: "Language, society, psychology and media",
    accent: "#14424A",
    courses: [
      { name: "BA (Hons) — Psychology, English, Political Science", duration: "3 years", exam: "CUET-UG" },
      { name: "BJMC — Journalism & Mass Communication", duration: "3 years", exam: "CUET-UG / university entrance" },
      { name: "BSW — Social Work", duration: "3 years", exam: "CUET-UG / university entrance" },
      { name: "BFA — Fine Arts", duration: "4 years", exam: "University entrance" },
    ],
    colleges: [
      { name: "St. Stephen's College", city: "New Delhi", state: "Delhi", website: "https://www.ststephens.edu", formUrl: DU, fees: "≈ ₹40,000 / year", exam: "CUET-UG" },
      { name: "Miranda House, University of Delhi", city: "New Delhi", state: "Delhi", website: "https://www.mirandahouse.ac.in", formUrl: DU, fees: "≈ ₹18,000 / year", exam: "CUET-UG" },
      { name: "Hansraj College, University of Delhi", city: "New Delhi", state: "Delhi", website: "https://www.hansrajcollege.ac.in", formUrl: DU, fees: "≈ ₹18,000 / year", exam: "CUET-UG" },
    ],
  },
  {
    id: "design",
    index: "05",
    name: "Design",
    tagline: "Product, communication and fashion design",
    accent: "#B34724",
    courses: [
      { name: "B.Des", duration: "4 years", exam: "NID-DAT / UCEED / NIFT Entrance" },
      { name: "B.Des Interior Design", duration: "4 years", exam: "UCEED / SEED / university tests" },
      { name: "BFA — Fine Arts", duration: "4 years", exam: "University entrance" },
    ],
    colleges: [
      { name: "National Institute of Design", city: "Ahmedabad", state: "Gujarat", website: "https://www.nid.edu", formUrl: "https://www.nid.edu", fees: "≈ ₹11L / year", exam: "NID-DAT" },
      { name: "National Institute of Fashion Technology", city: "New Delhi", state: "Delhi", website: "https://www.nift.ac.in", formUrl: "https://www.nift.ac.in", fees: "≈ ₹2.7L / year", exam: "NIFT Entrance" },
      { name: "MIT Institute of Design", city: "Pune", state: "Maharashtra", website: "https://www.mitid.edu.in", formUrl: "https://www.mitid.edu.in", fees: "≈ ₹9L / year", exam: "UCEED / SEED" },
    ],
  },
  {
    id: "law",
    index: "06",
    name: "Law",
    tagline: "Integrated 5-year and 3-year law degrees",
    accent: "#14424A",
    courses: [
      { name: "BA LLB (Hons)", duration: "5 years", exam: "CLAT / AILET / SLAT" },
      { name: "BBA LLB / B.Com LLB", duration: "5 years", exam: "CLAT / university entrance" },
      { name: "LLB (after graduation)", duration: "3 years", exam: "CLAT-PG / university entrance" },
    ],
    colleges: [
      { name: "NLSIU Bangalore", city: "Bengaluru", state: "Karnataka", website: "https://www.nls.ac.in", formUrl: CLAT, fees: "≈ ₹3.0L / year", exam: "CLAT" },
      { name: "NALSAR Hyderabad", city: "Hyderabad", state: "Telangana", website: "https://www.nalsar.ac.in", formUrl: CLAT, fees: "≈ ₹2.3L / year", exam: "CLAT" },
      { name: "WBNUJS Kolkata", city: "Kolkata", state: "West Bengal", website: "https://www.nujs.edu", formUrl: CLAT, fees: "≈ ₹2.4L / year", exam: "CLAT" },
    ],
  },
  {
    id: "hospitality",
    index: "07",
    name: "Hotel Management & Tourism",
    tagline: "Hospitality, culinary and event management",
    accent: "#C8552E",
    courses: [
      { name: "B.Sc Hospitality & Hotel Administration", duration: "4 years", exam: "NCHMCT JEE" },
      { name: "B.Sc — Culinary Arts", duration: "3 years", exam: "Institute entrance" },
      { name: "Event Management (BBA / B.Voc)", duration: "3 years", exam: "Institute entrance" },
    ],
    colleges: [
      { name: "IHM Pusa", city: "New Delhi", state: "Delhi", website: "https://www.ihmpusa.net", formUrl: "https://www.ihmpusa.net", fees: "≈ ₹1.6L / year", exam: "NCHMCT JEE" },
      { name: "IIHM Hyderabad", city: "Hyderabad", state: "Telangana", website: "https://www.iihm.ac.in", formUrl: "https://www.iihm.ac.in", fees: "≈ ₹2.5L / year", exam: "IIHM Entrance" },
      { name: "WGSHA, Manipal", city: "Manipal", state: "Karnataka", website: "https://manipal.edu", formUrl: "https://manipal.edu", fees: "≈ ₹4.5L / year", exam: "MAHE Entrance" },
    ],
  },
  {
    id: "architecture",
    index: "08",
    name: "Architecture",
    tagline: "Built environment, planning and conservation",
    accent: "#14424A",
    courses: [
      { name: "B.Arch", duration: "5 years", exam: "JEE Main (Paper 2A) + NATA" },
      { name: "B.Plan", duration: "4 years", exam: "JEE Main (Paper 2B)" },
    ],
    colleges: [
      { name: "School of Planning and Architecture", city: "New Delhi", state: "Delhi", website: "https://www.spa.ac.in", formUrl: "https://www.nata.in", fees: "≈ ₹60,000 / year", exam: "JEE Main (Paper 2)" },
      { name: "CEPT University", city: "Ahmedabad", state: "Gujarat", website: "https://www.cept.ac.in", formUrl: "https://www.nata.in", fees: "≈ ₹3.5L / year", exam: "NATA / JEE Main" },
      { name: "SPA Bhopal", city: "Bhopal", state: "Madhya Pradesh", website: "https://www.spabhopal.ac.in", formUrl: "https://www.nata.in", fees: "≈ ₹55,000 / year", exam: "JEE Main (Paper 2)" },
    ],
  },
];

export const findStream = (id: string) => streams.find((s) => s.id === id);
