// frontend/app.js

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatBox = document.getElementById("chat-box");
const micButton = document.getElementById("mic-button"); // microphone button

// Replace with your Render backend URL
const BACKEND_URL = "https://lumoraai-oi4j.onrender.com/chat";

// Speech recognition setup
let recognition;
if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = "en-GB";
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const spokenText = event.results[0][0].transcript;
    chatInput.value = spokenText;
    sendMessage(spokenText);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };
} else {
  console.warn("Speech recognition not supported in this browser.");
}

// Handle form submit (typed messages)
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;
  sendMessage(message);
  chatInput.value = "";
});

// Handle microphone button click
if (micButton && recognition) {
  micButton.addEventListener("click", () => {
    recognition.start();
  });
}

// Send message to backend
async function sendMessage(message) {
  appendMessage("You", message);

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
      speakText(data.reply); // voice output
    } else {
      appendMessage("Lumora", "No reply received.");
    }
  } catch (err) {
    console.error(err);
    appendMessage("Lumora", "Error connecting to server.");
  }
}

// Append chat messages to chat box
function appendMessage(sender, text) {
  const messageEl = document.createElement("div");
  messageEl.classList.add("chat-message");
  messageEl.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(messageEl);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Speak text using female voice
function speakText(text) {
  if (!("speechSynthesis" in window)) return;

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const femaleVoice = voices.find(v => v.name.toLowerCase().includes("female")) || voices[0];
  utterance.voice = femaleVoice;
  utterance.pitch = 1.2;   // slightly higher pitch
  utterance.rate = 1;      // normal speed
  window.speechSynthesis.speak(utterance);
}
