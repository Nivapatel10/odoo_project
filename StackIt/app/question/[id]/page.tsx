"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowUp, ArrowDown, CheckCircle, MessageCircle, Share, Bookmark, Flag, Clock, Eye, Bell, User, Bold, Italic, List, LinkIcon, Image, Smile } from 'lucide-react'
import Link from "next/link"

export default function QuestionDetailPage({ params }: { params: { id: string } }) {
  const [questionVote, setQuestionVote] = useState(0)
  const [answerVotes, setAnswerVotes] = useState<{[key: number]: number}>({1: 0, 2: 0, 3: 0})
  const [newAnswer, setNewAnswer] = useState("")
  const [isAnswerPreview, setIsAnswerPreview] = useState(false)

  const question = {
    id: 1,
    title: "How to implement JWT authentication in React?",
    description: `I'm trying to implement JWT authentication in my React application but I'm having trouble with token storage and validation.

Here's what I've tried so far:

1. Storing the token in localStorage
2. Creating an auth context
3. Setting up protected routes

**My current code:**

\`\`\`javascript
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  const login = async (credentials) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    const data = await response.json();
    setToken(data.token);
    localStorage.setItem('token', data.token);
  };
  
  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
};
\`\`\`

**The problem:** The token seems to expire but I'm not handling the refresh properly. How should I implement automatic token refresh and handle expired tokens gracefully?

Any help would be appreciated!`,
    author: "John Doe",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    authorReputation: 1250,
    tags: ["React", "JWT", "Authentication", "JavaScript"],
    votes: 15,
    views: 127,
    timestamp: "2 hours ago",
    isBookmarked: false,
  }

  const answers = [
    {
      id: 1,
      content: `Great question! Here's a comprehensive approach to handling JWT authentication with automatic refresh:

## 1. Token Storage Strategy

Instead of just storing in localStorage, consider using httpOnly cookies for better security:

\`\`\`javascript
// Set httpOnly cookie on server
res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});
\`\`\`

## 2. Automatic Token Refresh

Create an axios interceptor to handle token refresh:

\`\`\`javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'your-api-url'
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshResponse = await axios.post('/api/refresh');
        const newToken = refreshResponse.data.accessToken;
        
        // Update token in your auth context
        setToken(newToken);
        
        // Retry original request
        error.config.headers.Authorization = \`Bearer \${newToken}\`;
        return api.request(error.config);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        logout();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
\`\`\`

## 3. Enhanced Auth Context

\`\`\`javascript
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app start
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/verify-token', {
        credentials: 'include' // Include httpOnly cookies
      });
      
      if (response.ok) {
        const data = await response.json();
        setToken(data.accessToken);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials)
    });
    
    const data = await response.json();
    setToken(data.accessToken);
  };

  const logout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ 
      token, 
      login, 
      logout, 
      isLoading,
      isAuthenticated: !!token 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
\`\`\`

This approach provides better security and handles token refresh automatically. The key improvements are:

- Using httpOnly cookies for refresh tokens
- Automatic token refresh with axios interceptors  
- Proper error handling for expired refresh tokens
- Loading states for better UX

Hope this helps! Let me know if you need clarification on any part.`,
      author: "Sarah Chen",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      authorReputation: 3450,
      votes: 23,
      timestamp: "1 hour ago",
      isAccepted: true,
      comments: [
        {
          id: 1,
          content: "This is exactly what I was looking for! The axios interceptor approach is brilliant.",
          author: "John Doe",
          timestamp: "45 minutes ago"
        },
        {
          id: 2,
          content: "Great answer! One question - should I also implement token refresh on app focus/visibility change?",
          author: "Mike Johnson",
          timestamp: "30 minutes ago"
        }
      ]
    },
    {
      id: 2,
      content: `Another approach you might consider is using a library like **react-query** or **SWR** for handling authentication state:

\`\`\`javascript
import { useQuery, useQueryClient } from 'react-query';

const useAuth = () => {
  const queryClient = useQueryClient();
  
  const { data: user, isLoading } = useQuery(
    'auth',
    async () => {
      const response = await fetch('/api/me', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Not authenticated');
      }
      
      return response.json();
    },
    {
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      onError: () => {
        // Clear auth cache on error
        queryClient.setQueryData('auth', null);
      }
    }
  );

  const login = async (credentials) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials)
    });
    
    if (response.ok) {
      // Invalidate and refetch auth query
      queryClient.invalidateQueries('auth');
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login
  };
};
\`\`\`

This approach gives you:
- Automatic background refetching
- Built-in caching and stale-while-revalidate
- Easy error handling
- Optimistic updates

Both approaches work well, choose based on your app's complexity and requirements.`,
      author: "David Kim",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      authorReputation: 2180,
      votes: 12,
      timestamp: "45 minutes ago",
      isAccepted: false,
      comments: []
    },
    {
      id: 3,
      content: `For a simpler approach, you could also use the **js-cookie** library to handle token storage more elegantly:

\`\`\`javascript
import Cookies from 'js-cookie';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get('accessToken'));

  const login = async (credentials) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    const data = await response.json();
    
    // Set token with expiration
    Cookies.set('accessToken', data.accessToken, { 
      expires: 1/24, // 1 hour
      secure: true,
      sameSite: 'strict'
    });
    
    setToken(data.accessToken);
  };

  const logout = () => {
    Cookies.remove('accessToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
\`\`\`

This is a middle-ground solution that's more secure than localStorage but simpler than the full httpOnly cookie approach.`,
      author: "Emma Wilson",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      authorReputation: 890,
      votes: 5,
      timestamp: "20 minutes ago",
      isAccepted: false,
      comments: []
    }
  ]

  const handleQuestionVote = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      setQuestionVote(questionVote === 1 ? 0 : 1)
    } else {
      setQuestionVote(questionVote === -1 ? 0 : -1)
    }
  }

  const handleAnswerVote = (answerId: number, direction: 'up' | 'down') => {
    const currentVote = answerVotes[answerId] || 0
    if (direction === 'up') {
      setAnswerVotes({...answerVotes, [answerId]: currentVote === 1 ? 0 : 1})
    } else {
      setAnswerVotes({...answerVotes, [answerId]: currentVote === -1 ? 0 : -1})
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SI</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StackIt
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white text-[10px]">
                  3
                </span>
              </Button>
              <Link href="/ask">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Ask Question
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Question */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Vote Column */}
                  <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`p-1 h-8 w-8 ${questionVote === 1 ? 'text-orange-600 bg-orange-50' : ''}`}
                      onClick={() => handleQuestionVote('up')}
                    >
                      <ArrowUp className="w-5 h-5" />
                    </Button>
                    <span className="font-bold text-xl text-gray-700">
                      {question.votes + questionVote}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`p-1 h-8 w-8 ${questionVote === -1 ? 'text-orange-600 bg-orange-50' : ''}`}
                      onClick={() => handleQuestionVote('down')}
                    >
                      <ArrowDown className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                      <Bookmark className={`w-5 h-5 ${question.isBookmarked ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    </Button>
                  </div>

                  {/* Question Content */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800 mb-3">
                        {question.title}
                      </h1>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Asked {question.timestamp}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {question.views} views
                        </div>
                      </div>
                    </div>

                    <div className="prose prose-sm max-w-none">
                      {question.description.split('\n').map((paragraph, index) => {
                        if (paragraph.startsWith('```')) {
                          return null // Handle code blocks separately in a real implementation
                        }
                        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                          return (
                            <h3 key={index} className="font-semibold text-gray-800 mt-4 mb-2">
                              {paragraph.slice(2, -2)}
                            </h3>
                          )
                        }
                        if (paragraph.trim() === '') {
                          return <br key={index} />
                        }
                        return (
                          <p key={index} className="mb-3 text-gray-700 leading-relaxed">
                            {paragraph}
                          </p>
                        )
                      })}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-4">
                      {question.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Question Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Share className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Flag className="w-4 h-4 mr-2" />
                          Flag
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={question.authorAvatar || "/placeholder.svg"} alt={question.author} />
                          <AvatarFallback>
                            {question.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-medium">{question.author}</p>
                          <p className="text-gray-500">{question.authorReputation.toLocaleString()} reputation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Answers */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  {answers.length} Answer{answers.length !== 1 ? 's' : ''}
                </h2>
              </div>

              {answers.map((answer) => (
                <Card key={answer.id} className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg ${answer.isAccepted ? 'ring-2 ring-green-200' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Vote Column */}
                      <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`p-1 h-8 w-8 ${answerVotes[answer.id] === 1 ? 'text-orange-600 bg-orange-50' : ''}`}
                          onClick={() => handleAnswerVote(answer.id, 'up')}
                        >
                          <ArrowUp className="w-5 h-5" />
                        </Button>
                        <span className="font-bold text-xl text-gray-700">
                          {answer.votes + (answerVotes[answer.id] || 0)}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`p-1 h-8 w-8 ${answerVotes[answer.id] === -1 ? 'text-orange-600 bg-orange-50' : ''}`}
                          onClick={() => handleAnswerVote(answer.id, 'down')}
                        >
                          <ArrowDown className="w-5 h-5" />
                        </Button>
                        {answer.isAccepted && (
                          <CheckCircle className="w-6 h-6 text-green-600 fill-green-100" />
                        )}
                      </div>

                      {/* Answer Content */}
                      <div className="flex-1 space-y-4">
                        <div className="prose prose-sm max-w-none">
                          {answer.content.split('\n').map((paragraph, index) => {
                            if (paragraph.startsWith('## ')) {
                              return (
                                <h3 key={index} className="font-semibold text-lg text-gray-800 mt-6 mb-3">
                                  {paragraph.slice(3)}
                                </h3>
                              )
                            }
                            if (paragraph.startsWith('```')) {
                              return null // Handle code blocks separately in a real implementation
                            }
                            if (paragraph.trim() === '') {
                              return <br key={index} />
                            }
                            return (
                              <p key={index} className="mb-3 text-gray-700 leading-relaxed">
                                {paragraph}
                              </p>
                            )
                          })}
                        </div>

                        {/* Answer Actions */}
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Share className="w-4 h-4 mr-2" />
                              Share
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Flag className="w-4 h-4 mr-2" />
                              Flag
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="text-sm text-right">
                              <p className="text-gray-500">answered {answer.timestamp}</p>
                            </div>
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={answer.authorAvatar || "/placeholder.svg"} alt={answer.author} />
                              <AvatarFallback>
                                {answer.author.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <p className="font-medium">{answer.author}</p>
                              <p className="text-gray-500">{answer.authorReputation.toLocaleString()} reputation</p>
                            </div>
                          </div>
                        </div>

                        {/* Comments */}
                        {answer.comments.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="space-y-2">
                              {answer.comments.map((comment) => (
                                <div key={comment.id} className="text-sm bg-gray-50 p-3 rounded">
                                  <p className="text-gray-700 mb-1">{comment.content}</p>
                                  <p className="text-gray-500 text-xs">
                                    {comment.author} • {comment.timestamp}
                                  </p>
                                </div>
                              ))}
                            </div>
                            <Button variant="ghost" size="sm" className="mt-2 text-blue-600">
                              Add a comment
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Answer Form */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Your Answer</CardTitle>
                <CardDescription>
                  Thanks for contributing an answer! Please be sure to answer the question and provide details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Editor Toolbar */}
                <div className="flex flex-wrap gap-1 p-2 border rounded-t-lg bg-gray-50">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Bold className="w
