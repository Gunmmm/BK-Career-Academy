export const STAFF = [
  {
    id: 1,
    name: "Dr. Arjun Sharma",
    role: "Head of Academics",
    specialty: "UPSC/MPSC Expert",
    image: "/images/staff/arjun.png",
    bio: "With over 15 years of experience in civil services coaching, Dr. Sharma has guided 500+ successful officers."
  },
  {
    id: 2,
    name: "Meera Deshmukh",
    role: "Senior Strategist",
    specialty: "Discipline & Planning",
    image: "/images/staff/meera.png",
    bio: "Former policy consultant specializing in academic discipline and strategic career planning for elite aspirants."
  },
  {
    id: 3,
    name: "Vikram Rathore",
    role: "Chief Mentor",
    specialty: "Tech & Leadership",
    image: "/images/staff/vikram.png",
    bio: "Expert in integrating technology with leadership skills, helping students master modern administrative challenges."
  },
  {
    id: 4,
    name: "Anjali Rao",
    role: "Educational Consultant",
    specialty: "Student Success",
    image: "/images/staff/anjali.png",
    bio: "Dedicated to holistic student development and mental resilience, ensuring a balanced path to career excellence."
  },
  {
    id: 5,
    name: "Dnayneshwar Sapkal",
    role: "Senior Academic Mentor",
    specialty: "MPSC Specialist",
    image: "/images/staff/dnayneshwar.png",
    bio: "An expert in MPSC exam patterns, providing strategic mentorship and deep subject knowledge for competitive success."
  },
  {
    id: 6,
    name: "Ghuge Sir",
    role: "Founder & Director",
    specialty: "Strategic Planning",
    image: "/images/staff/ghuge sir.jpeg",
    bio: "Leading the academy with a vision to empower students through disciplined preparation and expert career guidance."
  }
];

export const EXAM_CATEGORIES = [
  {
    id: 1,
    title: "UPSC (IAS, IPS, IFS)",
    icon: "🏛️",
    thumb: "/upsc.png",
    description: "Conducted mainly by UPSC including IAS, IPS, IFS and Central Group 'A' exams.",
    subcategories: [
      {
        name: "UPSC Exams",
        exams: ["UPSC Civil Services (IAS, IPS, IFS)", "Indian Forest Service (IFoS)", "Engineering Services (ESE/IES)", "CAPF (Assistant Commandant)", "Combined Defence Services (CDS)", "Combined Medical Services (CMS)", "Indian Economic Service (IES) / ISS", "Special Class Railway Apprentices (SCRA)"]
      }
    ]
  },
  {
    id: 12,
    title: "MPSC (Maharashtra Services)",
    icon: "🔱",
    thumb: "/mpsc_emblem.png",
    description: "Maharashtra State Services, Administrative and Subordinate recruitment portal.",
    subcategories: [
      {
        name: "State Services",
        exams: ["MPSC Rajyaseva (Group A & B)"]
      },
      {
        name: "Subordinate Services",
        exams: ["Police Sub-Inspector (PSI)", "Sales Tax Inspector (STI)", "Assistant Section Officer (ASO)", "Sub-Registrar"]
      },
      {
        name: "Group C Services",
        exams: ["Clerk-Typist", "Tax Assistant", "Excise Sub-Inspector", "Technical Asst (Insurance)"]
      },
      {
        name: "Technical Services",
        exams: ["MPSC Engineering Services", "MPSC Forest Service", "Maharashtra Agriculture Service"]
      },
      {
        name: "Other Services",
        exams: ["Civil Judge (Junior Division)", "Assistant Motor Vehicle Inspector (AMVI)"]
      }
    ]
  },
  {
    id: 2,
    title: "SSC (Staff Selection Commission)",
    icon: "🧾",
    thumb: "/SCC.png",
    description: "Central government department recruitments for various levels.",
    subcategories: [
      {
        name: "Central Govt Departments",
        exams: ["SSC CGL (Graduate Level)", "SSC CHSL (12th level)", "SSC MTS", "SSC GD Constable", "SSC JE (Engineer)", "SSC CPO (Police SI)", "SSC Stenographer", "SSC JHT (Translator)"]
      }
    ]
  },
  {
    id: 3,
    title: "Banking & Finance Exams",
    icon: "🏦",
    thumb: "/banking.jpg",
    description: "Conducted by IBPS, SBI, RBI, NABARD for officer and clerk roles.",
    subcategories: [
      {
        name: "Banking Recruitment",
        exams: ["IBPS PO", "IBPS Clerk", "IBPS SO", "IBPS RRB (Officer/Clerk)", "SBI PO", "SBI Clerk", "RBI Grade B", "RBI Assistant", "NABARD Grade A/B"]
      }
    ]
  },
  {
    id: 4,
    title: "Railway Exams (RRB)",
    icon: "🚆",
    thumb: "/Four.jpg",
    description: "Recruitment for NTPC, Group D, Junior Engineer and ALP positions.",
    subcategories: [
      {
        name: "Railway Recruitment",
        exams: ["RRB NTPC", "RRB Group D", "RRB JE (Junior Engineer)", "RRB ALP (Assistant Loco Pilot)"]
      }
    ]
  },
  {
    id: 5,
    title: "Defence Exams",
    icon: "🪖",
    thumb: "/Defense.png",
    description: "Officer and entry level roles in Army, Navy, and Air Force.",
    subcategories: [
      {
        name: "Armed Forces",
        exams: ["NDA (after 12th)", "CDS (after graduation)", "AFCAT (Air Force)", "INET (Navy)", "Territorial Army", "Coast Guard (Navik, Assistant Commandant)"]
      }
    ]
  },
  {
    id: 6,
    title: "Teaching & Education Exams",
    icon: "🏫",
    thumb: "/tewntysix.jpg",
    description: "Teacher eligibility and recruitment for central and state schools.",
    subcategories: [
      {
        name: "Education Sector",
        exams: ["MAHA TET (Maharashtra)", "CTET (Central Teacher Eligibility Test)", "UGC NET (Assistant Professor / JRF)", "KVS / NVS Recruitment"]
      }
    ]
  },
  {
    id: 7,
    title: "Insurance Exams",
    icon: "🏢",
    thumb: "/wentyseven.png",
    description: "Administrative officer roles in LIC, NICL, and NIACL.",
    subcategories: [
      {
        name: "Insurance Sector",
        exams: ["LIC AAO", "LIC ADO", "NICL AO", "NIACL AO"]
      }
    ]
  },
  {
    id: 8,
    title: "Engineering & PSU Exams",
    icon: "⚙️",
    thumb: "/seventeen.jpeg",
    description: "Technical roles in PSUs through GATE or independent exams.",
    subcategories: [
      {
        name: "Technical/Research",
        exams: ["GATE (for PSU jobs)", "ISRO Scientist", "DRDO Scientist"]
      }
    ]
  },
  {
    id: 9,
    title: "Law & Judiciary Exams",
    icon: "⚖️",
    thumb: "/fourteeen.jpeg",
    description: "Legal studies entry and judicial service examinations.",
    subcategories: [
      {
        name: "Legal Services",
        exams: ["CLAT (Legal entry)", "Judicial Services Exam (Civil Judge)", "Public Prosecutor exams"]
      }
    ]
  },
  {
    id: 10,
    title: "Medical & Nursing Exams",
    icon: "🏥",
    thumb: "/Enhance.jpg",
    description: "State and central medical officer and nursing officer recruitment.",
    subcategories: [
      {
        name: "Healthcare",
        exams: ["Medical Officer Exam (State/UPSC CMS)", "Nursing Officer (AIIMS NORCET)", "ESIC Medical/Nursing"]
      }
    ]
  },
  {
    id: 14,
    title: "Police & Security Services",
    icon: "👮",
    thumb: "/Ashok stambh.png",
    description: "Recruitments for State Police, BSF, CISF, and paramilitary forces.",
    subcategories: [
      {
        name: "Security Forces",
        exams: ["Maharashtra Police Bharti (Portal)", "Maharashtra Police Bharti", "Maharashtra Post Services", "Maharashtra Forest Service", "Delhi Police Constable/SI", "BSF / CISF / CRPF Recruitment", "State Reserved Police Force (SRPF)"]
      }
    ]
  },
  {
    id: 11,
    title: "Other Important Govt Exams",
    icon: "🌾",
    thumb: "/fci.jpg",
    description: "Specialized recruitments for FCI, EPFO, SEBI and more.",
    subcategories: [
      {
        name: "Other Services",
        exams: ["FCI (Food Corporation of India)", "EPFO EO/AO", "SEBI Grade A"]
      }
    ]
  }
];

