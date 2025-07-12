"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Plus,
  ArrowUp,
  ArrowDown,
  MessageCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Bell,
  User,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterTag, setFilterTag] = useState("all")

  const questions = [
    {
      id: 1,
      title: "How to implement JWT authentication in React?",
      description:
        "I'm trying to implement JWT authentication in my React application but I'm having trouble with token storage and validation...",
      author: "John Doe",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      tags: ["React", "JWT", "Authentication", "JavaScript"],
      votes: 15,
      answers: 3,
      views: 127,
      timestamp: "2 hours ago",
      hasAcceptedAnswer: true,
      isAnswered: true,
    },
    {
      id: 2,
      title: "Best practices for React component optimization?",
      description:
        "What are the most effective ways to optimize React components for better performance? I'm particularly interested in memo, useMemo, and useCallback...",
      author: "Sarah Chen",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      tags: ["React", "Performance", "Optimization", "JavaScript"],
      votes: 23,
      answers: 7,
      views: 245,
      timestamp: "4 hours ago",
      hasAcceptedAnswer: true,
      isAnswered: true,
    },
    {
      id: 3,
      title: "How to handle async operations in Redux?",
      description:
        "I'm confused about the best way to handle asynchronous operations in Redux. Should I use Redux Thunk or Redux Saga?",
      author: "Mike Johnson",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      tags: ["Redux", "JavaScript", "Async", "State Management"],
      votes: 8,
      answers: 2,
      views: 89,
      timestamp: "6 hours ago",
      hasAcceptedAnswer: false,
      isAnswered: true,
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox: When to use which?",
      description:
        "I'm trying to understand when I should use CSS Grid versus Flexbox for layout. Can someone explain the key differences and use cases?",
      author: "Emma Wilson",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      tags: ["CSS", "Layout", "Grid", "Flexbox"],
      votes: 31,
      answers: 5,
      views: 312,
      timestamp: "1 day ago",
      hasAcceptedAnswer: true,
      isAnswered: true,
    },
    {
      id: 5,
      title: "Node.js memory leak debugging techniques?",
      description:
        "My Node.js application seems to have memory leaks. What are the best tools and techniques for identifying and fixing memory leaks?",
      author: "David Kim",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      tags: ["Node.js", "Debugging", "Memory", "Performance"],
      votes: 12,
      answers: 0,
      views: 67,
      timestamp: "1 day ago",
      hasAcceptedAnswer: false,
      isAnswered: false,
    },
  ]

  const popularTags = [
    { name: "React", count: 1234 },
    { name: "JavaScript", count: 2156 },
    { name: "Node.js", count: 987 },
    { name: "CSS", count: 876 },
    { name: "Python", count: 1543 },
    { name: "TypeScript", count: 765 },
    { name: "Redux", count: 432 },
    { name: "Next.js", count: 654 },
  ]

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      searchQuery === "" ||
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTag = filterTag === "all" || question.tags.includes(filterTag)

    return matchesSearch && matchesTag
  })

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

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search questions, tags, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-xl border-2 border-blue-200 focus:border-blue-400 bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white text-[10px]">
                  3
                </span>
              </Button>
              <Link href="/ask">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
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

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  All Questions
                </h1>
                <p className="text-gray-600 mt-1">{filteredQuestions.length} questions found</p>
              </div>

              <div className="flex gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-white/80 backdrop-blur-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="votes">Most Votes</SelectItem>
                    <SelectItem value="answers">Most Answers</SelectItem>
                    <SelectItem value="views">Most Views</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.map((question) => (
                <Card
                  key={question.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Vote and Stats Column */}
                      <div className="flex flex-col items-center space-y-2 min-w-[80px]">
                        <div className="flex flex-col items-center">
                          <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                            <ArrowUp className="w-4 h-4" />
                          </Button>
                          <span className="font-bold text-lg text-gray-700">{question.votes}</span>
                          <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                            <ArrowDown className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="text-center space-y-1">
                          <div
                            className={`flex items-center gap-1 text-sm ${question.hasAcceptedAnswer ? "text-green-600" : question.isAnswered ? "text-blue-600" : "text-gray-500"}`}
                          >
                            {question.hasAcceptedAnswer && <CheckCircle className="w-4 h-4" />}
                            <MessageCircle className="w-4 h-4" />
                            <span className="font-medium">{question.answers}</span>
                          </div>
                          <div className="text-xs text-gray-500">{question.views} views</div>
                        </div>
                      </div>

                      {/* Question Content */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <Link href={`/question/${question.id}`}>
                            <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">
                              {question.title}
                            </h3>
                          </Link>
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{question.description}</p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {question.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer"
                              onClick={() => setFilterTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Author and Timestamp */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={question.authorAvatar || "/placeholder.svg"} alt={question.author} />
                              <AvatarFallback className="text-xs">
                                {question.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">{question.author}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            {question.timestamp}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredQuestions.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No questions found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                <Link href="/ask">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Ask the First Question
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Tags */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Popular Tags
                </CardTitle>
                <CardDescription>Most discussed topics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {popularTags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setFilterTag(tag.name)}
                  >
                    <Badge variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                      {tag.name}
                    </Badge>
                    <span className="text-sm text-gray-500">{tag.count}</span>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full mt-2" onClick={() => setFilterTag("all")}>
                  View All Tags
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions</span>
                  <span className="font-semibold">12,547</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Answers</span>
                  <span className="font-semibold">28,934</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Users</span>
                  <span className="font-semibold">5,672</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tags</span>
                  <span className="font-semibold">1,234</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">New answer on "JWT Authentication"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Question about "React Hooks" posted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-600">Answer accepted for "CSS Grid"</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
