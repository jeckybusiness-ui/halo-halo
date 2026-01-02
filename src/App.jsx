import React, { useState, useEffect, useRef } from 'react';
// Import fungsi yang dibutuhkan dari SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { 
  getFirestore, doc, setDoc, onSnapshot, updateDoc, getDoc, collection, addDoc, onSnapshot as onCollectionSnapshot
} from 'firebase/firestore';

// --- Icons Component (Inline SVG) ---
const Heart = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);
const MessageCircle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
);
const Mic = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/><line x1="8" x2="16" y1="22" y2="22"/></svg>
);
const MicOff = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="2" x2="22" y1="2" y2="22"/><path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"/><path d="M5 10v2a7 7 0 0 0 12 5"/><path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/><path d="M9 9v3a3 3 0 0 0 5.12 2.63"/><line x1="12" x2="12" y1="19" y2="22"/><line x1="8" x2="16" y1="22" y2="22"/></svg>
);
const Volume2 = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
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
const ArrowRight = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const Phone = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const Trash = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
);
const Lock = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const Briefcase = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
const Plane = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12h20"/><path d="M13 2 9 22"/><path d="M13 22 9 2"/></svg>
);
const Ghost = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/></svg>
);
const Bed = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
);
const Frown = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
);
const DollarSign = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);

