class Chatbot {
  constructor() {
    this.chatContainer = null;
    this.chatMessages = null;
    this.chatInput = null;
    this.sendButton = null;
    this.isOpen = false;
    // Use direct n8n URL since CORS is configured for cymruunleashed.com
    this.n8nUrl =
      "https://djsmacker.app.n8n.cloud/webhook/ac9919d2-7cb8-411a-91e4-96d024bf3b0a/chat";

    // Initialize immediately if DOM is already loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    // Create chat container
    this.createChatUI();
    this.setupEventListeners();

    // Set initial state
    this.chatContainer.style.display = "none";
  }

  createChatUI() {
    // Create main container
    this.chatContainer = document.createElement("div");
    this.chatContainer.className = "chatbot-container";
    this.chatContainer.innerHTML = `
            <div class="chatbot-header">
                <h3>Cymru Unleashed Chat</h3>
                <button class="chatbot-minimize">−</button>
            </div>
            <div class="chatbot-messages"></div>
            <div class="chatbot-input-container">
                <input type="text" class="chatbot-input" placeholder="Type your message...">
                <button class="chatbot-send">Send</button>
            </div>
        `;

    // Create chat button
    const chatButton = document.createElement("button");
    chatButton.className = "chatbot-button";
    chatButton.innerHTML = "💬";

    // Add elements to the page
    document.body.appendChild(this.chatContainer);
    document.body.appendChild(chatButton);

    // Store references
    this.chatMessages = this.chatContainer.querySelector(".chatbot-messages");
    this.chatInput = this.chatContainer.querySelector(".chatbot-input");
    this.sendButton = this.chatContainer.querySelector(".chatbot-send");
  }

  setupEventListeners() {
    // Toggle chat window
    document
      .querySelector(".chatbot-button")
      .addEventListener("click", () => this.toggleChat());
    document
      .querySelector(".chatbot-minimize")
      .addEventListener("click", () => this.toggleChat());

    // Send message
    this.sendButton.addEventListener("click", () => this.sendMessage());
    this.chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.sendMessage();
      }
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    this.chatContainer.style.display = this.isOpen ? "flex" : "none";
  }

  async sendMessage() {
    const message = this.chatInput.value.trim();
    if (!message) return;

    // Add user message to chat
    this.addMessage(message, "user");
    this.chatInput.value = "";

    try {
      const response = await fetch(this.n8nUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      this.addMessage(
        data.response ||
          "Thank you for your message. Please call us at 07459253102 for immediate assistance.",
        "bot"
      );
    } catch (error) {
      console.error("Chatbot API error:", error);
      if (error.message.includes("500")) {
        this.addMessage(
          "We're currently experiencing technical difficulties with our chat system. Please call us at 07459253102 for immediate assistance.",
          "bot"
        );
      } else {
        this.addMessage(
          "We're having trouble connecting to our chat system. Please call us at 07459253102 for immediate assistance.",
          "bot"
        );
      }
    }
  }

  addMessage(text, sender) {
    const messageElement = document.createElement("div");
    messageElement.className = `chatbot-message ${sender}-message`;
    messageElement.textContent = text;
    this.chatMessages.appendChild(messageElement);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }
}

// Initialize chatbot
window.chatbot = new Chatbot();
