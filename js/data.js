/* Bilingual content: projects, other work and timeline. Every text field is { en, tr }. */

window.PROJECTS = [
  {
    id: 'fkpos',
    cats: ['fullstack'],
    featured: true,
    title: { en: 'FK POS', tr: 'FK POS' },
    badge: { en: 'Commercial product', tr: 'Ticari ürün' },
    tagline: { en: 'Offline-first point-of-sale software', tr: 'Offline-first kasa (POS) yazılımı' },
    period: { en: 'June 2026 — present', tr: 'Haziran 2026 — halen' },
    role: { en: 'Founder & Fullstack Developer', tr: 'Kurucu & Fullstack Geliştirici' },
    context: { en: 'Turkish market · remote', tr: 'Türkiye pazarı · uzaktan' },
    summary: {
      en: 'Commercial point-of-sale software I build and sell to small businesses in Turkey. The register keeps working without internet and syncs to a Supabase cloud module, so the owner can check the till remotely.',
      tr: 'Türkiye\'deki küçük işletmelere geliştirip sattığım ticari kasa yazılımı. Kasa internet olmadan çalışmaya devam ediyor ve Supabase bulut modülüyle senkronize oluyor; işletme sahibi kasayı uzaktan görebiliyor.'
    },
    highlights: {
      en: [
        'Offline-first architecture: sales and register operations keep working without an internet connection.',
        'Supabase cloud module: the till state syncs automatically when connectivity returns and every 2 minutes.',
        'Barcode scanner, electronic scale, thermal receipt printer and customer display integrated in Rust via Tauri commands.',
        'Designed an encrypted, single-file <code>.POS</code> backup format.',
        'Sales, inventory, accounts, invoicing, bulk price-update and reporting modules.',
        'Processes ~21,000 in average daily transaction volume at one of the active businesses.',
        'Own the product end-to-end: architecture, development, on-site setup and support.'
      ],
      tr: [
        'Offline-first mimari: satışlar ve kasa işlemleri internet bağlantısı olmadan da çalışmaya devam ediyor.',
        'Supabase bulut modülü: kasanın güncel durumu internet geldiğinde ve 2 dakikada bir otomatik senkronize ediliyor.',
        'Barkod okuyucu, elektronik tartı, termal fiş yazıcısı ve ikinci müşteri ekranı entegrasyonları Rust ile Tauri komutları üzerinden.',
        'Şifrelenmiş, tek dosyalık <code>.POS</code> yedekleme formatı tasarladım.',
        'Satış, stok, cari hesap, irsaliye, toplu fiyat güncelleme ve raporlama modülleri.',
        'Aktif işletmelerden birinde günlük ortalama ~21.000 işlem hacmi işleniyor.',
        'Ürünün tamamından sorumluyum: mimari, geliştirme, müşteride kurulum ve destek.'
      ]
    },
    metrics: [
      { v: '5', l: { en: 'active businesses', tr: 'aktif işletme' } },
      { v: '8', l: { en: 'industry versions', tr: 'sektörel versiyon' } },
      { v: '2 min', vtr: '2 dk', l: { en: 'cloud sync interval', tr: 'bulut senkron aralığı' } }
    ],
    stack: ['React', 'TypeScript', 'Tauri', 'Rust', 'Supabase', 'PostgreSQL', 'Windows'],
    link: { url: 'https://fkposyazilim.com', label: 'fkposyazilim.com', type: 'site' },
    frame: 'fkposyazilim.com',
    images: ['assets/img/fkpos/1.webp', 'assets/img/fkpos/2.webp', 'assets/img/fkpos/3.webp'],
    captions: {
      en: ['Sales screen', 'Management dashboard', 'Login'],
      tr: ['Satış ekranı', 'Yönetim paneli', 'Giriş ekranı']
    }
  },
  {
    id: 'koopilot',
    cats: ['ai', 'fullstack'],
    title: { en: 'Koopilot', tr: 'Koopilot' },
    badge: { en: 'Google AI Academy Hackathon', tr: 'Google AI Academy Hackathonu' },
    tagline: { en: 'Multi-tenant operations platform with an AI assistant', tr: 'AI asistanlı, çok kiracılı operasyon platformu' },
    period: { en: 'May 2026 · 2 weeks', tr: 'Mayıs 2026 · 2 hafta' },
    role: { en: 'Backend Developer / API Architect', tr: 'Backend Geliştirici / API Mimarı' },
    team: { en: 'Team of 5', tr: '5 kişilik takım' },
    summary: {
      en: 'Operations platform for small businesses (demo: an olive-oil cooperative) with an AI daily summary, stock-out forecasting and an assistant that answers only from the company\'s own data.',
      tr: 'Küçük işletmeler için operasyon platformu (demo: bir zeytinyağı kooperatifi): AI günlük özet, stok tükenme tahmini ve yalnızca şirketin kendi verisinden yanıt veren bir asistan.'
    },
    highlights: {
      en: [
        'REST API with 35+ endpoints on FastAPI, four role levels and per-request isolation by <code>tenant_id</code>.',
        '10-table data model on Supabase PostgreSQL.',
        'Grounded LLM architecture: context is pulled from the database before every model call and scoped to the user\'s role — the assistant doesn\'t fabricate business data.',
        'SKU-level inventory forecasting service; API deployed to Render, web apps to Vercel.'
      ],
      tr: [
        'FastAPI üzerinde 35+ endpoint\'ten oluşan, dört rol seviyeli ve her isteği <code>tenant_id</code> ile izole eden REST API.',
        'Supabase PostgreSQL üzerinde 10 tablodan oluşan veri modeli.',
        'Grounded LLM mimarisi: her model çağrısından önce bağlam veritabanından çekiliyor ve kullanıcının rolüyle sınırlandırılıyor — asistan iş verisi uydurmuyor.',
        'SKU bazlı stok tahmini servisi; API Render\'a, web uygulamaları Vercel\'e deploy edildi.'
      ]
    },
    metrics: [
      { v: '35+', l: { en: 'API endpoints', tr: 'API endpoint' } },
      { v: '4', l: { en: 'role levels', tr: 'rol seviyesi' } },
      { v: '10', l: { en: 'DB tables', tr: 'veritabanı tablosu' } }
    ],
    stack: ['Python 3.11', 'FastAPI', 'Supabase PostgreSQL', 'Next.js 14', 'OpenAI API', 'RAG', 'Render', 'Vercel'],
    link: { url: 'https://koopilot.site', label: 'koopilot.site', type: 'site' },
    frame: 'koopilot.site',
    images: ['assets/img/koopilot/1.webp', 'assets/img/koopilot/2.webp', 'assets/img/koopilot/3.webp', 'assets/img/koopilot/4.webp', 'assets/img/koopilot/5.webp'],
    captions: {
      en: ['Company dashboard', 'AI daily summary', 'Stock-out forecast', 'Multi-agent + RAG architecture', 'Demo storefront'],
      tr: ['Şirket paneli', 'AI günlük özet', 'Stok tükenme tahmini', 'Multi-agent + RAG mimarisi', 'Demo mağaza']
    }
  },
  {
    id: 'trip',
    cats: ['ai', 'fullstack'],
    title: { en: 'AI Trip Planner', tr: 'AI Trip Planner' },
    badge: { en: 'Diploma project · UrFU', tr: 'Bitirme projesi · UrFU' },
    tagline: { en: 'AI-powered smart route planner', tr: 'Yapay zeka destekli akıllı rota planlayıcı' },
    period: { en: 'Nov 2025 — Jun 2026', tr: 'Kasım 2025 — Haziran 2026' },
    role: { en: 'Fullstack Developer', tr: 'Fullstack Geliştirici' },
    team: { en: 'Team of 2', tr: '2 kişilik takım' },
    summary: {
      en: 'Pick a destination and preferences, get a day-by-day route with times, costs and an interactive Mapbox map — every AI-generated place is verified before it reaches the user.',
      tr: 'Destinasyonu ve tercihleri seçin; saatleri, maliyetleri ve interaktif Mapbox haritasıyla gün gün bir rota alın — yapay zekanın ürettiği her mekan kullanıcıya ulaşmadan doğrulanıyor.'
    },
    highlights: {
      en: [
        'UI in React + TypeScript with an interactive Mapbox GL map and day-by-day route visualization.',
        'FastAPI BFF / API Gateway: LLM and Mapbox calls moved server-side, keeping API keys hidden from the client.',
        'Programmatic validation layer: model-generated locations are checked against Mapbox Geocoding and non-existent ones are filtered out.',
        'Stripe integration with webhook handling for subscription start, renewal and cancellation.'
      ],
      tr: [
        'React + TypeScript ile arayüz, interaktif Mapbox GL haritası ve günlere göre rota görselleştirmesi.',
        'FastAPI ile BFF / API Gateway: LLM ve Mapbox çağrıları sunucu tarafına taşındı, API anahtarları istemciden gizlendi.',
        'Programatik doğrulama katmanı: modelin ürettiği lokasyonlar Mapbox Geocoding ile kontrol ediliyor, var olmayanlar eleniyor.',
        'Abonelik başlatma, yenileme ve iptali için Stripe entegrasyonu ve webhook işleme.'
      ]
    },
    stack: ['React', 'TypeScript', 'Vite', 'Zustand', 'React Query', 'Tailwind CSS', 'FastAPI', 'Mapbox', 'Gemini API', 'Stripe'],
    link: { url: 'https://github.com/frat-karatasoglu/MyAiTripPlanner', label: 'github.com/frat-karatasoglu', type: 'code' },
    frame: 'mytripplanner',
    images: ['assets/img/tripplanner/1.webp', 'assets/img/tripplanner/2.webp', 'assets/img/tripplanner/3.webp', 'assets/img/tripplanner/4.webp'],
    captions: {
      en: ['Home — trip wizard', 'Day-by-day route & map', 'Destinations', 'Subscription plans'],
      tr: ['Ana sayfa — rota sihirbazı', 'Gün gün rota ve harita', 'Destinasyonlar', 'Abonelik planları']
    }
  },
  {
    id: 'finance',
    cats: ['ai'],
    title: { en: 'AI Financial Assistant', tr: 'AI Financial Assistant' },
    badge: { en: 'Google AI Academy Bootcamp', tr: 'Google AI Academy Bootcamp' },
    tagline: { en: 'Spending analysis & recommendations with LangChain + Gemini', tr: 'LangChain + Gemini ile harcama analizi ve öneri sistemi' },
    period: { en: 'Jun — Aug 2026', tr: 'Haziran — Ağustos 2026' },
    role: { en: 'AI Developer', tr: 'AI Geliştirici' },
    team: { en: 'Team of 4', tr: '4 kişilik takım' },
    summary: {
      en: 'Web app that analyses spending, flags anomalies, tracks budget limits and answers questions in natural language, combining the user\'s data with market data.',
      tr: 'Harcamaları analiz eden, anomalileri işaretleyen, bütçe limitlerini takip eden ve kullanıcının verisini piyasa verileriyle birleştirerek doğal dilde soruları yanıtlayan web uygulaması.'
    },
    highlights: {
      en: [
        'Owned the AI agent and memory layer: natural-language query handling and a recommendation chain on LangChain + Gemini API.',
        'Conversation Buffer Memory and a system prompt that combines spending anomalies with market data in a single response.',
        'Token management: the model gets a filtered, aggregated summary instead of the full dataset — lowering query cost and context usage.'
      ],
      tr: [
        'AI ajanı ve hafıza katmanından sorumluydum: LangChain + Gemini API ile doğal dil sorgu işleme ve öneri zinciri.',
        'Conversation Buffer Memory ve gider anomalilerini piyasa verileriyle tek yanıtta birleştiren sistem promptu.',
        'Token yönetimi: modele tüm veri seti yerine filtrelenmiş ve özetlenmiş veri gönderiliyor — sorgu maliyeti ve bağlam kullanımı düşüyor.'
      ]
    },
    note: { en: 'Screenshots use sample data.', tr: 'Ekran görüntülerinde örnek veri kullanılmıştır.' },
    stack: ['Python', 'LangChain', 'Gemini API', 'Prompt Engineering', 'AI Agents'],
    frame: 'smartfinance',
    images: ['assets/img/finance/1.webp', 'assets/img/finance/2.webp', 'assets/img/finance/3.webp', 'assets/img/finance/4.webp'],
    captions: {
      en: ['Overview', 'Smart recommendations', 'Budget & goals', 'Ask the assistant'],
      tr: ['Genel bakış', 'Akıllı öneriler', 'Bütçe ve hedefler', 'Asistana sor']
    }
  },
  {
    id: 'spec',
    cats: ['ai'],
    visual: 'pipeline',
    title: { en: 'Spec Reviewer', tr: 'Teknik Şartname İnceleyici' },
    badge: { en: 'AI Product Hack 2026 · MTS', tr: 'AI Product Hack 2026 · MTS' },
    tagline: { en: 'AI tool for technical documentation analysis', tr: 'Teknik doküman analizi için AI aracı' },
    period: { en: 'Sep 2026 · 1 week', tr: 'Eylül 2026 · 1 hafta' },
    role: { en: 'AI Engineer', tr: 'AI Engineer' },
    team: { en: 'Team of 2', tr: '2 kişilik takım' },
    summary: {
      en: 'Pre-analyzes technical specifications before development starts: finds ambiguous, incomplete and problematic points, explains why each matters and generates questions for the analyst. The decision stays with the human.',
      tr: 'Geliştirme başlamadan önce teknik şartnameleri ön analizden geçiriyor: belirsiz, eksik ve sorunlu noktaları buluyor, neden sorun olduğunu açıklıyor ve analist için sorular oluşturuyor. Karar insanda kalıyor.'
    },
    highlights: {
      en: [
        'Responsible for architecture, document parsing, template-based checks, a provider-agnostic LLM client and system integration.',
        'Pipeline: text/DOCX upload → parsing that preserves headings, sections, tables and links → deterministic template checks → LLM semantic analysis → structured Markdown report.',
        'Checks covering 21 template sections and 8 additional client requirements; 23 semantic-analysis categories on the LLM side.',
        'Provider-agnostic LLM client: when the model is unavailable, template checks and deterministic rules keep working offline.',
        'Tested on 3 anonymized real documents in offline and LLM modes with ~73 automated tests; duplicate warnings and false positives found and fixed.'
      ],
      tr: [
        'Mimari, doküman ayrıştırma, şablon bazlı kontroller, sağlayıcıdan bağımsız LLM istemcisi ve sistem entegrasyonundan sorumluydum.',
        'Pipeline: metin/DOCX yükleme → başlık, bölüm, tablo ve bağlantıları koruyarak ayrıştırma → resmi şablona göre deterministik kontroller → LLM ile semantik analiz → yapılandırılmış Markdown rapor.',
        'Şablonun 21 bölümü ve müşterinin 8 ek gereksinimi için kontroller; LLM tarafında 23 kategori semantik analiz.',
        'Sağlayıcıdan bağımsız LLM istemcisi: model erişilemez olduğunda şablon kontrolleri ve deterministik kurallar offline çalışmaya devam ediyor.',
        '3 anonimleştirilmiş gerçek doküman üzerinde offline ve LLM modlarında ~73 otomatik testle doğrulandı; tekrar eden uyarılar ve yanlış pozitifler giderildi.'
      ]
    },
    note: {
      en: 'No screenshots — the case documents belong to the client.',
      tr: 'Vaka dokümanları müşteriye ait olduğu için ekran görüntüsü paylaşılmamıştır.'
    },
    metrics: [
      { v: '21', l: { en: 'template sections', tr: 'şablon bölümü' } },
      { v: '23', l: { en: 'semantic categories', tr: 'semantik kategori' } },
      { v: '~73', l: { en: 'automated tests', tr: 'otomatik test' } }
    ],
    stack: ['Python', 'Streamlit', 'DOCX parsing', 'LLM API', 'Gemini 2.5 Flash']
  },
  {
    id: 'budget',
    cats: ['frontend'],
    visual: 'phone',
    wide: true,
    title: { en: 'Budget Manager', tr: 'Budget Manager' },
    badge: { en: 'VK internship', tr: 'VK stajı' },
    tagline: { en: 'Expense-tracking mini app for VK Mini Apps', tr: 'VK Mini Apps için gider takip uygulaması' },
    period: { en: 'Jun — Sep 2025', tr: 'Haziran — Eylül 2025' },
    role: { en: 'Frontend Developer Intern', tr: 'Frontend Geliştirici Stajyeri' },
    context: { en: 'VK · Moscow, on-site', tr: 'VK · Moskova, ofiste' },
    summary: {
      en: 'Built from scratch inside the VK Mini Apps ecosystem: expense tracking with category analytics and interactive charts, following iOS and Android guidelines.',
      tr: 'VK Mini Apps ekosisteminde sıfırdan geliştirildi: kategori bazlı analiz ve interaktif grafiklerle gider takibi, iOS ve Android tasarım kurallarına uygun.'
    },
    highlights: {
      en: [
        'VK Bridge SDK integration: platform navigation, light/dark theme, routing via VK Mini Apps Router.',
        'UI built with VKUI following iOS and Android guidelines; expense analytics by category with interactive charts.',
        'Iterated on the app based on my mentor\'s code reviews; maintained code standards with ESLint.'
      ],
      tr: [
        'VK Bridge SDK entegrasyonu: platform navigasyonu, açık/koyu tema, VK Mini Apps Router ile yönlendirme.',
        'iOS ve Android kurallarına uygun VKUI arayüzü; kategoriye göre gider analizi ve interaktif grafikler.',
        'Mentorumun kod incelemelerine göre uygulamayı geliştirdim; ESLint ile kod standartlarını korudum.'
      ]
    },
    stack: ['React', 'JavaScript ES6+', 'Vite', 'VKUI', 'VK Bridge SDK'],
    link: { url: 'https://vk-miniapp-plum.vercel.app', label: 'vk-miniapp-plum.vercel.app', type: 'site' }
  }
];

