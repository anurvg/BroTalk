window.onload = () => {
  const loader = document.getElementById('loader');
  const loginScreen = document.querySelector('.login-screen');
  const chatScreen = document.querySelector('.chat-screen');
  const loginBtn = document.getElementById('loginBtn');
  const chatBox = document.getElementById('chatBox');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const voiceBtn = document.getElementById('voiceBtn');
  const backBtn = document.getElementById('backBtn');

  setTimeout(() => {
    loader.classList.add('hidden');
    loginScreen.classList.remove('hidden');
  }, 2000);

  loginBtn.onclick = () => {
    loginScreen.classList.add('hidden');
    chatScreen.classList.remove('hidden');
  };

  function addMessage(text, sender = 'user') {
    const msg = document.createElement('div');
    msg.classList.add(sender === 'user' ? 'user-msg' : 'bot-msg');
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  const responses = {
    "hi": "Hey! How are you feeling today?",
    "good": "That's great to hear!",
    "sad": "I'm here for you. Want to talk about it?",
    "how are you": "I'm just a bot, but I care about you.",
    "hello": "Hi there! Let's talk.",
    "i feel down": "It's okay to feel that way. I'm listening."
  };

  sendBtn.onclick = () => {
    const input = chatInput.value.toLowerCase();
    if (!input) return;
    addMessage(chatInput.value);
    chatInput.value = "";
    setTimeout(() => {
      const reply = responses[input] || "I'm still learning. But I'm here.";
      addMessage(reply, 'bot');
    }, 1000);
  };

  voiceBtn.onclick = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();
    recognition.onresult = function(e) {
      chatInput.value = e.results[0][0].transcript;
    };
  };

  backBtn.onclick = () => {
    chatScreen.classList.add('hidden');
    loginScreen.classList.remove('hidden');
  };
};
