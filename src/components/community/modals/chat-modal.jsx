"use client"

import { useState } from "react"
import { X, Send } from "lucide-react"

export default function ChatModal({ activeChatUser, users, chats, closeChat, sendChatMessage, formatDate }) {
  const [message, setMessage] = useState("")
  const user = users.find((u) => u.id === activeChatUser)
  const chatMessages = chats[activeChatUser] || []

  const handleSendMessage = async () => {
    if (!message.trim()) return
    await sendChatMessage(activeChatUser, message)
    setMessage("")
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fade-in">
      <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-2xl w-full max-w-md p-6 flex flex-col h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-indigo-800 text-lg">
            Chat with {user?.name || "User"}
          </h3>
          <button
            onClick={closeChat}
            aria-label="Close chat"
            className="text-gray-500 hover:text-red-500 transition-colors duration-300 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-100 rounded-lg">
          {chatMessages.length === 0 ? (
            <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
          ) : (
            chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 flex ${
                  msg.senderId === 1 ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.senderId === 1
                      ? "bg-indigo-500 text-white"
                      : "bg-white text-gray-800 border"
                  }`}
                >
                  <p>{msg.message}</p>
                  <span className="text-xs text-gray-400 block mt-1">
                    {formatDate(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all duration-300"
            aria-label="Type a message"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}