"use client";

import React from "react";
import jwt from "jsonwebtoken";
import Cookies from "universal-cookie";

function Chat() {
  const cookies = new Cookies();
  const token = cookies.get("token");

  const data = jwt.decode(token);

  const handleChat = () => {};

  return (
    <div>
      <style jsx global>{`
        body {
          --tw-bg-opacity: 1;
          background-color: rgb(17 24 39 / var(--tw-bg-opacity));
          color: #ffffff; /* Light text color */
        }
        .chat-container {
          max-height: calc(100vh - 150px); /* Adjust height as needed */
          overflow-y: auto;
          margin-top: -1rem; /* Remove top margin */
          margin-bottom: 1rem; /* Add bottom margin */
        }
        .chat-bubble {
          max-width: 70%;
        }
        .usermsg {
          --tw-bg-opacity: 1;
          background-color: rgb(31 41 55 / var(--tw-bg-opacity));
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .usermsg p {
          color: #ffffff; /* Light text color for user messages */
          font-size: 0.875rem;
        }
        .bot-response {
          --tw-bg-opacity: 1;
          background-color: rgb(31 41 55 / var(--tw-bg-opacity));
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .bot-response p {
          color: #ffffff; /* Light text color for bot responses */
          font-size: 0.875rem;
        }
        .input-field {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
          box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.1);
        }
        .input-field input {
          --tw-bg-opacity: 1;
          background-color: rgb(31 41 55 / var(--tw-bg-opacity));
          outline: none;
          color: #ffffff;
          width: calc(100% - 3rem);
          margin-right: 1rem;
          border-radius: 9999px;
          padding: 0.75rem 1rem;
        }
        .input-field button {
          background-color: #4a90e2; /* Blue background for send button */
          border: none;
          border-radius: 9999px;
          padding: 0.75rem 1.5rem;
          color: #ffffff; /* Light text color for send button */
          font-size: 0.875rem;
          transition: background-color 0.3s ease;
          font-weight: bold;
        }
        .input-field button:hover {
          background-color: #357ae8; /* Darker blue on hover */
        }
      `}</style>
      {data ? (
        <h1 className="text-center text-2xl my-5">
          Welcome, {data?.firstName}
        </h1>
      ) : (
        ""
      )}
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          <div className="chat-container">
            <div className="flex flex-col space-y-4">
              {/* Chat messages */}
              {/* Bot response */}
              <div className="flex justify-start">
                <div className="bot-response">
                  <p>Hi there! How can I assist you today?</p>
                </div>
              </div>
              {/* User input */}
              <div className="flex justify-end">
                <div className="usermsg">
                  <p>Can you help me with my query?</p>
                </div>
              </div>
              {/* Bot response */}
              <div className="flex justify-start">
                <div className="bot-response">
                  <p>Sure! What do you need assistance with?</p>
                </div>
              </div>
              {/* User input */}
              <div className="flex justify-end">
                <div className="usermsg">
                  <p>I&apos;m having trouble logging in.</p>
                </div>
              </div>
              {/* Bot response */}
              <div className="flex justify-start">
                <div className="bot-response">
                  <p>
                    I can help you with that. Please provide me with your
                    username.
                  </p>
                </div>
              </div>
              {/* End of chat */}
            </div>
          </div>
        </div>
        {/* Input field */}
        <div className="input-field">
          <div className="flex items-center justify-between max-w-2xl mx-auto ">
            <input
              type="text"
              placeholder="Type your message..."
              className="rounded-full py-2 px-4 border focus:outline-none border-white"
            />
            <button className="py-2 px-4" onClick={handleChat}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
