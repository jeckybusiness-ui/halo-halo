import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { 
  getFirestore, doc, setDoc, onSnapshot, updateDoc, getDoc, collection, addDoc 
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
// 2. ICONS
// ==========================================
const Heart = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>);
const MessageCircle = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>);
const Smile = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>);
const RefreshCw = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>);
const BookOpen = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>);
const AlertCircle = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>);
const CheckCircle2 = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>);
const Share2 = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>);
const Menu = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>);
const X = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>);
const Users = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const Copy = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>);
const Loader = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`animate-spin ${className}`}><path d="M21 12a9 9 0 1 1-6.21-10.42 12 12 0 0 1 0 6.21"/></svg>);
const LinkIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>);
const UserCircle = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>);
const Trophy = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>);
const ArrowRight = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>);
const Send = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>);

const STICKERS = ["😢", "😡", "😱", "😂", "❤️", "👍", "😍", "😭", "🔥", "🤗"];

// --- 50 SCENARIOS LENGKAP ---
const SCENARIOS = [
  // 1-10: Perselingkuhan & Kepercayaan
  { id: 1, title: "Hapus Chat Mantan", genre: "Micro-Cheating", pov: "Suami", story: "Tengah malam, HP-mu bergetar. Muncul notifikasi dari mantan: 'Aku kangen kita'. Panik karena istrimu tidur di sebelah, kamu langsung menghapus chat itu diam-diam tanpa membalas. Apesnya, besoknya istrimu mengecek folder 'Sampah' di pesanmu dan menemukannya.", question: "Apa pembelaanmu?", options: [{ id: 'A', text: "Demi perasaanmu.", consequence: "Niat baik tapi salah." }, { id: 'B', text: "Aku salah.", consequence: "Jujur." }, { id: 'C', text: "Gak ada apa-apa.", consequence: "Mencurigakan." }] },
  { id: 2, title: "Kerja di Klub Malam", genre: "Karir vs Nilai", pov: "Istri", story: "Ekonomi sulit. Ditawari gaji 50 Juta sebagai PR Klub Malam. Suami guru ngaji anti alkohol.", question: "Keputusanmu?", options: [{ id: 'A', text: "Ambil.", consequence: "Ekonomi aman, respek hilang." }, { id: 'B', text: "Tolak.", consequence: "Hidup susah." }, { id: 'C', text: "Diam-diam.", consequence: "Bohong fatal." }] },
  { id: 3, title: "Dana Darurat Rahasia", genre: "Keuangan", pov: "Suami", story: "Bonus 100 Juta disimpan di rekening rahasia sebagai 'dana pelarian' cerai. Istri menemukan buku tabungan.", question: "Alasanmu?", options: [{ id: 'A', text: "Hak pribadiku.", consequence: "Melukai kepercayaan." }, { id: 'B', text: "Jaga kamu boros.", consequence: "Menyalahkan istri." }, { id: 'C', text: "Minta maaf.", consequence: "Hilang dana darurat." }] },
  { id: 4, title: "Pelukan di Mobil", genre: "Rekan Kerja", pov: "Suami", story: "Rekan wanita nangis histeris di mobilmu. Kamu peluk menenangkan. Istri melihat.", question: "Reaksimu?", options: [{ id: 'A', text: "Kemanusiaan.", consequence: "Istri sakit hati." }, { id: 'B', text: "Salah tempat.", consequence: "Validasi istri." }, { id: 'C', text: "Marah dimata-matai.", consequence: "Gaslighting." }] },
  { id: 5, title: "Indikasi Gay", genre: "Orientasi", pov: "Istri", story: "Kamu tidak sengaja melihat galeri HP suamimu. Isinya penuh foto pria berotot bertelanjang dada dan chat mesra dengan teman gym prianya. Dia selama ini baik tapi jarang menyentuhmu.", question: "Tindakanmu?", options: [{ id: 'A', text: "Konfrontasi langsung.", consequence: "Siap menerima kenyataan pahit." }, { id: 'B', text: "Selidiki diam-diam.", consequence: "Hidup dalam kecurigaan." }, { id: 'C', text: "Pura-pura tidak tahu.", consequence: "Menyangkal kenyataan." }] },
  { id: 6, title: "Jumlah Mantan", genre: "Masa Lalu", pov: "Istri", story: "Suami tanya jumlah mantan tidurmu. Dulu bilang 2, aslinya 12. Dia tanya lagi.", question: "Jawab apa?", options: [{ id: 'A', text: "Bohong (2).", consequence: "Hidup palsu." }, { id: 'B', text: "Jujur (12).", consequence: "Suami ilfil." }, { id: 'C', text: "Tolak jawab.", consequence: "Mencurigakan." }] },
  { id: 7, title: "Tas Mewah", genre: "Keuangan", pov: "Istri", story: "Beli tas 50 Juta pakai uang sendiri. Suami marah karena bisa buat lunasin KPR.", question: "Keputusanmu?", options: [{ id: 'A', text: "Jual tas.", consequence: "Terkekang." }, { id: 'B', text: "Tolak.", consequence: "Suami tak dihargai." }, { id: 'C', text: "Sembunyikan harga.", consequence: "Masalah nanti." }] },
  { id: 8, title: "Pasangan Gendut", genre: "Fisik", pov: "Suami", story: "Istri naik 30kg, tanya 'Aku seksi gak?'. Jujur, gairahmu mati.", question: "Jawabanmu?", options: [{ id: 'A', text: "Bohong: Seksi.", consequence: "Masalah ranjang berlanjut." }, { id: 'B', text: "Jujur: Kurang.", consequence: "Menyakitkan." }, { id: 'C', text: "Diet bareng.", consequence: "Menyinggung." }] },
  { id: 9, title: "Tes DNA", genre: "Kepercayaan", pov: "Suami", story: "Anak tidak mirip kamu. Teman menyindir. Ingin tes DNA diam-diam.", question: "Lakukan?", options: [{ id: 'A', text: "Ya.", consequence: "Resiko cerai." }, { id: 'B', text: "Tidak.", consequence: "Hati ragu." }, { id: 'C', text: "Izin istri.", consequence: "Istri terhina." }] },
  { id: 10, title: "Komen Genit", genre: "Sosmed", pov: "Istri", story: "Gebetan lama komen api di foto. Kamu like & balas. Suami cemburu.", question: "Responmu?", options: [{ id: 'A', text: "Blokir.", consequence: "Terkekang." }, { id: 'B', text: "Jangan lebay.", consequence: "Makin cemburu." }, { id: 'C', text: "Janji stop.", consequence: "Kompromi." }] },
  // 11-20: Gaya Hidup & Keluarga
  { id: 11, title: "Solo Traveling", genre: "Me Time", pov: "Istri", story: "Burnout urus anak, mau ke Bali sendiri 2 minggu. Suami keberatan.", question: "Keputusanmu?", options: [{ id: 'A', text: "Pergi.", consequence: "Suami dendam." }, { id: 'B', text: "Batal.", consequence: "Burnout." }, { id: 'C', text: "3 hari.", consequence: "Kurang puas." }] },
  { id: 12, title: "Investasi Bodong", genre: "Keuangan", pov: "Suami", story: "Uang sekolah 200jt habis di crypto. Istri belum tahu.", question: "Tindakanmu?", options: [{ id: 'A', text: "Ngaku.", consequence: "Perang dunia." }, { id: 'B', text: "Pinjam ganti.", consequence: "Gali lubang." }, { id: 'C', text: "Edit buku.", consequence: "Kriminal." }] },
  { id: 13, title: "Body Shaming", genre: "Harga Diri", pov: "Istri", story: "Suami jadikan fisikmu lelucon di depan teman. Semua tertawa.", question: "Reaksimu?", options: [{ id: 'A', text: "Marah.", consequence: "Suami malu." }, { id: 'B', text: "Diam.", consequence: "Harga diri hancur." }, { id: 'C', text: "Balas hina.", consequence: "Toxic." }] },
  { id: 14, title: "Nginap di Sahabat", genre: "Batasan", pov: "Suami", story: "Istri mau konser luar kota, nginap di apartemen sahabat cowoknya biar hemat.", question: "Izinmu?", options: [{ id: 'A', text: "Larang.", consequence: "Istri kecewa." }, { id: 'B', text: "Izinkan.", consequence: "Hati tak tenang." }, { id: 'C', text: "Ikut.", consequence: "Boros." }] },
  { id: 15, title: "Kasar ke Pelayan", genre: "Karakter", pov: "Istri", story: "Suami lembut padamu, tapi bentak pelayan kasar sekali.", question: "Sikapmu?", options: [{ id: 'A', text: "Tegur.", consequence: "Tersinggung." }, { id: 'B', text: "Diam.", consequence: "Ilfil." }, { id: 'C', text: "Minta maaf ke pelayan.", consequence: "Nanggung malu." }] },
  { id: 16, title: "Hewan di Kamar", genre: "Gaya Hidup", pov: "Suami", story: "Kamu alergi. Istri bawa kucing jalanan tidur di bantalmu.", question: "Tindakanmu?", options: [{ id: 'A', text: "Usir.", consequence: "Istri sedih." }, { id: 'B', text: "Tidur sofa.", consequence: "Intimasi hilang." }, { id: 'C', text: "Ultimatum.", consequence: "Drama." }] },
  { id: 17, title: "Puasa Ranjang", genre: "Seksualitas", pov: "Suami", story: "Istri tolak seks 6 bulan tapi aktif zumba. Kamu frustasi.", question: "Langkahmu?", options: [{ id: 'A', text: "Tuntut.", consequence: "Makin jauh." }, { id: 'B', text: "Konselor.", consequence: "Solusi." }, { id: 'C', text: "Cari sendiri.", consequence: "Masalah tetap." }] },
  { id: 18, title: "Anak Bully", genre: "Parenting", pov: "Istri", story: "Anak memukul teman. Kamu mau hukum, suami bela 'Anakku jagoan'.", question: "Sikapmu?", options: [{ id: 'A', text: "Lawan suami.", consequence: "Anak bingung." }, { id: 'B', text: "Diam.", consequence: "Anak jadi bully." }, { id: 'C', text: "Sekolah hukum.", consequence: "Lepas tangan." }] },
  { id: 19, title: "Pinjam Nama Hutang", genre: "Keuangan", pov: "Istri", story: "Suami dikejar rentenir. Minta pinjam KTP-mu buat hutang bank 500jt.", question: "Keputusanmu?", options: [{ id: 'A', text: "Kasih.", consequence: "Resiko dikejar bank." }, { id: 'B', text: "Tolak.", consequence: "Suami terancam." }, { id: 'C', text: "Perjanjian.", consequence: "Transaksional." }] },
  { id: 20, title: "Mantan Sekarat", genre: "Mantan", pov: "Suami", story: "Mantan sekarat ingin pegang tanganmu terakhir kali. Istri cemburu.", question: "Lakukan?", options: [{ id: 'A', text: "Pergi diam-diam.", consequence: "Khianat." }, { id: 'B', text: "Izin memohon.", consequence: "Istri sakit." }, { id: 'C', text: "Tolak.", consequence: "Rasa bersalah." }] },
  // 21-30: Prinsip & Konflik Batin
  { id: 21, title: "Beda Agama Anak", genre: "Prinsip", pov: "Istri", story: "Kamu ingin anak agamis. Suami ingin anak bebas pilih.", question: "Solusinya?", options: [{ id: 'A', text: "Didik diam-diam.", consequence: "Bohong." }, { id: 'B', text: "Ikuti suami.", consequence: "Merasa berdosa." }, { id: 'C', text: "Debat.", consequence: "Rumah panas." }] },
  { id: 22, title: "Bajak Chat", genre: "Privasi", pov: "Suami", story: "Istri bajak WA kantormu, maki-maki temanmu karena jokes kotor.", question: "Reaksimu?", options: [{ id: 'A', text: "Marah & ganti sandi.", consequence: "Karir terganggu." }, { id: 'B', text: "Minta maaf.", consequence: "Malu." }, { id: 'C', text: "Bela istri.", consequence: "Palsu." }] },
  { id: 23, title: "Oplas", genre: "Fisik", pov: "Istri", story: "Ingin oplas hidung 80jt. Suami larang 'bersyukur aja'.", question: "Keputusanmu?", options: [{ id: 'A', text: "Tetap operasi.", consequence: "Suami ilfil." }, { id: 'B', text: "Batal.", consequence: "Insecure." }, { id: 'C', text: "Klinik murah.", consequence: "Resiko." }] },
  { id: 24, title: "Pilih Istri/Ibu", genre: "Keluarga", pov: "Suami", story: "Istri ultimatum: 'Aku atau Ibumu?'. Ibumu toxic.", question: "Pilihanmu?", options: [{ id: 'A', text: "Pilih Istri.", consequence: "Anak durhaka." }, { id: 'B', text: "Pilih Ibu.", consequence: "Cerai." }, { id: 'C', text: "Diam-diam.", consequence: "Bom waktu." }] },
  { id: 25, title: "Izin Poligami", genre: "Komitmen", pov: "Istri", story: "Suami mapan minta izin nikahi janda teman demi menolong.", question: "Jawabanmu?", options: [{ id: 'A', text: "Izinkan.", consequence: "Sakit hati." }, { id: 'B', text: "Tolak keras.", consequence: "Resiko nikah siri." }, { id: 'C', text: "Cerai.", consequence: "Bubar." }] },
  { id: 26, title: "Suami UMR", genre: "Ekspektasi", pov: "Istri", story: "Suami baik tapi gaji UMR dan tidak ambisius. Kamu ingin hidup mewah.", question: "Sikapmu?", options: [{ id: 'A', text: "Terima.", consequence: "Bahagia sederhana." }, { id: 'B', text: "Desak cari ceperan.", consequence: "Suami tertekan." }, { id: 'C', text: "Kamu kerja keras.", consequence: "Lelah sendiri." }] },
  { id: 27, title: "Istri Karir", genre: "Peran", pov: "Suami", story: "Gaji istri 3x lipat. Dia tak mau sentuh kerjaan rumah sama sekali.", question: "Tindakanmu?", options: [{ id: 'A', text: "Kerjakan semua.", consequence: "Harga diri turun." }, { id: 'B', text: "Tuntut resign.", consequence: "Ekonomi turun." }, { id: 'C', text: "Sewa pembantu.", consequence: "Solusi uang." }] },
  { id: 28, title: "Larang Nongkrong", genre: "Overprotective", pov: "Suami", story: "Istri larang keras kamu ngopi sama teman kantor pria. Harus langsung pulang.", question: "Keputusanmu?", options: [{ id: 'A', text: "Nurut.", consequence: "Kurang pergaulan." }, { id: 'B', text: "Bohong lembur.", consequence: "Tidak jujur." }, { id: 'C', text: "Lawan.", consequence: "Ribut." }] },
  { id: 29, title: "Larang Merokok", genre: "Kebebasan", pov: "Suami", story: "Kamu perokok sosial. Istri ancam tak mau cium kalau bau rokok.", question: "Responmu?", options: [{ id: 'A', text: "Berhenti.", consequence: "Sehat tapi terkekang." }, { id: 'B', text: "Diam-diam.", consequence: "Kucing-kucingan." }, { id: 'C', text: "Merokok depan dia.", consequence: "Ribut." }] },
  { id: 30, title: "Tipe vs Kaya", genre: "Pilihan", pov: "Istri", story: "Pilih pria miskin yang tipe kamu banget, atau pria kaya raya yang bukan tipemu?", question: "Pilih mana?", options: [{ id: 'A', text: "Miskin (Cinta).", consequence: "Makan cinta." }, { id: 'B', text: "Kaya (Logika).", consequence: "Hati kosong." }, { id: 'C', text: "Tolak keduanya.", consequence: "Jomblo." }] },
  // 31-40: New Filler Scenarios
  { id: 31, title: "Anak Durhaka", genre: "Keluarga", pov: "Suami", story: "Anak remajamu membentak ibunya kasar. Kamu ingin usir, istri membela.", question: "Tindakanmu?", options: [{ id: 'A', text: "Usir.", consequence: "Anak dendam." }, { id: 'B', text: "Biarkan.", consequence: "Makin kurang ajar." }, { id: 'C', text: "Pukul.", consequence: "Trauma." }] },
  { id: 32, title: "Mertua Sakit", genre: "Keuangan", pov: "Suami", story: "Ayahmu butuh operasi 200jt. Uang cuma ada di tabungan DP rumah. Istri berat hati.", question: "Pilihanmu?", options: [{ id: 'A', text: "Pakai uangnya.", consequence: "Batal beli rumah." }, { id: 'B', text: "Cari pinjaman.", consequence: "Hutang numpuk." }, { id: 'C', text: "Obat jalan.", consequence: "Ayah tak tertolong." }] },
  { id: 33, title: "Pindah Agama", genre: "Prinsip", pov: "Istri", story: "Suami pindah agama dan memaksa kamu serta anak ikut. Kalau tidak, cerai.", question: "Keputusanmu?", options: [{ id: 'A', text: "Ikut.", consequence: "Iman tergadai." }, { id: 'B', text: "Cerai.", consequence: "Keluarga hancur." }, { id: 'C', text: "Beda agama.", consequence: "Rumit." }] },
  { id: 34, title: "Bapak Rumah Tangga", genre: "Peran", pov: "Suami", story: "Kamu ingin resign dan urus anak (gaji istri besar). Takut omongan orang.", question: "Langkahmu?", options: [{ id: 'A', text: "Resign.", consequence: "Diremehkan keluarga." }, { id: 'B', text: "Tetap kerja.", consequence: "Mental hancur." }, { id: 'C', text: "Kerja santai.", consequence: "Gaji kecil." }] },
  { id: 35, title: "Adopsi vs IVF", genre: "Keturunan", pov: "Suami", story: "Sulit punya anak. Istri mau bayi tabung lagi (sakit). Kamu mau adopsi.", question: "Sikapmu?", options: [{ id: 'A', text: "Bayi tabung.", consequence: "Istri kesakitan." }, { id: 'B', text: "Paksa adopsi.", consequence: "Istri menolak." }, { id: 'C', text: "Berdua saja.", consequence: "Kesepian." }] },
  { id: 36, title: "Bantu Sahabat", genre: "Keuangan", pov: "Suami", story: "Sahabat (pendonor ginjalmu) bangkrut butuh separuh hartamu. Istri tolak.", question: "Keputusanmu?", options: [{ id: 'A', text: "Bantu dikit.", consequence: "Tidak tahu budi." }, { id: 'B', text: "Kasih separuh.", consequence: "Istri marah besar." }, { id: 'C', text: "Tolak.", consequence: "Kehilangan sahabat." }] },
  { id: 37, title: "S3 Luar Negeri", genre: "LDR", pov: "Istri", story: "Dapat beasiswa S3 ke Inggris 4 tahun. Suami harus ikut (nganggur) atau LDR.", question: "Pilihanmu?", options: [{ id: 'A', text: "LDR.", consequence: "Rawan selingkuh." }, { id: 'B', text: "Suami ikut.", consequence: "Suami depresi." }, { id: 'C', text: "Lepas beasiswa.", consequence: "Menyesal." }] },
  { id: 38, title: "Beda Politik", genre: "Prinsip", pov: "Suami", story: "Beda pilihan Capres fanatik. Tiap nonton berita bertengkar hebat.", question: "Solusinya?", options: [{ id: 'A', text: "Stop bahas politik.", consequence: "Kaku." }, { id: 'B', text: "Pura-pura setuju.", consequence: "Memendam." }, { id: 'C', text: "Debat.", consequence: "Toxic." }] },
  { id: 39, title: "Tetangga Gosip", genre: "Sosial", pov: "Suami", story: "Tetangga gosip istri selingkuh. Kamu mau labrak, istri larang.", question: "Tindakanmu?", options: [{ id: 'A', text: "Labrak.", consequence: "Musuh sekampung." }, { id: 'B', text: "Diam.", consequence: "Makan hati." }, { id: 'C', text: "Pindah rumah.", consequence: "Mahal." }] },
  { id: 40, title: "Janin Cacat", genre: "Dilema", pov: "Istri", story: "Janin didiagnosa cacat berat. Dokter saran gugurkan. Suami tolak (agama).", question: "Keputusanmu?", options: [{ id: 'A', text: "Gugurkan.", consequence: "Dianggap pembunuh." }, { id: 'B', text: "Pertahankan.", consequence: "Rawat seumur hidup." }, { id: 'C', text: "Cerai.", consequence: "Lari masalah." }] },
  { id: 41, title: "Selingkuh Emosional", genre: "Micro-Cheating", pov: "Istri", story: "Suami chat tiap hari sama teman wanita soal perasaan. Bilangnya 'cuma teman'.", question: "Sikapmu?", options: [{ id: 'A', text: "Minta stop total.", consequence: "Dikekang." }, { id: 'B', text: "Biarkan.", consequence: "Sakit hati." }, { id: 'C', text: "Balas cari teman.", consequence: "Hancur." }] },
  { id: 42, title: "Kecanduan Game", genre: "Hobi", pov: "Istri", story: "Suami main game seharian tiap weekend. Gak mau diganggu anak.", question: "Tindakanmu?", options: [{ id: 'A', text: "Matikan listrik.", consequence: "Ribut." }, { id: 'B', text: "Biarkan.", consequence: "Single parent rasa nikah." }, { id: 'C', text: "Ikut main.", consequence: "Rumah berantakan." }] },
  { id: 43, title: "Gila Belanja", genre: "Keuangan", pov: "Suami", story: "Istri kecanduan belanja online. Kartu kredit bengkak.", question: "Langkahmu?", options: [{ id: 'A', text: "Sita HP/Kartu.", consequence: "Seperti anak kecil." }, { id: 'B', text: "Bayarin.", consequence: "Bangkrut." }, { id: 'C', text: "Pisah rekening.", consequence: "Istri pinjol." }] },
  { id: 44, title: "Bau Badan", genre: "Fisik", pov: "Istri", story: "Suami bau badan menyengat. Ditegur malah tersinggung.", question: "Solusinya?", options: [{ id: 'A', text: "Tegur kasar.", consequence: "Sakit hati." }, { id: 'B', text: "Tahan napas.", consequence: "Siksaan." }, { id: 'C', text: "Beliin parfum.", consequence: "Gak dipake." }] },
  { id: 45, title: "Vegan Fanatik", genre: "Gaya Hidup", pov: "Suami", story: "Istri jadi vegan dan larang daging di rumah. Kamu suka daging.", question: "Tindakanmu?", options: [{ id: 'A', text: "Makan luar diam-diam.", consequence: "Bohong." }, { id: 'B', text: "Masak sendiri.", consequence: "Istri mual." }, { id: 'C', text: "Jadi vegan.", consequence: "Menderita." }] },
  { id: 46, title: "Anak Tiri Benci", genre: "Keluarga", pov: "Istri", story: "Anak tiri bilang 'Kamu bukan ibuku!'. Suami suruh sabar.", question: "Sikapmu?", options: [{ id: 'A', text: "Marahi anak.", consequence: "Makin benci." }, { id: 'B', text: "Sabar.", consequence: "Makan hati." }, { id: 'C', text: "Tuntut suami tegas.", consequence: "Suami dilema." }] },
  { id: 47, title: "Open Marriage", genre: "Komitmen", pov: "Suami", story: "Istri bosan seks dan minta izin tidur sama orang lain (open marriage).", question: "Jawabanmu?", options: [{ id: 'A', text: "Setuju.", consequence: "Cemburu nanti." }, { id: 'B', text: "Tolak.", consequence: "Merasa gagal." }, { id: 'C', text: "Cerai.", consequence: "Prinsip." }] },
  { id: 48, title: "Penyakit Menular", genre: "Kesehatan", pov: "Istri", story: "Baru tahu suami punya penyakit menular seksual yang disembunyikan.", question: "Keputusanmu?", options: [{ id: 'A', text: "Gugat cerai.", consequence: "Penipuan." }, { id: 'B', text: "Bertahan.", consequence: "Takut tertular." }, { id: 'C', text: "Lapor polisi.", consequence: "Drama." }] },
  { id: 49, title: "KDRT Verbal", genre: "Toxic", pov: "Istri", story: "Suami maki-maki 'bodoh/jelek' kalau marah, lalu minta maaf.", question: "Sikapmu?", options: [{ id: 'A', text: "Rekam & viralin.", consequence: "Suami takut." }, { id: 'B', text: "Kabur.", consequence: "Shock therapy." }, { id: 'C', text: "Maki balik.", consequence: "Neraka." }] },
  { id: 50, title: "Pindah Kota", genre: "Karir", pov: "Suami", story: "Dimutasi ke kota kecil. Istri tolak ikut karena sekolah anak.", question: "Pilihanmu?", options: [{ id: 'A', text: "Resign.", consequence: "Karir habis." }, { id: 'B', text: "LDR.", consequence: "Kesepian." }, { id: 'C', text: "Paksa ikut.", consequence: "Istri stress." }] },
  { id: 51, title: "LDR Beda Benua", genre: "Pacaran", pov: "Istri", story: "Pacarmu dapat beasiswa ke Eropa 2 tahun. Kamu di Indonesia. Banyak teman bilang LDR itu sia-sia.", question: "Keputusanmu?", options: [{ id: 'A', text: "Lanjut LDR.", consequence: "Ujian kesetiaan berat." }, { id: 'B', text: "Putus baik-baik.", consequence: "Realistis tapi sedih." }, { id: 'C', text: "Paksa ikut.", consequence: "Biaya besar." }] },
  { id: 52, title: "Restu Orang Tua", genre: "Pacaran", pov: "Suami", story: "Orang tuamu tidak merestui pacarmu karena beda status sosial. Pacarmu minta kejelasan.", question: "Sikapmu?", options: [{ id: 'A', text: "Lawan orang tua.", consequence: "Durhaka demi cinta." }, { id: 'B', text: "Putusin pacar.", consequence: "Anak mami." }, { id: 'C', text: "Backstreet.", consequence: "Bom waktu." }] },
  { id: 53, title: "Teman Tapi Mesra", genre: "Pacaran", pov: "Istri", story: "Sahabat lawan jenismu sering peluk dan panggil sayang, tapi gak mau komitmen pacaran.", question: "Tindakanmu?", options: [{ id: 'A', text: "Tuntut status.", consequence: "Resiko ditinggal." }, { id: 'B', text: "Nikmati saja.", consequence: "Baper sendiri." }, { id: 'C', text: "Jauhkan diri.", consequence: "Kehilangan sahabat." }] },
  { id: 54, title: "Split Bill", genre: "Pacaran", pov: "Istri", story: "Kencan pertama di restoran mahal. Pas bayar, cowoknya minta 'split bill' (bayar masing-masing). Kamu ilfil.", question: "Responmu?", options: [{ id: 'A', text: "Bayar & blokir.", consequence: "Tegas." }, { id: 'B', text: "Bayar & lanjut.", consequence: "Terima apa adanya." }, { id: 'C', text: "Minta dia bayarin.", consequence: "Terkesan matre." }] },
  { id: 55, title: "Digoda Bule", genre: "Orang Asing", pov: "Istri", story: "Liburan di Bali sendirian. Bule ganteng traktir minum dan minta nomor HP. Kamu sudah punya pasangan.", question: "Tindakanmu?", options: [{ id: 'A', text: "Tolak halus.", consequence: "Setia." }, { id: 'B', text: "Kasih nomor.", consequence: "Iseng berbahaya." }, { id: 'C', text: "Ngaku single.", consequence: "Selingkuh." }] },
  { id: 56, title: "DM Model", genre: "Orang Asing", pov: "Suami", story: "Model seksi centang biru DM kamu ngajak kenalan. Istrimu sedang hamil dan mood-nya jelek.", question: "Apa yang kamu lakukan?", options: [{ id: 'A', text: "Balas sopan.", consequence: "Buka peluang." }, { id: 'B', text: "Abaikan/Block.", consequence: "Aman." }, { id: 'C', text: "Pamer ke teman.", consequence: "Bangga semu." }] },
  { id: 57, title: "Nomor di Bar", genre: "Orang Asing", pov: "Suami", story: "Lagi nongkrong sama teman. Cewek cantik di meja sebelah selipin nomor HP ke sakumu diam-diam.", question: "Tindakanmu?", options: [{ id: 'A', text: "Buang nomornya.", consequence: "Setia mati." }, { id: 'B', text: "Simpan buat koleksi.", consequence: "Niat buruk." }, { id: 'C', text: "Hubungi iseng.", consequence: "Awal bencana." }] },
  { id: 58, title: "Lembur Berdua Bos", genre: "Kantor", pov: "Istri", story: "Bos ganteng sering ajak lembur berdua di ruangan tertutup sampai malam. Dia sering curhat soal istrinya.", question: "Sikapmu?", options: [{ id: 'A', text: "Profesional saja.", consequence: "Rawan gosip." }, { id: 'B', text: "Tolak lembur.", consequence: "Karir terhambat." }, { id: 'C', text: "Lapor HRD.", consequence: "Resiko dipecat." }] },
  { id: 59, title: "Rumor Kantor", genre: "Kantor", pov: "Suami", story: "Satu kantor gosipin kamu selingkuh sama anak magang, padahal enggak. Istrimu mulai dengar gosipnya.", question: "Klarifikasimu?", options: [{ id: 'A', text: "Jujur apa adanya.", consequence: "Semoga istri percaya." }, { id: 'B', text: "Marah-marah.", consequence: "Mencurigakan." }, { id: 'C', text: "Resign.", consequence: "Lari dari masalah." }] },
  { id: 60, title: "Dinas Luar Kota", genre: "Kantor", pov: "Suami", story: "Dinas ke luar kota bareng mantan pacar yang kebetulan satu kantor. Istri gak tau dia mantanmu.", question: "Jujur gak?", options: [{ id: 'A', text: "Bilang dia mantan.", consequence: "Istri larang pergi." }, { id: 'B', text: "Diam saja.", consequence: "Bohong demi kebaikan." }, { id: 'C', text: "Batal dinas.", consequence: "Karir hancur." }] },
  { id: 61, title: "Reuni SD", genre: "Teman Lama", pov: "Istri", story: "Ketemu cinta monyet pas SD di reuni. Dia sekarang duda kaya dan ngajak 'ngopi' berdua mengenang masa lalu.", question: "Keputusanmu?", options: [{ id: 'A', text: "Pergi diam-diam.", consequence: "Nostalgia bahaya." }, { id: 'B', text: "Ajak suami.", consequence: "Suasana kaku." }, { id: 'C', text: "Tolak.", consequence: "Aman." }] },
  { id: 62, title: "Pinjam Uang Besar", genre: "Teman Lama", pov: "Suami", story: "Sahabat lama muncul pinjam 50 Juta buat operasi anaknya. Istri melarang karena ekonomi lagi pas-pasan.", question: "Pilihanmu?", options: [{ id: 'A', text: "Pinjamkan diam-diam.", consequence: "Bohong finansial." }, { id: 'B', text: "Tolak.", consequence: "Dituduh pelit." }, { id: 'C', text: "Kasih sedikit.", consequence: "Solusi tengah." }] },
  { id: 63, title: "Chat Malam", genre: "Teman Lama", pov: "Istri", story: "Teman SMA cowok sering chat tengah malam curhat soal istrinya. Kamu merasa iba dan sering membalas panjang.", question: "Tindakanmu?", options: [{ id: 'A', text: "Lanjut chat.", consequence: "Micro-cheating." }, { id: 'B', text: "Slow respon.", consequence: "Menjaga jarak." }, { id: 'C', text: "Blokir.", consequence: "Tega." }] },
  { id: 64, title: "Fantasi Liar", genre: "Seksualitas", pov: "Suami", story: "Kamu punya fantasi seksual tertentu. Istri menolak keras dan merasa jijik mendengarnya.", question: "Sikapmu?", options: [{ id: 'A', text: "Paksa dikit.", consequence: "Pemerkosaan dalam nikah." }, { id: 'B', text: "Pendam saja.", consequence: "Tidak puas." }, { id: 'C', text: "Cari di luar.", consequence: "Selingkuh." }] },
  { id: 65, title: "Libido Jomplang", genre: "Seksualitas", pov: "Istri", story: "Kamu ingin setiap hari, suami cuma sanggup seminggu sekali karena capek kerja. Kamu merasa tidak diinginkan.", question: "Solusinya?", options: [{ id: 'A', text: "Komplain terus.", consequence: "Suami stress." }, { id: 'B', text: "Main sendiri.", consequence: "Mandiri." }, { id: 'C', text: "Cari selingan.", consequence: "Fatal." }] },
  { id: 66, title: "Bosan Rutinitas", genre: "Seksualitas", pov: "Suami", story: "Kehidupan ranjang sangat monoton. Istri kaku dan tidak mau variasi. Kamu bosan setengah mati.", question: "Tindakanmu?", options: [{ id: 'A', text: "Bicara jujur.", consequence: "Istri tersinggung." }, { id: 'B', text: "Terima nasib.", consequence: "Hambar." }, { id: 'C', text: "Nonton film dewasa.", consequence: "Pelarian." }] },
  { id: 67, title: "Nama Sertifikat", genre: "Rumah", pov: "Istri", story: "Kamu bayar DP dan cicilan rumah lebih banyak dari suami. Suami minta sertifikat atas nama berdua.", question: "Keputusanmu?", options: [{ id: 'A', text: "Atas namaku saja.", consequence: "Suami tersinggung." }, { id: 'B', text: "Nama berdua.", consequence: "Adil tapi rugi." }, { id: 'C', text: "Nama suami.", consequence: "Bodoh." }] },
  { id: 68, title: "Renovasi Mertua", genre: "Rumah", pov: "Suami", story: "Mertua mau biayai renovasi rumah kalian, tapi minta kamar khusus dan mau mengatur desainnya.", question: "Terima gak?", options: [{ id: 'A', text: "Terima.", consequence: "Rumah rasa mertua." }, { id: 'B', text: "Tolak.", consequence: "Rumah jelek tapi bebas." }, { id: 'C', text: "Terima sebagian.", consequence: "Ribet." }] },
  { id: 69, title: "Sandwich Gen", genre: "Keuangan", pov: "Istri", story: "Gajimu habis buat bayar hutang orang tuamu. Suami marah karena jatah belanja rumah kurang.", question: "Pilihanmu?", options: [{ id: 'A', text: "Stop bantu ortu.", consequence: "Anak durhaka." }, { id: 'B', text: "Minta suami ngerti.", consequence: "Suami makan hati." }, { id: 'C', text: "Cari kerja lagi.", consequence: "Tepar." }] },
  { id: 70, title: "Wasiat Pasangan", genre: "Kematian", pov: "Suami", story: "Istri sakit keras, minta janji: 'Kalau aku meninggal, jangan nikah lagi ya. Fokus urus anak'.", question: "Janjimu?", options: [{ id: 'A', text: "Iya, janji.", consequence: "Terikat sumpah." }, { id: 'B', text: "Liat nanti.", consequence: "Istri sedih di akhir hayat." }, { id: 'C', text: "Bohong iya.", consequence: "Dihantui rasa bersalah." }] },
  { id: 71, title: "Nikah Cepat", genre: "Kematian", pov: "Istri", story: "Suami meninggal 6 bulan lalu. Kamu ketemu pria baik dan mau nikah lagi. Keluarga suami bilang 'kuburan masih basah'.", question: "Keputusanmu?", options: [{ id: 'A', text: "Nikah aja.", consequence: "Digunjing keluarga." }, { id: 'B', text: "Tunda setahun.", consequence: "Menjaga perasaan." }, { id: 'C', text: "Backstreet.", consequence: "Rumit." }] },
  { id: 72, title: "Gono Gini Mati", genre: "Kematian", pov: "Suami", story: "Istri meninggal. Hartanya mau kamu pakai nikah lagi. Anak tiri minta bagian warisan ibunya.", question: "Sikapmu?", options: [{ id: 'A', text: "Kasih semua ke anak.", consequence: "Mulai nol lagi." }, { id: 'B', text: "Ambil semua.", consequence: "Serakah." }, { id: 'C', text: "Bagi dua.", consequence: "Adil." }] },
  { id: 73, title: "Kuburan Mantan", genre: "Kematian", pov: "Istri", story: "Suami minta kalau mati dikubur sebelah makam mantan pacarnya (cinta sejatinya). Kamu sakit hati.", question: "Turuti?", options: [{ id: 'A', text: "Turuti wasiat.", consequence: "Istri solehah tapi sakit." }, { id: 'B', text: "Tolak, kubur di TPU umum.", consequence: "Balas dendam terakhir." }, { id: 'C', text: "Kubur sebelahmu (booking).", consequence: "Posesif sampai mati." }] },
  { id: 74, title: "Childfree", genre: "Prinsip", pov: "Suami", story: "Dulu sepakat childfree. Sekarang kamu ingin sekali punya anak. Istri tetap tidak mau hamil.", question: "Solusinya?", options: [{ id: 'A', text: "Cerai cari lain.", consequence: "Mulai dari nol." }, { id: 'B', text: "Terima childfree.", consequence: "Memendam hasrat ayah." }, { id: 'C', text: "Bujuk terus.", consequence: "Istri tertekan." }] },
  { id: 75, title: "Pindah Warga Negara", genre: "Masa Depan", pov: "Istri", story: "Suami dapat kerja di Amerika dan mau pindah kewarganegaraan. Kamu cinta Indonesia dan dekat keluarga.", question: "Pilihanmu?", options: [{ id: 'A', text: "Ikut suami.", consequence: "Home sick selamanya." }, { id: 'B', text: "LDR beda negara.", consequence: "Resiko bubar." }, { id: 'C', text: "Minta suami tolak.", consequence: "Menghambat karir suami." }] }
];

