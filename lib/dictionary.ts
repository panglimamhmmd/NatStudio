export type Lang = "en" | "id";

const en = {
  nav: {
    items: [
      { label: "About", href: "#about" },
      { label: "Process", href: "#process" },
      { label: "Pricing", href: "#pricing" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Location", href: "#location" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Start a project",
  },
  hero: {
    eyebrow: "Natstudio — content studio",
    titleA: "From visual content to",
    titleB: "business assets",
    body: "NatStudio builds quality visual content, end-to-end. You get it done without the hassle, and every piece is ready to work as a business asset that earns—so you can make more money off it.",
    ctaWork: "See the work",
    ctaContact: "Start a project",
    ctaMicro: "Free, no sales pitch, reply <24h",
    stripNote: "9:16 · video slot",
  },
  work: {
    eyebrow: "Selected work — proof, not promises",
    titleA: "Real work,",
    titleB: "not a polished portfolio",
    sub: "A few frames from recent shoots. Client and campaign under each frame. Hover to develop the print.",
    frames: [
      { client: "Gading Serpong", label: "Property video tour" },
      { client: "BSD City Kavling", label: "Cluster overview" },
      { client: "Lake View", label: "Waterfront property" },
      { client: "Rumah 1 Man", label: "Best layout showcase" },
    ],
  },
  why: {
    eyebrow: "Why Natstudio",
    titleA: "Why brands stay past the",
    titleB: "first shoot",
    reasons: [
      {
        tag: "VIDEO FIRST",
        title: "Marketing now runs on video",
        copy: "In the digital era, video carries the pitch — especially for property, where you're selling trust, not just a unit.",
      },
      {
        tag: "NO TEAM",
        title: "Skip building an in-house team",
        copy: "Producing quality content consistently takes a team, gear, and time most businesses don't have lying around. We become that production team for you.",
      },
      {
        tag: "GRAB ATTENTION",
        title: "Visuals that stop the scroll",
        copy: "On Instagram, TikTok, and Facebook Ads, visual quality decides who gets noticed — and trusted — by potential customers.",
      },
      {
        tag: "END-TO-END",
        title: "From idea to ready-to-post",
        copy: "Ideation, scripting, the shoot, the edit — we run all of it, until your content is ready to drive branding, leads, and sales.",
      },
    ],
  },
  process: {
    eyebrow: "Process — how a project runs",
    titleA: "Step by step,",
    titleB: "NatStudio builds your content",
    steps: [
      {
        meta: "STEP 1",
        title: "Sign & Payment",
        copy: "Book your package and lock it in with payment upfront. No back-and-forth before we're both committed.",
      },
      {
        meta: "STEP 2",
        title: "Consultation & Concepting",
        copy: "Once you're booked, we get into it: a call to hear your brief, then a shot list and moodboard you approve.",
      },
      {
        meta: "STEP 3",
        title: "Production On-Site",
        copy: "We shoot at your location or ours, in batch days. We over-shoot on purpose: extra angles, extra takes for later.",
      },
      {
        meta: "STEP 4",
        title: "Post Production",
        copy: "Video editing and feed design, cut and graded per platform. Nothing gets lost between the shoot and the export.",
      },
      {
        meta: "STEP 5",
        title: "Client Feedback",
        copy: "You get a review link and leave notes straight on the frame. One consolidated round, not one change at a time.",
      },
      {
        meta: "STEP 6",
        title: "Revision & Finalize",
        copy: "We apply the notes, lock the final cut, and hand over the files in a tidy shared drive.",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing — straight numbers",
    titleA: "Straight pricing,",
    titleB: "no mystery line items",
    featuredTag: "MOST BOOKED",
    tiers: [
      {
        name: "Lite",
        blurb: "Single-content output, end-to-end, for commercial needs.",
        features: [
          "Free consultation & brainstorming",
          "Script / content outline",
          "On-location shoot with our equipment",
          "Video editing",
          "1 minor revision",
        ],
        price: "399K",
        unit: "/video",
        footnote: "Drone footage, AI video, and motion graphic cost extra.",
        cta: "Book Lite",
      },
      {
        name: "Pro",
        blurb: "End-to-end content bundling, produced every month.",
        features: [
          "10 videos per month",
          "Free consultation & concepting",
          "Free drone service",
          "Flexible shoot schedule with our crew",
          "Minor revision per video",
        ],
        price: "350K",
        unit: "/video",
        footnote: "Monthly video count can be discussed on request.",
        cta: "Book Pro",
      },
      {
        name: "Content Management",
        blurb: "A complete content service for growth marketing.",
        features: [
          "Strategy & content plan",
          "Feeds design",
          "On-site shoot routine",
          "Editing for every video",
          "Monthly consultation",
        ],
        price: "3.5jt",
        unit: "/month",
        footnote:
          "Total per month: 8 videos, 8 feeds. Ad handling (Meta Ads, website, etc.) billed separately.",
        cta: "Book Content Management",
      },
    ],
    note: "Launching something big, or just need one shoot? We scope one-off projects too. Tell us what you're making and we'll price it straight:",
    referral: "Referral promo: refer a new client and get 10% off.",
  },
  testimonials: {
    eyebrow: "Word of mouth",
    titleA: "Don't just take",
    titleB: "our word for it",
    items: [
      { quote: "Don't have to think about content anymore. Just approve, just post.", tag: "Client, F&B" },
      { quote: "Shoot dates always land on time, revisions never drag on.", tag: "Client, Skincare" },
      { quote: "Was skeptical about remote, turned out cleaner than local crews we've used.", tag: "Client, Fashion" },
      { quote: "Six months in, content still lands every month. Never late.", tag: "Client, Coffee Shop" },
      { quote: "Small team here, this is what let us focus on selling instead of content.", tag: "Client, Fitness Studio" },
      { quote: "Price was clear from day one, no surprise line items later.", tag: "Client, Furniture" },
      { quote: "We gave one brief, they carried it through to done.", tag: "Client, Hospitality" },
      { quote: "Revisions are fast and simple. Comment on the link, it's fixed.", tag: "Client, Retail" },
      { quote: "Content works for ads too, stays consistent with our brand.", tag: "Client, Automotive" },
      { quote: "Best part is not having to chase updates. They update first.", tag: "Client, Education" },
    ],
  },
  location: {
    eyebrow: "Location — how far we reach",
    titleA: "National,",
    titleB: "based in Tangsel–Tangerang",
    body: "We work remotely across Indonesia. The pin below is just where our crew is based right now, not a location requirement.",
    badge: "Home base",
    area: "Paradise Serpong City, South Tangerang",
    note: "This is where our crew is based. Shoots happen on-location or here, by appointment.",
    points: [
      "On-location shoots wherever you are, not just around Tangsel–Tangerang",
      "Coordination and reviews run remotely over WhatsApp",
      "Transport fee applies for shoots outside Jadetabek, none within it",
    ],
    mapTag: "Our studio",
  },
  faq: {
    eyebrow: "FAQ — before you ask",
    titleA: "Fair",
    titleB: "questions",
    items: [
      {
        q: "How fast is turnaround?",
        a: "Standard turnaround is max H+3 — three days from the shoot. More complex projects or longer-form content can take a bit longer, and we'll flag that upfront so you can plan around it.",
      },
      {
        q: "Who owns the content?",
        a: "You do. Full usage rights across your own channels and paid ads are included in every plan. We only ask to keep a few frames for our portfolio, and we ask first.",
      },
      {
        q: "How do revisions work?",
        a: "Every delivery comes with a review link where you comment straight on the frame. Lite includes one minor revision, Pro includes a minor revision on every video, and Content Management folds revisions into the monthly retainer. A round means one consolidated batch of notes, not one change.",
      },
      {
        q: "Do we need to be on set?",
        a: "No. Most clients approve the shot list, then see the results in the review link. You're always welcome on set. We just don't need you there for it to work.",
      },
      {
        q: "We already have an agency. Does that matter?",
        a: "Not at all. Plenty of our clients keep their agency for strategy and use us purely for production. We shoot to their brief, or write it together.",
      },
      {
        q: "Is there a lock-in?",
        a: "Plans go month to month after the first two months. Pause or cancel with 30 days' notice. We'd rather earn the renewal than write it into a contract.",
      },
    ],
  },
  footer: {
    tagline: "Est. 2021 · every frame ours",
    body: "Tell us what you're making. We'll reply within one working day with a plan and a price.",
    elsewhere: "Elsewhere",
    copyright: "© 2026 Natstudio. All rights reserved.",
    meta: "Shot on location · developed in-house",
  },
};

const id: typeof en = {
  nav: {
    items: [
      { label: "About", href: "#about" },
      { label: "Proses", href: "#process" },
      { label: "Harga", href: "#pricing" },
      { label: "Testimoni", href: "#testimonials" },
      { label: "Lokasi", href: "#location" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Konsultasi gratis",
  },
  hero: {
    eyebrow: "Natstudio — studio konten end-to-end",
    titleA: "Dari visual konten jadi",
    titleB: "aset bisnis",
    body: "NatStudio bantuin bikin visual konten berkualitas yang dibuat secara end-to-end. Kalian tinggal terima beres, dan setiap konten udah siap kerja jadi aset bisnis yang menghasilkan. Gak perlu repot—tinggal panen cuannya.",
    ctaWork: "Lihat karya",
    ctaContact: "Konsultasi gratis",
    ctaMicro: "Gratis, gak pake sales pitch, respon <24 jam",
    stripNote: "9:16 · slot video",
  },
  work: {
    eyebrow: "Karya pilihan — bukti, bukan janji",
    titleA: "Bukti kerja kami,",
    titleB: "bukan portofolio kosong",
    sub: "Beberapa frame dari shooting terakhir. Nama klien dan campaign di bawah tiap frame. Arahkan kursor untuk mencuci fotonya.",
    frames: [
      { client: "Gading Serpong", label: "Video tur properti" },
      { client: "BSD City Kavling", label: "Overview cluster" },
      { client: "Lake View", label: "Properti tepi danau" },
      { client: "Rumah 1 Man", label: "Showcase layout terbaik" },
    ],
  },
  why: {
    eyebrow: "Kenapa Natstudio",
    titleA: "Kenapa brand bertahan setelah",
    titleB: "shooting pertama",
    reasons: [
      {
        tag: "VIDEO DULU",
        title: "Marketing sekarang wajib pakai video",
        copy: "Di era digital, video jadi strategi pemasaran utama — khususnya buat industri properti yang jualan kepercayaan, bukan cuma unit.",
      },
      {
        tag: "TANPA TIM",
        title: "Gak perlu bangun tim in-house",
        copy: "Produksi konten berkualitas secara konsisten butuh tim, alat, dan waktu yang jarang dimiliki bisnis kebanyakan. Kami jadi tim produksi kamu.",
      },
      {
        tag: "REBUT PERHATIAN",
        title: "Visual yang bikin orang berhenti scroll",
        copy: "Di IG, TikTok, dan Facebook Ads, kualitas visual nentuin siapa yang dilirik dan dipercaya calon konsumen.",
      },
      {
        tag: "END-TO-END",
        title: "Dari ide sampai siap posting",
        copy: "Ideasi, scripting, shooting, sampai editing — semua kami kerjain, sampai kontenmu siap dipakai buat branding dan bikin leads & penjualan naik.",
      },
    ],
  },
  process: {
    eyebrow: "Proses — jalannya project",
    titleA: "Step by step,",
    titleB: "NatStudio bikin kontenmu",
    steps: [
      {
        meta: "LANGKAH 1",
        title: "Booking & Pembayaran",
        copy: "Pesan paketnya, kunci dengan pembayaran di depan.",
      },
      {
        meta: "LANGKAH 2",
        title: "Konsultasi & Konsep",
        copy: "Satu call buat brief, lalu shot list dan moodboard kamu setujui.",
      },
      {
        meta: "LANGKAH 3",
        title: "Produksi On-Site",
        copy: "Shooting batch di lokasi kamu atau studio kami.",
      },
      {
        meta: "LANGKAH 4",
        title: "Post Production",
        copy: "Edit, grading, ekspor per platform.",
      },
      {
        meta: "LANGKAH 5",
        title: "Client Feedback",
        copy: "Link review, satu ronde catatan yang digabung.",
      },
      {
        meta: "LANGKAH 6",
        title: "Revisi & Finalisasi",
        copy: "Catatan diterapkan, file final dikirim rapi.",
      },
    ],
  },
  pricing: {
    eyebrow: "Harga — angka terus terang",
    titleA: "Harga jelas,",
    titleB: "tanpa biaya misterius",
    featuredTag: "PALING LARIS",
    tiers: [
      {
        name: "Lite",
        blurb: "Konten satuan, end-to-end, buat kebutuhan komersial.",
        features: [
          "Konsultasi & brainstorming gratis",
          "Script / outline konten",
          "Shooting on location pakai alat kami",
          "Video editing",
          "1 revisi minor",
        ],
        price: "399K",
        unit: "/video",
        footnote: "Drone, AI video, dan motion graphic kena biaya tambahan.",
        cta: "Pilih Lite",
      },
      {
        name: "Pro",
        blurb: "Paket bundling konten, end-to-end, produksi rutin tiap bulan.",
        features: [
          "10 video per bulan",
          "Konsultasi & concepting gratis",
          "Drone service gratis",
          "Jadwal shooting fleksibel bareng kru kami",
          "Revisi minor per video",
        ],
        price: "350K",
        unit: "/video",
        footnote: "Jumlah video per bulan bisa didiskusikan sesuai kebutuhan.",
        cta: "Pilih Pro",
      },
      {
        name: "Content Management",
        blurb: "Layanan konten lengkap buat growth marketing.",
        features: [
          "Strategi & rencana konten",
          "Desain feeds",
          "Shooting on-site rutin",
          "Editing semua video",
          "Konsultasi bulanan",
        ],
        price: "3,5jt",
        unit: "/bulan",
        footnote:
          "Total per bulan: 8 video, 8 feeds. Biaya tambahan untuk handling iklan (Meta Ads, website, dll).",
        cta: "Pilih Content Management",
      },
    ],
    note: "Mau launching besar, atau cuma butuh satu kali shooting? Kami juga mengerjakan project satuan. Ceritakan yang mau kamu buat, kami beri harga terus terang:",
    referral: "Promo referral: ajak klien baru, dapat diskon 10%.",
  },
  testimonials: {
    eyebrow: "Testimonial",
    titleA: "Bukan cuma kami yang",
    titleB: "bilang begitu",
    items: [
      { quote: "Nggak perlu mikirin konten lagi. Tinggal approve, tinggal posting.", tag: "Klien, F&B" },
      { quote: "Jadwal shooting selalu tepat, revisinya jelas nggak muter-muter.", tag: "Klien, Skincare" },
      { quote: "Awalnya ragu remote, ternyata hasilnya malah lebih rapi dari yang di kota.", tag: "Klien, Fashion" },
      { quote: "Enam bulan jalan, kontennya konsisten tiap bulan. Nggak pernah telat.", tag: "Klien, Kedai Kopi" },
      { quote: "Tim kami kecil, jadi ini yang bikin kami bisa fokus jualan, bukan mikirin konten.", tag: "Klien, Fitness Studio" },
      { quote: "Harganya jelas dari awal, nggak ada biaya nongol belakangan.", tag: "Klien, Furniture" },
      { quote: "Kami cuma kasih brief sekali, sisanya mereka yang jalanin sampai jadi.", tag: "Klien, Hospitality" },
      { quote: "Revisinya cepat dan nggak ribet. Tinggal komen di link, langsung diedit.", tag: "Klien, Retail" },
      { quote: "Kontennya kepake buat ads juga, hasilnya konsisten sama brand kami.", tag: "Klien, Otomotif" },
      { quote: "Paling suka karena nggak perlu ngejar-ngejar update. Mereka yang update duluan.", tag: "Klien, Edukasi" },
    ],
  },
  location: {
    eyebrow: "Lokasi — jangkauan kami",
    titleA: "Nasional,",
    titleB: "berbasis Tangsel–Tangerang",
    body: "Kami kerja remote ke seluruh Indonesia. Titik di bawah cuma base kru kami sekarang, bukan syarat lokasi.",
    badge: "Base operasional",
    area: "Paradise Serpong City, Tangerang Selatan",
    note: "Ini base kru kami. Shooting bisa on-location atau di sini, by appointment.",
    points: [
      "Shooting on-location ke kota kamu, bukan cuma di sekitar Tangsel–Tangerang",
      "Koordinasi dan review semuanya remote, lewat WhatsApp",
      "Ada biaya transport untuk shoot di luar Jadetabek, dalam Jadetabek nggak ada biaya tambahan",
    ],
    mapTag: "Studio kami",
  },
  faq: {
    eyebrow: "FAQ — sebelum kamu tanya",
    titleA: "Pertanyaan yang",
    titleB: "sering ditanya",
    items: [
      {
        q: "Berapa lama pengerjaannya?",
        a: "Maksimal H+3 pengerjaan sejak shooting untuk konten standar. Kalau lebih kompleks atau durasinya panjang, waktunya bisa lebih lama — kami info dari awal biar kamu bisa rencanain jadwalnya.",
      },
      {
        q: "Siapa yang memiliki kontennya?",
        a: "Kamu. Hak pakai penuh di semua channel kamu dan iklan berbayar sudah termasuk di semua paket. Kami hanya minta menyimpan beberapa frame untuk portofolio, dan kami minta izin dulu.",
      },
      {
        q: "Bagaimana cara revisinya?",
        a: "Setiap pengiriman datang dengan link review, kamu bisa komentar langsung di frame-nya. Lite dapat satu revisi minor, Pro dapat revisi minor di setiap video, dan Content Management revisinya masuk dalam retainer bulanan. Satu ronde artinya satu batch catatan yang digabung, bukan satu perubahan.",
      },
      {
        q: "Apakah kami harus ikut ke lokasi?",
        a: "Tidak. Kebanyakan klien menyetujui shot list, lalu melihat hasilnya di link review. Kamu selalu boleh datang ke lokasi. Hanya saja, tanpa kamu pun semuanya tetap jalan.",
      },
      {
        q: "Kami sudah punya agency. Masalah?",
        a: "Sama sekali tidak. Banyak klien kami mempertahankan agency untuk strategi dan memakai kami murni untuk produksi. Kami shooting sesuai brief mereka, atau menulisnya bersama.",
      },
      {
        q: "Ada kontrak yang mengikat?",
        a: "Paket berjalan bulanan setelah dua bulan pertama. Pause atau berhenti dengan pemberitahuan 30 hari. Kami lebih suka memperjuangkan perpanjangan daripada menuliskannya di kontrak.",
      },
    ],
  },
  footer: {
    tagline: "Est. 2021 · semua frame buatan kami",
    body: "Ceritakan yang mau kamu buat, kami balas dalam satu hari kerja dengan rencana dan harga — nggak pakai proposal berlembar-lembar.",
    elsewhere: "Media sosial",
    copyright: "© 2026 Natstudio. Hak cipta dilindungi.",
    meta: "Shooting on location · diedit in-house",
  },
};

export type Dict = typeof en;

export const dict: Record<Lang, Dict> = { en, id };
