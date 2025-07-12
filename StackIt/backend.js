// StackIt Backend API Simulation
class StackItBackend {
  constructor() {
    this.users = new Map()
    this.questions = new Map()
    this.answers = new Map()
    this.votes = new Map()
    this.sessions = new Map()

    this.initializeDatabase()
  }

  initializeDatabase() {
    // Initialize with demo data
    const demoUser = {
      id: 1,
      username: "demo_user",
      email: "demo@stackit.com",
      password: this.hashPassword("password"),
      reputation: 1250,
      role: "user",
      createdAt: new Date("2024-01-01"),
      isActive: true,
      profile: {
        bio: "Full-stack developer passionate about React and Node.js",
        location: "San Francisco, CA",
        website: "https://example.com",
        avatar: null,
      },
    }

    const adminUser = {
      id: 2,
      username: "admin",
      email: "admin@stackit.com",
      password: this.hashPassword("admin123"),
      reputation: 5000,
      role: "admin",
      createdAt: new Date("2023-12-01"),
      isActive: true,
      profile: {
        bio: "Platform administrator",
        location: "Remote",
        website: null,
        avatar: null,
      },
    }

    this.users.set(1, demoUser)
    this.users.set(2, adminUser)

    // Initialize demo questions
    this.initializeDemoQuestions()
  }

  initializeDemoQuestions() {
    const questions = [
      {
        id: 1,
        title: "How to implement JWT authentication in React?",
        content:
          "I'm building a React application and need to implement JWT authentication. What's the best approach for handling tokens, storing them securely, and managing user sessions?",
        authorId: 1,
        tags: ["React", "JWT", "Authentication", "JavaScript"],
        votes: 45,
        views: 1234,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        isActive: true,
        acceptedAnswerId: 1,
      },
      {
        id: 2,
        title: "Best practices for React component optimization?",
        content:
          "My React app is getting slow with large lists. What are the best practices for optimizing React components and improving performance?",
        authorId: 1,
        tags: ["React", "Performance", "Optimization", "JavaScript"],
        votes: 38,
        views: 987,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        isActive: true,
        acceptedAnswerId: null,
      },
    ]

    questions.forEach((q) => this.questions.set(q.id, q))

    // Initialize demo answers
    const answer = {
      id: 1,
      questionId: 1,
      content:
        "Here's a comprehensive approach to JWT authentication in React:\n\n1. **Token Storage**: Store JWT tokens in httpOnly cookies for security\n2. **Axios Interceptors**: Use interceptors to automatically attach tokens\n3. **Protected Routes**: Create a PrivateRoute component\n4. **Token Refresh**: Implement automatic token refresh",
      authorId: 2,
      votes: 32,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isActive: true,
    }

    this.answers.set(1, answer)
  }

  // Authentication Methods
  async register(userData) {
    const { username, email, password } = userData

    // Validate input
    if (!username || !email || !password) {
      throw new Error("All fields are required")
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long")
    }

    // Check if user already exists
    for (const user of this.users.values()) {
      if (user.email === email) {
        throw new Error("Email already registered")
      }
      if (user.username === username) {
        throw new Error("Username already taken")
      }
    }

    // Create new user
    const userId = this.users.size + 1
    const newUser = {
      id: userId,
      username,
      email,
      password: this.hashPassword(password),
      reputation: 0,
      role: "user",
      createdAt: new Date(),
      isActive: true,
      profile: {
        bio: "",
        location: "",
        website: "",
        avatar: null,
      },
    }

    this.users.set(userId, newUser)

    // Create session
    const token = this.generateToken(userId)
    this.sessions.set(token, {
      userId,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    })

    return {
      user: this.sanitizeUser(newUser),
      token,
    }
  }

  async login(email, password) {
    // Find user by email
    let user = null
    for (const u of this.users.values()) {
      if (u.email === email) {
        user = u
        break
      }
    }

    if (!user) {
      throw new Error("Invalid credentials")
    }

    if (!user.isActive) {
      throw new Error("Account is suspended")
    }

    // Verify password
    if (!this.verifyPassword(password, user.password)) {
      throw new Error("Invalid credentials")
    }

    // Create session
    const token = this.generateToken(user.id)
    this.sessions.set(token, {
      userId: user.id,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    })

    return {
      user: this.sanitizeUser(user),
      token,
    }
  }

  async logout(token) {
    this.sessions.delete(token)
    return { success: true }
  }

  async validateToken(token) {
    const session = this.sessions.get(token)
    if (!session) {
      throw new Error("Invalid token")
    }

    if (session.expiresAt < new Date()) {
      this.sessions.delete(token)
      throw new Error("Token expired")
    }

    const user = this.users.get(session.userId)
    if (!user || !user.isActive) {
      throw new Error("User not found or inactive")
    }

    return this.sanitizeUser(user)
  }

