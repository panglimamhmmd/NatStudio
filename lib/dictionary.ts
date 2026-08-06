export type Lang = "en" | "id";

const en = {
  nav: {
    items: [
      { label: "Work", href: "#work" },
      { label: "Services", href: "#services" },
      { label: "Process", href: "#process" },
      { label: "Pricing", href: "#pricing" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Location", href: "#location" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Start a project",
  },
  hero: {
    eyebrow: "Natstudio — content studio · est. 2021",
    titleA: "Content that performs,",
    titleB: "not just posts",
    body: "No stock folders, no recycled templates. We're a boutique content studio that shoots and edits everything in-house: social, photography, and motion. If it's in your feed, we made it.",
    ctaWork: "See the work",
    ctaContact: "Start a project",
    stripNote: "9:16 · video slot",
  },
  work: {
    eyebrow: "Selected work — contact sheet",
    titleA: "Straight off the",
    titleB: "sheet",
    sub: "A few frames from recent shoots. Client and campaign under each frame. Hover to develop the print.",
    frames: [
      { client: "Gading Serpong", label: "Property video tour" },
      { client: "BSD City Kavling", label: "Cluster overview" },
      { client: "Lake View", label: "Waterfront property" },
      { client: "Rumah 1 Man", label: "Best layout showcase" },
      { client: "@docartclinic", label: "Social media management" },
      { client: "@sealeadermarine", label: "Social media management" },
      { client: "@clothing.else", label: "Social media management" },
      { client: "@pods_indonesia", label: "Social media management" },
      { client: "@inpods_indonesia", label: "Social media management" },
    ],
  },
  services: {
    eyebrow: "Services — what we make",
    titleA: "Four ways to",
    titleB: "work with us",
    cards: [
      {
        tag: "PRODUCTION",
        title: "End-to-End Content Production",
        copy: "From ideation and scripting to the shoot and the edit, we run the whole thing in-house, for property, commercial, and events alike.",
        items: [
          "Ideation & scripting",
          "Property videography & drone footage",
          "Commercial ads video & event documentation",
          "Studio or on-location shoot",
        ],
      },
      {
        tag: "SOCIAL",
        title: "Social Media Management",
        copy: "A full content operation for your feed: planned, shot, edited, and posted on schedule, with a monthly check-in built in.",
        items: [
          "Monthly content & strategy plan",
          "Reels & TikTok content",
          "Feed design",
          "Monthly consultation",
        ],
      },
      {
        tag: "ADS",
        title: "Advertising Specialist",
        copy: "Video and photo built for performance, not just looks, cut for Meta Ads and whatever platform you're running spend on.",
        items: [
          "Meta Ads video & photo",
          "Performance-focused edits",
          "Sized per placement",
          "Website-ready assets",
        ],
      },
      {
        tag: "UGC",
        title: "UGC Campaign",
        copy: "Creator-style content that reads native in the feed, built to work in both paid ads and organic posts.",
        items: [
          "Authentic, creator-style footage",
          "Vertical format, ad-ready",
          "Works for ads & organic",
          "Brief to delivery, handled for you",
        ],
      },
    ],
  },
  why: {
    eyebrow: "Why Natstudio",
    titleA: "Why brands stay past the",
    titleB: "first shoot",
    reasons: [
      {
        tag: "ONE CREW",
        title: "Same people, start to finish",
        copy: "The person who plans your shoot is on set, and in the edit. Nothing gets lost in a handoff.",
      },
      {
        tag: "NO STOCK",
        title: "Shot, not sourced",
        copy: "Every frame we deliver, we made. Your content won't turn up on someone else's feed.",
      },
      {
        tag: "PLATFORM-FIRST",
        title: "Cut for where it lives",
        copy: "We frame for vertical on set, not in the crop tool. Each platform gets its own export, not a resize.",
      },
      {
        tag: "ON SCHEDULE",
        title: "Delivery you can plan around",
        copy: "Fixed shoot dates, fixed delivery dates. Your content calendar fills up before the month starts.",
      },
    ],
  },
  process: {
    eyebrow: "Process — how a project runs",
    titleA: "Six frames,",
    titleB: "start to finish",
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
    referral: "Referral promo: refer a new client and get 20% off.",
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
    titleA: "National reach,",
    titleB: "based out of BSD",
    body: "We work remotely across Indonesia. The pin below is just where our crew is based right now, not a location requirement.",
    badge: "Home base",
    area: "BSD City, South Tangerang",
    note: "Full address isn't final yet. This pin is a placeholder until the studio address is ready.",
    points: [
      "On-location shoots wherever you are, not just around BSD",
      "Coordination and reviews run remotely over WhatsApp",
      "No extra fee for working at a distance",
    ],
    mapTag: "Map — placeholder",
  },
  faq: {
    eyebrow: "FAQ — before you ask",
    titleA: "Fair",
    titleB: "questions",
    items: [
      {
        q: "How fast is turnaround?",
        a: "Standard delivery is seven working days from the shoot. Short-form edits usually land sooner. If you're on a launch deadline, tell us at kickoff and we'll build the schedule backwards from it.",
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
      { label: "Karya", href: "#work" },
      { label: "Layanan", href: "#services" },
      { label: "Proses", href: "#process" },
      { label: "Harga", href: "#pricing" },
      { label: "Testimoni", href: "#testimonials" },
      { label: "Lokasi", href: "#location" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Konsultasi gratis",
  },
  hero: {
    eyebrow: "Natstudio — studio konten end-to-end · sejak 2021",
    titleA: "Konten yang menjual,",
    titleB: "bukan cuma nampang",
    body: "Bukan folder stock, bukan template daur ulang. Kami syuting dan edit semuanya sendiri: sosial media, fotografi, sampai motion. Kalau tampil di feed kamu, kami yang bikin.",
    ctaWork: "Lihat karya",
    ctaContact: "Konsultasi gratis",
    stripNote: "9:16 · slot video",
  },
  work: {
    eyebrow: "Karya pilihan — contact sheet",
    titleA: "Langsung dari",
    titleB: "contact sheet",
    sub: "Beberapa frame dari syuting terakhir. Nama klien dan campaign di bawah tiap frame. Arahkan kursor untuk mencuci fotonya.",
    frames: [
      { client: "Gading Serpong", label: "Video tur properti" },
      { client: "BSD City Kavling", label: "Overview cluster" },
      { client: "Lake View", label: "Properti tepi danau" },
      { client: "Rumah 1 Man", label: "Showcase layout terbaik" },
      { client: "@docartclinic", label: "Manajemen media sosial" },
      { client: "@sealeadermarine", label: "Manajemen media sosial" },
      { client: "@clothing.else", label: "Manajemen media sosial" },
      { client: "@pods_indonesia", label: "Manajemen media sosial" },
      { client: "@inpods_indonesia", label: "Manajemen media sosial" },
    ],
  },
  services: {
    eyebrow: "Layanan — yang kami buat",
    titleA: "Empat cara",
    titleB: "kerja bareng kami",
    cards: [
      {
        tag: "PRODUCTION",
        title: "End-to-End Content Production",
        copy: "Dari ideasi dan scripting sampai syuting dan edit, semuanya kami kerjakan sendiri, buat properti, bisnis komersial, maupun event.",
        items: [
          "Ideasi & scripting",
          "Property videography & drone footage",
          "Commercial ads video & dokumentasi event",
          "Syuting di studio atau on-location",
        ],
      },
      {
        tag: "SOCIAL",
        title: "Social Media Management",
        copy: "Operasional konten lengkap buat feed kamu: direncanakan, disyuting, diedit, dan diposting sesuai jadwal, plus konsultasi bulanan.",
        items: [
          "Rencana konten & strategi bulanan",
          "Konten Reels & TikTok",
          "Desain feeds",
          "Konsultasi bulanan",
        ],
      },
      {
        tag: "ADS",
        title: "Advertising Specialist",
        copy: "Video dan foto yang dibuat buat performa, bukan cuma estetika, dipotong buat Meta Ads dan platform mana pun tempat kamu pasang iklan.",
        items: [
          "Video & foto Meta Ads",
          "Edit fokus performa",
          "Ukuran sesuai placement",
          "Aset siap pakai untuk website",
        ],
      },
      {
        tag: "UGC",
        title: "UGC Campaign",
        copy: "Konten gaya creator yang natural di feed, kepake buat iklan berbayar maupun postingan organik.",
        items: [
          "Footage gaya creator yang autentik",
          "Format vertikal, siap jadi iklan",
          "Kepake buat ads & organic",
          "Dari brief sampai kirim, kami yang urus",
        ],
      },
    ],
  },
  why: {
    eyebrow: "Kenapa Natstudio",
    titleA: "Kenapa brand bertahan setelah",
    titleB: "syuting pertama",
    reasons: [
      {
        tag: "SATU KRU",
        title: "Orang yang sama, awal sampai akhir",
        copy: "Bukan cuma vendor, tapi tim yang inget brief kamu dari awal. Yang merencanakan syuting kamu ada di lokasi, dan ikut mengedit. Tidak ada yang hilang karena serah terima.",
      },
      {
        tag: "TANPA STOCK",
        title: "Disyuting, bukan diunduh",
        copy: "Semua frame yang kami kirim, kami buat sendiri. Konten kamu tidak akan muncul di feed orang lain.",
      },
      {
        tag: "PLATFORM-FIRST",
        title: "Dipotong untuk tempatnya tayang",
        copy: "Kami framing vertikal sejak di lokasi, bukan di crop tool. Tiap platform dapat ekspornya sendiri, bukan sekadar resize.",
      },
      {
        tag: "TEPAT JADWAL",
        title: "Pengiriman yang bisa diandalkan",
        copy: "Tanggal syuting pasti, tanggal kirim pasti. Kalender konten kamu terisi sebelum bulan dimulai.",
      },
    ],
  },
  process: {
    eyebrow: "Proses — jalannya project",
    titleA: "Enam frame,",
    titleB: "awal sampai akhir",
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
        copy: "Syuting batch di lokasi kamu atau studio kami.",
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
          "Syuting on location pakai alat kami",
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
          "Jadwal syuting fleksibel bareng kru kami",
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
          "Syuting on-site rutin",
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
    note: "Mau launching besar, atau cuma butuh satu kali syuting? Kami juga mengerjakan project satuan. Ceritakan yang mau kamu buat, kami beri harga terus terang:",
    referral: "Promo referral: ajak klien baru, dapat diskon 20%.",
  },
  testimonials: {
    eyebrow: "Dari mulut ke mulut",
    titleA: "Bukan cuma kami yang",
    titleB: "bilang begitu",
    items: [
      { quote: "Nggak perlu mikirin konten lagi. Tinggal approve, tinggal posting.", tag: "Klien, F&B" },
      { quote: "Jadwal syuting selalu tepat, revisinya jelas nggak muter-muter.", tag: "Klien, Skincare" },
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
    titleA: "Nasional, tapi",
    titleB: "berangkat dari BSD",
    body: "Kami kerja remote ke seluruh Indonesia. Titik di bawah cuma base kru kami sekarang, bukan syarat lokasi.",
    badge: "Base operasional",
    area: "BSD City, Tangerang Selatan",
    note: "Alamat lengkap belum final. Titik peta ini placeholder sampai alamat studionya siap.",
    points: [
      "Syuting on-location ke kota kamu, bukan cuma di sekitar BSD",
      "Koordinasi dan review semuanya remote, lewat WhatsApp",
      "Nggak ada biaya tambahan buat kerja jarak jauh",
    ],
    mapTag: "Peta — placeholder",
  },
  faq: {
    eyebrow: "FAQ — sebelum kamu tanya",
    titleA: "Pertanyaan yang",
    titleB: "sering ditanya",
    items: [
      {
        q: "Berapa lama pengerjaannya?",
        a: "Pengiriman standar tujuh hari kerja sejak syuting. Edit short-form biasanya lebih cepat. Kalau kamu mengejar deadline peluncuran, bilang saat kickoff dan kami susun jadwal mundur dari tanggalnya.",
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
        a: "Sama sekali tidak. Banyak klien kami mempertahankan agency untuk strategi dan memakai kami murni untuk produksi. Kami syuting sesuai brief mereka, atau menulisnya bersama.",
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
    meta: "Syuting on location · diedit in-house",
  },
};

export type Dict = typeof en;

export const dict: Record<Lang, Dict> = { en, id };