// ==========================================
// 3. COMPONENTS
// ==========================================

const TypingText = ({ text, speed = 20 }) => {
    const [displayedText, setDisplayedText] = useState('');
    
    useEffect(() => {
        setDisplayedText('');
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                // Using slice is safe, prevents undefined characters
                setDisplayedText(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed]);
    
    return <span>{displayedText}</span>;
};

const Toast = ({ message }) => (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl z-[100] flex items-center gap-2 animate-fade-in-down border border-green-400">
        <CheckCircle2 className="w-5 h-5 text-white" />
        <span className="font-bold text-sm tracking-wide">{message}</span>
    </div>
);

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
    }, [stickerData, onAnimationEnd]); 

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
                 @keyframes fade-in-down {
                    0% { opacity: 0; transform: translate(-50%, -20px); }
                    100% { opacity: 1; transform: translate(-50%, 0); }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

const StickerPanel = ({ roomId, user }) => {
    const [selectedSticker, setSelectedSticker] = useState(null);

    const sendSticker = async () => {
        if (!user || !roomId || !selectedSticker) return;
        try {
            const roomRef = doc(db, 'rooms', roomId.startsWith('room_') ? roomId : `room_${roomId}`);
            await updateDoc(roomRef, {
                latestSticker: {
                    senderId: user.uid,
                    sticker: selectedSticker,
                    timestamp: Date.now()
                }
            });
            setSelectedSticker(null); 
        } catch (e) {
            console.error("Gagal kirim stiker", e);
        }
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-lg mt-6 border border-indigo-100 animate-fade-in">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                <Smile className="w-6 h-6 text-indigo-500" />
                <span className="text-base font-bold text-gray-800">Kirim Reaksi</span>
            </div>
            <div className="grid grid-cols-5 gap-3 mb-6">
                {STICKERS.map((sticker) => (
                    <button
                        key={sticker}
                        onClick={() => setSelectedSticker(sticker)}
                        className={`text-3xl p-2 rounded-xl transition-all focus:outline-none 
                            ${selectedSticker === sticker ? 'bg-indigo-100 scale-110 ring-2 ring-indigo-400' : 'hover:bg-gray-50 hover:scale-105'}
                        `}
                    >
                        {sticker}
                    </button>
                ))}
            </div>
            
            <button 
                onClick={sendSticker}
                disabled={!selectedSticker}
                className={`w-full py-4 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 shadow-md
                    ${selectedSticker 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 transform hover:-translate-y-0.5' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                `}
            >
                <Send className="w-4 h-4" /> KIRIM REAKSI
            </button>
        </div>
    );
};

const Navbar = ({ view, setView, isSidebarOpen, setIsSidebarOpen }) => (
  <nav className="bg-white shadow-sm px-3 sm:px-6 py-4 flex justify-between items-center sticky top-0 z-50">
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
  </nav>
);

const HomeScreen = ({ setView }) => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] px-2 sm:px-4 text-center space-y-8 animate-fade-in">
    <div className="relative">
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-xl relative z-10 max-w-lg border border-rose-100">
        <Heart className="w-16 h-16 text-rose-500 mx-auto mb-6 fill-rose-100" />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
          Seberapa Kenal Kamu dengan <span className="text-rose-500">Pasanganmu?</span>
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Jawab dilema cinta yang sulit. Bagikan link ke pasanganmu untuk melihat apakah jawaban kalian cocok.
        </p>
        <div className="flex flex-col gap-3">
          <button 
              onClick={() => setView('gender-selection')}
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

