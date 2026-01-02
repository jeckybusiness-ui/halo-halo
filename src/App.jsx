import React, { useState, useEffect, useRef } from 'react';
// Import fungsi yang dibutuhkan dari SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { 
  getFirestore, doc, setDoc, onSnapshot, updateDoc, getDoc 
} from 'firebase/firestore';

// --- Icons Component (Inline SVG) ---
const Heart = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);
const MessageCircle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
);
const ArrowRight = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const RefreshCw = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
);
const BookOpen = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);
const AlertCircle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
);
const CheckCircle2 = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
);
const Share2 = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
);
const Menu = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);
const X = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>
);
const Users = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const Copy = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
);
const Loader = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`animate-spin ${className}`}><path d="M21 12a9 9 0 1 1-6.21-10.42 12 12 0 0 1 0 6.21"/></svg>
);
const LinkIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
);
const UserCircle = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
);
const Trophy = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
);

// --- 25 SCENARIOS LENGKAP ---
const SCENARIOS = [
  {
    id: 1,
    title: "Mantan di Reuni",
    genre: "Perselingkuhan",
    pov: "Suami",
    story: "Kamu datang ke reuni SMA sendirian. Di sana, kamu bertemu mantan terindahmu yang kini sukses dan menawan. Dia mendekatimu, mengajak ngobrol intens, dan mengaku baru cerai. Di akhir acara, dia meminta nomor HP-mu 'untuk bisnis' dan menawarkan tumpangan pulang karena searah.",
    question: "Apa yang akan kamu lakukan?",
    options: [
      { id: 'A', text: "Berikan nomor HP & tumpangan.", consequence: "Berbahaya. Membuka pintu masa lalu." },
      { id: 'B', text: "Tolak halus semuanya.", consequence: "Aman, menjaga perasaan pasangan." },
      { id: 'C', text: "Hanya berikan nomor HP.", consequence: "Abu-abu. Bisa jadi awal masalah." }
    ],
    discussion: "Apakah bertukar kontak dengan mantan itu wajar bagi kalian?"
  },
  {
    id: 2,
    title: "Promosi Jabatan LDR",
    genre: "Prioritas",
    pov: "Istri",
    story: "Kamu dapat promosi impian jadi VP, tapi harus pindah ke Eropa selama 3 tahun. Suamimu baru merintis bisnis di kota ini dan tidak mungkin ikut pindah. LDR 3 tahun adalah waktu yang sangat lama.",
    question: "Keputusan apa yang kamu ambil?",
    options: [
      { id: 'A', text: "Tolak promosi demi suami.", consequence: "Karir stagnan, tapi keluarga utuh." },
      { id: 'B', text: "Ambil promosi, jalani LDR.", consequence: "Resiko hubungan renggang sangat besar." },
      { id: 'C', text: "Minta suami tutup bisnis & ikut.", consequence: "Egois, mematikan mimpi suami." }
    ],
    discussion: "Siapa yang harus mengalah dalam karir?"
  },
  {
    id: 3,
    title: "Hutang Keluarga",
    genre: "Keuangan",
    pov: "Suami",
    story: "Kalian menabung untuk rumah. Tiba-tiba adikmu terlilit hutang pinjol dan diancam. Orang tuamu memohon bantuanmu. Jumlahnya 50% tabungan rumah. Istrimu sangat ketat soal uang dan pasti marah besar jika tahu.",
    question: "Tindakanmu?",
    options: [
      { id: 'A', text: "Pakai uang diam-diam.", consequence: "Bohong besar. Istri bisa hilang percaya." },
      { id: 'B', text: "Diskusi jujur dengan istri.", consequence: "Resiko bertengkar, tapi transparan." },
      { id: 'C', text: "Tolak bantu adik.", consequence: "Tega pada keluarga, tapi aman sama istri." }
    ],
    discussion: "Batas bantuan finansial ke keluarga besar?"
  },
  {
    id: 4,
    title: "Rekan Kerja Akrab",
    genre: "Rekan Kerja",
    pov: "Istri",
    story: "Ada rekan kerja baru yang sangat nyambung denganmu. Kalian sering makan siang bareng dan chat soal kerjaan sampai malam. Suamimu mulai merasa tidak nyaman dan cemburu, padahal menurutmu ini profesional.",
    question: "Responmu?",
    options: [
      { id: 'A', text: "Jauhi rekan kerja total.", consequence: "Profesionalisme terganggu, suami senang." },
      { id: 'B', text: "Tetap berteman, abaikan suami.", consequence: "Suami makin curiga & terluka." },
      { id: 'C', text: "Kenalkan mereka berdua.", consequence: "Transparansi, tapi canggung." }
    ],
    discussion: "Apa batasan pertemanan lawan jenis di kantor?"
  },
  {
    id: 5,
    title: "Intervensi Mertua",
    genre: "Mertua",
    pov: "Suami",
    story: "Ibumu sering datang tanpa kabar dan mengatur cara istrimu mengurus rumah. Istrimu sudah menangis dan minta kamu menegur ibumu. Tapi ibumu punya penyakit jantung dan gampang shock jika tersinggung.",
    question: "Sikapmu?",
    options: [
      { id: 'A', text: "Tegas tegur Ibu.", consequence: "Istri lega, Ibu mungkin sakit hati/fisik." },
      { id: 'B', text: "Minta istri sabar saja.", consequence: "Istri merasa tidak dibela." },
      { id: 'C', text: "Pura-pura tidak tahu.", consequence: "Masalah menumpuk jadi bom waktu." }
    ],
    discussion: "Kapan suami harus membela istri di depan ibunya?"
  },
  {
    id: 6,
    title: "Cek HP & Password",
    genre: "Privasi",
    pov: "Istri",
    story: "Pasanganmu tiba-tiba meminta password semua sosial media dan HP-mu sebagai bukti cinta dan transparansi. Kamu tidak menyembunyikan apa-apa, tapi merasa ini pelanggaran privasi.",
    question: "Keputusanmu?",
    options: [
      { id: 'A', text: "Kasih semua password.", consequence: "Transparan total, nol privasi." },
      { id: 'B', text: "Tolak tegas.", consequence: "Dianggap menyembunyikan sesuatu." },
      { id: 'C', text: "Kasih tapi minta password dia juga.", consequence: "Adil, saling memantau." }
    ],
    discussion: "Apakah pasangan berhak tahu semua password?"
  },
  {
    id: 7,
    title: "Liburan vs Investasi",
    genre: "Keuangan",
    pov: "Suami",
    story: "Istrimu ingin sekali liburan ke luar negeri tahun ini sebagai 'reward'. Biayanya mahal. Kamu tipe hemat dan ingin uangnya diinvestasikan untuk dana darurat.",
    question: "Solusinya?",
    options: [
      { id: 'A', text: "Turuti istri walau berat.", consequence: "Istri bahagia, tabungan menipis." },
      { id: 'B', text: "Larang liburan, investasi saja.", consequence: "Keuangan aman, istri kecewa berat." },
      { id: 'C', text: "Cari liburan murah lokal.", consequence: "Kompromi, walau bukan impian istri." }
    ],
    discussion: "Experience vs Investment: Mana prioritas?"
  },
  {
    id: 8,
    title: "Beban Rumah Tangga",
    genre: "Hubungan Suami Istri",
    pov: "Istri",
    story: "Kalian berdua bekerja full-time. Tapi saat pulang, suamimu langsung istirahat, sedangkan kamu masih harus masak dan beberes. Kamu lelah fisik dan mental.",
    question: "Tindakanmu?",
    options: [
      { id: 'A', text: "Kerjakan semua sendiri sambil ngomel.", consequence: "Rumah rapi, tapi kamu stress." },
      { id: 'B', text: "Mogok kerja rumah.", consequence: "Rumah berantakan, jadi konflik." },
      { id: 'C', text: "Buat jadwal piket tertulis.", consequence: "Terkesan kaku seperti asrama." }
    ],
    discussion: "Apakah tugas rumah itu kewajiban istri semata?"
  },
  {
    id: 9,
    title: "Hukuman Anak",
    genre: "Anak",
    pov: "Suami",
    story: "Anak kalian membuat kesalahan. Istrimu ingin menghukum tegas (sita HP). Kamu merasa anak perlu diajak bicara lembut saja, jangan dihukum. Istri mulai marah padamu di depan anak.",
    question: "Sikapmu?",
    options: [
      { id: 'A', text: "Dukung istri di depan anak.", consequence: "Kompak, walau kamu tidak setuju." },
      { id: 'B', text: "Debat istri di depan anak.", consequence: "Otoritas orang tua runtuh." },
      { id: 'C', text: "Diam saja lalu hibur anak diam-diam.", consequence: "Anak bingung mana yang benar." }
    ],
    discussion: "Bolehkan berbeda pendapat parenting di depan anak?"
  },
  {
    id: 10,
    title: "Jarang Posting Foto",
    genre: "Sosial Media",
    pov: "Istri",
    story: "Pasanganmu jarang sekali memposting fotomu di medsos. Sementara dia sering posting hobi. Kamu merasa seperti disembunyikan.",
    question: "Apa yang kamu lakukan?",
    options: [
      { id: 'A', text: "Tuntut dia posting fotomu.", consequence: "Terpaksa posting, bukan tulus." },
      { id: 'B', text: "Balas tidak posting foto dia.", consequence: "Pembalasan kekanak-kanakan." },
      { id: 'C', text: "Terima saja, privasi itu beda-beda.", consequence: "Dewasa, tapi hati kecil sedih." }
    ],
    discussion: "Seberapa penting 'Go Public' di medsos?"
  },
  {
    id: 11,
    title: "Aib Saudara Kandung",
    genre: "Privasi Keluarga",
    pov: "Suami",
    story: "Kakak kandungmu ketahuan berselingkuh dan diambang perceraian. Orang tuamu memohon agar kamu merahasiakan ini dari istrimu agar nama baik keluarga terjaga. Istrimu bertanya kenapa kakakmu terlihat sedih.",
    question: "Tindakanmu?",
    options: [
      { id: 'A', text: "Ceritakan semua pada istri.", consequence: "Jujur pada pasangan, melanggar janji ortu." },
      { id: 'B', text: "Bohong, bilang kakak cuma sakit.", consequence: "Menjaga aib keluarga, tapi membohongi istri." },
      { id: 'C', text: "Bilang 'ada masalah' tanpa detail.", consequence: "Diplomatis, tapi istri mungkin curiga." }
    ],
    discussion: "Apakah pasangan berhak tahu semua aib keluarga besar?"
  },
  {
    id: 12,
    title: "Sahabat Lawan Jenis (HTS)",
    genre: "Batasan Hubungan",
    pov: "Istri",
    story: "Kamu punya sahabat pria dari kecil. Kalian biasa pelukan atau senderan bahu (platonik). Suamimu risih dan minta kamu jaga jarak fisik, tapi bagimu itu bahasa kasih sayang sahabat.",
    question: "Keputusanmu?",
    options: [
      { id: 'A', text: "Berhenti kontak fisik total.", consequence: "Menghormati suami, canggung sama sahabat." },
      { id: 'B', text: "Lanjut terus, minta suami ngerti.", consequence: "Suami merasa tidak dihargai." },
      { id: 'C', text: "Kurangi pelan-pelan.", consequence: "Kompromi, tapi mungkin suami kurang puas." }
    ],
    discussion: "Apa batasan fisik dengan sahabat lawan jenis?"
  },
  {
    id: 13,
    title: "Mantan Minta Tolong",
    genre: "Mantan",
    pov: "Suami",
    story: "Mantan pacarmu menelepon sambil menangis, dia mengalami KDRT dan butuh tempat aman sementara malam ini. Dia tidak punya siapa-siapa lagi di kota ini.",
    question: "Apa yang kamu lakukan?",
    options: [
      { id: 'A', text: "Bawa ke rumah, kenalkan istri.", consequence: "Niat baik, tapi berpotensi konflik besar." },
      { id: 'B', text: "Pesankan hotel, jangan temui.", consequence: "Membantu jarak jauh, lebih aman." },
      { id: 'C', text: "Abaikan demi perasaan istri.", consequence: "Tega, tapi rumah tangga aman." }
    ],
    discussion: "Bolehkah menolong mantan dalam kondisi darurat?"
  },
  {
    id: 14,
    title: "PHK Diam-diam",
    genre: "Kejujuran",
    pov: "Suami",
    story: "Kamu baru saja di-PHK. Istrimu sedang hamil tua dan mudah stress. Kamu takut berita ini mengguncang kehamilannya. Kamu berpura-pura berangkat kerja setiap pagi padahal mencari lowongan.",
    question: "Tindakanmu?",
    options: [
      { id: 'A', text: "Terus pura-pura sampai dapat kerja.", consequence: "Istri tenang, tapi kamu menanggung beban sendiri." },
      { id: 'B', text: "Jujur sekarang juga.", consequence: "Resiko kesehatan istri, tapi tidak ada rahasia." },
      { id: 'C', text: "Cerita ke ortu dulu, bukan istri.", consequence: "Mencari dukungan lain, istri belakangan." }
    ],
    discussion: "Kapan 'White Lie' diperbolehkan demi kesehatan pasangan?"
  },
  {
    id: 15,
    title: "Kado dari Mantan",
    genre: "Mantan",
    pov: "Istri",
    story: "Mantan pacarmu mengirim kado ulang tahun mahal (tas branded) ke kantor. Dia tahu alamat kantormu. Suamimu belum tahu soal ini.",
    question: "Keputusanmu?",
    options: [
      { id: 'A', text: "Kembalikan kado ke mantan.", consequence: "Tegas menutup pintu." },
      { id: 'B', text: "Simpan kado, jangan bilang suami.", consequence: "Menikmati barang, menyimpan rahasia." },
      { id: 'C', text: "Bawa pulang, cerita ke suami.", consequence: "Jujur, tapi suami bisa cemburu/marah." }
    ],
    discussion: "Haruskah melaporkan setiap interaksi sepihak dari mantan?"
  },
  {
    id: 16,
    title: "Stalking Mantan",
    genre: "Mantan/HTS",
    pov: "Suami",
    story: "Kamu penasaran dengan kabar mantan dan sering stalking IG-nya pakai akun fake. Kamu tidak ada niat selingkuh, cuma kepo. Istrimu tidak sengaja melihat history pencarianmu.",
    question: "Penjelasanmu?",
    options: [
      { id: 'A', text: "Mengaku cuma iseng.", consequence: "Jujur, tapi istri pasti insecure." },
      { id: 'B', text: "Bilang itu akun teman yang pinjam.", consequence: "Bohong untuk menutupi masalah kecil." },
      { id: 'C', text: "Marah balik karena istri cek HP.", consequence: "Gaslighting, membalikkan kesalahan." }
    ],
    discussion: "Apakah stalking mantan termasuk selingkuh hati?"
  },
  {
    id: 17,
    title: "Grup Chat Keluarga",
    genre: "Mertua",
    pov: "Istri",
    story: "Keluarga besar suamimu punya grup WhatsApp. Mereka sering menyindir gaya hidupmu secara halus di sana. Kamu merasa tidak nyaman dan ingin keluar grup.",
    question: "Tindakanmu?",
    options: [
      { id: 'A', text: "Left group langsung.", consequence: "Lega, tapi dianggap tidak sopan/baper." },
      { id: 'B', text: "Minta suami tegur keluarganya.", consequence: "Suami terjepit di tengah konflik." },
      { id: 'C', text: "Silent grup, jangan dibaca.", consequence: "Makan hati sendiri, tapi damai." }
    ],
    discussion: "Wajibkah ada di grup keluarga pasangan yang toxic?"
  },
  {
    id: 18,
    title: "Teman 'Rasa Pacar'",
    genre: "Batasan Hubungan",
    pov: "Suami",
    story: "Istrimu punya teman curhat pria. Saat kalian bertengkar, dia sering curhat ke pria itu. Pria itu sering memberi nasihat yang memojokkanmu.",
    question: "Sikapmu?",
    options: [
      { id: 'A', text: "Larang istri curhat ke pria lain.", consequence: "Terkesan posesif, tapi menjaga privasi rumah tangga." },
      { id: 'B', text: "Labrak pria itu.", consequence: "Konflik meluas jadi masalah eksternal." },
      { id: 'C', text: "Diamkan, introspeksi diri.", consequence: "Masalah tidak selesai, istri makin nyaman dengan dia." }
    ],
    discussion: "Bolehkah curhat masalah rumah tangga ke lawan jenis?"
  },
  {
    id: 19,
    title: "Trauma Masa Lalu",
    genre: "Privasi Diri",
    pov: "Istri",
    story: "Kamu punya trauma pelecehan di masa lalu yang belum pernah kamu ceritakan ke suamimu. Ini mempengaruhi kehidupan intim kalian. Suami merasa kamu tidak tertarik padanya.",
    question: "Keputusanmu?",
    options: [
      { id: 'A', text: "Cerita semua walau berat.", consequence: "Membuka luka lama, berharap suami mengerti." },
      { id: 'B', text: "Pergi ke psikolog diam-diam.", consequence: "Mencoba sembuh sendiri." },
      { id: 'C', text: "Paksa diri melayani suami.", consequence: "Menyakiti diri sendiri demi kewajiban." }
    ],
    discussion: "Haruskah semua trauma masa lalu diceritakan sebelum menikah?"
  },
  {
    id: 20,
    title: "Anak Adopsi vs Kandung",
    genre: "Prinsip",
    pov: "Suami",
    story: "Kalian sulit punya anak. Istrimu ingin sekali adopsi. Kamu merasa belum siap mencintai anak orang lain dan masih ingin mencoba bayi tabung (IVF) walau mahal dan menyakitkan istri.",
    question: "Pilihanmu?",
    options: [
      { id: 'A', text: "Setuju adopsi demi istri.", consequence: "Istri bahagia, kamu butuh waktu adaptasi." },
      { id: 'B', text: "Paksa coba IVF sekali lagi.", consequence: "Fisik istri terkuras, ego suami terpenuhi." },
      { id: 'C', text: "Tunda keduanya, fokus berdua.", consequence: "Masalah anak jadi ganjalan tak terselesaikan." }
    ],
    discussion: "Apa arti kehadiran anak bagi kalian?"
  },
  {
    id: 21,
    title: "Jalan Berdua Teman",
    genre: "HTS/Batasan",
    pov: "Istri",
    story: "Teman priamu mengajak nonton bioskop berdua karena punya tiket lebih. Kalian sama-sama suka film itu. Suamimu sedang dinas luar kota.",
    question: "Jawabanmu?",
    options: [
      { id: 'A', text: "Pergi, kan cuma teman.", consequence: "Menikmati hobi, resiko suami salah paham." },
      { id: 'B', text: "Izin suami dulu, kalau boleh baru pergi.", consequence: "Transparan, menghargai suami." },
      { id: 'C', text: "Tolak demi hindari fitnah.", consequence: "Aman, tapi kehilangan momen seru." }
    ],
    discussion: "Bolehkah jalan berdua dengan lawan jenis saat sudah menikah?"
  },
  {
    id: 22,
    title: "Gaji Istri Lebih Besar",
    genre: "Karir/Ego",
    pov: "Suami",
    story: "Istrimu naik jabatan dan gajinya kini 3x lipat gajimu. Dia mulai sering mentraktir dan mengambil keputusan finansial besar. Kamu merasa harga dirimu sebagai kepala keluarga terganggu.",
    question: "Sikapmu?",
    options: [
      { id: 'A', text: "Minta istri resign/cari kerja santai.", consequence: "Ego terselamatkan, ekonomi keluarga turun." },
      { id: 'B', text: "Terima dan dukung istri.", consequence: "Menurunkan ego, menikmati kemapanan." },
      { id: 'C', text: "Kerja sampingan gila-gilaan.", consequence: "Lelah fisik demi menyaingi gaji istri." }
    ],
    discussion: "Apakah suami harus selalu berpenghasilan lebih tinggi?"
  },
  {
    id: 23,
    title: "Sandi HP Berubah",
    genre: "Privasi/Curiga",
    pov: "Istri",
    story: "Suamimu yang biasanya menaruh HP sembarangan, tiba-tiba mengubah sandi dan sering membawa HP ke kamar mandi. Saat ditanya, dia bilang 'butuh privasi'.",
    question: "Responmu?",
    options: [
      { id: 'A', text: "Diam-diam cari tahu sandinya.", consequence: "Melanggar privasi demi kebenaran." },
      { id: 'B', text: "Konfrontasi langsung.", consequence: "Suasana rumah jadi tegang dan penuh curiga." },
      { id: 'C', text: "Berpikir positif, biarkan saja.", consequence: "Hati tidak tenang, resiko diselingkuhi." }
    ],
    discussion: "Tanda-tanda apa yang membuat kalian mulai curiga?"
  },
  {
    id: 24,
    title: "Mertua Pinjam Uang",
    genre: "Keuangan/Keluarga",
    pov: "Suami",
    story: "Ayahmu (mertua istri) ingin meminjam uang tabungan pendidikan anak kalian untuk modal usaha. Track record usaha ayahmu buruk dan sering gagal bayar.",
    question: "Keputusanmu?",
    options: [
      { id: 'A', text: "Pinjamkan diam-diam.", consequence: "Bakti anak, tapi mengorbankan masa depan anak." },
      { id: 'B', text: "Tolak tegas.", consequence: "Hubungan dengan ayah retak." },
      { id: 'C', text: "Diskusi dengan istri (pasti ditolak).", consequence: "Istri jadi 'orang jahat' yang menolak." }
    ],
    discussion: "Uang kita vs Uang orang tua: Dimana garisnya?"
  },
  {
    id: 25,
    title: "Double Date Mantan",
    genre: "Mantan",
    pov: "Istri",
    story: "Mantanmu yang dulu putus baik-baik mengajak 'Double Date' (kamu & suami, dia & pacar baru). Suamimu tipe cemburuan.",
    question: "Tindakanmu?",
    options: [
      { id: 'A', text: "Terima ajakan untuk silaturahmi.", consequence: "Suasana pasti awkward dan tegang." },
      { id: 'B', text: "Tolak, jaga perasaan suami.", consequence: "Menghindari drama yang tidak perlu." },
      { id: 'C', text: "Pergi sendiri menemui mereka.", consequence: "Sangat tidak pantas bagi suami." }
    ],
    discussion: "Perlukah menjalin silaturahmi dengan mantan setelah menikah?"
  }
];

