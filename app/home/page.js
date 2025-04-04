'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import axios from 'axios'; // Make sure you have Axios installed
import styles from './home.module.css';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle sending the message
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Send the user message to your Express backend
      const response = await axios.post('http://localhost:3001/analyze', { userMessage: input });

      // Get the AI's response (drug info)
      const aiResponse = { 
        text: response.data.response.replace(/\n/g, '<br />'), // Replace `\n` with `<br />`
        sender: 'ai' 
      };
      
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      // Handle any errors (e.g., network issues, backend errors)
      const errorResponse = { text: 'Sorry, there was an error processing your request.', sender: 'ai' };
      setMessages((prevMessages) => [...prevMessages, errorResponse]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter Key Press to send the message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.container}>
      {/* Chat Messages Area */}
      <div className={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${msg.sender === 'user' ? styles.userMessage : styles.aiMessage}`}
            dangerouslySetInnerHTML={{ __html: msg.text }} // Render HTML (line breaks)
          />
        ))}
        {loading && <div className={styles.typing}>AI is typing...</div>}
      </div>

      {/* Message Input Box */}
      <div className={styles.inputContainer}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '800px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress} // Added Enter key functionality
            className={styles.inputBox}
            placeholder="Type a message..."
          />
          <button onClick={handleSend} className={styles.sendButton}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
