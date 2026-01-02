import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { 
  getFirestore, doc, setDoc, onSnapshot, updateDoc, getDoc, collection 
} from 'firebase/firestore';

// ==========================================
// 1. CONFIGURATION & FIREBASE INIT
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyDRzjrhryX8Hpq8tmrCCDhlJQugbz2r7_0",
  authDomain: "testing-95321.firebaseapp.com",
  projectId: "testing-95321",
  storageBucket: "testing-95321.firebasestorage.app",
  messagingSenderId: "457933264802",
  appId: "1:457933264802:web:c7004083fd4a19336984fb",
  measurementId: "G-W503YYH8DT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
const auth = getAuth(app);
const db = getFirestore(app);

// ==========================================
// 2. ICONS COMPONENTS
// ==========================================
const Heart = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);
const MessageCircle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
);
const Gift = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>
);
const Smile = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
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

// --- CONSTANTS ---
const STICKERS = ["😢", "😡", "😱", "😂", "❤️", "👍", "😍", "😭", "🔥", "🤗"];

// --- 25 SCENARIOS LENGKAP ---
const SCENARIOS = [
  {
    id: 1,
    title: "Hapus Chat Mantan",
    genre: "Micro-Cheating",
    pov: "Suami",
    story: "Tengah malam, HP-mu bergetar. Muncul notifikasi dari mantan: 'Aku kangen kita'. Panik karena istrimu tidur di sebelah, kamu langsung menghapus chat itu diam-diam tanpa membalas, takut jadi masalah besar. Apesnya, besoknya istrimu mengecek folder 'Sampah' di pesanmu dan menemukannya.",
    question: "Apa pembelaanmu?",
    options: [
      { id: 'A', text: "Itu demi menjaga perasaan istri.", consequence: "Niat baik, tapi terlihat seperti menyembunyikan bangkai." },
      { id: 'B', text: "Mengaku salah karena menghapus.", consequence: "Jujur, tapi istri akan sulit percaya isi chat lain." },
      { id: 'C', text: "Bilang 'Aku tidak ada apa-apa'.", consequence: "Defensif, membuat istri makin curiga." }
    ]
  },
  { id: 2, title: "Kerja di Klub Malam", genre: "Karir vs Nilai", pov: "Istri", story: "Ekonomi keluarga sedang sulit. Kamu ditawari pekerjaan sebagai Manager PR dengan gaji 50 Juta/bulan. Tapi, tugas utamamu adalah menemani klien VIP minum di klub malam sampai subuh. Suamimu adalah guru ngaji yang sangat anti alkohol dan dunia malam.", question: "Keputusanmu?", options: [{ id: 'A', text: "Ambil demi masa depan.", consequence: "Ekonomi melesat, suami hilang respek." }, { id: 'B', text: "Tolak demi suami.", consequence: "Keluarga harmonis, menyesal lepas peluang." }, { id: 'C', text: "Ambil diam-diam.", consequence: "Kebohongan fatal." }] },
  { id: 3, title: "Dana Darurat Rahasia", genre: "Keuangan", pov: "Suami", story: "Kamu dapat bonus 100 Juta. Kamu menyimpannya di rekening rahasia sebagai 'dana pelarian' jika bercerai. Istrimu menemukan buku tabungan itu.", question: "Alasanmu?", options: [{ id: 'A', text: "Itu hak pribadiku.", consequence: "Melukai kepercayaan." }, { id: 'B', text: "Jaga-jaga kamu boros.", consequence: "Menyalahkan istri." }, { id: 'C', text: "Minta maaf & transfer.", consequence: "Kehilangan jaring pengaman." }] },
  { id: 4, title: "Pelukan di Mobil", genre: "Rekan Kerja", pov: "Suami", story: "Rekan kerja wanitamu menangis histeris di mobilmu karena ditalak suami. Kamu memeluknya untuk menenangkan. Istrimu melihat kejadian itu.", question: "Reaksimu?", options: [{ id: 'A', text: "Murni kemanusiaan.", consequence: "Merasa benar, istri sakit hati." }, { id: 'B', text: "Mengaku salah tempat.", consequence: "Validasi istri, tapi teman butuh." }, { id: 'C', text: "Marah istri memata-matai.", consequence: "Mengalihkan isu." }] },
  { id: 5, title: "Panti Jompo Ibu", genre: "Mertua", pov: "Suami", story: "Ibumu pikun dan hampir membakar dapur. Istri histeris minta ibumu dipindah ke panti jompo mahal.", question: "Pilihanmu?", options: [{ id: 'A', text: "Paksa ibu di rumah.", consequence: "Istri stress berat." }, { id: 'B', text: "Setuju panti jompo.", consequence: "Istri lega, kamu dihantui rasa bersalah." }, { id: 'C', text: "Sewa perawat.", consequence: "Biaya bengkak." }] },
  { id: 6, title: "Jumlah Mantan", genre: "Masa Lalu", pov: "Istri", story: "Suami terobsesi tanya jumlah mantan tidurmu. Dulu kamu bilang 2, aslinya 12.", question: "Jawab apa?", options: [{ id: 'A', text: "Pertahankan kebohongan.", consequence: "Hidup dalam kepalsuan." }, { id: 'B', text: "Jujur angka asli.", consequence: "Suami mungkin ilfil." }, { id: 'C', text: "Tolak menjawab.", consequence: "Suami makin curiga." }] },
  { id: 7, title: "Tas Mewah", genre: "Keuangan", pov: "Istri", story: "Kamu beli tas 50 Juta pakai uangmu sendiri. Suami marah karena bisa buat lunasin KPR.", question: "Keputusanmu?", options: [{ id: 'A', text: "Jual tasnya.", consequence: "Merasa tak punya otonomi." }, { id: 'B', text: "Tolak, ini uangku.", consequence: "Suami merasa tak didengar." }, { id: 'C', text: "Sembunyikan harga.", consequence: "Masalah berulang." }] },
  { id: 8, title: "Pasangan Gendut", genre: "Fisik", pov: "Suami", story: "Istri naik 30kg dan tanya 'Apa aku masih seksi?'. Jujur, gairahmu mati.", question: "Jawabanmu?", options: [{ id: 'A', text: "Bohong: Masih seksi.", consequence: "Masalah ranjang berlanjut." }, { id: 'B', text: "Jujur: Kurang tertarik.", consequence: "Menyakitkan hati." }, { id: 'C', text: "Ajak diet bareng.", consequence: "Konstruktif tapi menyinggung." }] },
  { id: 9, title: "Tes DNA", genre: "Kepercayaan", pov: "Suami", story: "Anak tidak mirip denganmu. Kamu ingin tes DNA diam-diam.", question: "Lakukan?", options: [{ id: 'A', text: "Ya, diam-diam.", consequence: "Hati tenang, resiko cerai jika ketahuan." }, { id: 'B', text: "Tidak, percaya saja.", consequence: "Hati kadang ragu." }, { id: 'C', text: "Bicara ke istri.", consequence: "Istri terhina." }] },
  { id: 10, title: "Komen Genit", genre: "Sosmed", pov: "Istri", story: "Gebetan lama komen api di foto selfie-mu. Kamu like dan balas ramah. Suami cemburu.", question: "Responmu?", options: [{ id: 'A', text: "Blokir pria itu.", consequence: "Merasa terkekang." }, { id: 'B', text: "Bilang 'Jangan lebay'.", consequence: "Suami makin cemburu." }, { id: 'C', text: "Janji tak balas lagi.", consequence: "Kompromi." }] },
  { id: 11, title: "Solo Traveling", genre: "Me Time", pov: "Istri", story: "Burnout urus anak, kamu ingin ke Bali sendirian 2 minggu. Suami keberatan.", question: "Keputusanmu?", options: [{ id: 'A', text: "Tetap pergi.", consequence: "Mental pulih, suami dendam." }, { id: 'B', text: "Batal pergi.", consequence: "Burnout tak sembuh." }, { id: 'C', text: "Pergi 3 hari.", consequence: "Kurang puas." }] },
  { id: 12, title: "Investasi Bodong", genre: "Keuangan", pov: "Suami", story: "Uang pendidikan anak 200jt habis di crypto. Istri belum tahu.", question: "Tindakanmu?", options: [{ id: 'A', text: "Mengaku dosa.", consequence: "Perang dunia." }, { id: 'B', text: "Pinjam uang ganti.", consequence: "Gali lubang tutup lubang." }, { id: 'C', text: "Edit buku tabungan.", consequence: "Kriminal." }] },
  { id: 13, title: "Body Shaming", genre: "Harga Diri", pov: "Istri", story: "Suami jadikan fisikmu lelucon di depan teman arisan. Semua tertawa.", question: "Reaksimu?", options: [{ id: 'A', text: "Marah di depan umum.", consequence: "Suami malu." }, { id: 'B', text: "Diam, nangis di rumah.", consequence: "Harga diri hancur." }, { id: 'C', text: "Balas hina dia.", consequence: "Toxic." }] },
  { id: 14, title: "Nginap di Sahabat", genre: "Batasan", pov: "Suami", story: "Istri mau konser luar kota, nginap di apartemen sahabat cowoknya biar hemat.", question: "Izinmu?", options: [{ id: 'A', text: "Larang keras.", consequence: "Istri merasa tak dipercaya." }, { id: 'B', text: "Izinkan syarat VC.", consequence: "Hati tak tenang." }, { id: 'C', text: "Ikut pergi.", consequence: "Boros biaya." }] },
  { id: 15, title: "Kasar ke Pelayan", genre: "Karakter", pov: "Istri", story: "Suami lembut padamu, tapi membentak pelayan restoran dengan kasar.", question: "Sikapmu?", options: [{ id: 'A', text: "Tegur di tempat.", consequence: "Suami tersinggung." }, { id: 'B', text: "Diamkan.", consequence: "Ilfil menumpuk." }, { id: 'C', text: "Minta maaf ke pelayan.", consequence: "Menutupi kesalahan suami." }] },
  { id: 16, title: "Hewan di Kamar", genre: "Gaya Hidup", pov: "Suami", story: "Kamu alergi bulu. Istri bawa kucing jalanan tidur di bantalmu.", question: "Tindakanmu?", options: [{ id: 'A', text: "Usir hewan.", consequence: "Istri sedih." }, { id: 'B', text: "Tidur di sofa.", consequence: "Keintiman hilang." }, { id: 'C', text: "Ultimatum.", consequence: "Drama besar." }] },
  { id: 17, title: "Puasa Ranjang", genre: "Seksualitas", pov: "Suami", story: "Istri tolak seks 6 bulan tapi aktif zumba. Kamu frustasi.", question: "Langkahmu?", options: [{ id: 'A', text: "Tuntut kewajiban.", consequence: "Istri makin jauh." }, { id: 'B', text: "Ajak konselor.", consequence: "Solusi dewasa." }, { id: 'C', text: "Cari kepuasan sendiri.", consequence: "Masalah tetap ada." }] },
  { id: 18, title: "Anak Bully", genre: "Parenting", pov: "Istri", story: "Anak memukul teman. Kamu mau hukum, suami malah membela 'Anakku jagoan'.", question: "Sikapmu?", options: [{ id: 'A', text: "Lawan suami.", consequence: "Anak bingung." }, { id: 'B', text: "Diam.", consequence: "Anak jadi perundung." }, { id: 'C', text: "Minta sekolah hukum.", consequence: "Lempar tanggung jawab." }] },
  { id: 19, title: "Pinjam Nama Hutang", genre: "Keuangan", pov: "Istri", story: "Suami dikejar rentenir judi online. Minta pinjam KTP-mu untuk hutang bank 500jt.", question: "Keputusanmu?", options: [{ id: 'A', text: "Kasih.", consequence: "Kamu dikejar debt collector." }, { id: 'B', text: "Tolak.", consequence: "Suami terancam." }, { id: 'C', text: "Kasih perjanjian notaris.", consequence: "Terkesan tak percaya." }] },
  { id: 20, title: "Mantan Sekarat", genre: "Mantan", pov: "Suami", story: "Mantan sekarat ingin pegang tanganmu terakhir kali. Istri cemburu.", question: "Apa yang kamu lakukan?", options: [{ id: 'A', text: "Pergi diam-diam.", consequence: "Khianat." }, { id: 'B', text: "Minta izin memohon.", consequence: "Istri sakit hati." }, { id: 'C', text: "Tolak.", consequence: "Rasa bersalah." }] },
  { id: 21, title: "Beda Agama Anak", genre: "Prinsip", pov: "Istri", story: "Kamu ingin anak agamis. Suami ingin anak bebas pilih agama nanti.", question: "Solusinya?", options: [{ id: 'A', text: "Didik diam-diam.", consequence: "Bohong." }, { id: 'B', text: "Ikuti suami.", consequence: "Merasa berdosa." }, { id: 'C', text: "Debat terus.", consequence: "Rumah panas." }] },
  { id: 22, title: "Bajak Chat", genre: "Privasi", pov: "Suami", story: "Istri bajak WA kantormu dan maki-maki temanmu karena jokes kotor.", question: "Reaksimu?", options: [{ id: 'A', text: "Marah & ganti sandi.", consequence: "Karir hancur." }, { id: 'B', text: "Minta maaf ke teman.", consequence: "Malu luar biasa." }, { id: 'C', text: "Bela istri.", consequence: "Solidaritas semu." }] },
  { id: 23, title: "Oplas", genre: "Fisik", pov: "Istri", story: "Kamu ingin oplas hidung 80jt karena insecure. Suami larang 'bersyukur aja'.", question: "Keputusanmu?", options: [{ id: 'A', text: "Tetap operasi.", consequence: "Suami ilfil." }, { id: 'B', text: "Batal.", consequence: "Insecure selamanya." }, { id: 'C', text: "Klinik murah.", consequence: "Resiko gagal." }] },
  { id: 24, title: "Putus Hubungan Ortu", genre: "Keluarga", pov: "Suami", story: "Istri ultimatum: 'Aku atau Ibumu?'. Dia minta kamu putus hubungan dengan ibumu yang toxic.", question: "Pilihanmu?", options: [{ id: 'A', text: "Pilih Istri.", consequence: "Anak durhaka." }, { id: 'B', text: "Pilih Ortu.", consequence: "Cerai." }, { id: 'C', text: "Kunjungi diam-diam.", consequence: "Bom waktu." }] },
  { id: 25, title: "Izin Poligami", genre: "Komitmen", pov: "Istri", story: "Suami mapan minta izin nikahi janda teman demi menolong.", question: "Jawabanmu?", options: [{ id: 'A', text: "Izinkan.", consequence: "Sakit hati." }, { id: 'B', text: "Tolak keras.", consequence: "Resiko nikah siri." }, { id: 'C', text: "Minta cerai.", consequence: "Rumah tangga bubar." }] }
];

