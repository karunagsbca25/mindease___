/* ==========================================================
   MOTIVATIONAL QUOTES
========================================================== */

const quotes = [
  "You are enough, just as you are.",
  "Every day may not be good, but there’s something good in every day.",
  "Your feelings are valid.",
  "Breathe. You are stronger than you think.",
  "Small steps every day make a big difference."
];

function newQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  const q = document.getElementById("quote");
  if (q) q.textContent = quotes[random];
}



/* ==========================================================
   BREATHING ANIMATION TEXT
========================================================== */

const breatheText = document.getElementById("breathe-text");
if (breatheText) {
  let phase = 0;
  setInterval(() => {
    phase = (phase + 1) % 4;
    breatheText.textContent = ["Breathe In", "Hold...", "Breathe Out", "Relax..."][phase];
  }, 4000);
}



/* ==========================================================
   JOURNAL SYSTEM — CLEARED ON RELOAD
========================================================== */

// Save journal entry
function saveJournal() {
  const text = document.getElementById("journal").value;

  if (!text.trim()) {
    document.getElementById("save-msg").innerText = "Write something first!";
    return;
  }

  const now = new Date();
  const timestamp = now.toLocaleString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const entry = { text, timestamp };

  let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  entries.unshift(entry);
  localStorage.setItem("journalEntries", JSON.stringify(entries));

  document.getElementById("journal").value = "";
  document.getElementById("save-msg").innerText = "Saved ✔️";

  loadEntries();
}



// Load entries
function loadEntries() {
  const container = document.getElementById("journal-entries");
  if (!container) return;

  let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  container.innerHTML = "";

  entries.forEach((entry) => {
    const card = document.createElement("div");
    card.className = "entry-card";

    card.innerHTML = `
      <p class="entry-text">${entry.text}</p>
      <p class="entry-date">📅 ${entry.timestamp}</p>
    `;

    container.appendChild(card);
  });
}






/* ==========================================================
   CLEAR JOURNAL ON PAGE LOAD (YOUR REQUEST)
========================================================== */

window.onload = () => {
  localStorage.removeItem("journalEntries");
  loadEntries();
  newQuote();
};
