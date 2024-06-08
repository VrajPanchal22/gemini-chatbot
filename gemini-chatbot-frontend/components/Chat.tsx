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

  const { data, isLoading: gettingChatHistory } = useQuery<any>({
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

  const handleChat = async () => {
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
      try {
        await saveUserMessage(newChatData);
      } catch (error) {
        console.log("GETTING ERROR ON saveUserMessage:", error);
      }
    }
  };

  const parseBotResponse = (content: string) => {
    const blocks = content.split(/```/); // Split content by code blocks
    const formattedContent = blocks
      .map((block, index) => {
        if (index % 2 === 0) {
          // Text content
          return block
            .split("\n")
            .map((line, lineIndex) => <p key={lineIndex}>{line}</p>);
        } else {
          // Code block
          const language = block.split("\n")[0]; // Extract language from first line
          const code = block.substring(language.length + 1).trim(); // Extract code content
          return (
            <SyntaxHighlighter
              key={index}
              language={language.trim()}
              style={vscDarkPlus}
            >
              {code}
            </SyntaxHighlighter>
          );
        }
      })
      .flat(); // Flatten the array of elements

    return formattedContent;
  };

  return (
    <>
      <div className="bg-gray-900 text-white min-h-screen">
        <h1 className="text-center py-2 text-xl fixed top-0 left-0 right-0 z-10 bg-gray-900">
          Gemini AI ChatBot
        </h1>
        <div className="container mx-auto py-8">
          <div className="lg:max-w-4xl md:max-w-3xl sm:max-w-xl mx-auto mt-8">
            <div
              className="overflow-y-auto overflow-x-hidden"
              style={{ maxHeight: "calc(100vh - 150px)" }}
              ref={chatContainerRef}
            >
              <div className="flex flex-col space-y-4 ">
                {/* Chat messages */}
                {chatHistory &&
                  chatHistory.map((message: Message, index: number) => (
                    <div
                      key={index}
                      className={`flex flex-col items-${
                        message.isUser ? "start" : "end"
                      }`}
                    >
                      <span className="pl-5">
                        {message.isUser ? userData.firstName : "Gemini AI"}
                      </span>
                      <div
                        className={`m-3 rounded-xl p-6 shadow-lg shadow-gray-700/5 bg-gray-800`}
                      >
                        {/* Display bot response content */}
                        {message.isUser ? (
                          <p className="text-white text-sm">
                            {message.content}
                          </p>
                        ) : (
                          <div className="rounded-xl shadow-lg shadow-gray-700/5">
                            {parseBotResponse(message.content)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* Input field */}
          <div className="fixed bottom-0 left-0 right-0 p-4 shadow-md shadow-gray-700/10">
            <div className="max-w-4xl mx-auto ">
              <div className="flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  placeholder="Type your message..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="bg-gray-800 bg-opacity-75 outline-none text-white flex-grow p-2 ml-2 rounded-full py-2 px-4 border focus:outline-none border-white mr-3"
                />
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full py-2 px-4 transition ease-in-out duration-150 outline-none"
                  onClick={handleChat}
                >
                  {saveUserMessageLoading || botResponseLoading
                    ? "Loading"
                    : "Send"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