// ==========================================
// 3. COMPONENTS
// ==========================================

const StickerOverlay = ({ stickerData, onAnimationEnd }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (stickerData && stickerData.symbol) {
            const newItems = Array.from({ length: 30 }).map((_, i) => ({
                id: `${stickerData.id}-${i}`,
                left: Math.random() * 100, 
                delay: Math.random() * 0.5,
                duration: 2 + Math.random() * 1.5,
                size: 2 + Math.random() * 3
            }));
            setItems(newItems);

            const timer = setTimeout(() => {
                setItems([]); 
                onAnimationEnd();
            }, 3500); 
            return () => clearTimeout(timer);
        }
    }, [stickerData]); 

    if (!stickerData || items.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="absolute top-0 animate-rain opacity-0"
                    style={{
                        left: `${item.left}%`,
                        fontSize: `${item.size}rem`,
                        animationDelay: `${item.delay}s`,
                        animationDuration: `${item.duration}s`
                    }}
                >
                    {stickerData.symbol}
                </div>
            ))}
            <style>{`
                @keyframes rain {
                    0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
                }
                .animate-rain {
                    animation-name: rain;
                    animation-timing-function: linear;
                    animation-fill-mode: forwards;
                }
            `}</style>
        </div>
    );
};

const GiftBoxModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-4 transform animate-bounce-slow cursor-pointer" onClick={onClose}>
                <div className="text-6xl mb-4">🎁</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Kejutan Masuk!</h3>
                <p className="text-gray-600 mb-4">Pasanganmu mengirim reaksi...</p>
                <div className="bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm font-bold inline-block animate-pulse">
                    Klik untuk Buka
                </div>
            </div>
        </div>
    );
};

