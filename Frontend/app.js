// frontend/app.js

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatBox = document.getElementById("chat-box");

// Replace with your Render backend URL
const BACKEND_URL = "https://lumoraai-oi4j.onrender.com/chat";

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  // Show user's message
  appendMessage("You", message);
  chatInput.value = "";

  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "peter", // or dynamically set
        message
      })
    });

    const data = await res.json();
    if (data.reply) {
      appendMessage("Lumora", data.reply);
      speakText(data.reply); // optional: voice output
    } else {
      appendMessage("Lumora", "No reply received.");
    }
  } catch (err) {
    console.error(err);
    appendMessage("Lumora", "Error connecting to server.");
  }
});

function appendMessage(sender, text) {
  const messageEl = document.createElement("div");
  messageEl.classList.add("chat-message");
  messageEl.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(messageEl);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Optional: add female voice TTS
function speakText(text) {
  if (!("speechSynthesis" in window)) return;

  const utterance = new SpeechSynthesisUtterance(text);
  // You can choose a female voice
  const voices = window.speechSynthesis.getVoices();
  const femaleVoice = voices.find(v => v.name.toLowerCase().includes("female")) || voices[0];
  utterance.voice = femaleVoice;
  utterance.pitch = 1.2;   // slightly higher pitch
  utterance.rate = 1;      // normal speed
  window.speechSynthesis.speak(utterance);
}
