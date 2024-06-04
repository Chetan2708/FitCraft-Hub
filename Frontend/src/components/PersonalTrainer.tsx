import React, { useState } from "react";
import { Button } from "../utils/components/ui/button";

const PersonalTrainer: React.FC = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { sender: string; message: string }[]
  >([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    // Add the user's message to the chat history
    const newMessage = { sender: "User", message: input };
    setChatHistory([...chatHistory, newMessage]);

    // Clear the input field
    setInput("");

    // Simulate sending the message to OpenAI and receiving a reply
    const openAIResponse = await getOpenAIResponse(input);

    // Add OpenAI's reply to the chat history
    const openAIMessage = { sender: "OpenAI", message: openAIResponse };
    setChatHistory((prevChatHistory) => [...prevChatHistory, openAIMessage]);
  };

  const getOpenAIResponse = async (message: string): Promise<string> => {
    // Here you would send the message to your server which interacts with OpenAI API
    // For now, we will simulate an OpenAI response with a static message
    // Replace the following line with your API call logic
    return new Promise((resolve) =>
      setTimeout(() => resolve("This is a reply from OpenAI"), 1000)
    );
  };

  return (
   
    <div className="p-2 flex flex-col items-center gap-4">
     <h1 className="text-2xl font-semibold mb-2  ">Personal Trainer</h1>
   <div className=" overflow-y-scroll min-h-screen border-2 border-black  rounded-2xl w-full min-w-[280px]  md:text-2xl">
   <div>
  {chatHistory.map((chat, index) => (
    <div
      key={index}
      className={`flex ${
        chat.sender === 'User' ? 'justify-end mb-4 mr-4' : 'justify-start mb-4 ml-4'
      }`}
    >

      <div
        className={`${
          chat.sender === 'User'
            ? 'bg-primary text-white rounded-l-2xl rounded-br-2xl'
            : 'bg-gray-300 rounded-r-2xl rounded-bl-2xl'
        } p-4 max-w-[70%]`}
      >
        {chat.message}
      </div>
    </div>
  ))}
</div>


     <div className="bg-white flex px-1 py-1 rounded-full border border-blue-500 overflow-hidden  mx-auto font-[sans-serif] ">

     <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="w-full outline-none bg-white pl-4 text-sm" 
          placeholder="Type your message..."
          />
          <Button 
          className="bg-primary transition-all text-white text-sm rounded-full px-5 py-2.5" onClick={handleSendMessage}>Send</Button>
          </div>
   </div>
   </div>
  );
};

export default PersonalTrainer;