const StickerPanel = ({ roomId, user }) => {
    const sendSticker = async (stickerChar) => {
        if (!user || !roomId) return;
        try {
            const roomRef = doc(db, 'rooms', roomId);
            await updateDoc(roomRef, {
                latestSticker: {
                    senderId: user.uid,
                    sticker: stickerChar,
                    timestamp: Date.now()
                }
            });
        } catch (e) {
            console.error("Gagal kirim stiker", e);
        }
    };

    return (
        <div className="bg-white rounded-xl p-4 shadow-lg mt-6 border border-indigo-100 animate-fade-in">
            <div className="flex items-center gap-2 mb-3 border-b border-gray-100 pb-2">
                <Smile className="w-5 h-5 text-indigo-500" />
                <span className="text-sm font-bold text-gray-700">Kirim Reaksi</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
                {STICKERS.map((sticker) => (
                    <button
                        key={sticker}
                        onClick={() => sendSticker(sticker)}
                        className="text-2xl hover:scale-125 transition-transform p-2 rounded-lg hover:bg-indigo-50 focus:outline-none active:scale-90 transform active:translate-y-1"
                    >
                        {sticker}
                    </button>
                ))}
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-2">
                Klik untuk kirim kejutan ke layar pasangan!
            </p>
        </div>
    );
};

