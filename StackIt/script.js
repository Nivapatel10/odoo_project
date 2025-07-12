"use client"

// StackIt - Q&A Platform JavaScript
class StackItApp {
  constructor() {
    this.currentUser = null
    this.questions = []
    this.selectedTags = []
    this.currentQuestionId = null
    this.isAuthenticated = false

    this.init()
  }

  init() {
    this.loadMockData()
    this.setupEventListeners()
    this.checkAuthStatus()
    this.loadQuestions()
    this.loadPopularTags()
    this.updateNotificationBadge()
  }

  // Authentication Methods
  checkAuthStatus() {
    const token = localStorage.getItem("stackit_token")
    const user = localStorage.getItem("stackit_user")

    if (token && user) {
      this.currentUser = JSON.parse(user)
      this.isAuthenticated = true
      this.updateUIForAuthenticatedUser()
    } else {
      this.updateUIForGuestUser()
    }
  }

  updateUIForAuthenticatedUser() {
    const userMenuBtn = document.getElementById("userMenuBtn")
    const authSwitchText = document.getElementById("authSwitchText")

    if (userMenuBtn) {
      userMenuBtn.innerHTML = `<i class="fas fa-user"></i>`
      userMenuBtn.title = this.currentUser.username
    }

    if (authSwitchText) {
      authSwitchText.textContent = `Welcome back, ${this.currentUser.username}!`
    }
  }

  updateUIForGuestUser() {
    const userMenuBtn = document.getElementById("userMenuBtn")
    if (userMenuBtn) {
      userMenuBtn.innerHTML = `<i class="fas fa-sign-in-alt"></i>`
      userMenuBtn.title = "Sign In"
    }
  }

