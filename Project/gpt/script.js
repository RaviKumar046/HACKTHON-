const chatBox = document.getElementById("chat-box");
const statusEl = document.getElementById("status");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const clearBtn = document.getElementById("clear-btn");
const themeBtn = document.getElementById("theme-toggle");

const menuButtons = {
  newChat: document.getElementById("new-chat"),
  library: document.getElementById("library-btn"),
  sora: document.getElementById("sora-btn"),
  gpts: document.getElementById("gpts-btn"),
  upgrade: document.getElementById("upgrade-btn")
};

function appendMessage(text, isUser) {
  const msg = document.createElement("div");
  msg.className = `msg ${isUser ? "msg-user" : "msg-ai"}`;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function toggleTheme() {
  const dark = document.body.classList.toggle("theme-dark");
  document.body.classList.toggle("theme-light", !dark);
}

function setStatus(text) {
  statusEl.textContent = text;
}

function clearChat() {
  chatBox.innerHTML = "";
  setStatus("Chat cleared");
}

function fakeAiReply(message) {
  const selectedModel = document.getElementById("model-select").value;
  return `(${selectedModel}) I heard you say: ${message}`;
}

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) {
    return;
  }

  appendMessage(message, true);
  userInput.value = "";
  setStatus("AI is thinking...");

  setTimeout(() => {
    appendMessage(fakeAiReply(message), false);
    setStatus("Ready");
  }, 600);
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage();
});

clearBtn.addEventListener("click", clearChat);
themeBtn.addEventListener("click", toggleTheme);

menuButtons.newChat.addEventListener("click", () => {
  clearChat();
  appendMessage("New chat started. Ask me anything.", false);
  setStatus("Ready");
});

menuButtons.library.addEventListener("click", () => {
  appendMessage("Library is empty right now.", false);
});

menuButtons.sora.addEventListener("click", () => {
  appendMessage("Sora feature preview coming soon.", false);
});

menuButtons.gpts.addEventListener("click", () => {
  appendMessage("Custom GPTs can be added in the next iteration.", false);
});

menuButtons.upgrade.addEventListener("click", () => {
  appendMessage("Upgrade path is not connected yet.", false);
});

appendMessage("Welcome to Smart Chat. Type a message to begin.", false);
 
