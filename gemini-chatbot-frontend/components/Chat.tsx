"use client";

import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { TokenData } from "@/api-interface/userInfoDto";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Message {
  conversationId: string;
  userId: string;
  interactionId: string;
  content: string;
  isUser: boolean;
  messageId?: string;
}

interface ChatProps {
  userData: TokenData;
}

function Chat({ userData }: ChatProps) {
  const [newMessage, setNewMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const conversationId = uuidv4();
  const userId = userData.userId;

  const { data } = useQuery<any>({
    queryKey: ["chatHistory", userId],
    queryFn: async () => {
      const response = await axios.get<any>(`api/message/get/${userId}`);
      return response.data.msg;
    },
  });

  const { mutate: saveUserMessage, isLoading: saveUserMessageLoading } =
    useMutation<any, any, Message>({
      mutationFn: async (message: Message) => {
        return await axios.post("api/message/save", message);
      },
      onSuccess: ({ data }) => {
        getBotResponse(data.msg);
      },
      onError: ({ data }) => {},
    });

  const { mutate: getBotResponse, isLoading: botResponseLoading } = useMutation<
    any,
    any,
    Message
  >({
    mutationFn: async (message: Message) => {
      return await axios.post("api/message/bot", message);
    },
    onSuccess: ({ data }) => {
      setChatHistory((prevHistory) => [...prevHistory, data.msg]);
    },
    onError: ({ data }) => {},
  });

  useEffect(() => {
    setChatHistory(data ?? []);
  }, [data]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleChat = () => {
    if (newMessage.trim()) {
      const newChatData = {
        conversationId,
        userId,
        interactionId: uuidv4(),
        content: newMessage,
        isUser: true,
      };
      setChatHistory((prevHistory) => [...prevHistory, newChatData]); // Append new message
      setNewMessage("");
      saveUserMessage(newChatData);
    }
  };

  // Function to parse bot response content and display appropriately
  const parseBotResponse = (content: string) => {
    const lines = content.split("\n");
    const formattedContent = lines.map((line, index) => {
      if (line.startsWith("```")) {
        const language = line.replace(/```/g, "").trim();
        return (
          <SyntaxHighlighter
            key={index}
            language={language}
            style={vscDarkPlus}
          >
            {lines.slice(index + 1).join("\n")}
          </SyntaxHighlighter>
        );
      } else {
        return <p key={index}>{line}</p>;
      }
    });
    return formattedContent;
  };

  return (
    <div className="bg-gray-900 text-white">
      <h1 className="text-center py-2 text-xl fixed top-0 left-0 right-0 z-10 bg-gray-900">
        Hello, {userData.firstName}
      </h1>
      <div className="container mx-auto py-8">
        <div className="lg:max-w-2xl md:max-w-xl sm:max-w-lg mx-auto mt-8 max-w-sm">
          <div
            className="h-screen mt-[-1rem] mb-1rem overflow-y-auto"
            ref={chatContainerRef}
          >
            <div className="flex flex-col space-y-4 pb-20">
              {/* Chat messages */}
              {chatHistory &&
                chatHistory.map((message: Message, index: number) => (
                  <div key={index} className="flex flex-col items-start">
                    <span>
                      {message.isUser ? userData.firstName : "Gemini AI"}
                    </span>
                    <div className="bg-gray-800 bg-opacity-75 rounded-xl p-6 shadow-lg shadow-gray-700/5">
                      {/* Display bot response content */}
                      {message.isUser ? (
                        <p className="text-white text-sm">{message.content}</p>
                      ) : (
                        parseBotResponse(message.content)
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* Input field */}
        <div className="fixed bottom-0 left-0 right-0 p-4 shadow-md shadow-gray-700/10 mb-5">
          <div className="flex items-center justify-between max-w-2xl mx-auto ">
            <input
              type="text"
              value={newMessage}
              placeholder="Type your message..."
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-gray-800 bg-opacity-75 outline-none text-white w-full p-2 ml-2 rounded-full py-2 px-4 border focus:outline-none border-white mr-3"
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full py-2 px-4 transition ease-in-out duration-150 outline-none"
              onClick={handleChat}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