  // Question Methods
  async getQuestions(filters = {}) {
    let questions = Array.from(this.questions.values())
      .filter((q) => q.isActive)
      .map((q) => this.enrichQuestion(q))

    // Apply filters
    if (filters.tag) {
      questions = questions.filter((q) => q.tags.some((tag) => tag.toLowerCase().includes(filters.tag.toLowerCase())))
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      questions = questions.filter(
        (q) => q.title.toLowerCase().includes(searchTerm) || q.content.toLowerCase().includes(searchTerm),
      )
    }

    // Sort questions
    const sortBy = filters.sort || "newest"
    switch (sortBy) {
      case "oldest":
        questions.sort((a, b) => a.createdAt - b.createdAt)
        break
      case "votes":
        questions.sort((a, b) => b.votes - a.votes)
        break
      case "answers":
        questions.sort((a, b) => b.answerCount - a.answerCount)
        break
      case "views":
        questions.sort((a, b) => b.views - a.views)
        break
      default: // newest
        questions.sort((a, b) => b.createdAt - a.createdAt)
    }

    return questions
  }

  async getQuestion(questionId) {
    const question = this.questions.get(Number.parseInt(questionId))
    if (!question || !question.isActive) {
      throw new Error("Question not found")
    }

    // Increment view count
    question.views++

    return this.enrichQuestion(question)
  }

  async createQuestion(questionData, userId) {
    const { title, content, tags } = questionData

    // Validate input
    if (!title || !content || !tags || tags.length === 0) {
      throw new Error("Title, content, and tags are required")
    }

    if (tags.length > 5) {
      throw new Error("Maximum 5 tags allowed")
    }

    // Create question
    const questionId = this.questions.size + 1
    const newQuestion = {
      id: questionId,
      title,
      content,
      authorId: userId,
      tags,
      votes: 0,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      acceptedAnswerId: null,
    }

    this.questions.set(questionId, newQuestion)

    return this.enrichQuestion(newQuestion)
  }

  async updateQuestion(questionId, questionData, userId) {
    const question = this.questions.get(Number.parseInt(questionId))
    if (!question || !question.isActive) {
      throw new Error("Question not found")
    }

    if (question.authorId !== userId) {
      throw new Error("Unauthorized")
    }

    // Update question
    Object.assign(question, questionData, {
      updatedAt: new Date(),
    })

    return this.enrichQuestion(question)
  }

  async deleteQuestion(questionId, userId) {
    const question = this.questions.get(Number.parseInt(questionId))
    if (!question) {
      throw new Error("Question not found")
    }

    const user = this.users.get(userId)
    if (question.authorId !== userId && user.role !== "admin") {
      throw new Error("Unauthorized")
    }

    question.isActive = false
    return { success: true }
  }

  // Answer Methods
  async getAnswers(questionId) {
    const answers = Array.from(this.answers.values())
      .filter((a) => a.questionId === Number.parseInt(questionId) && a.isActive)
      .map((a) => this.enrichAnswer(a))
      .sort((a, b) => {
        // Accepted answer first, then by votes
        if (a.isAccepted && !b.isAccepted) return -1
        if (!a.isAccepted && b.isAccepted) return 1
        return b.votes - a.votes
      })

    return answers
  }

  async createAnswer(answerData, userId) {
    const { questionId, content } = answerData

    // Validate input
    if (!content) {
      throw new Error("Content is required")
    }

    // Check if question exists
    const question = this.questions.get(Number.parseInt(questionId))
    if (!question || !question.isActive) {
      throw new Error("Question not found")
    }

    // Create answer
    const answerId = this.answers.size + 1
    const newAnswer = {
      id: answerId,
      questionId: Number.parseInt(questionId),
      content,
      authorId: userId,
      votes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    }

    this.answers.set(answerId, newAnswer)

    return this.enrichAnswer(newAnswer)
  }

  async acceptAnswer(answerId, userId) {
    const answer = this.answers.get(Number.parseInt(answerId))
    if (!answer || !answer.isActive) {
      throw new Error("Answer not found")
    }

    const question = this.questions.get(answer.questionId)
    if (question.authorId !== userId) {
      throw new Error("Only question author can accept answers")
    }

    // Remove previous accepted answer
    if (question.acceptedAnswerId) {
      // Previous accepted answer is no longer accepted
    }

    question.acceptedAnswerId = Number.parseInt(answerId)

    return this.enrichAnswer(answer)
  }

