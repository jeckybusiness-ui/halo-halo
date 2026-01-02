import React, { useState, useEffect, useRef } from 'react';
// Import fungsi yang dibutuhkan dari SDK
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  getDoc,
} from 'firebase/firestore';

// --- Icons Component (Inline SVG) ---
const Heart = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);
const MessageCircle = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);
const ArrowRight = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
const RefreshCw = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </svg>
);
const BookOpen = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);
const AlertCircle = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);
const CheckCircle2 = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const Share2 = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
  </svg>
);
const Menu = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);
const X = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 18 18" />
  </svg>
);
const Users = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const Copy = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);
const Loader = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`animate-spin ${className}`}
  >
    <path d="M21 12a9 9 0 1 1-6.21-10.42 12 12 0 0 1 0 6.21" />
  </svg>
);
const LinkIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);
const UserCircle = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
  </svg>
);

// Sample Data: Scenarios
const SCENARIOS = [
  {
    id: 1,
    title: 'Mantan di Reuni',
    genre: 'Kesetiaan',
    difficulty: 'Medium',
    pov: 'Suami',
    story:
      "Kamu datang ke reuni SMA sendirian karena istrimu sakit. Di sana, kamu bertemu mantan terindahmu yang kini terlihat sangat sukses dan menawan. Dia mendekatimu, mengajak ngobrol intens, dan mengaku dia baru saja cerai. Di akhir acara, dia meminta nomor HP-mu dengan alasan 'untuk koneksi bisnis' dan menawarkan tumpangan pulang karena searah, padahal kamu bawa mobil (tapi bisa beralasan mabuk/lelah).",
    question: 'Apa yang akan kamu lakukan?',
    options: [
      {
        id: 'A',
        text: 'Berikan nomor HP, tapi tolak tumpangan.',
        consequence:
          'Kamu menjaga sopan santun, tapi membuka celah komunikasi pribadi.',
        discussion:
          'Apakah bertukar kontak dengan mantan itu wajar bagi kalian? Di mana batasannya?',
      },
      {
        id: 'B',
        text: 'Tolak halus nomor HP & tumpangan, langsung pulang.',
        consequence:
          'Kamu menutup pintu sepenuhnya, mungkin dianggap sombong, tapi aman.',
        discussion:
          'Apakah pasanganmu harus tahu kalau kamu bertemu mantan hari ini?',
      },
      {
        id: 'C',
        text: 'Terima tumpangan, tinggalkan mobil di lokasi.',
        consequence: 'Kamu mengambil risiko besar untuk momen berdua. Bahaya.',
        discussion:
          "Apa yang dikategorikan sebagai 'micro-cheating' menurut kalian?",
      },
    ],
  },
  {
    id: 2,
    title: 'Promosi Jabatan',
    genre: 'Karir vs Cinta',
    difficulty: 'Hard',
    pov: 'Istri',
    story:
      'Kamu mendapatkan tawaran promosi impianmu menjadi VP, tapi syaratnya harus pindah ke kantor cabang di luar negeri (Eropa) selama 3 tahun. Suamimu baru saja mulai merintis bisnis di kota ini dan tidak mungkin ikut pindah atau meninggalkan bisnisnya. LDR (Long Distance Relationship) selama 3 tahun adalah waktu yang sangat lama.',
    question: 'Keputusan apa yang kamu ambil?',
    options: [
      {
        id: 'A',
        text: 'Tolak promosi demi tetap bersama suami.',
        consequence:
          'Karirmu stagnan, mungkin ada rasa penyesalan di kemudian hari.',
        discussion:
          'Apakah boleh mengorbankan mimpi pribadi demi pasangan? Siapa yang harus mengalah?',
      },
      {
        id: 'B',
        text: 'Ambil promosi dan jalani LDR.',
        consequence:
          'Hubungan akan diuji jarak dan waktu. Resiko renggang sangat besar.',
        discussion:
          'Seberapa kuat kepercayaan kalian? Apa aturan main LDR kalian?',
      },
      {
        id: 'C',
        text: 'Minta suami tutup bisnisnya dan ikut kamu.',
        consequence: 'Kamu egois demi karirmu, suami kehilangan mimpinya.',
        discussion:
          'Apakah pendapatan menentukan siapa yang memimpin keputusan keluarga?',
      },
    ],
  },
  {
    id: 3,
    title: 'Tabungan Rahasia',
    genre: 'Keuangan',
    difficulty: 'Medium',
    pov: 'Pacar (Cowok)',
    story:
      'Kamu dan pacarmu sedang menabung keras untuk biaya nikah tahun depan. Tiba-tiba, adikmu terjerat hutang pinjol dan diancam. Orang tuamu memohon padamu untuk membantu melunasinya. Jumlahnya setara dengan 50% tabungan nikah yang sudah kamu kumpulkan susah payah. Pacarmu sangat ketat soal uang dan pasti akan marah besar jika tahu uang nikah dipakai.',
    question: 'Tindakanmu?',
    options: [
      {
        id: 'A',
        text: 'Pakai uang tabungan diam-diam, nanti diganti pelan-pelan.',
        consequence:
          'Masalah selesai sejenak, tapi kamu membangun pernikahan di atas kebohongan.',
        discussion:
          'Apakah keuangan pribadi dan pasangan harus 100% transparan sebelum menikah?',
      },
      {
        id: 'B',
        text: 'Diskusi jujur dengan pacar, minta izin pakai uang.',
        consequence:
          'Resiko bertengkar hebat atau bahkan batal nikah karena dia kecewa.',
        discussion:
          'Jika pasanganmu menolak meminjamkan uang untuk keluargamu, apa perasaanmu?',
      },
      {
        id: 'C',
        text: 'Tolak bantu adik, fokus ke pernikahan.',
        consequence:
          "Kamu 'selamat' di mata pacar, tapi mungkin dibenci keluarga sendiri.",
        discussion: 'Mana prioritas utama: Pasangan atau Keluarga Kandung?',
      },
    ],
  },
];