// Gender Selection Component
const GenderSelection = ({ onSelect }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Siapa Kamu?</h2>
            <p className="text-gray-500 mb-8 text-center text-sm">Pilih peranmu dalam hubungan ini.</p>
            
            <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                <button 
                    onClick={() => onSelect('suami')}
                    className="flex flex-col items-center gap-3 p-6 bg-blue-50 border-2 border-blue-200 rounded-2xl hover:bg-blue-100 hover:border-blue-400 transition transform hover:scale-105"
                >
                    <span className="text-4xl">👨</span>
                    <span className="font-bold text-blue-800">SUAMI</span>
                    <span className="text-xs text-blue-600">(Cowok)</span>
                </button>

                <button 
                    onClick={() => onSelect('istri')}
                    className="flex flex-col items-center gap-3 p-6 bg-pink-50 border-2 border-pink-200 rounded-2xl hover:bg-pink-100 hover:border-pink-400 transition transform hover:scale-105"
                >
                    <span className="text-4xl">👩</span>
                    <span className="font-bold text-pink-800">ISTRI</span>
                    <span className="text-xs text-pink-600">(Cewek)</span>
                </button>
            </div>
        </div>
    );
};

const MultiplayerLobby = ({ createRoom, joinRoom, isLoading, user, userRole }) => {
    const [joinId, setJoinId] = useState('');
    
    return (
        <div className="max-w-md mx-auto mt-10 p-4 sm:p-6 bg-white rounded-2xl shadow-xl border border-rose-100 text-center animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Mode Pasangan</h2>
            <p className="text-sm text-gray-500 mb-6 bg-gray-100 py-1 px-3 rounded-full inline-block">
                Kamu bermain sebagai: <span className="font-bold text-indigo-600 uppercase">{userRole}</span>
            </p>
            
            <div className="space-y-6">
                <div className="p-8 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-lg text-white transform hover:scale-105 transition duration-300">
                    <h3 className="font-bold text-xl mb-2">Saya Orang Pertama</h3>
                    <p className="text-rose-100 text-sm mb-4">Buat room baru & ajak pasangan.</p>
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
        <div className="max-w-md mx-auto mt-10 p-4 sm:p-8 bg-white rounded-2xl shadow-xl text-center space-y-6 animate-fade-in border-4 border-rose-100">
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
    userRole, 
    copyInviteLink, 
    setView,
    submitMultiplayerAnswer,
    nextMultiplayerScenario,
    resetGame,
    activeSticker,
    setActiveSticker,
}) => {
    const currentOrderIndex = gameData?.scenarioIndex || 0;
    
    // --- SHUFFLE LOGIC INTEGRATION ---
    let currentScenario = SCENARIOS[0]; // Default safe
    
    if (gameData?.scenarioOrder && gameData.scenarioOrder.length > 0) {
        const actualScenarioIndex = gameData.scenarioOrder[currentOrderIndex];
        // Check valid index inside SCENARIOS array
        if (actualScenarioIndex !== undefined && SCENARIOS[actualScenarioIndex]) {
            currentScenario = SCENARIOS[actualScenarioIndex];
        }
    } else {
        // Fallback for legacy rooms without shuffle
        currentScenario = SCENARIOS[currentOrderIndex % SCENARIOS.length];
    }
    
    // Extra safety: If scenario is missing, show loading
    if (!currentScenario) return <div className="p-20 text-center text-gray-500">Memuat Skenario...</div>;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentOrderIndex]);

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
    
    // Labels for UI based on selected ROLE not HOST status alone
    const myRoleLabel = userRole === 'suami' ? "Suami 👨" : "Istri 👩";
    const partnerRoleLabel = userRole === 'suami' ? "Istri 👩" : "Suami 👨";
    
    const myAnswerId = playerRole === 'host' ? gameData.hostAnswer : gameData.guestAnswer;
    const partnerAnswerId = playerRole === 'host' ? gameData.guestAnswer : gameData.hostAnswer;
    const bothAnswered = gameData.hostAnswer && gameData.guestAnswer;
    
    const MAX_QUESTIONS = 20;

    if (currentOrderIndex >= MAX_QUESTIONS) {
        return <ResultScreen score={gameData.score || 0} total={MAX_QUESTIONS} resetGame={resetGame} />;
    }

    const isMatch = myAnswerId === partnerAnswerId;
    const matchColorClass = isMatch 
        ? "border-green-200 bg-green-50 text-green-800" 
        : "border-red-200 bg-red-50 text-red-800";
    const matchHeaderText = isMatch 
        ? "✨ Kalian Kompak! Jawaban Sama (+1 Skor) ✨" 
        : "🔥 Jawaban Berbeda! Waktunya Diskusi 🔥";
    const matchHeaderColor = isMatch ? "text-green-600" : "text-orange-500";

    return (
      <div className="max-w-2xl mx-auto px-2 sm:px-4 py-4 sm:py-8 pb-24 relative">
        <StickerOverlay 
            stickerData={activeSticker} 
            onAnimationEnd={() => setActiveSticker(null)} 
        />

        <div className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isWaitingGuest ? 'bg-orange-500 animate-ping' : 'bg-green-500'} `}></div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                        {isWaitingGuest ? 'Menunggu Pasangan...' : 'Tersambung'}
                    </span>
                </div>
                <div className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded">
                    Pertanyaan {currentOrderIndex + 1} dari {MAX_QUESTIONS}
                </div>
            </div>
            
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2">
                    <UserCircle className={`w-5 h-5 ${isHost ? 'text-blue-500' : 'text-rose-500'}`} />
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-gray-400 font-bold">Kamu Bermain Sebagai</span>
                        <span className={`text-sm font-bold ${userRole === 'suami' ? 'text-blue-700' : 'text-rose-700'}`}>
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
                    <p className="text-gray-800 text-base sm:text-lg leading-relaxed font-medium">
                    <TypingText text={`"${currentScenario.story}"`} />
                    </p>
                </div>
            </div>
          </div>
          
          <div className="p-4 sm:p-6 md:p-8">

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
                        {currentScenarioIndex < MAX_QUESTIONS - 1 ? "Skenario Berikutnya" : "Lihat Hasil Akhir"}
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
    // Single player logic removed per request, but component kept for safety if referenced.
    // It's effectively unreachable now as the Home button is removed.
    return null; 
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
  const lastStickerTimeRef = useRef(Date.now());
  
  // Toast State
  const [toastMsg, setToastMsg] = useState(null);

  // Multiplayer State
  const [user, setUser] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [userRole, setUserRole] = useState(null); // 'suami' | 'istri'
  const [gameData, setGameData] = useState(null);
  const [playerRole, setPlayerRole] = useState(null); // 'host' or 'guest'
  const unsubscribeRoomRef = useRef(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

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

  const handleGenderSelect = (selectedRole) => {
      setUserRole(selectedRole);
      
      // Check if joining via link
      const params = new URLSearchParams(window.location.search);
      const urlRoomId = params.get('room');
      
      if (urlRoomId) {
          joinRoom(urlRoomId, user, selectedRole);
      } else {
          setView('multiplayer-lobby');
      }
  };

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
        
        // --- SHUFFLE LOGIC START (Pick 20 random indices from 50) ---
        const indices = Array.from({ length: SCENARIOS.length }, (_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        const selectedIndices = indices.slice(0, 20); // Take only first 20
        // --- SHUFFLE LOGIC END ---

        await setDoc(roomRef, {
          createdAt: new Date().toISOString(),
          hostId: user.uid,
          hostRole: userRole, // Store host gender
          scenarioIndex: 0, 
          scenarioOrder: selectedIndices, 
          hostAnswer: null,
          guestAnswer: null,
          status: 'waiting_guest',
          score: 0,
        });

        setRoomId(newRoomId);
        setPlayerRole('host'); 
        subscribeToRoom(newRoomId, user.uid);
        setView('multiplayer-game'); 
    } catch (error) {
        console.error("Error creating room:", error);
        alert("Gagal membuat room. Pastikan koneksi internet lancar.");
    } finally {
        setIsLoading(false);
    }
  };

  const joinRoom = async (inputRoomId, currentUser = user, currentRole = userRole) => {
    if (!currentUser || !inputRoomId || !currentRole) return;

    setIsLoading(true);
    setGameData(null); 
    try {
        const cleanId = inputRoomId.trim().toUpperCase();
        const roomRef = doc(db, 'rooms', `room_${cleanId}`);
        const snap = await getDoc(roomRef);

        if (snap.exists()) {
          const data = snap.data();
          
          // GENDER VALIDATION LOGIC
          if (data.hostRole === currentRole) {
              alert(`Host sudah memilih peran ${data.hostRole.toUpperCase()}. Kamu harus memilih peran sebaliknya untuk bermain.`);
              setIsLoading(false);
              setView('gender-selection'); // Send back to selection
              return;
          }

          if (data.hostId !== currentUser.uid) {
              await updateDoc(roomRef, {
                status: 'playing',
                guestId: currentUser.uid,
                guestRole: currentRole
              });
              setPlayerRole('guest'); 
          } else {
              setPlayerRole('host'); 
          }

          setRoomId(cleanId);
          subscribeToRoom(cleanId, currentUser.uid);
          setView('multiplayer-game');
        } else {
          alert("Room tidak ditemukan / Link kadaluarsa.");
          window.history.pushState({}, document.title, window.location.pathname);
          setIsLoading(false);
        }
    } catch (error) {
        console.error("Error joining room:", error);
        alert("Gagal bergabung ke room.");
        setIsLoading(false);
    }
  };

  const subscribeToRoom = (id, myUid) => {
    if (unsubscribeRoomRef.current) unsubscribeRoomRef.current();
    
    const roomRef = doc(db, 'rooms', `room_${id}`);
    unsubscribeRoomRef.current = onSnapshot(roomRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setGameData(data);
        
        if (data.latestSticker && data.latestSticker.timestamp > lastStickerTimeRef.current) {
            lastStickerTimeRef.current = data.latestSticker.timestamp;
            setActiveSticker({
                symbol: data.latestSticker.sticker,
                id: data.latestSticker.timestamp
            });
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
        // host is ALWAYS player 1, guest is ALWAYS player 2 in DB structure
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
          latestSticker: null 
        });
    } catch (error) {
        console.error("Error next scenario:", error);
    }
  };

  const resetGame = async () => {
      try {
        const roomRef = doc(db, 'rooms', `room_${roomId}`);
        
        // Reshuffle for new game
        const indices = Array.from({ length: SCENARIOS.length }, (_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        const selectedIndices = indices.slice(0, 20);

        await updateDoc(roomRef, {
            scenarioIndex: 0,
            scenarioOrder: selectedIndices,
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
            showToast("Link mengajak berhasil di copy ke clipboard, paste ke whatsap pasangan kamu");
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
        showToast("Link mengajak berhasil di copy ke clipboard, paste ke whatsap pasangan kamu");
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
      
      {toastMsg && <Toast message={toastMsg} />}
      
      <main className="container mx-auto">
        {view === 'home' && <HomeScreen setView={setView} />}
        {view === 'gender-selection' && <GenderSelection onSelect={handleGenderSelect} />}
        {view === 'multiplayer-lobby' && 
          <MultiplayerLobby 
            createRoom={createRoom}
            joinRoom={joinRoom}
            isLoading={isLoading}
            user={user}
            userRole={userRole}
          />
        }
        {view === 'multiplayer-game' && 
          <MultiplayerGameScreen 
            gameData={gameData}
            user={user}
            roomId={roomId}
            playerRole={playerRole}
            userRole={userRole} // Pass user selected gender for label display
            copyInviteLink={copyInviteLink}
            setView={setView}
            submitMultiplayerAnswer={submitMultiplayerAnswer}
            nextMultiplayerScenario={nextMultiplayerScenario}
            resetGame={resetGame}
            activeSticker={activeSticker}
            setActiveSticker={setActiveSticker}
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
