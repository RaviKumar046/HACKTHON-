function toggleTheme() {
      document.body.classList.toggle('dark-mode');
      document.body.classList.toggle('light-mode');
    }

    function appendMessage(text, isUser) {
      const chatBox = document.getElementById('chat-box');
      const msg = document.createElement('div');
      msg.textContent = text;
      msg.style.margin = "10px";
      msg.style.padding = "10px";
      msg.style.borderRadius = "8px";
      msg.style.maxWidth = "70%";
      msg.style.wordWrap = "break-word";
      msg.style.background = isUser ? "#007bff" : "#e5e5ea";
      msg.style.color = isUser ? "white" : "black";
      msg.style.alignSelf = isUser ? "flex-end" : "flex-start";
      chatBox.appendChild(msg);
      chatBox.scrollTop = chatBox.scrollHeight; // Auto scroll down
    }

    async function sendMessage() {
      const userInput = document.getElementById('user-input');
      const message = userInput.value.trim();
      if (!message) return;

      appendMessage(message, true);
      userInput.value = '';
      document.getElementById('status').textContent = 'AI is thinking...';

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }]
          },
          {
            headers: {
              'Authorization': 'AIzaSyBdEqKyF-iuTTtiD7NdXWyedlV3ZBDsbZY',   //we have not extra time to do in backend.
              'Content-Type': 'application/json'
            }
          }
        );

        const aiResponse = response.data.choices[0].message.content;
        appendMessage(aiResponse, false);
        document.getElementById('status').textContent = 'AI is ready';
      } catch (error) {
        console.error('Error:', error);
        document.getElementById('status').textContent = 'Error occurred';
      }
    }

    document.getElementById('user-input').addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        sendMessage();
      }
    });
 