"use client"

export default function UserRankings({ users, rankingType, handleProfileClick }) {
  // Sort users based on ranking type
  const sortedUsers = [...users]
    .sort((a, b) => {
      if (rankingType === "coins") {
        return b.coins - a.coins
      } else if (rankingType === "followers") {
        return b.followers - a.followers
      }
      return 0
    })
    .slice(0, 5)

  const getStyles = () => {
    if (rankingType === "coins") {
      return {
        container: "bg-white rounded-md shadow-md overflow-hidden mb-6 card-hover border-2 border-yellow-200",
        header: "bg-gradient-to-r from-yellow-50 to-amber-50 px-4 py-2 border-b",
        title: "font-semibold text-amber-800",
        row: "hover:bg-yellow-50",
        value: "text-amber-500 font-bold flex items-center",
        icon: "🪙",
      }
    } else {
      return {
        container: "bg-white rounded-md shadow-md overflow-hidden mb-6 card-hover border-2 border-blue-200",
        header: "bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-2 border-b",
        title: "font-semibold text-purple-800",
        row: "hover:bg-purple-50",
        value: "text-purple-500 font-bold flex items-center",
        icon: "👥",
      }
    }
  }

  const styles = getStyles()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{rankingType === "coins" ? "Top Coins" : "Top Followers"}</h2>
      </div>
      <div className="divide-y">
        {sortedUsers.map((user, index) => (
          <div key={user.id} className={`flex items-center px-4 py-2 ${styles.row} transition-colors duration-300`}>
            <div className="w-8 text-center font-bold text-amber-500">
              {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
            </div>
            <div className="flex items-center flex-1">
              <div className="relative flex-shrink-0">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt=""
                  className="w-8 h-8 rounded-full mr-3 cursor-pointer transition-transform duration-300 hover:scale-110 border-2 border-transparent hover:border-amber-300"
                  onClick={() => handleProfileClick(user.id)}
                />
                {user.isOnline && (
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white pulse"></div>
                )}
              </div>
              <span className="font-medium">{user.name}</span>
            </div>
            <div className={styles.value}>
              {rankingType === "coins" ? user.coins.toLocaleString() : user.followers.toLocaleString()}
              <span className="ml-1">{styles.icon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
