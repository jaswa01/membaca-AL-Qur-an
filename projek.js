// --- DATA / API QURAN ---
// Contoh API: Al-Quran Cloud atau Local JSON

const audioBase = "https://audio.qurancdn.com/"; // contoh base audio
let audio = new Audio();
let currentIndex = 0;

// Ambil seluruh elemen kata
const words = document.querySelectorAll(".word");

// Event: klik setiap kata untuk memutar audio
words.forEach((w, index) => {
  w.addEventListener("click", () => {
    playWord(index);
  });
});

// Fungsi memainkan audio per kata
function playWord(index) {
  clearActive();

  const wordEl = words[index];
  const audioSrc = wordEl.dataset.audio;

  if (!audioSrc) return;

  audio.src = audioSrc;
  audio.play();

  highlightWord(wordEl);
}

// Highlight kata + glow + zoom
function highlightWord(el) {
  clearActive();
  el.classList.add("active");
}

// Menghapus highlight
function clearActive() {
  words.forEach(w => w.classList.remove("active"));
}

// --- PLAY AYAT OTOMATIS ---
document.getElementById("playAyat").addEventListener("click", () => {
  currentIndex = 0;
  playAyatAuto();
});

// Fungsi play otomatis dari kata pertama sampai selesai
function playAyatAuto() {
  if (currentIndex >= words.length) return;

  const w = words[currentIndex];
  const audioSrc = w.dataset.audio;

  if (!audioSrc) return;

  highlightWord(w);

  audio.src = audioSrc;
  audio.play();

  audio.onended = () => {
    currentIndex++;
    playAyatAuto();
  };
}