window.OTHERS = [
  {
    title: 'SelfShare',
    kind: { en: 'Mobile app', tr: 'Mobil uygulama' },
    desc: {
      en: 'Book-exchange app: MVVM, custom identity logic and a state machine managing exchange requests.',
      tr: 'Kitap takas uygulaması: MVVM, kendi kimlik doğrulama mantığı ve takas taleplerini yöneten durum makinesi.'
    },
    stack: ['.NET MAUI', 'C#', 'EF Core', 'SQLite']
  },
  {
    title: 'AI Professional Photo Studio',
    kind: { en: 'AI app', tr: 'AI uygulaması' },
    desc: {
      en: 'Professional portrait generation with Flux-Kontext, with JWT authentication.',
      tr: 'Flux-Kontext ile profesyonel portre üretimi, JWT kimlik doğrulama.'
    },
    stack: ['React', 'Flask', 'Flux-Kontext', 'JWT']
  },
  {
    title: 'Seyid Mermer',
    kind: { en: 'Client website · 2026', tr: 'Müşteri sitesi · 2026' },
    desc: {
      en: 'Marketing site for a marble-working company, built from scratch.',
      tr: 'Mermer işleme firması için sıfırdan kodlanmış kurumsal tanıtım sitesi.'
    },
    stack: ['Web', 'Freelance'],
    link: 'https://kovancilarseyidmermer.com'
  },
  {
    title: 'HRN Fabric',
    kind: { en: 'Client e-commerce · 2024', tr: 'Müşteri e-ticaret · 2024' },
    desc: {
      en: 'WooCommerce online store for a Turkish fabric wholesaler: setup and customization.',
      tr: 'Türkiye\'den kumaş ithal eden bir toptancı için WooCommerce mağaza kurulumu ve özelleştirmesi.'
    },
    stack: ['WooCommerce', 'Freelance'],
    link: 'https://hrnfabric.ru'
  }
];