const Navbar = ({ view, setView, isSidebarOpen, setIsSidebarOpen }) => (
  <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
      if(view.includes('multiplayer')) {
         if(confirm("Keluar dari game online?")) {
            setView('home'); 
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

const HomeScreen = ({ setView }) => (
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

const MultiplayerLobby = ({ createRoom, joinRoom, isLoading, user }) => {
    const [joinId, setJoinId] = useState('');
    
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-rose-100 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Mode Pasangan</h2>
            
            <div className="space-y-6">
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

const ResultScreen = ({ score, total, resetGame }) => {
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

const MultiplayerGameScreen = ({ 
    gameData, 
    user, 
    roomId, 
    playerRole, 
    copyInviteLink, 
    setView,
    submitMultiplayerAnswer,
    nextMultiplayerScenario,
    resetGame,
    activeSticker,
    setActiveSticker,
    showGiftBox,
    setShowGiftBox
}) => {
    const currentScenarioIndex = gameData?.scenarioIndex || 0;

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
    
    const myAnswerId = playerRole ? (playerRole === 'host' ? gameData.hostAnswer : gameData.guestAnswer) : null;
    const partnerAnswerId = playerRole ? (playerRole === 'host' ? gameData.guestAnswer : gameData.hostAnswer) : null;
    const bothAnswered = gameData.hostAnswer && gameData.guestAnswer;

    if (currentScenarioIndex >= SCENARIOS.length) {
        return <ResultScreen score={gameData.score || 0} total={SCENARIOS.length} resetGame={resetGame} />;
    }

    const currentScenario = SCENARIOS[currentScenarioIndex];
    const isMatch = myAnswerId === partnerAnswerId;
    const matchColorClass = isMatch 
        ? "border-green-200 bg-green-50 text-green-800" 
        : "border-red-200 bg-red-50 text-red-800";
    const matchHeaderText = isMatch 
        ? "✨ Kalian Kompak! Jawaban Sama (+1 Skor) ✨" 
        : "🔥 Jawaban Berbeda! Waktunya Diskusi 🔥";
    const matchHeaderColor = isMatch ? "text-green-600" : "text-orange-500";

    return (
      <div className="max-w-2xl mx-auto px-4 py-8 pb-24 relative">
        <StickerOverlay 
            stickerData={activeSticker} 
            onAnimationEnd={() => setActiveSticker(null)} 
        />
        
        {showGiftBox && (
            <GiftBoxModal onClose={() => {
                setShowGiftBox(false);
                // Trigger animation manually when box opened
                if (activeSticker) {
                     // Force re-render of overlay by resetting then setting
                     const sticker = activeSticker;
                     setActiveSticker(null);
                     setTimeout(() => setActiveSticker(sticker), 10);
                }
            }} />
        )}

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

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-rose-50 to-purple-50 p-6 border-b border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div>
                <span className="inline-block px-3 py-1 bg-white text-rose-600 text-xs font-bold rounded-full mb-2 border border-rose-100 uppercase tracking-wider">
                    {currentScenario.genre}
                </span>
                <h2 className="text-2xl font-bold text-gray-800 leading-tight">{currentScenario.title}</h2>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                <span className="block text-xs text-gray-500 uppercase">POV</span>
                <span className="font-bold text-gray-700 bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm block mt-1">{currentScenario.pov}</span>
                </div>
            </div>

            <div className="bg-white/80 p-4 rounded-xl border border-rose-100 shadow-sm">
                <div className="flex gap-3">
                    <BookOpen className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800 text-lg leading-relaxed font-medium">
                    "{currentScenario.story}"
                    </p>
                </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div>
                  <p className="font-semibold text-gray-800">{currentScenario.question}</p>
                  {((currentScenario.pov.includes("Suami") || currentScenario.pov.includes("Cowok")) && !isHost) && (
                      <p className="text-xs text-rose-600 mt-1 italic">(Ini sudut pandang pasanganmu. Jika kamu jadi dia, apa yang kamu harap dia lakukan?)</p>
                  )}
                  {((currentScenario.pov.includes("Istri") || currentScenario.pov.includes("Cewek")) && isHost) && (
                      <p className="text-xs text-blue-600 mt-1 italic">(Ini sudut pandang pasanganmu. Jika kamu jadi dia, apa yang kamu harap dia lakukan?)</p>
                  )}
              </div>
            </div>

            {!bothAnswered ? (
                <div className="space-y-4">
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
                                disabled={!!myAnswerId} 
                                onClick={() => submitMultiplayerAnswer(option)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group relative flex flex-col items-start
                                    ${isSelected 
                                        ? 'border-rose-500 bg-rose-50' 
                                        : 'border-gray-100 hover:border-rose-300 hover:bg-gray-50'
                                    } ${!!myAnswerId && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                            >
                                {isSelected && (
                                    <span className="bg-rose-200 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded mb-2 self-start">
                                        PILIHANMU
                                    </span>
                                )}
                                <div className="flex w-full">
                                    <span className={`font-bold mr-3 ${isSelected ? 'text-rose-600' : 'text-gray-400'}`}>{option.id}.</span>
                                    <span className="text-gray-700 font-medium leading-relaxed">{option.text}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            ) : (
                <div className="animate-fade-in space-y-6">
                    <div className="text-center py-2 bg-green-100 text-green-800 rounded-lg font-bold mb-4">
                        Hasil Terungkap! 🎉
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={`border-2 p-4 rounded-xl ${matchColorClass}`}>
                            <div className={`text-xs uppercase font-bold mb-1 ${isMatch ? 'text-green-600' : 'text-red-600'}`}>
                                Jawabanmu ({myRoleLabel})
                            </div>
                            <div className="text-xl font-bold mb-2">Opsi {myAnswerId}</div>
                            <div className="text-sm opacity-90">{currentScenario.options.find(o => o.id === myAnswerId)?.text}</div>
                        </div>
                        <div className={`border-2 p-4 rounded-xl ${matchColorClass}`}>
                            <div className={`text-xs uppercase font-bold mb-1 ${isMatch ? 'text-green-600' : 'text-red-600'}`}>
                                Jawaban Pasangan ({partnerRoleLabel})
                            </div>
                            <div className="text-xl font-bold mb-2">Opsi {partnerAnswerId}</div>
                            <div className="text-sm opacity-90">{currentScenario.options.find(o => o.id === partnerAnswerId)?.text}</div>
                        </div>
                    </div>
                    
                    <div className={`text-center font-bold ${matchHeaderColor}`}>
                        {matchHeaderText}
                    </div>

                    <StickerPanel roomId={roomId} user={user} />

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

const SinglePlayerGameScreen = ({ 
    currentScenarioIndex,
    setCurrentScenarioIndex,
    selectedOption,
    setSelectedOption,
    showResult,
    setShowResult
}) => {
    const currentScenario = SCENARIOS[currentScenarioIndex];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setShowResult(true);
    };

    const nextScenario = () => {
        setSelectedOption(null);
        setShowResult(false);
        setCurrentScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
    };

    return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-24">
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div 
          className="bg-rose-500 h-2 rounded-full transition-all duration-500" 
          style={{ width: `${((currentScenarioIndex + 1) / SCENARIOS.length) * 100}%` }}
        ></div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-rose-50 to-purple-50 p-6 border-b border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div>
                <span className="inline-block px-3 py-1 bg-white text-rose-600 text-xs font-bold rounded-full mb-2 border border-rose-100 uppercase tracking-wider">
                    {currentScenario.genre}
                </span>
                <h2 className="text-2xl font-bold text-gray-800 leading-tight">{currentScenario.title}</h2>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                <span className="block text-xs text-gray-500 uppercase">POV</span>
                <span className="font-bold text-gray-700 bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm block mt-1">{currentScenario.pov}</span>
                </div>
            </div>

            <div className="bg-white/80 p-4 rounded-xl border border-rose-100 shadow-sm">
                <div className="flex gap-3">
                    <BookOpen className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800 text-lg leading-relaxed font-medium">
                    "{currentScenario.story}"
                    </p>
                </div>
            </div>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <p className="font-semibold text-gray-800">{currentScenario.question}</p>
          </div>

          {!showResult ? (
            <div className="space-y-3">
              {currentScenario.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option)}
                  className="w-full text-left p-5 rounded-xl border-2 border-gray-100 hover:border-rose-300 hover:bg-rose-50 transition-all duration-200 group relative"
                >
                  <span className="font-bold text-gray-400 mr-3 group-hover:text-rose-500">{option.id}.</span>
                  <span className="text-gray-700 font-medium">{option.text}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="animate-fade-in space-y-6">
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

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                 <button 
                  onClick={nextScenario}
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
};

// ==========================================
// 6. MAIN APP COMPONENT
// ==========================================
const App = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [view, setView] = useState('home'); 
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null); 
  
  // Animation & Sticker State
  const [activeSticker, setActiveSticker] = useState(null);
  const [showGiftBox, setShowGiftBox] = useState(false); // New: Handle Gift Box visibility
  const lastStickerTimeRef = useRef(Date.now());

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
        
        // --- STICKER LOGIC ---
        if (data.latestSticker && data.latestSticker.timestamp > lastStickerTimeRef.current) {
            lastStickerTimeRef.current = data.latestSticker.timestamp;
            
            // Check if sender is NOT me (only show Gift Box to recipient)
            const currentUserId = auth.currentUser?.uid;
            if (data.latestSticker.senderId !== currentUserId) {
                 // Store data for later animation
                setActiveSticker({
                    symbol: data.latestSticker.sticker,
                    id: data.latestSticker.timestamp
                });
                // Show Gift Box first!
                setShowGiftBox(true);
            }
        }
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
          latestSticker: null // Clear sticker
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

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-rose-200">
      <Navbar 
        view={view} 
        setView={setView} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
      />
      
      <main className="container mx-auto">
        {view === 'home' && <HomeScreen setView={setView} />}
        {view === 'play' && 
          <SinglePlayerGameScreen 
            currentScenarioIndex={currentScenarioIndex}
            setCurrentScenarioIndex={setCurrentScenarioIndex}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            showResult={showResult}
            setShowResult={setShowResult}
          />
        }
        {view === 'multiplayer-lobby' && 
          <MultiplayerLobby 
            createRoom={createRoom}
            joinRoom={joinRoom}
            isLoading={isLoading}
            user={user}
          />
        }
        {view === 'multiplayer-game' && 
          <MultiplayerGameScreen 
            gameData={gameData}
            user={user}
            roomId={roomId}
            playerRole={playerRole}
            copyInviteLink={copyInviteLink}
            setView={setView}
            submitMultiplayerAnswer={submitMultiplayerAnswer}
            nextMultiplayerScenario={nextMultiplayerScenario}
            resetGame={resetGame}
            activeSticker={activeSticker}
            setActiveSticker={setActiveSticker}
            showGiftBox={showGiftBox}
            setShowGiftBox={setShowGiftBox}
          />
        }
        {authError && (
            <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4 font-sans text-center absolute top-0 left-0 w-full z-[100]">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-200 max-w-lg w-full">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Konfigurasi Belum Selesai</h2>
                    <p className="text-gray-600 mb-6">{authError}</p>
                    <a href={`https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/providers`} target="_blank" rel="noreferrer" className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition">Buka Firebase Console</a>
                </div>
            </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm">
        <p>© 2024 Dilema Asmara. Dibuat dengan 💖 untuk Pasangan Indonesia.</p>
      </footer>
    </div>
  );
};

export default App;
