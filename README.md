# 🎓 English Course — Website Profil Lembaga

Website profil modern untuk lembaga kursus bahasa Inggris, dibangun dengan **React + Vite** dan dilengkapi animasi GSAP yang imersif serta smooth scrolling Lenis. Dirancang untuk memberikan kesan premium dan profesional kepada calon siswa.

---

## ✨ Fitur Utama

- **Hero Section** — Animasi kartu gambar bertingkat dengan efek hover dan transisi ke AboutSection menggunakan GSAP
- **About Section** — Penjelasan singkat tentang lembaga, animasi kartu sambung dari HeroSection
- **Why Section** — Alasan memilih kursus ini, tampilan grid interaktif
- **Program Section** — Kartu program kursus interaktif; klik kartu untuk melihat detail dan animasi transisi latar belakang
- **Where Section** — Peta lokasi cabang (Medan) dengan iframe embed + info card per cabang
- **Testimonial Section** — Slider testimoni alumni dengan animasi masuk
- **Final Section (CTA)** — Ajakan bergabung dengan tombol pendaftaran
- **Header** — Navigasi glassmorphism responsif dengan animasi entrance dan auto-scroll ke section
- **Footer** — Informasi kontak dan sosial media

---

## 🛠️ Tech Stack

| Teknologi | Versi | Keterangan |
|---|---|---|
| [React](https://react.dev/) | ^19 | UI Framework |
| [Vite](https://vitejs.dev/) | ^8 | Build tool & Dev server |
| [Tailwind CSS](https://tailwindcss.com/) | ^4 | Utility-first styling |
| [GSAP](https://gsap.com/) | ^3.15 | Animasi & ScrollTrigger |
| [Lenis](https://lenis.darkroom.engineering/) | ^1.3 | Smooth scrolling |
| [Lucide React](https://lucide.dev/) | ^1.11 | Icon library |
| [React Router DOM](https://reactrouter.com/) | ^7 | Client-side routing |

---

## 📁 Struktur Proyek

```
EnglishCourse/
├── public/
│   └── img/                  # Aset gambar (foto, texture)
├── src/
│   ├── assets/               # Aset statis tambahan
│   ├── Components/
│   │   ├── Header.jsx        # Navigasi glassmorphism + smooth scroll
│   │   └── Footer.jsx        # Footer dengan info kontak
│   ├── Layouts/
│   │   └── GlobalLayout.jsx  # Layout utama: Lenis + GSAP sync + scroll reset
│   ├── Pages/
│   │   └── Home.jsx          # Halaman utama, merangkai semua section
│   ├── Sections/
│   │   ├── HeroSection.jsx   # Hero + animasi kartu bertingkat
│   │   ├── AboutSection.jsx  # Tentang lembaga
│   │   ├── WhySectionTes.jsx # Alasan memilih kursus ini
│   │   ├── ProgramSection.jsx# Program kursus interaktif
│   │   ├── WhereSection.jsx  # Lokasi cabang + peta
│   │   ├── TestiSection.jsx  # Testimoni alumni
│   │   └── FinalSection.jsx  # Call-to-action penutup
│   ├── index.css             # Global styles
│   └── main.jsx              # Entry point aplikasi
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Memulai (Development)

### Prasyarat
- **Node.js** v18 atau lebih baru
- **npm** atau **yarn**

### Instalasi

```bash
# Clone repositori
git clone https://github.com/Aguira1908/EnglishCourse.git
cd EnglishCourse

# Install dependensi
npm install

# Jalankan dev server
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser.

### Build Produksi

```bash
npm run build
```

Output akan tersedia di folder `dist/`.

---

## 🎨 Desain & Animasi

- **Smooth Scrolling** — Ditenagai oleh Lenis, disinkronkan dengan GSAP ticker untuk animasi ScrollTrigger yang mulus
- **GSAP ScrollTrigger** — Animasi masuk berbasis scroll pada setiap section
- **Scroll Reset** — Setiap navigasi atau refresh halaman otomatis kembali ke posisi teratas
- **Glassmorphism Header** — Header transparan dengan efek blur yang muncul dengan animasi entrance
- **Interactive Program Cards** — Kartu program dapat diklik untuk menampilkan detail dan mengubah latar belakang section secara dinamis

---

## 📝 Lisensi

Proyek ini dibuat untuk keperluan portofolio dan pengembangan lembaga. Hak cipta © 2026.