window.TIMELINE = {
  work: [
    {
      org: 'FK POS',
      title: { en: 'Fullstack Developer · own commercial product', tr: 'Fullstack Geliştirici · kendi ticari ürünüm' },
      date: { en: 'June 2026 — present', tr: 'Haziran 2026 — halen' },
      place: { en: 'Turkish market · remote', tr: 'Türkiye pazarı · uzaktan' },
      current: true,
      link: 'https://fkposyazilim.com',
      bullets: {
        en: [
          'Offline-capable POS software for small businesses: 8 industry versions, used by 5 active businesses.',
          'Supabase cloud sync, hardware integrations in Rust via Tauri, encrypted single-file backups.',
          'Own the product end-to-end: architecture, development, on-site setup and support.'
        ],
        tr: [
          'Küçük işletmeler için offline çalışabilen kasa yazılımı: 8 sektörel versiyon, 5 aktif işletmede kullanımda.',
          'Supabase bulut senkronu, Tauri üzerinden Rust ile donanım entegrasyonları, şifreli tek dosyalık yedekleme.',
          'Ürünün tamamından sorumluyum: mimari, geliştirme, müşteride kurulum ve destek.'
        ]
      },
      stack: ['React', 'TypeScript', 'Tauri', 'Rust', 'Supabase']
    },
    {
      org: 'VK (VKontakte)',
      title: { en: 'Frontend Developer Intern', tr: 'Frontend Geliştirici Stajyeri' },
      date: { en: 'June 2025 — September 2025', tr: 'Haziran 2025 — Eylül 2025' },
      place: { en: 'Moscow · on-site', tr: 'Moskova · ofiste' },
      link: 'https://vk-miniapp-plum.vercel.app',
      bullets: {
        en: [
          'Built the Budget Manager mini-app from scratch for expense tracking in the VK Mini Apps ecosystem.',
          'VK Bridge SDK: platform navigation, light/dark theme, routing via VK Mini Apps Router.',
          'VKUI interface following iOS and Android guidelines, with interactive category charts.'
        ],
        tr: [
          'VK Mini Apps ekosisteminde gider takibi için Budget Manager mini uygulamasını sıfırdan geliştirdim.',
          'VK Bridge SDK: platform navigasyonu, açık/koyu tema, VK Mini Apps Router ile yönlendirme.',
          'iOS ve Android kurallarına uygun VKUI arayüzü ve interaktif kategori grafikleri.'
        ]
      },
      stack: ['React', 'Vite', 'VKUI', 'VK Bridge SDK']
    },
    {
      org: 'Freelance',
      title: { en: 'Client websites', tr: 'Müşteri siteleri' },
      date: { en: '2024 — 2026', tr: '2024 — 2026' },
      place: { en: 'Remote', tr: 'Uzaktan' },
      bullets: {
        en: [
          '<a href="https://kovancilarseyidmermer.com" target="_blank" rel="noopener">Seyid Mermer</a> — marketing site for a marble-working company, built from scratch (2026).',
          '<a href="https://hrnfabric.ru" target="_blank" rel="noopener">HRN Fabric</a> — WooCommerce store for a Turkish fabric wholesaler (2024).'
        ],
        tr: [
          '<a href="https://kovancilarseyidmermer.com" target="_blank" rel="noopener">Seyid Mermer</a> — mermer işleme firması için sıfırdan kurumsal tanıtım sitesi (2026).',
          '<a href="https://hrnfabric.ru" target="_blank" rel="noopener">HRN Fabric</a> — kumaş toptancısı için WooCommerce e-ticaret mağazası (2024).'
        ]
      }
    }
  ],
  edu: [
    {
      org: { en: 'ITMO University', tr: 'ITMO Üniversitesi' },
      title: { en: "Master's · Artificial Intelligence (AI Talent Hub)", tr: 'Yüksek Lisans · Yapay Zeka (AI Talent Hub)' },
      date: { en: 'September 2026 — present', tr: 'Eylül 2026 — halen' },
      place: { en: 'Saint Petersburg · full scholarship', tr: 'Saint Petersburg · tam burs' },
      current: true,
      bullets: {
        en: ['QS World University Rankings by Subject: #51–70 worldwide in Data Science & AI.'],
        tr: ['QS World University Rankings by Subject: Data Science & AI alanında dünyada ilk 51–70.']
      }
    },
    {
      org: 'Google AI & Technology Academy',
      title: { en: 'Program participant', tr: 'Program katılımcısı' },
      date: { en: 'December 2025 — September 2026', tr: 'Aralık 2025 — Eylül 2026' },
      place: { en: 'Google Türkiye · T3 Foundation', tr: 'Google Türkiye · T3 Vakfı' },
      bullets: {
        en: [
          'Selected as one of 1,500 out of 31,700+ applications from Turkey.',
          'Backend development, API architecture and AI agents; Koopilot hackathon and AI Financial Assistant bootcamp.'
        ],
        tr: [
          'Türkiye\'den 31.700\'den fazla başvuru arasından seçilen 1.500 kişiden biri.',
          'Backend geliştirme, API mimarisi ve AI ajanları; Koopilot hackathonu ve AI Financial Assistant bootcamp\'i.'
        ]
      }
    },
    {
      org: { en: 'Ural Federal University (UrFU)', tr: 'Ural Federal Üniversitesi (UrFU)' },
      title: { en: "Bachelor's · Software Engineering", tr: 'Lisans · Yazılım Mühendisliği' },
      date: { en: 'Class of 2026', tr: 'Mezuniyet 2026' },
      place: { en: 'Yekaterinburg · full scholarship', tr: 'Yekaterinburg · tam burs' },
      bullets: {
        en: ['Diploma project: AI Trip Planner — AI-powered smart route planner.'],
        tr: ['Bitirme projesi: AI Trip Planner — yapay zeka destekli akıllı rota planlayıcı.']
      }
    }
  ]
};