// --- 25 SCENARIOS LENGKAP (10 PERTAMA DIPERBARUI, 11-25 BARU & ILLUSTRATED) ---
const SCENARIOS = [
  {
    id: 1,
    title: "Hapus Chat Mantan",
    genre: "Micro-Cheating",
    pov: "Suami",
    icon: Phone,
    color: "bg-blue-100 text-blue-600",
    story: "Mantanmu DM tengah malam: 'Aku kangen kita'. Kamu tidak membalas dengan flirting, tapi kamu langsung menghapus chat itu agar istrimu tidak membacanya dan salah paham. Istrimu tidak sengaja melihat backup cloud dan menemukan chat yang dihapus itu.",
    question: "Apa pembelaanmu?",
    options: [
      { id: 'A', text: "Itu demi menjaga perasaan istri.", consequence: "Niat baik, tapi terlihat seperti menyembunyikan bangkai." },
      { id: 'B', text: "Mengaku salah karena menghapus.", consequence: "Jujur, tapi istri akan sulit percaya isi chat lain." },
      { id: 'C', text: "Bilang 'Aku tidak ada apa-apa'.", consequence: "Defensif, membuat istri makin curiga." }
    ]
  },
  {
    id: 2,
    title: "Kerja di Klub Malam",
    genre: "Karir vs Nilai",
    pov: "Istri",
    icon: Briefcase,
    color: "bg-purple-100 text-purple-600",
    story: "Kamu ditawari gaji 5x lipat, tapi pekerjaannya mengharuskan kamu menjamu klien di klub malam sampai jam 3 pagi. Suamimu sangat religius dan konservatif, dia sangat membenci lingkungan seperti itu.",
    question: "Keputusanmu?",
    options: [
      { id: 'A', text: "Ambil demi masa depan keluarga.", consequence: "Ekonomi melesat, tapi suami mungkin kehilangan respek." },
      { id: 'B', text: "Tolak demi kenyamanan suami.", consequence: "Keluarga harmonis, tapi menyesal melepas peluang emas." },
      { id: 'C', text: "Ambil diam-diam, bilang lembur.", consequence: "Kebohongan fatal yang bisa hancurkan pernikahan." }
    ]
  },
  {
    id: 3,
    title: "Dana Darurat Rahasia",
    genre: "Keuangan",
    pov: "Suami",
    icon: Lock,
    color: "bg-green-100 text-green-600",
    story: "Kamu dapat bonus besar 100 Juta. Alih-alih memasukkannya ke rekening bersama, kamu menyimpannya di rekening rahasia sebagai 'dana pelarian' jika suatu saat kalian bercerai. Istrimu menemukan buku tabungan itu.",
    question: "Alasanmu?",
    options: [
      { id: 'A', text: "Itu hak pribadiku.", consequence: "Menegaskan batasan, tapi melukai kepercayaan 'satu harta'." },
      { id: 'B', text: "Jaga-jaga kalau kamu boros.", consequence: "Menyalahkan istri untuk menutupi ketidakpercayaan." },
      { id: 'C', text: "Minta maaf & transfer semua.", consequence: "Mengalah, kehilangan jaring pengaman pribadi." }
    ]
  },
  {
    id: 4,
    title: "Pelukan di Mobil",
    genre: "Rekan Kerja",
    pov: "Suami",
    icon: Heart,
    color: "bg-red-100 text-red-600",
    story: "Rekan kerja wanitamu ('work wife') sedang proses cerai dan menangis histeris di mobilmu saat makan siang. Kamu memeluknya untuk menenangkan. Istrimu melihat kejadian itu dari kejauhan.",
    question: "Reaksimu?",
    options: [
      { id: 'A', text: "Itu murni kemanusiaan.", consequence: "Kamu merasa benar, istri merasa itu selingkuh fisik." },
      { id: 'B', text: "Mengaku salah tempat/waktu.", consequence: "Validasi perasaan istri, tapi rekan kerja butuh kamu." },
      { id: 'C', text: "Marah karena istri memata-matai.", consequence: "Mengalihkan isu, pertengkaran makin besar." }
    ]
  },
  {
    id: 5,
    title: "Panti Jompo untuk Ibu",
    genre: "Mertua",
    pov: "Suami",
    icon: Users,
    color: "bg-orange-100 text-orange-600",
    story: "Ibumu mulai pikun dan butuh rawat 24 jam. Istrimu menolak ibu tinggal serumah karena mengganggu privasi dan mentalnya. Dia menyarankan panti jompo (nursing home) yang sangat bagus dan mahal.",
    question: "Pilihanmu?",
    options: [
      { id: 'A', text: "Paksa ibu tinggal di rumah.", consequence: "Bakti anak tuntas, tapi istri stress berat/minta pisah." },
      { id: 'B', text: "Setuju panti jompo.", consequence: "Istri lega, kamu dihantui rasa bersalah 'membuang' ibu." },
      { id: 'C', text: "Sewa perawat, istri jangan urus.", consequence: "Biaya bengkak, suasana rumah tetap tidak nyaman." }
    ]
  },
  {
    id: 6,
    title: "Jumlah Mantan",
    genre: "Masa Lalu",
    pov: "Istri",
    icon: Ghost,
    color: "bg-gray-100 text-gray-600",
    story: "Dulu kalian sepakat tidak bahas masa lalu. Kini suami terobsesi bertanya 'berapa orang yang pernah tidur denganmu?'. Kamu dulu berbohong angkanya sedikit (2 orang), padahal aslinya jauh lebih banyak (10+).",
    question: "Jawab apa?",
    options: [
      { id: 'A', text: "Pertahankan kebohongan (2).", consequence: "Suami tenang, tapi kamu hidup dalam kepalsuan." },
      { id: 'B', text: "Jujur angka asli (10+).", consequence: "Jujur, tapi suami mungkin jijik/insecure selamanya." },
      { id: 'C', text: "Tolak menjawab.", consequence: "Suami makin curiga ada yang disembunyikan." }
    ]
  },
  {
    id: 7,
    title: "Barang Mewah Pribadi",
    genre: "Keuangan",
    pov: "Istri",
    icon: DollarSign,
    color: "bg-yellow-100 text-yellow-600",
    story: "Kamu beli tas branded 50 Juta pakai uang gajimu sendiri. Suamimu marah besar karena uang segitu bisa untuk melunasi KPR lebih cepat. Dia menuntut kamu menjualnya kembali.",
    question: "Keputusanmu?",
    options: [
      { id: 'A', text: "Jual tasnya demi damai.", consequence: "Menghargai suami, tapi merasa tidak punya otonomi." },
      { id: 'B', text: "Tolak, ini uangku!", consequence: "Puas secara materi, tapi suami merasa tidak didengar." },
      { id: 'C', text: "Sembunyikan harga aslinya.", consequence: "Manipulatif, masalah akan berulang nanti." }
    ]
  },
  {
    id: 8,
    title: "Pasangan Gendut",
    genre: "Fisik & Kejujuran",
    pov: "Suami",
    icon: Frown,
    color: "bg-pink-100 text-pink-600",
    story: "Setelah menikah, istrimu naik berat badan drastis dan tidak merawat diri. Kamu kehilangan gairah seksual padanya. Dia bertanya dengan sedih: 'Apa aku masih seksi di matamu?'.",
    question: "Jawabanmu?",
    options: [
      { id: 'A', text: "Bohong: 'Kamu selalu seksi'.", consequence: "Istri senang sesaat, tapi masalah ranjang berlanjut." },
      { id: 'B', text: "Jujur: 'Aku kurang tertarik'.", consequence: "Sangat menyakitkan, bisa hancurkan percaya dirinya." },
      { id: 'C', text: "Ajak diet bareng.", consequence: "Konstruktif, tapi istri mungkin tersinggung." }
    ]
  },
  {
    id: 9,
    title: "Tes DNA Diam-diam",
    genre: "Kepercayaan",
    pov: "Suami",
    icon: UserCircle,
    color: "bg-indigo-100 text-indigo-600",
    story: "Anak kalian sama sekali tidak mirip denganmu. Teman-teman sering bercanda soal itu. Kamu percaya istrimu, tapi 'pikiran setan' itu ada. Kamu berencana tes DNA diam-diam tanpa sepengetahuan istri.",
    question: "Lakukan?",
    options: [
      { id: 'A', text: "Ya, tes diam-diam.", consequence: "Hati tenang jika cocok. Jika ketahuan, istri minta cerai." },
      { id: 'B', text: "Tidak, buang keraguan itu.", consequence: "Memilih percaya buta, walau hati kadang ragu." },
      { id: 'C', text: "Bicara ke istri minta tes.", consequence: "Terbuka, tapi istri pasti sangat terhina." }
    ]
  },
  {
    id: 10,
    title: "Balas Komen Genit",
    genre: "Sosial Media",
    pov: "Istri",
    icon: MessageCircle,
    color: "bg-blue-50 text-blue-500",
    story: "Kamu posting foto selfie cantik. Gebetan lama komen emoji 'api' 🔥. Kamu me-like komen itu dan balas 'Makasih ya!'. Suamimu melihat dan menuduhmu menikmati perhatian pria lain (flirting).",
    question: "Responmu?",
    options: [
      { id: 'A', text: "Hapus komen & blokir pria itu.", consequence: "Suami puas, kamu merasa terkekang berlebihan." },
      { id: 'B', text: "Bilang suami 'Jangan lebay'.", consequence: "Mempertahankan hak bersosial, suami makin cemburu." },
      { id: 'C', text: "Janji tidak balas lagi.", consequence: "Kompromi, tapi suami tetap memantau ketat." }
    ]
  },
  {
    id: 11,
    title: "Me Time Berlebihan",
    genre: "Kebebasan",
    pov: "Istri",
    icon: Plane,
    color: "bg-sky-100 text-sky-600",
    story: "Kamu merasa burnout mengurus rumah tangga dan anak. Kamu ingin 'Solo Traveling' selama 2 minggu ke Bali sendirian, meninggalkan suami dan anak. Suami keberatan karena kerepotan mengurus rumah sendiri.",
    question: "Keputusanmu?",
    options: [
      { id: 'A', text: "Tetap pergi, aku butuh waras.", consequence: "Mental pulih, tapi suami dendam karena ditinggal repot." },
      { id: 'B', text: "Batal pergi, liburan keluarga saja.", consequence: "Burnout tidak sembuh maksimal, suami senang." },
      { id: 'C', text: "Pergi 3 hari saja.", consequence: "Kompromi, walau rasanya kurang cukup." }
    ]
  },
  {
    id: 12,
    title: "Investasi Bodong",
    genre: "Keuangan",
    pov: "Suami",
    icon: DollarSign,
    color: "bg-red-50 text-red-600",
    story: "Kamu tergiur investasi crypto dan diam-diam memakai 50% uang tabungan pendidikan anak. Ternyata harganya anjlok dan uang itu hilang. Istri belum tahu dan berencana mengecek saldo minggu depan.",
    question: "Tindakanmu?",
    options: [
      { id: 'A', text: "Mengaku dosa sekarang.", consequence: "Perang dunia ketiga, tapi jujur di awal." },
      { id: 'B', text: "Pinjam uang (hutang) untuk ganti.", consequence: "Gali lubang tutup lubang, bom waktu lebih besar." },
      { id: 'C', text: "Edit buku tabungan (palsu).", consequence: "Kriminal dan manipulatif, fatal jika ketahuan." }
    ]
  },
  {
    id: 13,
    title: "Body Shaming 'Bercanda'",
    genre: "Harga Diri",
    pov: "Istri",
    icon: Frown,
    color: "bg-gray-200 text-gray-700",
    story: "Di depan teman-teman arisan, suamimu sering menjadikan bentuk tubuhmu lelucon ('Istriku ini dietnya wacana doang, liat tuh lipatannya'). Semua tertawa, kamu malu. Saat ditegur, dia bilang 'Cuma bercanda, baper amat'.",
    question: "Reaksimu?",
    options: [
      { id: 'A', text: "Marah besar di depan umum.", consequence: "Suami malu, tapi dia sadar batasnya." },
      { id: 'B', text: "Diam saja, nangis di rumah.", consequence: "Harga diri hancur, suami merasa itu wajar." },
      { id: 'C', text: "Balas hina fisik dia.", consequence: "Mata dibalas mata, hubungan jadi toxic." }
    ]
  },
  {
    id: 14,
    title: "Nginap Rumah Sahabat",
    genre: "Batasan",
    pov: "Suami",
    icon: Bed,
    color: "bg-purple-50 text-purple-600",
    story: "Istrimu mau pergi ke luar kota untuk konser dan berencana menginap di apartemen sahabat prianya (katanya beda kamar) untuk hemat biaya hotel. Dia bersumpah tidak akan macam-macam.",
    question: "Izinmu?",
    options: [
      { id: 'A', text: "Larang keras. Wajib hotel.", consequence: "Aman, tapi istri merasa tidak dipercaya." },
      { id: 'B', text: "Izinkan dengan syarat VC terus.", consequence: "Mencoba percaya, tapi hati tidak tenang." },
      { id: 'C', text: "Ikut pergi (keluar biaya extra).", consequence: "Paling aman, tapi boros biaya." }
    ]
  },
  {
    id: 15,
    title: "Kasar ke Pelayan",
    genre: "Karakter",
    pov: "Istri",
    icon: AlertCircle,
    color: "bg-orange-50 text-orange-600",
    story: "Suamimu sangat penyayang padamu, tapi sangat kasar dan merendahkan pelayan restoran atau ojol jika ada kesalahan kecil. Kamu merasa ilfil (hilang rasa) melihat sisi arogannya.",
    question: "Sikapmu?",
    options: [
      { id: 'A', text: "Tegur keras di tempat.", consequence: "Suami tersinggung egonya, tapi belajar adab." },
      { id: 'B', text: "Diamkan, yang penting sayang aku.", consequence: "Membiarkan sifat buruk, ilfil makin numpuk." },
      { id: 'C', text: "Minta maaf ke pelayan diam-diam.", consequence: "Menutupi kesalahan suami, capek hati sendiri." }
    ]
  },
  {
    id: 16,
    title: "Hewan Liar di Kamar",
    genre: "Gaya Hidup",
    pov: "Suami",
    icon: Heart,
    color: "bg-emerald-100 text-emerald-600",
    story: "Kamu benci dan alergi bulu hewan. Istrimu pecinta hewan akut. Dia sering membawa kucing/anjing jalanan sakit untuk tidur di kamar kalian tanpa izin. Baunya mengganggumu.",
    question: "Tindakanmu?",
    options: [
      { id: 'A', text: "Usir hewan itu keluar.", consequence: "Istri sedih dan menuduhmu tidak punya hati." },
      { id: 'B', text: "Tidur di sofa/kamar lain.", consequence: "Mengalah, tapi keintiman suami istri hilang." },
      { id: 'C', text: "Kasih ultimatum: Aku atau Kucing.", consequence: "Drama besar, memaksa istri memilih." }
    ]
  },
  {
    id: 17,
    title: "Puasa Ranjang 6 Bulan",
    genre: "Seksualitas",
    pov: "Suami",
    icon: Bed,
    color: "bg-indigo-50 text-indigo-600",
    story: "Istrimu menolak berhubungan intim selama 6 bulan terakhir dengan alasan 'capek' atau 'nggak mood', tapi dia sehat-sehat saja dan ceria dengan teman-temannya. Kamu merasa ditolak dan frustasi.",
    question: "Langkahmu?",
    options: [
      { id: 'A', text: "Tuntut kewajiban suami-istri.", consequence: "Terkesan memaksa, istri makin menjauh." },
      { id: 'B', text: "Ajak ke konselor pernikahan.", consequence: "Solusi dewasa, tapi istri mungkin menolak dianggap bermasalah." },
      { id: 'C', text: "Cari kepuasan sendiri (video/dll).", consequence: "Solusi sementara, tapi masalah inti tetap ada." }
    ]
  },
  {
    id: 18,
    title: "Anak Nakal Membully",
    genre: "Parenting",
    pov: "Istri",
    story: "Anak kalian ketahuan membully temannya di sekolah sampai terluka. Kamu ingin menghukum anak agar jera. Suamimu malah membela anak mati-matian: 'Anakku gak salah, temannya yang lembek'.",
    question: "Sikapmu?",
    options: [
      { id: 'A', text: "Lawan suami, tetap hukum anak.", consequence: "Anak bingung, suami marah otoritasnya dilangkahi." },
      { id: 'B', text: "Diam, biarkan suami urus.", consequence: "Anak tumbuh jadi perundung yang merasa benar." },
      { id: 'C', text: "Minta pihak sekolah yang hukum.", consequence: "Melempar tanggung jawab ke luar rumah." }
    ]
  },
  {
    id: 19,
    title: "Pinjam Nama untuk Hutang",
    genre: "Keuangan",
    pov: "Istri",
    icon: UserCircle,
    color: "bg-red-100 text-red-600",
    story: "Bisnis suamimu bangkrut dan namanya di-blacklist bank. Dia memohon meminjam KTP-mu untuk mengajukan pinjaman besar demi modal usaha baru. Dia janji akan bayar.",
    question: "Keputusanmu?",
    options: [
      { id: 'A', text: "Kasih, dia suamiku.", consequence: "Bukti cinta, tapi resiko kamu yang dikejar debt collector." },
      { id: 'B', text: "Tolak mentah-mentah.", consequence: "Aset aman, tapi suami merasa tidak didukung saat susah." },
      { id: 'C', text: "Kasih dengan perjanjian notaris.", consequence: "Profesional, tapi terkesan tidak percaya suami." }
    ]
  },
  {
    id: 20,
    title: "Permintaan Terakhir Mantan",
    genre: "Mantan",
    pov: "Suami",
    icon: Heart,
    color: "bg-rose-100 text-rose-600",
    story: "Mantan pacarmu (cinta pertamamu) sakit kanker stadium akhir. Dia menghubungimu dan memohon ingin bertemu kamu untuk terakhir kalinya sebelum meninggal. Istrimu sangat cemburu pada mantan ini.",
    question: "Apa yang kamu lakukan?",
    options: [
      { id: 'A', text: "Pergi diam-diam menjenguk.", consequence: "Mantan tenang, tapi kamu mengkhianati istri." },
      { id: 'B', text: "Minta izin istri (memohon).", consequence: "Jujur, tapi menyakiti hati istri jika dia terpaksa setuju." },
      { id: 'C', text: "Tolak permintaan mantan.", consequence: "Setia pada istri, tapi dihantui rasa bersalah seumur hidup." }
    ]
  },
  {
    id: 21,
    title: "Beda Agama Anak",
    genre: "Prinsip",
    pov: "Istri",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
    story: "Kamu ingin anak dididik disiplin agama sejak dini (mengaji/sekolah minggu). Suamimu yang mulai agnostik ingin membebaskan anak memilih keyakinan nanti saat dewasa (tidak perlu ibadah sekarang).",
    question: "Solusinya?",
    options: [
      { id: 'A', text: "Jalankan caraku diam-diam.", consequence: "Anak terdidik agama, tapi bohong pada suami." },
      { id: 'B', text: "Ikuti cara suami.", consequence: "Kamu merasa berdosa membiarkan anak tanpa agama." },
      { id: 'C', text: "Debat sampai ada yang menang.", consequence: "Rumah tangga panas terus menerus." }
    ]
  },
  {
    id: 22,
    title: "Bajak Chat Kantor",
    genre: "Privasi",
    pov: "Suami",
    icon: MessageCircle,
    color: "bg-yellow-50 text-yellow-600",
    story: "Istrimu membuka HP-mu dan membaca grup chat kantormu yang isinya bercandaan kasar pria. Dia marah dan mengirim pesan di grup itu memarahi bos dan teman-temanmu pakai akunmu.",
    question: "Reaksimu?",
    options: [
      { id: 'A', text: "Marah besar & ganti sandi HP.", consequence: "Menegakkan privasi, karir mungkin sudah hancur." },
      { id: 'B', text: "Minta maaf ke teman & bos.", consequence: "Malu luar biasa, dianggap suami takut istri." },
      { id: 'C', text: "Bela istri di depan teman.", consequence: "Solidaritas semu, padahal dalam hati kesal." }
    ]
  },
  {
    id: 23,
    title: "Operasi Plastik",
    genre: "Fisik",
    pov: "Istri",
    icon: UserCircle,
    color: "bg-pink-50 text-pink-600",
    story: "Kamu merasa sangat insecure dengan wajahmu dan ingin operasi plastik hidung & rahang (total 100 Juta). Suamimu menolak keras karena alasan 'bersyukur' dan resiko gagal.",
    question: "Keputusanmu?",
    options: [
      { id: 'A', text: "Tetap operasi pakai uang sendiri.", consequence: "Puas fisik, tapi suami mungkin ilfil lihat wajah baru." },
      { id: 'B', text: "Batal operasi demi suami.", consequence: "Suami senang, kamu tetap insecure seumur hidup." },
      { id: 'C', text: "Cari klinik murah diam-diam.", consequence: "Berbahaya, resiko gagal tinggi." }
    ]
  },
  {
    id: 24,
    title: "Putus Hubungan Ortu",
    genre: "Keluarga",
    pov: "Suami",
    icon: Users,
    color: "bg-gray-100 text-gray-700",
    story: "Orang tuamu sangat toxic dan sering menghina istrimu. Istrimu memberimu ultimatum: 'Kalau kamu masih menemui orang tuamu, kita cerai'. Dia memintamu memutus hubungan total dengan orang tuamu.",
    question: "Pilihanmu?",
    options: [
      { id: 'A', text: "Pilih Istri, tinggalkan Ortu.", consequence: "Rumah tangga damai, jadi anak durhaka." },
      { id: 'B', text: "Pilih Ortu, ceraikan Istri.", consequence: "Bakti anak, tapi kehilangan cinta sejati." },
      { id: 'C', text: "Kunjungi Ortu diam-diam.", consequence: "Solusi pengecut, bom waktu jika ketahuan." }
    ]
  },
  {
    id: 25,
    title: "Izin Poligami/Nikah Lagi",
    genre: "Komitmen",
    pov: "Istri",
    icon: Heart,
    color: "bg-rose-50 text-rose-600",
    story: "Suamimu yang mapan dan agamis tiba-tiba bicara serius meminta izin untuk menikah lagi (poligami) dengan alasan ibadah dan menolong janda. Dia berjanji akan adil.",
    question: "Jawabanmu?",
    options: [
      { id: 'A', text: "Izinkan dengan berat hati.", consequence: "Surga (menurut keyakinan), tapi neraka dunia (sakit hati)." },
      { id: 'B', text: "Tolak: 'Langkahi dulu mayatku'.", consequence: "Tegas, resiko suami nikah diam-diam atau cerai." },
      { id: 'C', text: "Minta cerai saat itu juga.", consequence: "Harga diri terjaga, rumah tangga bubar." }
    ]
  }
];

