import React, { useState } from "react";

const AIChatbot = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
  const API_KEY = "AIzaSyBFLw6kLl13WrYAWEjFG9gm5sWpT5YyrYo"; // ⚠️ Don't expose API keys in frontend apps!

  const sendMessage = async () => {
    if (!inputText) return;

    const userMessage = { sender: "User", text: inputText };
    setMessages([...messages, userMessage]);

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: inputText }] }],
        }),
      });

      const data = await response.json();
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";

      setMessages([...messages, userMessage, { sender: "AI", text: botReply }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([...messages, { sender: "AI", text: "Error: Unable to fetch response." }]);
    }

    setInputText(""); // Clear input field after sending
  };

  return (
    <div style={{ maxWidth: "20rem", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
      <h2>AI Chatbot</h2>
      <div style={{ height: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === "User" ? "right" : "left", margin: "5px 0" }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your message..."
        style={{ width: "80%", padding: "10px" }}
      />
      <button onClick={sendMessage} style={{ width: "18%", padding: "10px", marginLeft: "5px" }}>
        Send
      </button>
    </div>
  );
};

export default AIChatbot;
