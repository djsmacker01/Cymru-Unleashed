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
                <button class="chatbot-send">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        `;

    // Create chat button
    const chatButton = document.createElement("button");
    chatButton.className = "chatbot-button";
    chatButton.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
    `;

    // Add elements to the page
    document.body.appendChild(this.chatContainer);
    document.body.appendChild(chatButton);

    // Store references
    this.chatMessages = this.chatContainer.querySelector(".chatbot-messages");
    this.chatInput = this.chatContainer.querySelector(".chatbot-input");
    this.sendButton = this.chatContainer.querySelector(".chatbot-send");

    // Add initial welcome message
    this.addMessage("Hello! How can I help you today?", "bot");
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
    if (this.isOpen) {
      this.chatInput.focus();
    }
  }

  formatTimestamp() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
        body: JSON.stringify({
          chatInput: message,
        }),
      });

      // console.log("rES", response.output);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error(
          `Server error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      this.addMessage(
        data.output ||
          "Thank you for your message. Please call us at 07459253102 for immediate assistance.",
        "bot"
      );
    } catch (error) {
      console.error("Chatbot API error:", error);
      let errorMessage = "We're having trouble connecting to our chat system. ";

      if (error.message.includes("500")) {
        errorMessage += "Our chat service is temporarily unavailable. ";
      } else if (error.message.includes("404")) {
        errorMessage += "The chat service endpoint could not be found. ";
      } else if (error.message.includes("403")) {
        errorMessage += "Access to the chat service is currently restricted. ";
      }

      errorMessage += "Please call us at 07459253102 for immediate assistance.";
      this.addMessage(errorMessage, "bot");
    }
  }

  addMessage(text, sender) {
    const messageElement = document.createElement("div");
    messageElement.className = `chatbot-message ${sender}-message`;

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";
    messageContent.textContent = text;

    const timestamp = document.createElement("div");
    timestamp.className = "message-timestamp";
    timestamp.textContent = this.formatTimestamp();

    messageElement.appendChild(messageContent);
    messageElement.appendChild(timestamp);

    this.chatMessages.appendChild(messageElement);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }
}

// Initialize chatbot
window.chatbot = new Chatbot();
