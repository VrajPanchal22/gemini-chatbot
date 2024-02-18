"use client";

import React from "react";

function Chat() {
  const handleChat = () => {};

  return (
    <div className="bg-gray-900  text-white">
      <div className="container mx-auto py-8">
        <div className="lg:max-w-2xl md:max-w-xl sm:max-w-lg mx-auto mt-8 max-w-sm">
          <div className="h-screen mt-[-1rem] mb-1rem overflow-y-auto ">
            <div className="flex flex-col space-y-4">
              {/* Chat messages */}
              {/* Bot response */}
              <div className="flex justify-end">
                <div className="bg-gray-800 bg-opacity-75 rounded-xl p-6  shadow-lg shadow-gray-700/5">
                  <p className="text-white text-sm">
                    Can you help me with my query?
                  </p>
                </div>
              </div>
              {/* User input */}
              <div className="flex justify-start">
                <div className="bg-gray-800 bg-opacity-75 rounded-xl p-6  shadow-lg shadow-gray-700/5">
                  <p className="text-white  text-sm">
                    Hi there! How can I assist you today?
                  </p>
                </div>
              </div>
              {/* End of chat */}
            </div>
          </div>
        </div>
        {/* Input field */}
        <div className="fixed bottom-0 left-0 right-0 p-4 shadow-md shadow-gray-700/10 mb-5">
          <div className="flex items-center justify-between max-w-2xl mx-auto ">
            <input
              type="text"
              placeholder="Type your message..."
              className="bg-gray-800 bg-opacity-75 outline-none text-white w-full p-2 ml-2 rounded-full
              py-2 px-4 border focus:outline-none border-white mr-3"
            />
            <button
              className=" bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full py-2 px-4 transition ease-in-out duration-150 outline-none"
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
