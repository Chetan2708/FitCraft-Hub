import React, { useState } from 'react';

const PersonalTrainer: React.FC = () => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: string, message: string }[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    // Add the user's message to the chat history
    const newMessage = { sender: 'User', message: input };
    setChatHistory([...chatHistory, newMessage]);

    // Clear the input field
    setInput('');

    // Simulate sending the message to OpenAI and receiving a reply
    const openAIResponse = await getOpenAIResponse(input);

    // Add OpenAI's reply to the chat history
    const openAIMessage = { sender: 'OpenAI', message: openAIResponse };
    setChatHistory(prevChatHistory => [...prevChatHistory, openAIMessage]);
  };

  const getOpenAIResponse = async (message: string): Promise<string> => {
    // Here you would send the message to your server which interacts with OpenAI API
    // For now, we will simulate an OpenAI response with a static message
    // Replace the following line with your API call logic
    return new Promise(resolve => setTimeout(() => resolve("This is a reply from OpenAI"), 1000));
  };

  return (
    <div style={{ width: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>Personal Trainer Chat</h2>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
        {chatHistory.map((chat, index) => (
          <div key={index} style={{ textAlign: chat.sender === 'User' ? 'right' : 'left' }}>
            <strong>{chat.sender}: </strong>{chat.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        style={{ width: '80%', padding: '10px', marginRight: '5px' }}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage} style={{ width: '18%', padding: '10px' }}>Send</button>
    </div>
  );
};

export default PersonalTrainer;