  async signIn(email, password) {
    this.showLoading()

    try {
      // Simulate API call
      await this.delay(1000)

      // Mock authentication
      if (email === "demo@stackit.com" && password === "password") {
        const user = {
          id: 1,
          username: "demo_user",
          email: email,
          reputation: 1250,
          avatar: null,
        }

        const token = "mock_jwt_token_" + Date.now()

        localStorage.setItem("stackit_token", token)
        localStorage.setItem("stackit_user", JSON.stringify(user))

        this.currentUser = user
        this.isAuthenticated = true
        this.updateUIForAuthenticatedUser()

        this.showToast("success", "Welcome back!", "You have been signed in successfully.")
        this.showHome()

        return { success: true }
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      this.showToast("error", "Sign In Failed", error.message)
      return { success: false, error: error.message }
    } finally {
      this.hideLoading()
    }
  }

  async signUp(userData) {
    this.showLoading()

    try {
      // Simulate API call
      await this.delay(1500)

      // Mock user creation
      const user = {
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        reputation: 0,
        avatar: null,
      }

      const token = "mock_jwt_token_" + Date.now()

      localStorage.setItem("stackit_token", token)
      localStorage.setItem("stackit_user", JSON.stringify(user))

      this.currentUser = user
      this.isAuthenticated = true
      this.updateUIForAuthenticatedUser()

      this.showToast("success", "Account Created!", "Welcome to StackIt community!")
      this.showHome()

      return { success: true }
    } catch (error) {
      this.showToast("error", "Sign Up Failed", error.message)
      return { success: false, error: error.message }
    } finally {
      this.hideLoading()
    }
  }

  logout() {
    localStorage.removeItem("stackit_token")
    localStorage.removeItem("stackit_user")

    this.currentUser = null
    this.isAuthenticated = false
    this.updateUIForGuestUser()

    this.showToast("info", "Signed Out", "You have been signed out successfully.")
    this.showHome()
  }

  // Navigation Methods
  showHome() {
    this.hideAllPages()
    document.getElementById("homePage").classList.add("active")
    this.loadQuestions()
  }

  showAuth() {
    this.hideAllPages()
    document.getElementById("authPage").classList.add("active")
  }

  showAskQuestion() {
    if (!this.isAuthenticated) {
      this.showToast("warning", "Sign In Required", "Please sign in to ask a question.")
      this.showAuth()
      return
    }

    this.hideAllPages()
    document.getElementById("askQuestionPage").classList.add("active")
    this.resetAskForm()
  }

  showQuestion(questionId) {
    this.hideAllPages()
    document.getElementById("questionDetailPage").classList.add("active")
    this.currentQuestionId = questionId
    this.loadQuestionDetail(questionId)
  }

  showAdmin() {
    if (!this.isAuthenticated || this.currentUser.role !== "admin") {
      this.showToast("error", "Access Denied", "Admin access required.")
      return
    }

    this.hideAllPages()
    document.getElementById("adminPage").classList.add("active")
    this.loadAdminData()
  }

  showProfile() {
    if (!this.isAuthenticated) {
      this.showToast("warning", "Sign In Required", "Please sign in to view your profile.")
      this.showAuth()
      return
    }

    this.showToast("info", "Coming Soon", "Profile page is under development.")
  }

  hideAllPages() {
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("active")
    })
  }

  // Data Loading Methods
  loadMockData() {
    this.questions = [
      {
        id: 1,
        title: "How to implement JWT authentication in React?",
        content:
          "I'm building a React application and need to implement JWT authentication. What's the best approach for handling tokens, storing them securely, and managing user sessions?",
        author: {
          id: 1,
          username: "john_doe",
          reputation: 1250,
          avatar: null,
        },
        tags: ["React", "JWT", "Authentication", "JavaScript"],
        votes: 45,
        answers: 8,
        views: 1234,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        accepted: true,
        answers: [
          {
            id: 1,
            content:
              "Here's a comprehensive approach to JWT authentication in React:\n\n1. **Token Storage**: Store JWT tokens in httpOnly cookies for security\n2. **Axios Interceptors**: Use interceptors to automatically attach tokens\n3. **Protected Routes**: Create a PrivateRoute component\n4. **Token Refresh**: Implement automatic token refresh\n\n```javascript\n// Example implementation\nconst useAuth = () => {\n  const [user, setUser] = useState(null);\n  \n  const login = async (credentials) => {\n    const response = await api.post('/auth/login', credentials);\n    setUser(response.data.user);\n  };\n  \n  return { user, login };\n};\n```",
            author: {
              id: 2,
              username: "sarah_chen",
              reputation: 2840,
              avatar: null,
            },
            votes: 32,
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            accepted: true,
          },
        ],
      },
      {
        id: 2,
        title: "Best practices for React component optimization?",
        content:
          "My React app is getting slow with large lists. What are the best practices for optimizing React components and improving performance?",
        author: {
          id: 3,
          username: "mike_wilson",
          reputation: 890,
          avatar: null,
        },
        tags: ["React", "Performance", "Optimization", "JavaScript"],
        votes: 38,
        answers: 12,
        views: 987,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        accepted: false,
      },
      {
        id: 3,
        title: "How to handle async operations in Redux?",
        content:
          "I'm confused about handling asynchronous operations in Redux. Should I use Redux Thunk, Redux Saga, or something else?",
        author: {
          id: 4,
          username: "alex_dev",
          reputation: 567,
          avatar: null,
        },
        tags: ["Redux", "Async", "JavaScript", "State Management"],
        votes: 23,
        answers: 5,
        views: 654,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        accepted: false,
      },
    ]

    this.popularTags = [
      { name: "React", count: 1234 },
      { name: "JavaScript", count: 2345 },
      { name: "Node.js", count: 987 },
      { name: "CSS", count: 876 },
      { name: "HTML", count: 765 },
      { name: "Python", count: 654 },
      { name: "TypeScript", count: 543 },
      { name: "Redux", count: 432 },
    ]
  }

  loadQuestions() {
    const questionsList = document.getElementById("questionsList")
    const questionCount = document.getElementById("questionCount")

    if (!questionsList) return

    questionCount.textContent = `${this.questions.length} questions`

    questionsList.innerHTML = this.questions
      .map(
        (question) => `
            <div class="question-card fade-in" onclick="app.showQuestion(${question.id})">
                <div class="question-header">
                    <div class="question-stats">
                        <div class="vote-section">
                            <button class="vote-btn" onclick="event.stopPropagation(); app.voteQuestion(${question.id}, 'up')">
                                <i class="fas fa-chevron-up"></i>
                            </button>
                            <span class="vote-count">${question.votes}</span>
                            <button class="vote-btn" onclick="event.stopPropagation(); app.voteQuestion(${question.id}, 'down')">
                                <i class="fas fa-chevron-down"></i>
                            </button>
                        </div>
                        <div class="answer-stats ${question.accepted ? "has-accepted" : ""}">
                            <span class="answer-count">${question.answers}</span>
                            <span class="answer-label">answers</span>
                        </div>
                        <div class="view-count">
                            <i class="fas fa-eye"></i>
                            <span>${question.views}</span>
                        </div>
                    </div>
                    <div class="question-content">
                        <h3 class="question-title">${question.title}</h3>
                        <p class="question-excerpt">${question.content.substring(0, 150)}...</p>
                        <div class="question-tags">
                            ${question.tags.map((tag) => `<span class="tag" onclick="event.stopPropagation(); app.filterByTag('${tag}')">${tag}</span>`).join("")}
                        </div>
                        <div class="question-meta">
                            <div class="question-author">
                                <div class="author-avatar">${question.author.username.charAt(0).toUpperCase()}</div>
                                <span>${question.author.username}</span>
                                <span class="author-reputation">${question.author.reputation}</span>
                            </div>
                            <div class="question-time">
                                <i class="fas fa-clock"></i>
                                <span>${this.formatTimeAgo(question.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }

  loadQuestionDetail(questionId) {
    const question = this.questions.find((q) => q.id === questionId)
    if (!question) return

    const questionDetail = document.getElementById("questionDetail")
    const answersSection = document.getElementById("answersSection")

    questionDetail.innerHTML = `
            <div class="question-detail-header">
                <div class="question-voting">
                    <button class="vote-button" onclick="app.voteQuestion(${question.id}, 'up')">
                        <i class="fas fa-chevron-up"></i>
                    </button>
                    <span class="vote-score">${question.votes}</span>
                    <button class="vote-button" onclick="app.voteQuestion(${question.id}, 'down')">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <button class="bookmark-btn" onclick="app.bookmarkQuestion(${question.id})">
                        <i class="fas fa-bookmark"></i>
                    </button>
                </div>
                <div class="question-detail-content">
                    <h1 class="question-detail-title">${question.title}</h1>
                    <div class="question-detail-meta">
                        <div class="meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>Asked ${this.formatTimeAgo(question.createdAt)}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-eye"></i>
                            <span>Viewed ${question.views} times</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-chart-line"></i>
                            <span>Active today</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="question-detail-body">
                ${this.formatContent(question.content)}
            </div>
            <div class="question-detail-tags">
                ${question.tags.map((tag) => `<span class="tag" onclick="app.filterByTag('${tag}')">${tag}</span>`).join("")}
            </div>
            <div class="question-detail-footer">
                <div class="question-actions">
                    <button class="action-btn" onclick="app.shareQuestion(${question.id})">
                        <i class="fas fa-share"></i>
                        Share
                    </button>
                    <button class="action-btn" onclick="app.followQuestion(${question.id})">
                        <i class="fas fa-bell"></i>
                        Follow
                    </button>
                    ${
                      this.isAuthenticated && this.currentUser.id === question.author.id
                        ? `
                        <button class="action-btn" onclick="app.editQuestion(${question.id})">
                            <i class="fas fa-edit"></i>
                            Edit
                        </button>
                    `
                        : ""
                    }
                </div>
                <div class="question-author-info">
                    <div class="author-avatar-large">${question.author.username.charAt(0).toUpperCase()}</div>
                    <div class="author-details">
                        <div class="author-name">${question.author.username}</div>
                        <div class="author-reputation">${question.author.reputation} reputation</div>
                    </div>
                </div>
            </div>
        `

    // Load answers
    if (question.answers && question.answers.length > 0) {
      answersSection.innerHTML = `
                <div class="answers-header">
                    <h2>${question.answers.length} Answer${question.answers.length !== 1 ? "s" : ""}</h2>
                    <select class="sort-select">
                        <option value="votes">Highest score (default)</option>
                        <option value="oldest">Date created (oldest first)</option>
                        <option value="newest">Date created (newest first)</option>
                    </select>
                </div>
                ${question.answers
                  .map(
                    (answer) => `
                    <div class="answer-card ${answer.accepted ? "accepted" : ""}">
                        <div class="answer-header">
                            <div class="answer-voting">
                                <button class="vote-button" onclick="app.voteAnswer(${answer.id}, 'up')">
                                    <i class="fas fa-chevron-up"></i>
                                </button>
                                <span class="vote-score">${answer.votes}</span>
                                <button class="vote-button" onclick="app.voteAnswer(${answer.id}, 'down')">
                                    <i class="fas fa-chevron-down"></i>
                                </button>
                                ${answer.accepted ? '<div class="accepted-badge"><i class="fas fa-check"></i></div>' : ""}
                            </div>
                            <div class="answer-content">
                                ${this.formatContent(answer.content)}
                            </div>
                        </div>
                        <div class="answer-footer">
                            <div class="question-actions">
                                <button class="action-btn" onclick="app.shareAnswer(${answer.id})">
                                    <i class="fas fa-share"></i>
                                    Share
                                </button>
                                ${
                                  this.isAuthenticated && this.currentUser.id === question.author.id && !answer.accepted
                                    ? `
                                    <button class="action-btn" onclick="app.acceptAnswer(${answer.id})">
                                        <i class="fas fa-check"></i>
                                        Accept
                                    </button>
                                `
                                    : ""
                                }
                            </div>
                            <div class="question-author-info">
                                <div class="author-avatar-large">${answer.author.username.charAt(0).toUpperCase()}</div>
                                <div class="author-details">
                                    <div class="author-name">${answer.author.username}</div>
                                    <div class="author-reputation">${answer.author.reputation} reputation</div>
                                </div>
                            </div>
                        </div>
                        <div class="comments-section">
                            <div class="comment">
                                <div class="comment-content">Great explanation! This helped me understand the concept better.</div>
                                <div class="comment-meta">– user123 • 2 hours ago</div>
                            </div>
                            <button class="add-comment-btn">Add a comment</button>
                        </div>
                    </div>
                `,
                  )
                  .join("")}
            `
    } else {
      answersSection.innerHTML = `
                <div class="answers-header">
                    <h2>0 Answers</h2>
                    <p>Be the first to answer this question!</p>
                </div>
            `
    }
  }

  loadPopularTags() {
    const popularTags = document.getElementById("popularTags")
    if (!popularTags) return

    popularTags.innerHTML = this.popularTags
      .map(
        (tag) => `
            <div class="tag-item" onclick="app.filterByTag('${tag.name}')">
                <span class="tag-name">${tag.name}</span>
                <span class="tag-count">${tag.count}</span>
            </div>
        `,
      )
      .join("")
  }

  // Question and Answer Actions
  async voteQuestion(questionId, direction) {
    if (!this.isAuthenticated) {
      this.showToast("warning", "Sign In Required", "Please sign in to vote.")
      return
    }

    const question = this.questions.find((q) => q.id === questionId)
    if (question) {
      question.votes += direction === "up" ? 1 : -1
      this.loadQuestions()
      this.showToast("success", "Vote Recorded", `Your ${direction}vote has been recorded.`)
    }
  }

  async voteAnswer(answerId, direction) {
    if (!this.isAuthenticated) {
      this.showToast("warning", "Sign In Required", "Please sign in to vote.")
      return
    }

    this.showToast("success", "Vote Recorded", `Your ${direction}vote has been recorded.`)
  }

  async acceptAnswer(answerId) {
    if (!this.isAuthenticated) {
      this.showToast("warning", "Sign In Required", "Please sign in to accept answers.")
      return
    }

    this.showToast("success", "Answer Accepted", "The answer has been marked as accepted.")
    this.loadQuestionDetail(this.currentQuestionId)
  }

  async bookmarkQuestion(questionId) {
    if (!this.isAuthenticated) {
      this.showToast("warning", "Sign In Required", "Please sign in to bookmark questions.")
      return
    }

    this.showToast("success", "Bookmarked", "Question has been added to your bookmarks.")
  }

  // Ask Question Methods
  resetAskForm() {
    document.getElementById("questionTitle").value = ""
    document.getElementById("editor").innerHTML = ""
    document.getElementById("tagInput").value = ""
    this.selectedTags = []
    this.updateSelectedTags()
  }

  addTag() {
    const tagInput = document.getElementById("tagInput")
    const tag = tagInput.value.trim()

    if (tag && !this.selectedTags.includes(tag) && this.selectedTags.length < 5) {
      this.selectedTags.push(tag)
      this.updateSelectedTags()
      tagInput.value = ""
    }
  }

  addSuggestedTag(tag) {
    if (!this.selectedTags.includes(tag) && this.selectedTags.length < 5) {
      this.selectedTags.push(tag)
      this.updateSelectedTags()
    }
  }

  removeTag(tag) {
    this.selectedTags = this.selectedTags.filter((t) => t !== tag)
    this.updateSelectedTags()
  }

  updateSelectedTags() {
    const selectedTagsContainer = document.getElementById("selectedTags")
    const addTagBtn = document.querySelector(".add-tag-btn")

    selectedTagsContainer.innerHTML = this.selectedTags
      .map(
        (tag) => `
            <span class="selected-tag">
                ${tag}
                <button type="button" class="remove-tag" onclick="app.removeTag('${tag}')">
                    <i class="fas fa-times"></i>
                </button>
            </span>
        `,
      )
      .join("")

    addTagBtn.disabled = this.selectedTags.length >= 5
  }

  async submitQuestion(formData) {
    if (!this.isAuthenticated) {
      this.showToast("warning", "Sign In Required", "Please sign in to ask a question.")
      return
    }

    this.showLoading()

    try {
      await this.delay(1000)

      const newQuestion = {
        id: Date.now(),
        title: formData.title,
        content: formData.content,
        author: this.currentUser,
        tags: this.selectedTags,
        votes: 0,
        answers: 0,
        views: 0,
        createdAt: new Date(),
        accepted: false,
      }

      this.questions.unshift(newQuestion)

      this.showToast("success", "Question Posted!", "Your question has been posted successfully.")
      this.showHome()
    } catch (error) {
      this.showToast("error", "Error", "Failed to post question. Please try again.")
    } finally {
      this.hideLoading()
    }
  }

  async submitAnswer(content) {
    if (!this.isAuthenticated) {
      this.showToast("warning", "Sign In Required", "Please sign in to post an answer.")
      return
    }

    this.showLoading()

    try {
      await this.delay(1000)

      const question = this.questions.find((q) => q.id === this.currentQuestionId)
      if (question) {
        if (!question.answers) question.answers = []

        const newAnswer = {
          id: Date.now(),
          content: content,
          author: this.currentUser,
          votes: 0,
          createdAt: new Date(),
          accepted: false,
        }

        question.answers.push(newAnswer)
        question.answers = question.answers.length
      }

      this.showToast("success", "Answer Posted!", "Your answer has been posted successfully.")
      this.loadQuestionDetail(this.currentQuestionId)

      // Clear the answer form
      document.getElementById("answerEditor").innerHTML = ""
    } catch (error) {
      this.showToast("error", "Error", "Failed to post answer. Please try again.")
    } finally {
      this.hideLoading()
    }
  }

  // Rich Text Editor Methods
  execCommand(command, value = null) {
    document.execCommand(command, false, value)
    document.getElementById("editor").focus()
  }

  insertLink() {
    const url = prompt("Enter URL:")
    if (url) {
      this.execCommand("createLink", url)
    }
  }

  insertImage() {
    const url = prompt("Enter image URL:")
    if (url) {
      this.execCommand("insertImage", url)
    }
  }

  insertEmoji() {
    const emojis = ["😀", "😂", "😍", "🤔", "👍", "👎", "❤️", "🔥", "💯", "🎉"]
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    this.execCommand("insertText", emoji)
  }

  switchEditorTab(tab) {
    const writeTab = document.querySelector('.tab-btn[onclick*="write"]')
    const previewTab = document.querySelector('.tab-btn[onclick*="preview"]')
    const editor = document.getElementById("editor")
    const preview = document.getElementById("preview")

    if (tab === "write") {
      writeTab.classList.add("active")
      previewTab.classList.remove("active")
      editor.style.display = "block"
      preview.style.display = "none"
    } else {
      writeTab.classList.remove("active")
      previewTab.classList.add("active")
      editor.style.display = "none"
      preview.style.display = "block"
      preview.innerHTML = this.formatContent(editor.innerHTML)
    }
  }

  // Authentication UI Methods
  switchAuthTab(tab) {
    const signinForm = document.getElementById("signinForm")
    const signupForm = document.getElementById("signupForm")
    const signinTab = document.querySelector('.tab-btn[onclick*="signin"]')
    const signupTab = document.querySelector('.tab-btn[onclick*="signup"]')

    if (tab === "signin") {
      signinForm.classList.add("active")
      signupForm.classList.remove("active")
      signinTab.classList.add("active")
      signupTab.classList.remove("active")
    } else {
      signinForm.classList.remove("active")
      signupForm.classList.add("active")
      signinTab.classList.remove("active")
      signupTab.classList.add("active")
    }
  }

  togglePassword(inputId) {
    const input = document.getElementById(inputId)
    const button = input.nextElementSibling
    const icon = button.querySelector("i")

    if (input.type === "password") {
      input.type = "text"
      icon.classList.remove("fa-eye")
      icon.classList.add("fa-eye-slash")
    } else {
      input.type = "password"
      icon.classList.remove("fa-eye-slash")
      icon.classList.add("fa-eye")
    }
  }

  switchAuthMode() {
    const signinForm = document.getElementById("signinForm")
    const isSigninActive = signinForm.classList.contains("active")

    if (isSigninActive) {
      this.switchAuthTab("signup")
    } else {
      this.switchAuthTab("signin")
    }
  }

  // Admin Panel Methods
  loadAdminData() {
    // This would typically load data from the backend
    this.showToast("info", "Admin Panel", "Admin panel loaded successfully.")
  }

  switchAdminTab(tab) {
    // Remove active class from all tabs and content
    document.querySelectorAll(".admin-tab-btn").forEach((btn) => btn.classList.remove("active"))
    document.querySelectorAll(".admin-tab").forEach((content) => content.classList.remove("active"))

    // Add active class to selected tab and content
    document.querySelector(`.admin-tab-btn[onclick*="${tab}"]`).classList.add("active")
    document.getElementById(`${tab}Tab`).classList.add("active")
  }

  // Utility Methods
  formatTimeAgo(date) {
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) return "just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`

    return date.toLocaleDateString()
  }

  formatContent(content) {
    // Basic markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/\n/g, "<br>")
  }

  filterByTag(tag) {
    this.showToast("info", "Filter Applied", `Showing questions tagged with "${tag}"`)
    // Implement tag filtering logic
  }

  updateNotificationBadge() {
    const badge = document.getElementById("notificationBadge")
    if (badge) {
      badge.textContent = "3" // Mock notification count
    }
  }

  // UI Helper Methods
  showLoading() {
    document.getElementById("loadingOverlay").classList.add("show")
  }

  hideLoading() {
    document.getElementById("loadingOverlay").classList.remove("show")
  }

  showToast(type, title, message) {
    const toastContainer = document.getElementById("toastContainer")
    const toastId = "toast_" + Date.now()

    const toast = document.createElement("div")
    toast.className = `toast ${type}`
    toast.id = toastId
    toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${this.getToastIcon(type)}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="app.closeToast('${toastId}')">
                <i class="fas fa-times"></i>
            </button>
        `

    toastContainer.appendChild(toast)

    // Show toast
    setTimeout(() => toast.classList.add("show"), 100)

    // Auto remove after 5 seconds
    setTimeout(() => this.closeToast(toastId), 5000)
  }

  closeToast(toastId) {
    const toast = document.getElementById(toastId)
    if (toast) {
      toast.classList.remove("show")
      setTimeout(() => toast.remove(), 300)
    }
  }

  getToastIcon(type) {
    const icons = {
      success: "fa-check",
      error: "fa-times",
      warning: "fa-exclamation-triangle",
      info: "fa-info",
    }
    return icons[type] || "fa-info"
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // Event Listeners Setup
  setupEventListeners() {
    // Navigation events
    document.getElementById("askQuestionBtn")?.addEventListener("click", () => this.showAskQuestion())
    document.getElementById("userMenuBtn")?.addEventListener("click", this.toggleUserMenu.bind(this))
    document.getElementById("notificationBtn")?.addEventListener("click", this.toggleNotifications.bind(this))

    // Search functionality
    document.getElementById("searchInput")?.addEventListener("input", this.handleSearch.bind(this))

    // Ask question form
    document.getElementById("askQuestionForm")?.addEventListener("submit", this.handleAskQuestion.bind(this))
    document.getElementById("tagInput")?.addEventListener("keypress", this.handleTagInput.bind(this))

    // Answer form
    document.getElementById("answerForm")?.addEventListener("submit", this.handleAnswerSubmit.bind(this))

    // Authentication forms
    document.querySelector(".login-form")?.addEventListener("submit", this.handleSignIn.bind(this))
    document.querySelector(".signup-form")?.addEventListener("submit", this.handleSignUp.bind(this))

    // Editor toolbar events
    document.querySelectorAll(".editor-btn[data-command]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault()
        this.execCommand(btn.dataset.command)
      })
    })

    // Close dropdowns when clicking outside
    document.addEventListener("click", this.handleOutsideClick.bind(this))

    // Keyboard shortcuts
    document.addEventListener("keydown", this.handleKeyboardShortcuts.bind(this))
  }

  toggleUserMenu() {
    const dropdown = document.getElementById("userDropdown")
    dropdown.classList.toggle("show")
  }

  toggleNotifications() {
    const dropdown = document.getElementById("notificationDropdown")
    dropdown.classList.toggle("show")
  }

  handleSearch(e) {
    const query = e.target.value.toLowerCase()
    if (query.length > 2) {
      // Implement search functionality
      this.showToast("info", "Search", `Searching for "${query}"`)
    }
  }

  handleAskQuestion(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const title = formData.get("title") || document.getElementById("questionTitle").value
    const content = document.getElementById("editor").innerHTML

    if (!title.trim()) {
      this.showToast("error", "Validation Error", "Please enter a question title.")
      return
    }

    if (!content.trim()) {
      this.showToast("error", "Validation Error", "Please enter a question description.")
      return
    }

    if (this.selectedTags.length === 0) {
      this.showToast("error", "Validation Error", "Please add at least one tag.")
      return
    }

    this.submitQuestion({ title, content })
  }

  handleTagInput(e) {
    if (e.key === "Enter") {
      e.preventDefault()
      this.addTag()
    }
  }

  handleAnswerSubmit(e) {
    e.preventDefault()

    const content = document.getElementById("answerEditor").innerHTML

    if (!content.trim()) {
      this.showToast("error", "Validation Error", "Please enter your answer.")
      return
    }

    this.submitAnswer(content)
  }

  handleSignIn(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const email = formData.get("email") || document.getElementById("signinEmail").value
    const password = formData.get("password") || document.getElementById("signinPassword").value

    if (!email || !password) {
      this.showToast("error", "Validation Error", "Please fill in all fields.")
      return
    }

    this.signIn(email, password)
  }

  handleSignUp(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const username = formData.get("username") || document.getElementById("signupUsername").value
    const email = formData.get("email") || document.getElementById("signupEmail").value
    const password = formData.get("password") || document.getElementById("signupPassword").value
    const confirmPassword = formData.get("confirmPassword") || document.getElementById("confirmPassword").value

    if (!username || !email || !password || !confirmPassword) {
      this.showToast("error", "Validation Error", "Please fill in all fields.")
      return
    }

    if (password !== confirmPassword) {
      this.showToast("error", "Validation Error", "Passwords do not match.")
      return
    }

    if (password.length < 8) {
      this.showToast("error", "Validation Error", "Password must be at least 8 characters long.")
      return
    }

    this.signUp({ username, email, password })
  }

  handleOutsideClick(e) {
    // Close user dropdown
    const userDropdown = document.getElementById("userDropdown")
    const userMenuBtn = document.getElementById("userMenuBtn")
    if (userDropdown && !userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
      userDropdown.classList.remove("show")
    }

    // Close notification dropdown
    const notificationDropdown = document.getElementById("notificationDropdown")
    const notificationBtn = document.getElementById("notificationBtn")
    if (notificationDropdown && !notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
      notificationDropdown.classList.remove("show")
    }
  }

  handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault()
      document.getElementById("searchInput")?.focus()
    }

    // Escape to close modals/dropdowns
    if (e.key === "Escape") {
      document.getElementById("userDropdown")?.classList.remove("show")
      document.getElementById("notificationDropdown")?.classList.remove("show")
    }
  }
}

// Global functions for HTML onclick events
function showHome() {
  app.showHome()
}
function showAuth() {
  app.showAuth()
}
function showProfile() {
  app.showProfile()
}
function showAdmin() {
  app.showAdmin()
}
function logout() {
  app.logout()
}
function switchAuthTab(tab) {
  app.switchAuthTab(tab)
}
function switchAuthMode() {
  app.switchAuthMode()
}
function togglePassword(inputId) {
  app.togglePassword(inputId)
}
function switchEditorTab(tab) {
  app.switchEditorTab(tab)
}
function insertLink() {
  app.insertLink()
}
function insertImage() {
  app.insertImage()
}
function insertEmoji() {
  app.insertEmoji()
}
function addTag() {
  app.addTag()
}
function addSuggestedTag(tag) {
  app.addSuggestedTag(tag)
}
function switchAdminTab(tab) {
  app.switchAdminTab(tab)
}

// Initialize the app when DOM is loaded
let app
document.addEventListener("DOMContentLoaded", () => {
  app = new StackItApp()
})

// Demo credentials helper
console.log("Demo credentials:")
console.log("Email: demo@stackit.com")
console.log("Password: password")
