export type Lang = "en" | "id";

const en = {
  nav: {
    items: [
      { label: "Work", href: "#work" },
      { label: "Services", href: "#services" },
      { label: "Process", href: "#process" },
      { label: "Pricing", href: "#pricing" },
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
      { client: "Kopi Arah", label: "Product stills" },
      { client: "Salt & Second", label: "New collection lookbook" },
      { client: "Brightform", label: "App launch film" },
      { client: "Mola Kitchen", label: "Menu reshoot" },
      { client: "Tanda Goods", label: "Packaging series" },
      { client: "Perch Hotels", label: "Rooms & rituals" },
      { client: "Arbor & Fen", label: "Brand film" },
      { client: "Nine Palms", label: "Resort campaign" },
      { client: "Ovra Skincare", label: "Texture study" },
      { client: "Halte Coffee", label: "Barista portraits" },
      { client: "Loop Run Club", label: "Race recap reel" },
      { client: "Casa Tepi", label: "Interior stills" },
    ],
  },
  services: {
    eyebrow: "Services — what we make",
    titleA: "Three ways to",
    titleB: "work with us",
    cards: [
      {
        tag: "SOCIAL",
        title: "Social media content",
        copy: "A month of content, planned and shot in batches. We handle the calendar, the shot list, and the files, sized and cut for each platform.",
        items: [
          "Monthly content calendar",
          "Batch shoot days",
          "Reels, stories, carousels",
          "Exports sized per platform",
        ],
      },
      {
        tag: "PHOTO",
        title: "Photography",
        copy: "Product, food, people, spaces. Studio or on location, lit properly, retouched by hand, delivered in every crop you'll actually use.",
        items: [
          "Product & food stills",
          "Portraits & team photos",
          "Location & interior shoots",
          "Retouching included",
        ],
      },
      {
        tag: "MOTION",
        title: "Motion & video",
        copy: "From 15-second cutdowns to full brand films. We script, shoot, and edit in-house, so nothing gets lost between the idea and the export.",
        items: [
          "Brand films & launch videos",
          "Short-form vertical edits",
          "Color grade & sound mix",
          "Cutdowns for every placement",
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
        title: "Consult",
        copy: "One call to hear what you're making and why. No forms, no brief template. Just a conversation.",
      },
      {
        meta: "STEP 2",
        title: "Concept",
        copy: "We turn the call into a shot list and a moodboard. You approve everything before we book a thing.",
      },
      {
        meta: "STEP 3",
        title: "Schedule",
        copy: "We lock a shoot date at our studio or your location, and confirm the crew around it.",
      },
      {
        meta: "STEP 4",
        title: "Shoot",
        copy: "Batch shoot days. We over-shoot on purpose: extra angles, extra takes, extra frames for later.",
      },
      {
        meta: "STEP 5",
        title: "Edit",
        copy: "Cut, graded, and exported per platform. Nothing gets lost between the shoot and the export.",
      },
      {
        meta: "STEP 6",
        title: "Deliver",
        copy: "You get a review link, revisions, and the final files in a tidy shared drive.",
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
        a: "Every delivery comes with a review link where you comment straight on the frame. Starter includes one revision round, Growth two, and Studio rolls revisions into the retainer. A round means one consolidated batch of notes, not one change.",
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
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Mulai project",
  },
  hero: {
    eyebrow: "Natstudio — studio konten · est. 2021",
    titleA: "Konten yang menghasilkan,",
    titleB: "bukan cuma tampil",
    body: "Bukan folder stock, bukan template daur ulang. Kami studio konten butik yang syuting dan edit semuanya sendiri: sosial media, fotografi, sampai motion. Kalau tampil di feed kamu, kami yang bikin.",
    ctaWork: "Lihat karya",
    ctaContact: "Mulai project",
    stripNote: "9:16 · slot video",
  },
  work: {
    eyebrow: "Karya pilihan — contact sheet",
    titleA: "Langsung dari",
    titleB: "contact sheet",
    sub: "Beberapa frame dari syuting terakhir. Nama klien dan campaign di bawah tiap frame. Arahkan kursor untuk mencuci fotonya.",
    frames: [
      { client: "Kopi Arah", label: "Foto produk" },
      { client: "Salt & Second", label: "Lookbook koleksi baru" },
      { client: "Brightform", label: "Film peluncuran aplikasi" },
      { client: "Mola Kitchen", label: "Pemotretan ulang menu" },
      { client: "Tanda Goods", label: "Seri kemasan" },
      { client: "Perch Hotels", label: "Kamar & ritual" },
      { client: "Arbor & Fen", label: "Film brand" },
      { client: "Nine Palms", label: "Campaign resort" },
      { client: "Ovra Skincare", label: "Studi tekstur" },
      { client: "Halte Coffee", label: "Potret barista" },
      { client: "Loop Run Club", label: "Reel rekap lomba" },
      { client: "Casa Tepi", label: "Foto interior" },
    ],
  },
  services: {
    eyebrow: "Layanan — yang kami buat",
    titleA: "Tiga cara",
    titleB: "kerja bareng kami",
    cards: [
      {
        tag: "SOCIAL",
        title: "Konten sosial media",
        copy: "Konten sebulan, direncanakan dan disyuting secara batch. Kalender, shot list, sampai file akhir kami yang urus, dipotong dan diukur untuk tiap platform.",
        items: [
          "Kalender konten bulanan",
          "Hari syuting batch",
          "Reels, stories, carousel",
          "Ekspor sesuai ukuran platform",
        ],
      },
      {
        tag: "PHOTO",
        title: "Fotografi",
        copy: "Produk, makanan, orang, ruang. Di studio atau on location, pencahayaan serius, retouch manual, dikirim dalam semua crop yang benar-benar kamu pakai.",
        items: [
          "Foto produk & makanan",
          "Potret & foto tim",
          "Syuting lokasi & interior",
          "Termasuk retouching",
        ],
      },
      {
        tag: "MOTION",
        title: "Motion & video",
        copy: "Dari cutdown 15 detik sampai brand film utuh. Naskah, syuting, dan edit semua in-house, jadi tidak ada yang hilang antara ide dan hasil ekspor.",
        items: [
          "Brand film & video peluncuran",
          "Edit vertikal short-form",
          "Color grade & sound mix",
          "Cutdown untuk semua placement",
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
        copy: "Yang merencanakan syuting kamu ada di lokasi, dan ikut mengedit. Tidak ada yang hilang karena serah terima.",
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
        title: "Konsultasi",
        copy: "Satu call buat dengar apa yang mau kamu buat dan kenapa. Tanpa form, tanpa template brief. Ngobrol aja dulu.",
      },
      {
        meta: "LANGKAH 2",
        title: "Konsep",
        copy: "Hasil call kami ubah jadi shot list dan moodboard. Semua kamu setujui sebelum kami booking apa pun.",
      },
      {
        meta: "LANGKAH 3",
        title: "Jadwal",
        copy: "Kami kunci tanggal syuting di studio kami atau lokasi kamu, sekaligus konfirmasi kru yang turun.",
      },
      {
        meta: "LANGKAH 4",
        title: "Syuting",
        copy: "Hari syuting batch. Kami sengaja over-shoot: angle ekstra, take ekstra, frame ekstra untuk nanti.",
      },
      {
        meta: "LANGKAH 5",
        title: "Editing",
        copy: "Dipotong, digrade, diekspor per platform. Nggak ada yang hilang antara syuting dan hasil ekspor.",
      },
      {
        meta: "LANGKAH 6",
        title: "Pengiriman",
        copy: "Kamu dapat link review, revisi, dan file final dalam drive yang rapi.",
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
  },
  faq: {
    eyebrow: "FAQ — sebelum kamu tanya",
    titleA: "Pertanyaan yang",
    titleB: "wajar",
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
        a: "Setiap pengiriman datang dengan link review, kamu bisa komentar langsung di frame-nya. Starter dapat satu ronde revisi, Growth dua, dan Studio revisinya berjalan dalam retainer. Satu ronde artinya satu batch catatan yang digabung, bukan satu perubahan.",
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
    body: "Ceritakan yang mau kamu buat. Kami balas dalam satu hari kerja dengan rencana dan harga.",
    elsewhere: "Media sosial",
    copyright: "© 2026 Natstudio. Hak cipta dilindungi.",
    meta: "Syuting on location · diedit in-house",
  },
};

export type Dict = typeof en;

export const dict: Record<Lang, Dict> = { en, id };
