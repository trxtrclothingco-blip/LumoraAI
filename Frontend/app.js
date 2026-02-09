let voiceEnabled = true;

async function sendMessage() {
  const input = document.getElementById("input");
  const message = input.value;
  if (!message) return;

  append("You", message);
  input.value = "";

  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: "peter", // change if you want multiple identities
      message
    })
  });

  const data = await res.json();
  append("Lumora", data.reply);

  if (voiceEnabled) speak(data.reply);
}

function append(sender, text) {
  document.getElementById("chat").innerHTML +=
    `<p><b>${sender}:</b> ${text}</p>`;
}

/* 🔊 TEXT TO SPEECH */
function speak(text) {
  const u = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  const female = voices.find(v =>
    v.name.toLowerCase().includes("samantha") ||
    v.name.toLowerCase().includes("zira") ||
    v.name.toLowerCase().includes("female")
  );
  if (female) u.voice = female;
  speechSynthesis.speak(u);
}

/* 🎤 SPEECH TO TEXT */
function startListening() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition not supported");
    return;
  }

  const rec = new SpeechRecognition();
  rec.lang = "en-GB";
  rec.onresult = e => {
    document.getElementById("input").value =
      e.results[0][0].transcript;
    sendMessage();
  };
  rec.start();
}

function toggleVoice() {
  voiceEnabled = !voiceEnabled;
  alert(`Voice ${voiceEnabled ? "ON" : "OFF"}`);
}
