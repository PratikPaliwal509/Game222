"use client"

import { MessageCircle } from "lucide-react"

export default function UserListSection({ users, startChat, toggleFollow, isFollowing }) {
  return (
    <div className="bg-white rounded-b-md rounded-t-none shadow-md p-4 mb-6 card-hover fade-in border-2 border-purple-200">
      <h2 className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-4">
        User List
      </h2>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between py-3 border-b last:border-b-0 hover:bg-indigo-50 cursor-pointer transition-all duration-300"
          onClick={() => startChat(user.id)}
        >
          <div className="flex items-center space-x-3">
            <img
              src={user.avatar || "/placeholder.svg"}
              alt=""
              className="w-10 h-10 rounded-full border-2 border-transparent hover:border-indigo-300 transition-all duration-300"
            />
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-gray-500">Followers: {user.followers}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFollow(user.id)
              }}
              className={`px-2 py-1 rounded-lg text-xs transition-all duration-300 ${
                isFollowing(user.id)
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105"
                  : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 hover:scale-105"
              }`}
            >
              {isFollowing(user.id) ? "Unfollow" : "Follow"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                startChat(user.id)
              }}
              className="px-2 py-1 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600 transition-colors duration-300 hover:scale-110"
            >
              <MessageCircle className="h-3 w-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