// --- Initialization Firebase (YOUR CONFIG) ---
const firebaseConfig = {
  apiKey: "AIzaSyDRzjrhryX8Hpq8tmrCCDhlJQugbz2r7_0",
  authDomain: "testing-95321.firebaseapp.com",
  projectId: "testing-95321",
  storageBucket: "testing-95321.firebasestorage.app",
  messagingSenderId: "457933264802",
  appId: "1:457933264802:web:c7004083fd4a19336984fb",
  measurementId: "G-W503YYH8DT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
const auth = getAuth(app);
const db = getFirestore(app);

const App = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [view, setView] = useState('home'); 
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null); 
  
  // Multiplayer State
  const [user, setUser] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [gameData, setGameData] = useState(null);
  const [playerRole, setPlayerRole] = useState(null); // 'host' or 'guest'
  const unsubscribeRoomRef = useRef(null);

  useEffect(() => {
    const initAuth = async () => {
        try {
           await signInAnonymously(auth);
        } catch (error) {
            console.error("Auth Error:", error);
            if (error.code === 'auth/configuration-not-found' || error.code === 'auth/operation-not-allowed') {
                setAuthError("Fitur Login Anonim belum aktif di Firebase Console.");
            } else {
                setAuthError(`Gagal menghubungkan ke server: ${error.message}`);
            }
        }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
          setUser(u);
          setAuthError(null);
          // Auto-check URL for room ID when auth is ready
          const params = new URLSearchParams(window.location.search);
          const urlRoomId = params.get('room');
          if (urlRoomId) {
              joinRoom(urlRoomId, u); 
          }
      }
    });
    return () => unsubscribe();
  }, []);

  // --- Multiplayer Functions ---

  const createRoom = async () => {
    if (!user) {
        alert("Menunggu koneksi ke server...");
        return;
    }
    
    setIsLoading(true);
    setGameData(null); 
    try {
        const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
        const roomRef = doc(db, 'rooms', `room_${newRoomId}`);
        
        await setDoc(roomRef, {
          createdAt: new Date().toISOString(),
          hostId: user.uid,
          scenarioIndex: 0,
          hostAnswer: null,
          guestAnswer: null,
          status: 'waiting_guest',
          score: 0 // Initialize Score
        });

        setRoomId(newRoomId);
        setPlayerRole('host'); 
        subscribeToRoom(newRoomId);
        setView('multiplayer-game'); 
    } catch (error) {
        console.error("Error creating room:", error);
        alert("Gagal membuat room. Pastikan koneksi internet lancar.");
    } finally {
        setIsLoading(false);
    }
  };

  const joinRoom = async (inputRoomId, currentUser = user) => {
    if (!currentUser || !inputRoomId) return;

    setIsLoading(true);
    setGameData(null); 
    try {
        const cleanId = inputRoomId.trim().toUpperCase();
        const roomRef = doc(db, 'rooms', `room_${cleanId}`);
        const snap = await getDoc(roomRef);

        if (snap.exists()) {
          const data = snap.data();
          
          if (data.hostId !== currentUser.uid) {
              await updateDoc(roomRef, {
                status: 'playing',
                guestId: currentUser.uid
              });
              setPlayerRole('guest'); 
          } else {
              setPlayerRole('host'); 
          }

          setRoomId(cleanId);
          subscribeToRoom(cleanId);
          setView('multiplayer-game');
        } else {
          alert("Room tidak ditemukan / Link kadaluarsa.");
          window.history.pushState({}, document.title, window.location.pathname);
        }
    } catch (error) {
        console.error("Error joining room:", error);
        alert("Gagal bergabung ke room.");
    } finally {
        setIsLoading(false);
    }
  };

  const subscribeToRoom = (id) => {
    if (unsubscribeRoomRef.current) unsubscribeRoomRef.current();
    
    const roomRef = doc(db, 'rooms', `room_${id}`);
    unsubscribeRoomRef.current = onSnapshot(roomRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setGameData(data);
        setCurrentScenarioIndex(data.scenarioIndex);
      } else {
           if (view === 'multiplayer-game') {
             alert("Room terputus.");
             setView('multiplayer-lobby');
           }
      }
    }, (error) => {
        console.error("Snapshot error:", error);
        alert("Gagal memuat data room.");
        setView('multiplayer-lobby');
    });
  };

  const submitMultiplayerAnswer = async (option) => {
    if (!gameData || !roomId) return;
    try {
        const roomRef = doc(db, 'rooms', `room_${roomId}`);
        const updatePayload = playerRole === 'host' ? { hostAnswer: option.id } : { guestAnswer: option.id };
        await updateDoc(roomRef, updatePayload);
    } catch (error) {
        console.error("Error submitting answer:", error);
    }
  };

  const nextMultiplayerScenario = async () => {
    try {
        const roomRef = doc(db, 'rooms', `room_${roomId}`);
        const nextIndex = (gameData.scenarioIndex + 1);
        
        // Calculate Score Logic: If answers match, increment score
        const currentScore = gameData.score || 0;
        const isMatch = gameData.hostAnswer === gameData.guestAnswer;
        const newScore = isMatch ? currentScore + 1 : currentScore;

        await updateDoc(roomRef, {
          scenarioIndex: nextIndex,
          hostAnswer: null,
          guestAnswer: null,
          status: 'playing',
          score: newScore
        });
    } catch (error) {
        console.error("Error next scenario:", error);
    }
  };

  const resetGame = async () => {
      try {
        const roomRef = doc(db, 'rooms', `room_${roomId}`);
        await updateDoc(roomRef, {
            scenarioIndex: 0,
            hostAnswer: null,
            guestAnswer: null,
            score: 0,
            status: 'playing'
        });
      } catch (error) {
          console.error("Error resetting game:", error);
      }
  };

  const copyInviteLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            alert("Link undangan disalin! Kirim ke pasanganmu.");
        }).catch(() => fallbackCopy(url));
    } else {
        fallbackCopy(url);
    }
  };

  const fallbackCopy = (text) => {
     const textArea = document.createElement("textarea");
     textArea.value = text;
     document.body.appendChild(textArea);
     textArea.select();
     try {
        document.execCommand('copy');
        alert("Link undangan disalin! Kirim ke pasanganmu.");
     } catch (err) {
        console.error('Fallback copy failed', err);
     }
     document.body.removeChild(textArea);
  };

  // --- Render Functions ---

  const currentScenario = SCENARIOS[currentScenarioIndex];
  const bothAnswered = gameData && gameData.hostAnswer && gameData.guestAnswer;
  const myAnswerId = gameData ? (playerRole === 'host' ? gameData.hostAnswer : gameData.guestAnswer) : null;
  const partnerAnswerId = gameData ? (playerRole === 'host' ? gameData.guestAnswer : gameData.hostAnswer) : null;
  
  const handleSinglePlayerSelect = (option) => {
    setSelectedOption(option);
    setShowResult(true);
  };

  // --- Screens ---

  const Navbar = () => (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
        if(view.includes('multiplayer')) {
           if(confirm("Keluar dari game online?")) {
              setView('home'); 
              setRoomId(''); 
              setGameData(null);
              window.history.pushState({}, document.title, window.location.pathname);
           }
        } else {
           setView('home');
        }
      }}>
        <div className="bg-rose-500 p-2 rounded-lg">
          <Heart className="w-5 h-5 text-white fill-current" />
        </div>
        <span className="font-bold text-xl text-gray-800 tracking-tight">Dilema<span className="text-rose-500">Asmara</span></span>
      </div>
      <button className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
        <button onClick={() => setView('home')} className="hover:text-rose-500 transition">Home</button>
        <button onClick={() => setView('multiplayer-lobby')} className={`hover:text-rose-500 transition ${view.includes('multiplayer') ? 'text-rose-600 font-bold' : ''}`}>Mode Pasangan</button>
      </div>
    </nav>
  );

  const HomeScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center space-y-8 animate-fade-in">
      <div className="relative">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="bg-white p-8 rounded-2xl shadow-xl relative z-10 max-w-lg border border-rose-100">
          <Heart className="w-16 h-16 text-rose-500 mx-auto mb-6 fill-rose-100" />
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            Seberapa Kenal Kamu dengan <span className="text-rose-500">Pasanganmu?</span>
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Jawab dilema cinta yang sulit. Bagikan link ke pasanganmu untuk melihat apakah jawaban kalian cocok.
          </p>
          <div className="flex flex-col gap-3">
             <button 
                onClick={() => setView('play')}
                className="w-full bg-white border-2 border-rose-500 text-rose-600 font-bold py-4 px-8 rounded-xl shadow-sm hover:bg-rose-50 transition flex items-center justify-center gap-2"
            >
                Main Sendiri (Simulasi) <ArrowRight className="w-5 h-5" />
            </button>
            <button 
                onClick={() => setView('multiplayer-lobby')}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105 flex items-center justify-center gap-2"
            >
                <Users className="w-5 h-5" /> Mulai Game Pasangan
            </button>
          </div>
          <p className="mt-4 text-xs text-gray-400 uppercase tracking-wide">Cocok untuk Deep Talk & LDR</p>
        </div>
      </div>
    </div>
  );

  if (authError) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4 font-sans text-center">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-200 max-w-lg w-full">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Konfigurasi Belum Selesai</h2>
                  <p className="text-gray-600 mb-6">{authError}</p>
                  <a href={`https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/providers`} target="_blank" rel="noreferrer" className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition">Buka Firebase Console</a>
              </div>
          </div>
      );
  }

  const MultiplayerLobby = () => {
    const [joinId, setJoinId] = useState('');
    
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-rose-100 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Mode Pasangan</h2>
            
            <div className="space-y-6">
                {/* Create Room Button - Primary Action */}
                <div className="p-8 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-lg text-white transform hover:scale-105 transition duration-300">
                    <h3 className="font-bold text-xl mb-2">Saya Orang Pertama</h3>
                    <p className="text-rose-100 text-sm mb-4">Buat room baru & ajak pasangan (POV 1).</p>
                    <button 
                        onClick={createRoom} 
                        disabled={isLoading || !user}
                        className={`w-full py-3 rounded-lg font-extrabold shadow-md transition flex items-center justify-center gap-2
                            ${isLoading || !user ? 'bg-rose-400 cursor-not-allowed' : 'bg-white text-rose-600 hover:bg-gray-100'}
                        `}
                    >
                        {isLoading ? <><Loader className="w-5 h-5 text-rose-600" /> Memproses...</> : 'Mulai Main (Host)'}
                    </button>
                </div>

                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">ATAU SAYA ORANG KEDUA</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* Join Manual - Secondary */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-xs text-gray-500 mb-2">Punya kode room dari pasangan?</p>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="Kode Room"
                            value={joinId}
                            onChange={(e) => setJoinId(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg text-center uppercase font-mono text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                        />
                        <button 
                            onClick={() => joinRoom(joinId)} 
                            disabled={isLoading || !user || !joinId}
                            className="bg-gray-800 text-white px-4 rounded-lg font-bold hover:bg-black text-sm"
                        >
                            Masuk
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  const ResultScreen = ({ score, total }) => {
      const percentage = Math.round((score / total) * 100);
      let title = "";
      let message = "";
      let colorClass = "";

      if (percentage >= 80) {
          title = "Sangat Cocok! 💖";
          message = "Kalian memiliki visi dan nilai yang sangat selaras. Pertahankan komunikasi ini!";
          colorClass = "text-rose-600";
      } else if (percentage >= 50) {
          title = "Cukup Cocok 👍";
          message = "Ada beberapa perbedaan pandangan, tapi itu wajar. Jadikan topik diskusi untuk saling memahami.";
          colorClass = "text-yellow-600";
      } else {
          title = "Perlu Banyak Diskusi ⚠️";
          message = "Banyak pandangan yang berseberangan. Jangan khawatir, ini kesempatan bagus untuk deep talk serius.";
          colorClass = "text-orange-600";
      }

      return (
          <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl text-center space-y-6 animate-fade-in border-4 border-rose-100">
              <div className="flex justify-center">
                  <Trophy className={`w-20 h-20 ${colorClass}`} />
              </div>
              <div>
                  <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Hasil Kecocokan</h2>
                  <div className="text-6xl font-black text-gray-900 my-4">
                      {percentage}<span className="text-2xl text-gray-400">%</span>
                  </div>
                  <h3 className={`text-xl font-bold ${colorClass} mb-2`}>{title}</h3>
                  <p className="text-gray-600">{message}</p>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-xl flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Skor Kesamaan</span>
                  <span className="text-lg font-bold text-gray-800">{score} / {total} Soal</span>
              </div>

              <button 
                  onClick={resetGame}
                  className="w-full bg-gray-900 hover:bg-black text-white py-3 px-6 rounded-xl font-bold transition flex items-center justify-center gap-2"
              >
                  <RefreshCw className="w-4 h-4" />
                  Main Ulang Dari Awal
              </button>
          </div>
      );
  };

  const MultiplayerGameScreen = () => {
    if (!gameData) return (
        <div className="text-center mt-20 flex flex-col items-center gap-4 animate-fade-in">
            <Loader className="w-10 h-10 text-rose-500" />
            <span className="text-gray-600 font-medium">Sedang memuat data permainan...</span>
            <button 
                onClick={() => setView('multiplayer-lobby')} 
                className="text-sm text-gray-400 underline hover:text-gray-600 transition"
            >
                Batal / Kembali ke Lobi
            </button>
        </div>
    );

    const isWaitingGuest = gameData.status === 'waiting_guest';
    const isHost = playerRole === 'host';
    const myRoleLabel = isHost ? "Pihak Cowok / Suami 👨" : "Pihak Cewek / Istri 👩";
    const partnerRoleLabel = isHost ? "Pihak Cewek / Istri 👩" : "Pihak Cowok / Suami 👨";

    // CHECK IF GAME IS FINISHED
    if (gameData.scenarioIndex >= SCENARIOS.length) {
        return <ResultScreen score={gameData.score || 0} total={SCENARIOS.length} />;
    }

    // --- GAMEPLAY MULTIPLAYER ---
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 pb-24">
        {/* Header Status with Role Identity */}
        <div className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isWaitingGuest ? 'bg-orange-500 animate-ping' : 'bg-green-500'} `}></div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                        {isWaitingGuest ? 'Menunggu Pasangan...' : 'Tersambung'}
                    </span>
                </div>
                <div className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded">
                    Pertanyaan {currentScenarioIndex + 1} dari {SCENARIOS.length}
                </div>
            </div>
            
            {/* Player Identity Badge */}
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2">
                    <UserCircle className={`w-5 h-5 ${isHost ? 'text-blue-500' : 'text-rose-500'}`} />
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-gray-400 font-bold">Kamu Bermain Sebagai</span>
                        <span className={`text-sm font-bold ${isHost ? 'text-blue-700' : 'text-rose-700'}`}>
                            {myRoleLabel}
                        </span>
                    </div>
                </div>
            </div>

            {/* FLOATING INVITE BUTTON (Only visible if partner hasn't joined) */}
            {isWaitingGuest && (
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-4 animate-fade-in">
                    <div className="flex-1 text-center sm:text-left">
                        <p className="text-sm font-bold text-orange-800">Pasangan belum masuk!</p>
                        <p className="text-xs text-orange-600">Klik tombol ini untuk mengirim link agar dia otomatis join.</p>
                    </div>
                    <button 
                        onClick={copyInviteLink} 
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm text-sm flex items-center gap-2 transition"
                    >
                        <LinkIcon className="w-4 h-4" /> 🔗 Ajak Pasangan Join
                    </button>
                </div>
            )}
        </div>

        {/* Story Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-rose-50 to-purple-50 p-6 border-b border-gray-100 flex justify-between items-start">
            <div>
              <span className="inline-block px-3 py-1 bg-white text-rose-600 text-xs font-bold rounded-full mb-2 border border-rose-100 uppercase tracking-wider">
                {currentScenario.genre}
              </span>
              <h2 className="text-2xl font-bold text-gray-800">{currentScenario.title}</h2>
            </div>
            <div className="text-right">
              <span className="block text-xs text-gray-500 uppercase">POV Cerita</span>
              <span className="font-bold text-gray-700">{currentScenario.pov}</span>
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex gap-4 mb-6">
              <BookOpen className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
              <p className="text-gray-700 text-lg leading-relaxed font-serif italic">
                "{currentScenario.story}"
              </p>
            </div>

            <div className="flex items-center gap-3 mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div>
                  <p className="font-semibold text-gray-800">{currentScenario.question}</p>
                  {/* Contextual Hint based on Role vs POV */}
                  {((currentScenario.pov.includes("Suami") || currentScenario.pov.includes("Cowok")) && !isHost) && (
                      <p className="text-xs text-rose-600 mt-1 italic">(Ini sudut pandang pasanganmu. Jika kamu jadi dia, apa yang kamu harap dia lakukan?)</p>
                  )}
                  {((currentScenario.pov.includes("Istri") || currentScenario.pov.includes("Cewek")) && isHost) && (
                      <p className="text-xs text-blue-600 mt-1 italic">(Ini sudut pandang pasanganmu. Jika kamu jadi dia, apa yang kamu harap dia lakukan?)</p>
                  )}
              </div>
            </div>

            {/* Answer Options Section */}
            {!bothAnswered ? (
                <div className="space-y-4">
                    {/* Status Indicator */}
                    <div className="flex items-center justify-between text-sm mb-4 px-2">
                        <span className={`${myAnswerId ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                            {myAnswerId ? "✓ Kamu sudah memilih" : "• Giliranmu memilih"}
                        </span>
                        <span className={`${partnerAnswerId ? 'text-green-600 font-bold' : 'text-rose-500 animate-pulse'}`}>
                            {partnerAnswerId ? "✓ Pasangan sudah memilih" : (isWaitingGuest ? "• Menunggu pasangan join..." : "• Menunggu pasangan memilih...")}
                        </span>
                    </div>

                    {currentScenario.options.map((option) => {
                        const isSelected = myAnswerId === option.id;
                        return (
                            <button
                                key={option.id}
                                disabled={!!myAnswerId} // Disable if already answered
                                onClick={() => submitMultiplayerAnswer(option)}
                                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 group relative
                                    ${isSelected 
                                        ? 'border-rose-500 bg-rose-50' 
                                        : 'border-gray-100 hover:border-rose-300 hover:bg-gray-50'
                                    } ${!!myAnswerId && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                            >
                                <span className={`font-bold mr-3 ${isSelected ? 'text-rose-600' : 'text-gray-400'}`}>{option.id}.</span>
                                <span className="text-gray-700 font-medium">{option.text}</span>
                                {isSelected && <span className="absolute right-4 top-5 text-rose-500 font-bold text-sm">Pilihanmu</span>}
                            </button>
                        );
                    })}
                </div>
            ) : (
                // REVEAL PHASE
                <div className="animate-fade-in space-y-6">
                    <div className="text-center py-2 bg-green-100 text-green-800 rounded-lg font-bold mb-4">
                        Hasil Terungkap! 🎉
                    </div>

                    {/* Comparison UI */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* My Answer */}
                        <div className={`border-2 p-4 rounded-xl ${isHost ? 'border-blue-200 bg-blue-50' : 'border-rose-200 bg-rose-50'}`}>
                            <div className={`text-xs uppercase font-bold mb-1 ${isHost ? 'text-blue-500' : 'text-rose-500'}`}>
                                Jawabanmu ({myRoleLabel})
                            </div>
                            <div className="text-xl font-bold text-gray-800 mb-2">Opsi {myAnswerId}</div>
                            <div className="text-sm text-gray-600">{currentScenario.options.find(o => o.id === myAnswerId)?.text}</div>
                        </div>
                        {/* Partner Answer */}
                        <div className={`border-2 p-4 rounded-xl ${!isHost ? 'border-blue-200 bg-blue-50' : 'border-rose-200 bg-rose-50'}`}>
                            <div className={`text-xs uppercase font-bold mb-1 ${!isHost ? 'text-blue-500' : 'text-rose-500'}`}>
                                Jawaban Pasangan ({partnerRoleLabel})
                            </div>
                            <div className="text-xl font-bold text-gray-800 mb-2">Opsi {partnerAnswerId}</div>
                            <div className="text-sm text-gray-600">{currentScenario.options.find(o => o.id === partnerAnswerId)?.text}</div>
                        </div>
                    </div>
                    
                    {myAnswerId === partnerAnswerId ? (
                        <div className="text-center text-green-600 font-bold">✨ Kalian Kompak! Jawaban Sama (+1 Skor) ✨</div>
                    ) : (
                        <div className="text-center text-orange-500 font-bold">🔥 Jawaban Berbeda! Waktunya Diskusi 🔥</div>
                    )}

                    {/* Discussion Prompt */}
                    <div className="bg-white p-6 rounded-xl border-l-4 border-indigo-500 shadow-sm">
                        <div className="flex items-start gap-3">
                        <MessageCircle className="w-6 h-6 text-indigo-600 mt-1" />
                        <div>
                            <h3 className="font-bold text-indigo-900 mb-1">Topik Deep Talk</h3>
                            <p className="text-indigo-800 text-lg font-medium">"{currentScenario.options.find(o => o.id === myAnswerId)?.discussion || currentScenario.discussion}"</p>
                        </div>
                        </div>
                    </div>

                    <button 
                        onClick={nextMultiplayerScenario}
                        disabled={isWaitingGuest}
                        className={`w-full text-white py-4 px-6 rounded-xl font-bold transition flex items-center justify-center gap-2
                            ${isWaitingGuest ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-black'}
                        `}
                    >
                        <RefreshCw className="w-4 h-4" />
                        {currentScenarioIndex < SCENARIOS.length - 1 ? "Skenario Berikutnya" : "Lihat Hasil Akhir"}
                    </button>
                    {isWaitingGuest && (
                        <p className="text-center text-xs text-rose-500 font-bold animate-pulse">
                            Tunggu pasangan bergabung & menjawab untuk lanjut!
                        </p>
                    )}
                    <p className="text-center text-xs text-gray-400">Jika kamu klik lanjut, layar pasangan juga akan ikut lanjut.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const SinglePlayerGameScreen = () => (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-24">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div 
          className="bg-rose-500 h-2 rounded-full transition-all duration-500" 
          style={{ width: `${((currentScenarioIndex + 1) / SCENARIOS.length) * 100}%` }}
        ></div>
      </div>

      {/* Story Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-rose-50 to-purple-50 p-6 border-b border-gray-100 flex justify-between items-start">
          <div>
            <span className="inline-block px-3 py-1 bg-white text-rose-600 text-xs font-bold rounded-full mb-2 border border-rose-100 uppercase tracking-wider">
              {currentScenario.genre}
            </span>
            <h2 className="text-2xl font-bold text-gray-800">{currentScenario.title}</h2>
          </div>
          <div className="text-right">
            <span className="block text-xs text-gray-500 uppercase">POV</span>
            <span className="font-bold text-gray-700">{currentScenario.pov}</span>
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex gap-4 mb-6">
            <BookOpen className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
            <p className="text-gray-700 text-lg leading-relaxed font-serif italic">
              "{currentScenario.story}"
            </p>
          </div>

          <div className="flex items-center gap-3 mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <p className="font-semibold text-gray-800">{currentScenario.question}</p>
          </div>

          {!showResult ? (
            <div className="space-y-3">
              {currentScenario.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSinglePlayerSelect(option)}
                  className="w-full text-left p-5 rounded-xl border-2 border-gray-100 hover:border-rose-300 hover:bg-rose-50 transition-all duration-200 group relative"
                >
                  <span className="font-bold text-gray-400 mr-3 group-hover:text-rose-500">{option.id}.</span>
                  <span className="text-gray-700 font-medium">{option.text}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="animate-fade-in space-y-6">
              {/* Selected Choice Feedback */}
              <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-rose-600" />
                  <span className="font-bold text-rose-700">Kamu memilih opsi {selectedOption.id}</span>
                </div>
                <p className="text-gray-700 mb-4">{selectedOption.text}</p>
                <div className="text-sm bg-white/50 p-3 rounded-lg text-gray-600 italic">
                  "Konsekuensi: {selectedOption.consequence}"
                </div>
              </div>

              {/* Discussion Prompt */}
              <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-6 h-6 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-indigo-900 mb-1">Topik Deep Talk</h3>
                    <p className="text-indigo-800 text-lg font-medium">"{selectedOption.discussion || currentScenario.discussion}"</p>
                    <p className="text-sm text-indigo-400 mt-2">Tanyakan ini ke pasanganmu sekarang.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                 <button 
                  onClick={() => {
                      setSelectedOption(null);
                      setShowResult(false);
                      setCurrentScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
                  }}
                  className="flex-1 bg-gray-900 hover:bg-black text-white py-3 px-6 rounded-xl font-bold transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Skenario Berikutnya
                </button>
                <button className="flex-1 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-600 py-3 px-6 rounded-xl font-bold transition flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Bagikan Cerita Ini
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-rose-200">
      <Navbar />
      
      <main className="container mx-auto">
        {view === 'home' && <HomeScreen />}
        {view === 'play' && <SinglePlayerGameScreen />}
        {view === 'multiplayer-lobby' && <MultiplayerLobby />}
        {view === 'multiplayer-game' && <MultiplayerGameScreen />}
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm">
        <p>© 2024 Dilema Asmara. Dibuat dengan 💖 untuk Pasangan Indonesia.</p>
      </footer>
    </div>
  );
};

export default App;