export const COURSES = [
  { id: 1,  title: "UPSC Civil Services (IAS, IPS, IFS)", category: "Civil Services", instructor: "Dr. Elena Vance",    isNew: false, image: "/home/card1.png" },
  { id: 2,  title: "SSC CGL (Graduate Level)",         category: "SSC",            instructor: "Prof. Marcus Thorne", isNew: true,  image: "/home/card2.png" },
  { id: 3,  title: "Bank, IBPS, EPFO & SEBI Grade A Mastery", category: "Banking & Finance", instructor: "Dr. Sarah Chen",      isNew: true,  image: "/home/card3.png" },
  { id: 4,  title: "RRB NTPC Comprehensive",            category: "Railways",       instructor: "Dr. Julian Blackwood", isNew: false, image: "/home/card4.png" },
  { id: 5,  title: "NDA & CDS Officer Program",         category: "Defence",        instructor: "Dr. Elena Vance",     isNew: false, image: "/home/card5.png" },
  { id: 6,  title: "UGC NET & CTET Mastery",            category: "Teaching",       instructor: "Prof. Marcus Thorne", isNew: true,  image: "/home/card6.png" },
  { id: 7,  title: "GATE Engineering Excellence",       category: "Engineering",    instructor: "Dr. Sarah Chen",      isNew: false, image: "/home/card7.png" },
  { id: 8,  title: "Judicial Services Exam Prep",       category: "Law",            instructor: "Dr. Julian Blackwood", isNew: false, image: "/home/card8.png" },
  { id: 100, title: "Maharashtra State Police Bharti", category: "Police",         instructor: "Academy Special",    isNew: true,  image: "/home/card1.png" },
];

export const INSTRUCTORS = [
  {
    name: "Dr. Elena Vance",
    role: "Founding Partner, Titan Global",
    bio: "Ex-CEO of Fortune 10 giants, dedicated to shaping the next generation of board-level leaders.",
    image: "https://picsum.photos/seed/vance/400/400"
  },
  {
    name: "Prof. Marcus Thorne",
    role: "Chief Strategist, Sovereign Capital",
    bio: "Pioneer in global market dynamics and institutional wealth management strategies.",
    image: "https://picsum.photos/seed/thorne/400/400"
  },
  {
    name: "Dr. Sarah Chen",
    role: "Head of Transformation, Silicon Valley",
    bio: "Leading architect of digital evolution for the world's most innovative technology conglomerates.",
    image: "https://picsum.photos/seed/chen/400/400"
  }
];