  // Voting Methods
  async voteQuestion(questionId, userId, direction) {
    const question = this.questions.get(Number.parseInt(questionId))
    if (!question || !question.isActive) {
      throw new Error("Question not found")
    }

    if (question.authorId === userId) {
      throw new Error("Cannot vote on your own question")
    }

    const voteKey = `question_${questionId}_${userId}`
    const existingVote = this.votes.get(voteKey)

    if (existingVote) {
      if (existingVote.direction === direction) {
        // Remove vote
        this.votes.delete(voteKey)
        question.votes += existingVote.direction === "up" ? -1 : 1
      } else {
        // Change vote
        existingVote.direction = direction
        question.votes += direction === "up" ? 2 : -2
      }
    } else {
      // New vote
      this.votes.set(voteKey, {
        userId,
        targetType: "question",
        targetId: Number.parseInt(questionId),
        direction,
        createdAt: new Date(),
      })
      question.votes += direction === "up" ? 1 : -1
    }

    return { votes: question.votes }
  }

  async voteAnswer(answerId, userId, direction) {
    const answer = this.answers.get(Number.parseInt(answerId))
    if (!answer || !answer.isActive) {
      throw new Error("Answer not found")
    }

    if (answer.authorId === userId) {
      throw new Error("Cannot vote on your own answer")
    }

    const voteKey = `answer_${answerId}_${userId}`
    const existingVote = this.votes.get(voteKey)

    if (existingVote) {
      if (existingVote.direction === direction) {
        // Remove vote
        this.votes.delete(voteKey)
        answer.votes += existingVote.direction === "up" ? -1 : 1
      } else {
        // Change vote
        existingVote.direction = direction
        answer.votes += direction === "up" ? 2 : -2
      }
    } else {
      // New vote
      this.votes.set(voteKey, {
        userId,
        targetType: "answer",
        targetId: Number.parseInt(answerId),
        direction,
        createdAt: new Date(),
      })
      answer.votes += direction === "up" ? 1 : -1
    }

    return { votes: answer.votes }
  }

  // Admin Methods
  async getUsers(filters = {}) {
    const user = this.users.get(filters.requestUserId)
    if (!user || user.role !== "admin") {
      throw new Error("Admin access required")
    }

    return Array.from(this.users.values())
      .map((u) => this.sanitizeUser(u))
      .sort((a, b) => b.createdAt - a.createdAt)
  }

  async suspendUser(userId, adminUserId) {
    const admin = this.users.get(adminUserId)
    if (!admin || admin.role !== "admin") {
      throw new Error("Admin access required")
    }

    const user = this.users.get(Number.parseInt(userId))
    if (!user) {
      throw new Error("User not found")
    }

    user.isActive = false
    return this.sanitizeUser(user)
  }

  async getAnalytics(adminUserId) {
    const admin = this.users.get(adminUserId)
    if (!admin || admin.role !== "admin") {
      throw new Error("Admin access required")
    }

    const totalUsers = this.users.size
    const activeUsers = Array.from(this.users.values()).filter((u) => u.isActive).length
    const totalQuestions = this.questions.size
    const totalAnswers = this.answers.size

    return {
      users: {
        total: totalUsers,
        active: activeUsers,
        new: Math.floor(totalUsers * 0.1), // Mock 10% new users
      },
      questions: {
        total: totalQuestions,
        today: Math.floor(totalQuestions * 0.05), // Mock 5% today
      },
      answers: {
        total: totalAnswers,
        today: Math.floor(totalAnswers * 0.08), // Mock 8% today
      },
      engagement: {
        dailyActiveUsers: Math.floor(activeUsers * 0.3),
        averageQuestionsPerDay: Math.floor(totalQuestions / 30),
        averageAnswersPerDay: Math.floor(totalAnswers / 30),
      },
    }
  }

  // Helper Methods
  enrichQuestion(question) {
    const author = this.users.get(question.authorId)
    const answers = Array.from(this.answers.values()).filter((a) => a.questionId === question.id && a.isActive)

    return {
      ...question,
      author: this.sanitizeUser(author),
      answerCount: answers.length,
      hasAcceptedAnswer: question.acceptedAnswerId !== null,
      answers: answers.map((a) => this.enrichAnswer(a)),
    }
  }

  enrichAnswer(answer) {
    const author = this.users.get(answer.authorId)
    const question = this.questions.get(answer.questionId)

    return {
      ...answer,
      author: this.sanitizeUser(author),
      isAccepted: question.acceptedAnswerId === answer.id,
    }
  }

  sanitizeUser(user) {
    if (!user) return null

    const { password, ...sanitized } = user
    return sanitized
  }

  hashPassword(password) {
    // In a real app, use bcrypt or similar
    return "hashed_" + password
  }

  verifyPassword(password, hashedPassword) {
    // In a real app, use bcrypt.compare
    return hashedPassword === "hashed_" + password
  }

  generateToken(userId) {
    // In a real app, use JWT
    return "token_" + userId + "_" + Date.now()
  }
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = StackItBackend
} else {
  window.StackItBackend = StackItBackend
}