// --- Initialization Firebase (YOUR CONFIG) ---
const firebaseConfig = {
  apiKey: 'AIzaSyDRzjrhryX8Hpq8tmrCCDhlJQugbz2r7_0',
  authDomain: 'testing-95321.firebaseapp.com',
  projectId: 'testing-95321',
  storageBucket: 'testing-95321.firebasestorage.app',
  messagingSenderId: '457933264802',
  appId: '1:457933264802:web:c7004083fd4a19336984fb',
  measurementId: 'G-W503YYH8DT',
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
        console.error('Auth Error:', error);
        if (
          error.code === 'auth/configuration-not-found' ||
          error.code === 'auth/operation-not-allowed'
        ) {
          setAuthError('Fitur Login Anonim belum aktif di Firebase Console.');
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
          console.log('Auto joining room from URL:', urlRoomId);
          joinRoom(urlRoomId, u); // Pass user directly to avoid closure issues
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // --- Multiplayer Functions ---

  const createRoom = async () => {
    if (!user) {
      alert('Menunggu koneksi ke server...');
      return;
    }

    setIsLoading(true);
    setGameData(null);
    try {
      const newRoomId = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();
      const roomRef = doc(db, 'rooms', `room_${newRoomId}`);

      await setDoc(roomRef, {
        createdAt: new Date().toISOString(),
        hostId: user.uid,
        scenarioIndex: 0,
        hostAnswer: null,
        guestAnswer: null,
        status: 'waiting_guest',
      });

      setRoomId(newRoomId);
      setPlayerRole('host'); // Creator is Host (Suami)
      subscribeToRoom(newRoomId);
      setView('multiplayer-game');
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Gagal membuat room. Pastikan koneksi internet lancar.');
    } finally {
      setIsLoading(false);
    }
  };

  const joinRoom = async (inputRoomId, currentUser = user) => {
    if (!currentUser || !inputRoomId) return;

    // Don't show loading if it's auto-join on background, but here we show it
    setIsLoading(true);
    setGameData(null);
    try {
      const cleanId = inputRoomId.trim().toUpperCase();
      const roomRef = doc(db, 'rooms', `room_${cleanId}`);
      const snap = await getDoc(roomRef);

      if (snap.exists()) {
        const data = snap.data();

        // Logic: If I am not the host, I must be the guest
        // Even if I am "User A" locally, if the room Host ID is different, I am Guest.
        if (data.hostId !== currentUser.uid) {
          await updateDoc(roomRef, {
            status: 'playing',
            guestId: currentUser.uid,
          });
          setPlayerRole('guest'); // Guest is Istri
        } else {
          setPlayerRole('host'); // I am the host (re-joining my own room)
        }

        setRoomId(cleanId);
        subscribeToRoom(cleanId);
        setView('multiplayer-game');
      } else {
        alert('Room tidak ditemukan / Link kadaluarsa.');
        // Clear URL param if failed
        window.history.pushState({}, document.title, window.location.pathname);
      }
    } catch (error) {
      console.error('Error joining room:', error);
      alert('Gagal bergabung ke room.');
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToRoom = (id) => {
    if (unsubscribeRoomRef.current) unsubscribeRoomRef.current();

    const roomRef = doc(db, 'rooms', `room_${id}`);
    unsubscribeRoomRef.current = onSnapshot(
      roomRef,
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setGameData(data);
          setCurrentScenarioIndex(data.scenarioIndex);
        } else {
          if (view === 'multiplayer-game') {
            alert('Room terputus.');
            setView('multiplayer-lobby');
          }
        }
      },
      (error) => {
        console.error('Snapshot error:', error);
        alert('Gagal memuat data room.');
        setView('multiplayer-lobby');
      }
    );
  };

  const submitMultiplayerAnswer = async (option) => {
    if (!gameData || !roomId) return;
    try {
      const roomRef = doc(db, 'rooms', `room_${roomId}`);
      const updatePayload =
        playerRole === 'host'
          ? { hostAnswer: option.id }
          : { guestAnswer: option.id };
      await updateDoc(roomRef, updatePayload);
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const nextMultiplayerScenario = async () => {
    try {
      const roomRef = doc(db, 'rooms', `room_${roomId}`);
      const nextIndex = (gameData.scenarioIndex + 1) % SCENARIOS.length;
      await updateDoc(roomRef, {
        scenarioIndex: nextIndex,
        hostAnswer: null,
        guestAnswer: null,
        status: 'playing',
      });
    } catch (error) {
      console.error('Error next scenario:', error);
    }
  };

  const copyInviteLink = () => {
    // Generate URL with query param
    const url = `${window.location.origin}${window.location.pathname}?room=${roomId}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert('Link undangan disalin! Kirim ke pasanganmu.');
        })
        .catch(() => fallbackCopy(url));
    } else {
      fallbackCopy(url);
    }
  };

  const fallbackCopy = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      alert('Link undangan disalin! Kirim ke pasanganmu.');
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  // --- Render Functions ---

  const currentScenario = SCENARIOS[currentScenarioIndex];
  const bothAnswered = gameData && gameData.hostAnswer && gameData.guestAnswer;
  const myAnswerId = gameData
    ? playerRole === 'host'
      ? gameData.hostAnswer
      : gameData.guestAnswer
    : null;
  const partnerAnswerId = gameData
    ? playerRole === 'host'
      ? gameData.guestAnswer
      : gameData.hostAnswer
    : null;

  const handleSinglePlayerSelect = (option) => {
    setSelectedOption(option);
    setShowResult(true);
  };

  // --- Screens ---

  const Navbar = () => (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => {
          if (view.includes('multiplayer')) {
            if (confirm('Keluar dari game online?')) {
              setView('home');
              setRoomId('');
              setGameData(null);
              // Clear URL param on exit
              window.history.pushState(
                {},
                document.title,
                window.location.pathname
              );
            }
          } else {
            setView('home');
          }
        }}
      >
        <div className="bg-rose-500 p-2 rounded-lg">
          <Heart className="w-5 h-5 text-white fill-current" />
        </div>
        <span className="font-bold text-xl text-gray-800 tracking-tight">
          Dilema<span className="text-rose-500">Asmara</span>
        </span>
      </div>
      <button
        className="md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
      <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
        <button
          onClick={() => setView('home')}
          className="hover:text-rose-500 transition"
        >
          Home
        </button>
        <button
          onClick={() => setView('multiplayer-lobby')}
          className={`hover:text-rose-500 transition ${
            view.includes('multiplayer') ? 'text-rose-600 font-bold' : ''
          }`}
        >
          Mode Pasangan
        </button>
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
            Seberapa Kenal Kamu dengan{' '}
            <span className="text-rose-500">Pasanganmu?</span>
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Jawab dilema cinta yang sulit. Bagikan link ke pasanganmu untuk
            melihat apakah jawaban kalian cocok.
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
          <p className="mt-4 text-xs text-gray-400 uppercase tracking-wide">
            Cocok untuk Deep Talk & LDR
          </p>
        </div>
      </div>
    </div>
  );

  if (authError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4 font-sans text-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-200 max-w-lg w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Konfigurasi Belum Selesai
          </h2>
          <p className="text-gray-600 mb-6">{authError}</p>
          <a
            href={`https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/providers`}
            target="_blank"
            rel="noreferrer"
            className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition"
          >
            Buka Firebase Console
          </a>
        </div>
      </div>
    );
  }

  const MultiplayerLobby = () => {
    const [joinId, setJoinId] = useState('');

    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-rose-100 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Lobby Pasangan
        </h2>
        <div className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-lg text-white transform hover:scale-105 transition duration-300">
            <h3 className="font-bold text-xl mb-2">Mulai Game Baru</h3>
            <p className="text-rose-100 text-sm mb-4">
              Buat room baru dan dapatkan Link Undangan untuk dikirim ke
              pasanganmu.
            </p>
            <button
              onClick={createRoom}
              disabled={isLoading || !user}
              className={`w-full py-3 rounded-lg font-bold shadow-md transition flex items-center justify-center gap-2
                            ${
                              isLoading || !user
                                ? 'bg-rose-300 cursor-not-allowed'
                                : 'bg-white text-rose-600 hover:bg-gray-100'
                            }
                        `}
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5" /> Memproses...
                </>
              ) : (
                'Buat Room & Bagikan Link'
              )}
            </button>
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">
              ATAU GABUNG MANUAL
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="p-6 bg-white rounded-xl border-2 border-dashed border-gray-300">
            <input
              type="text"
              placeholder="Masukkan Kode Room (jika ada)"
              value={joinId}
              onChange={(e) => setJoinId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-center uppercase font-mono tracking-widest focus:ring-2 focus:ring-rose-500 outline-none"
            />
            <button
              onClick={() => joinRoom(joinId)}
              disabled={isLoading || !user || !joinId}
              className={`w-full py-3 rounded-lg font-bold transition flex items-center justify-center gap-2
                             ${
                               isLoading || !user || !joinId
                                 ? 'bg-gray-400 cursor-not-allowed text-white'
                                 : 'bg-gray-800 hover:bg-black text-white'
                             }
                        `}
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5" /> Masuk Room...
                </>
              ) : (
                'Gabung'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const MultiplayerGameScreen = () => {
    if (!gameData)
      return (
        <div className="text-center mt-20 flex flex-col items-center gap-4 animate-fade-in">
          <Loader className="w-10 h-10 text-rose-500" />
          <span className="text-gray-600 font-medium">
            Sedang memuat data permainan...
          </span>
          <button
            onClick={() => setView('multiplayer-lobby')}
            className="text-sm text-gray-400 underline hover:text-gray-600 transition"
          >
            Batal / Kembali ke Lobi
          </button>
        </div>
      );

    const isWaitingGuest = gameData.status === 'waiting_guest';

    if (isWaitingGuest) {
      return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <LinkIcon className="w-8 h-8 text-rose-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Undang Pasanganmu
          </h2>
          <p className="text-gray-600 mb-4">
            Salin link di bawah dan kirim via WhatsApp/Line.
          </p>

          <div className="bg-gray-100 p-4 rounded-xl flex items-center justify-between border border-gray-200 mb-4">
            <span className="text-sm text-gray-500 font-mono truncate mr-2">
              {window.location.origin}
              {window.location.pathname}?room={roomId}
            </span>
          </div>

          <button
            onClick={copyInviteLink}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
          >
            <Copy className="w-5 h-5" /> Salin Link Undangan
          </button>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-2">
              Atau gunakan kode manual:
            </p>
            <span className="font-mono font-bold text-lg text-gray-700 tracking-widest">
              {roomId}
            </span>
          </div>
        </div>
      );
    }

    // Role Labels Logic
    const isHost = playerRole === 'host';
    const myRoleLabel = isHost
      ? 'Pihak Cowok / Suami 👨'
      : 'Pihak Cewek / Istri 👩';
    const partnerRoleLabel = isHost
      ? 'Pihak Cewek / Istri 👩'
      : 'Pihak Cowok / Suami 👨';

    // --- GAMEPLAY MULTIPLAYER ---
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 pb-24">
        {/* Header Status with Role Identity */}
        <div className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                Live Room
              </span>
            </div>
            <div className="text-xs text-gray-400 font-mono">ID: {roomId}</div>
          </div>

          {/* Player Identity Badge */}
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2">
              <UserCircle
                className={`w-5 h-5 ${
                  isHost ? 'text-blue-500' : 'text-rose-500'
                }`}
              />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-gray-400 font-bold">
                  Kamu Bermain Sebagai
                </span>
                <span
                  className={`text-sm font-bold ${
                    isHost ? 'text-blue-700' : 'text-rose-700'
                  }`}
                >
                  {myRoleLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-rose-50 to-purple-50 p-6 border-b border-gray-100 flex justify-between items-start">
            <div>
              <span className="inline-block px-3 py-1 bg-white text-rose-600 text-xs font-bold rounded-full mb-2 border border-rose-100 uppercase tracking-wider">
                {currentScenario.genre}
              </span>
              <h2 className="text-2xl font-bold text-gray-800">
                {currentScenario.title}
              </h2>
            </div>
            <div className="text-right">
              <span className="block text-xs text-gray-500 uppercase">
                POV Cerita
              </span>
              <span className="font-bold text-gray-700">
                {currentScenario.pov}
              </span>
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
                <p className="font-semibold text-gray-800">
                  {currentScenario.question}
                </p>
                {/* Contextual Hint based on Role vs POV */}
                {(currentScenario.pov.includes('Suami') ||
                  currentScenario.pov.includes('Cowok')) &&
                  !isHost && (
                    <p className="text-xs text-rose-600 mt-1 italic">
                      (Ini sudut pandang pasanganmu. Jika kamu jadi dia, apa
                      yang kamu harap dia lakukan?)
                    </p>
                  )}
                {(currentScenario.pov.includes('Istri') ||
                  currentScenario.pov.includes('Cewek')) &&
                  isHost && (
                    <p className="text-xs text-blue-600 mt-1 italic">
                      (Ini sudut pandang pasanganmu. Jika kamu jadi dia, apa
                      yang kamu harap dia lakukan?)
                    </p>
                  )}
              </div>
            </div>

            {/* Answer Options Section */}
            {!bothAnswered ? (
              <div className="space-y-4">
                {/* Status Indicator */}
                <div className="flex items-center justify-between text-sm mb-4 px-2">
                  <span
                    className={`${
                      myAnswerId ? 'text-green-600 font-bold' : 'text-gray-500'
                    }`}
                  >
                    {myAnswerId
                      ? '✓ Kamu sudah memilih'
                      : '• Giliranmu memilih'}
                  </span>
                  <span
                    className={`${
                      partnerAnswerId
                        ? 'text-green-600 font-bold'
                        : 'text-rose-500 animate-pulse'
                    }`}
                  >
                    {partnerAnswerId
                      ? '✓ Pasangan sudah memilih'
                      : '• Menunggu pasangan...'}
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
                                    ${
                                      isSelected
                                        ? 'border-rose-500 bg-rose-50'
                                        : 'border-gray-100 hover:border-rose-300 hover:bg-gray-50'
                                    } ${
                        !!myAnswerId && !isSelected
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }
                                `}
                    >
                      <span
                        className={`font-bold mr-3 ${
                          isSelected ? 'text-rose-600' : 'text-gray-400'
                        }`}
                      >
                        {option.id}.
                      </span>
                      <span className="text-gray-700 font-medium">
                        {option.text}
                      </span>
                      {isSelected && (
                        <span className="absolute right-4 top-5 text-rose-500 font-bold text-sm">
                          Pilihanmu
                        </span>
                      )}
                    </button>
                  );
                })}

                {myAnswerId && !partnerAnswerId && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg text-gray-500 italic animate-pulse">
                    Menunggu pasangan memilih jawabannya...
                  </div>
                )}
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
                  <div
                    className={`border-2 p-4 rounded-xl ${
                      isHost
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-rose-200 bg-rose-50'
                    }`}
                  >
                    <div
                      className={`text-xs uppercase font-bold mb-1 ${
                        isHost ? 'text-blue-500' : 'text-rose-500'
                      }`}
                    >
                      Jawabanmu ({myRoleLabel})
                    </div>
                    <div className="text-xl font-bold text-gray-800 mb-2">
                      Opsi {myAnswerId}
                    </div>
                    <div className="text-sm text-gray-600">
                      {
                        currentScenario.options.find((o) => o.id === myAnswerId)
                          ?.text
                      }
                    </div>
                  </div>
                  {/* Partner Answer */}
                  <div
                    className={`border-2 p-4 rounded-xl ${
                      !isHost
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-rose-200 bg-rose-50'
                    }`}
                  >
                    <div
                      className={`text-xs uppercase font-bold mb-1 ${
                        !isHost ? 'text-blue-500' : 'text-rose-500'
                      }`}
                    >
                      Jawaban Pasangan ({partnerRoleLabel})
                    </div>
                    <div className="text-xl font-bold text-gray-800 mb-2">
                      Opsi {partnerAnswerId}
                    </div>
                    <div className="text-sm text-gray-600">
                      {
                        currentScenario.options.find(
                          (o) => o.id === partnerAnswerId
                        )?.text
                      }
                    </div>
                  </div>
                </div>

                {myAnswerId === partnerAnswerId ? (
                  <div className="text-center text-green-600 font-bold">
                    ✨ Kalian Kompak! Jawaban Sama ✨
                  </div>
                ) : (
                  <div className="text-center text-orange-500 font-bold">
                    🔥 Jawaban Berbeda! Waktunya Diskusi 🔥
                  </div>
                )}

                {/* Discussion Prompt */}
                <div className="bg-white p-6 rounded-xl border-l-4 border-indigo-500 shadow-sm">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-6 h-6 text-indigo-600 mt-1" />
                    <div>
                      <h3 className="font-bold text-indigo-900 mb-1">
                        Topik Deep Talk
                      </h3>
                      <p className="text-indigo-800 text-lg font-medium">
                        "
                        {
                          currentScenario.options.find(
                            (o) => o.id === myAnswerId
                          )?.discussion
                        }
                        "
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={nextMultiplayerScenario}
                  className="w-full bg-gray-900 hover:bg-black text-white py-4 px-6 rounded-xl font-bold transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Lanjut Skenario Berikutnya
                </button>
                <p className="text-center text-xs text-gray-400">
                  Jika kamu klik lanjut, layar pasangan juga akan ikut lanjut.
                </p>
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
          style={{
            width: `${((currentScenarioIndex + 1) / SCENARIOS.length) * 100}%`,
          }}
        ></div>
      </div>

      {/* Story Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-rose-50 to-purple-50 p-6 border-b border-gray-100 flex justify-between items-start">
          <div>
            <span className="inline-block px-3 py-1 bg-white text-rose-600 text-xs font-bold rounded-full mb-2 border border-rose-100 uppercase tracking-wider">
              {currentScenario.genre}
            </span>
            <h2 className="text-2xl font-bold text-gray-800">
              {currentScenario.title}
            </h2>
          </div>
          <div className="text-right">
            <span className="block text-xs text-gray-500 uppercase">POV</span>
            <span className="font-bold text-gray-700">
              {currentScenario.pov}
            </span>
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
            <p className="font-semibold text-gray-800">
              {currentScenario.question}
            </p>
          </div>

          {!showResult ? (
            <div className="space-y-3">
              {currentScenario.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSinglePlayerSelect(option)}
                  className="w-full text-left p-5 rounded-xl border-2 border-gray-100 hover:border-rose-300 hover:bg-rose-50 transition-all duration-200 group relative"
                >
                  <span className="font-bold text-gray-400 mr-3 group-hover:text-rose-500">
                    {option.id}.
                  </span>
                  <span className="text-gray-700 font-medium">
                    {option.text}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="animate-fade-in space-y-6">
              {/* Selected Choice Feedback */}
              <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-rose-600" />
                  <span className="font-bold text-rose-700">
                    Kamu memilih opsi {selectedOption.id}
                  </span>
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
                    <h3 className="font-bold text-indigo-900 mb-1">
                      Topik Deep Talk
                    </h3>
                    <p className="text-indigo-800 text-lg font-medium">
                      "{selectedOption.discussion}"
                    </p>
                    <p className="text-sm text-indigo-400 mt-2">
                      Tanyakan ini ke pasanganmu sekarang.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => {
                    setSelectedOption(null);
                    setShowResult(false);
                    setCurrentScenarioIndex(
                      (prev) => (prev + 1) % SCENARIOS.length
                    );
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
        <p>© 2024 Dilema Asmara. Buatan AI untuk Manusia yang Mencintai.</p>
      </footer>
    </div>
  );
};

export default App;