// --- COMPONENT: SCENARIO ILLUSTRATION (Visual Kartun SVG) ---
const ScenarioIllustration = ({ scenario }) => {
    const Icon = scenario.icon || BookOpen;
    const colorClass = scenario.color || "bg-gray-100 text-gray-600";

    return (
        <div className={`w-full h-40 ${colorClass} rounded-t-3xl flex items-center justify-center relative overflow-hidden`}>
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-white rounded-full mix-blend-overlay"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white rounded-full mix-blend-overlay"></div>
            </div>
            
            {/* Main Visual */}
            <div className="relative z-10 flex flex-col items-center animate-bounce-slow">
                <div className="bg-white p-4 rounded-full shadow-lg">
                    <Icon className="w-12 h-12" />
                </div>
                <span className="mt-2 text-xs font-bold uppercase tracking-widest opacity-80">{scenario.genre}</span>
            </div>
        </div>
    );
};

// --- COMPONENT: LIVE VOICE ROOM (WebRTC Simplified) ---
const LiveVoiceRoom = ({ roomId, role, user }) => {
    const [status, setStatus] = useState("Menghubungkan Suara...");
    const [isMuted, setIsMuted] = useState(false);
    const [rtcPeer, setRtcPeer] = useState(null);
    const localStreamRef = useRef(null);
    const remoteAudioRef = useRef(null);

    // STUN Servers (Public Google Servers)
    const servers = {
        iceServers: [
            { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }
        ]
    };

    useEffect(() => {
        const startCall = async () => {
            try {
                // 1. Get Local Stream
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                localStreamRef.current = stream;

                // 2. Init Peer Connection
                const pc = new RTCPeerConnection(servers);
                setRtcPeer(pc);

                // Add Tracks
                stream.getTracks().forEach(track => pc.addTrack(track, stream));

                // Handle Remote Stream
                pc.ontrack = (event) => {
                    if (remoteAudioRef.current) {
                        remoteAudioRef.current.srcObject = event.streams[0];
                        setStatus("Terhubung 🟢");
                    }
                };

                // ICE Candidate Logic
                pc.onicecandidate = (event) => {
                    if (event.candidate) {
                        const candidateCollection = collection(db, 'rooms', roomId, role === 'host' ? 'offerCandidates' : 'answerCandidates');
                        addDoc(candidateCollection, event.candidate.toJSON());
                    }
                };

                // SIGNALING LOGIC
                const roomDoc = doc(db, 'rooms', roomId);
                const roomSnapshot = await getDoc(roomDoc);

                if (role === 'host') {
                    // Host Creates Offer
                    const offerDescription = await pc.createOffer();
                    await pc.setLocalDescription(offerDescription);
                    
                    const offer = {
                        sdp: offerDescription.sdp,
                        type: offerDescription.type,
                    };

                    await updateDoc(roomDoc, { offer });

                    // Listen for Answer
                    onSnapshot(roomDoc, (snapshot) => {
                        const data = snapshot.data();
                        if (!pc.currentRemoteDescription && data?.answer) {
                            const answerDescription = new RTCSessionDescription(data.answer);
                            pc.setRemoteDescription(answerDescription);
                        }
                    });

                    // Listen for Remote Candidates
                    onCollectionSnapshot(collection(db, 'rooms', roomId, 'answerCandidates'), (snapshot) => {
                        snapshot.docChanges().forEach((change) => {
                            if (change.type === 'added') {
                                const candidate = new RTCIceCandidate(change.doc.data());
                                pc.addIceCandidate(candidate);
                            }
                        });
                    });

                } else {
                    // Guest Answers
                    // Listen for Offer
                    onSnapshot(roomDoc, async (snapshot) => {
                        const data = snapshot.data();
                        if (!pc.currentRemoteDescription && data?.offer) {
                            const offerDescription = new RTCSessionDescription(data.offer);
                            await pc.setRemoteDescription(offerDescription);

                            const answerDescription = await pc.createAnswer();
                            await pc.setLocalDescription(answerDescription);

                            const answer = {
                                type: answerDescription.type,
                                sdp: answerDescription.sdp,
                            };

                            await updateDoc(roomDoc, { answer });
                        }
                    });

                    // Listen for Remote Candidates
                    onCollectionSnapshot(collection(db, 'rooms', roomId, 'offerCandidates'), (snapshot) => {
                        snapshot.docChanges().forEach((change) => {
                            if (change.type === 'added') {
                                const candidate = new RTCIceCandidate(change.doc.data());
                                pc.addIceCandidate(candidate);
                            }
                        });
                    });
                }

            } catch (err) {
                console.error("WebRTC Error:", err);
                setStatus("Gagal Akses Mic 🔴");
            }
        };

        startCall();

        // Cleanup
        return () => {
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach(track => track.stop());
            }
            if (rtcPeer) {
                rtcPeer.close();
            }
        };
    }, []);

    const toggleMute = () => {
        if (localStreamRef.current) {
            localStreamRef.current.getAudioTracks()[0].enabled = !localStreamRef.current.getAudioTracks()[0].enabled;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="bg-indigo-900 rounded-xl p-4 text-white flex items-center justify-between shadow-lg mt-6 animate-fade-in">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${status.includes('Terhubung') ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}>
                    <Volume2 className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-xs text-indigo-300 uppercase font-bold">Diskusi Langsung</p>
                    <p className="text-sm font-bold">{status}</p>
                </div>
            </div>
            
            <button 
                onClick={toggleMute}
                className={`p-3 rounded-full transition ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-500'}`}
            >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <audio ref={remoteAudioRef} autoPlay />
        </div>
    );
};

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
          score: 0,
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
        
        const currentScore = gameData.score || 0;
        const isMatch = gameData.hostAnswer === gameData.guestAnswer;
        const newScore = isMatch ? currentScore + 1 : currentScore;

        await updateDoc(roomRef, {
          scenarioIndex: nextIndex,
          hostAnswer: null,
          guestAnswer: null,
          status: 'playing',
          score: newScore,
          offer: null,
          answer: null
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
  // SAFEGUARD: Ensure we don't display selections until both roles are determined
  const myAnswerId = gameData && playerRole ? (playerRole === 'host' ? gameData.hostAnswer : gameData.guestAnswer) : null;
  const partnerAnswerId = gameData && playerRole ? (playerRole === 'host' ? gameData.guestAnswer : gameData.hostAnswer) : null;
  
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
          
          <ScenarioIllustration scenario={currentScenario} />
          
          <div className="p-8">
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
                            {(partnerAnswerId && !isWaitingGuest) ? "✓ Pasangan sudah memilih" : (isWaitingGuest ? "• Menunggu pasangan join..." : "• Menunggu pasangan memilih...")}
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

                    {/* NEW: LIVE VOICE CALL ROOM */}
                    <LiveVoiceRoom roomId={roomId} role={playerRole} user={user} />

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
        
        <ScenarioIllustration scenario={currentScenario} />

        <div className="p-8">
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
