"use client"

export default function MessagesSection({ users, startChat }) {
  return (
    <div className="bg-white rounded-b-md rounded-t-none shadow-md p-2 mb-6 card-hover border-2 border-pink-200">
      <h2 className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600 mb-4">
        Messages
      </h2>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between py-3 border-b last:border-b-0 hover:bg-pink-50 cursor-pointer transition-all duration-300"
          onClick={() => startChat(user.id)}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt=""
                className="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-110 border-2 border-transparent hover:border-pink-300"
              />
              {user.isOnline && (
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white pulse"></div>
              )}
            </div>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-gray-500">Last message: Hi there!</p>
            </div>
          </div>
          <div className="text-gray-500 text-sm">2 hours ago</div>
        </div>
      ))}
    </div>
  )
}
