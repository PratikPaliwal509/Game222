import { useState } from "react"

// Mock data for the community
const initialUsers = [
  { id: 1, name: "Alex", avatar: "/avatars/alex.jpg", coins: 1500, followers: 120, isOnline: true, xp: 3200 },
  { id: 2, name: "Bella", avatar: "/avatars/bella.jpg", coins: 2200, followers: 200, isOnline: false, xp: 4500 },
  { id: 3, name: "Charlie", avatar: "/avatars/charlie.jpg", coins: 900, followers: 80, isOnline: true, xp: 1800 },
]

const initialPosts = [
  {
    id: 1,
    userId: 1,
    content: "Just won a Chess match! 🏆",
    timestamp: "2025-05-17T10:00:00+05:30",
    likes: [2],
    comments: [{ id: 1, userId: 2, content: "Great job!", timestamp: "2025-05-17T10:05:00+05:30" }],
  },
  {
    id: 2,
    userId: 2,
    content: "Anyone up for a Poker game tonight?",
    timestamp: "2025-05-17T11:30:00+05:30",
    likes: [1, 3],
    comments: [],
  },
]

const initialEvents = [
  {
    id: 1,
    title: "Chess Tournament",
    date: "2025-05-18",
    time: "14:00",
    description: "Join us for a competitive Chess tournament!",
    location: "Online",
    participants: [1, 2],
    timestamp: "2025-05-16T09:00:00+05:30",
  },
]

const initialAnnouncements = [
  {
    id: 1,
    title: "New Feature Released",
    content: "We’ve added game scheduling! Try it out.",
    timestamp: "2025-05-15T12:00:00+05:30",
  },
]

const initialPlayerStats = {
  1: { wins: 10, losses: 5, gamesPlayed: 15 },
  2: { wins: 15, losses: 3, gamesPlayed: 18 },
  3: { wins: 7, losses: 8, gamesPlayed: 15 },
}

const initialAchievements = [
  { id: 1, name: "Chess Master", category: "Victories", description: "Win 10 Chess games", icon: "🏆" },
  { id: 2, name: "Social Butterfly", category: "Social", description: "Gain 100 followers", icon: "🦋" },
]

const initialUserBadges = {
  1: [1], // Alex has Chess Master badge
  2: [1, 2], // Bella has Chess Master and Social Butterfly badges
  3: [], // Charlie has no badges
}

const initialGameOptions = [
  { id: 1, name: "Chess" },
  { id: 2, name: "Poker" },
  { id: 3, name: "Racing" },
  { id: 4, name: "Puzzle" },
  { id: 5, name: "Shooter" },
]

export function useCommunityData() {
  const [users, setUsers] = useState(initialUsers)
  const [filteredUsers, setFilteredUsers] = useState(null) // For filtering users (e.g., by online status)
  const [posts, setPosts] = useState(initialPosts)
  const [playerStats] = useState(initialPlayerStats)
  const [achievements] = useState(initialAchievements)
  const [events, setEvents] = useState(initialEvents)
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const [userBadges] = useState(initialUserBadges)
  const [gameOptions] = useState(initialGameOptions)
  const [follows, setFollows] = useState({}) // e.g., { userId: [followedUserIds] }
  const [chats, setChats] = useState({}) // e.g., { userId: [{ senderId, message, timestamp }] }

  // Add a comment to a post
  const addPostComment = (postId, userId, content) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: post.comments.length + 1,
                  userId,
                  content,
                  timestamp: new Date().toISOString(), // e.g., "2025-05-17T01:36:00+05:30"
                },
              ],
            }
          : post
      )
    )
  }

  // Toggle like on a post
  const toggleLikePost = (postId, userId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likes.includes(userId)
                ? post.likes.filter((id) => id !== userId)
                : [...post.likes, userId],
            }
          : post
      )
    )
  }

  // Create a new post
  const createPost = (postData) => {
    const newPost = {
      id: posts.length + 1,
      userId: postData.userId || 1, // Default to user 1 (Alex) for demo
      content: postData.content,
      timestamp: new Date().toISOString(),
      likes: [],
      comments: [],
    }
    setPosts((prevPosts) => [newPost, ...prevPosts])
    return Promise.resolve(newPost) // Simulate async operation
  }

  // Send a game invite (simulated)
  const sendGameInvite = (userId, gameId) => {
    console.log(`Game invite sent to user ${userId} for game ${gameId}`)
    return Promise.resolve() // Simulate async operation
  }

  // Toggle follow/unfollow
  const toggleFollow = (followerId, followeeId) => {
    setFollows((prevFollows) => {
      const followerList = prevFollows[followerId] || []
      const isCurrentlyFollowing = followerList.includes(followeeId)
      const updatedList = isCurrentlyFollowing
        ? followerList.filter((id) => id !== followeeId)
        : [...followerList, followeeId]

      // Update followers count for the followee
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === followeeId
            ? { ...user, followers: isCurrentlyFollowing ? user.followers - 1 : user.followers + 1 }
            : user
        )
      )

      return {
        ...prevFollows,
        [followerId]: updatedList,
      }
    })
  }

  // Check if a user is following another user
  const isFollowing = (followerId, followeeId) => {
    return (follows[followerId] || []).includes(followeeId)
  }

  // Start a chat (initialize if not exists)
  const startChat = (userId) => {
    if (!chats[userId]) {
      setChats((prevChats) => ({
        ...prevChats,
        [userId]: [],
      }))
    }
    return userId // Return the userId for the chat
  }

  // Send a chat message
  const sendChatMessage = (userId, message) => {
    setChats((prevChats) => ({
      ...prevChats,
      [userId]: [
        ...(prevChats[userId] || []),
        {
          senderId: 1, // Default to user 1 (Alex) for demo
          message,
          timestamp: new Date().toISOString(),
        },
      ],
    }))
    return Promise.resolve() // Simulate async operation
  }

  // Format a date relative to the current date (01:36 PM IST, May 17, 2025)
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date() // 2025-05-17T01:36:00+05:30
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) {
      return `${diffMins} min${diffMins === 1 ? "" : "s"} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }
  }

  // Get user level based on XP
  const getUserLevel = (userId) => {
    const user = users.find((u) => u.id === userId)
    if (!user) return 1
    return Math.floor(user.xp / 1000) + 1 // 1000 XP per level
  }

  // Get user XP
  const getUserXP = (userId) => {
    const user = users.find((u) => u.id === userId)
    return user ? user.xp : 0
  }

  return {
    users,
    filteredUsers,
    posts,
    playerStats,
    achievements,
    events,
    announcements,
    userBadges,
    gameOptions,
    addPostComment,
    toggleLikePost,
    createPost,
    sendGameInvite,
    toggleFollow,
    isFollowing,
    startChat,
    sendChatMessage,
    formatDate,
    getUserLevel,
    getUserXP,
    // Expose chats for use in ChatModal
    chats,
  }
}