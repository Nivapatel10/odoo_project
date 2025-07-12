"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Users,
  MessageSquare,
  Flag,
  TrendingUp,
  Search,
  Eye,
  Trash2,
  Ban,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  Settings,
  Bell,
} from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  const adminStats = {
    totalUsers: 5672,
    totalQuestions: 12547,
    totalAnswers: 28934,
    pendingReports: 8,
    activeUsers: 1234,
    questionsToday: 47,
    answersToday: 89,
    reportsToday: 3,
  }

  const recentReports = [
    {
      id: 1,
      type: "question",
      title: "Spam question about cryptocurrency",
      reporter: "John Doe",
      reported: "SpamUser123",
      reason: "Spam/Promotional content",
      timestamp: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      type: "answer",
      title: "Inappropriate language in answer",
      reporter: "Sarah Chen",
      reported: "BadUser456",
      reason: "Inappropriate content",
      timestamp: "4 hours ago",
      status: "pending",
    },
    {
      id: 3,
      type: "user",
      title: "Harassment in comments",
      reporter: "Mike Johnson",
      reported: "TrollUser789",
      reason: "Harassment/Abuse",
      timestamp: "1 day ago",
      status: "resolved",
    },
  ]

  const recentUsers = [
    {
      id: 1,
      username: "newdev2024",
      email: "newdev@example.com",
      joinDate: "2024-01-15",
      reputation: 15,
      questions: 2,
      answers: 1,
      status: "active",
    },
    {
      id: 2,
      username: "codemaster",
      email: "master@example.com",
      joinDate: "2024-01-14",
      reputation: 450,
      questions: 8,
      answers: 23,
      status: "active",
    },
    {
      id: 3,
      username: "suspicioususer",
      email: "suspicious@example.com",
      joinDate: "2024-01-13",
      reputation: -5,
      questions: 0,
      answers: 0,
      status: "suspended",
    },
  ]

  const topQuestions = [
    {
      id: 1,
      title: "How to implement JWT authentication in React?",
      author: "John Doe",
      votes: 45,
      answers: 8,
      views: 1234,
      status: "active",
    },
    {
      id: 2,
      title: "Best practices for React component optimization?",
      author: "Sarah Chen",
      votes: 38,
      answers: 12,
      views: 987,
      status: "active",
    },
    {
      id: 3,
      title: "Spam question about making money online",
      author: "SpamUser123",
      votes: -5,
      answers: 0,
      views: 23,
      status: "flagged",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Admin Panel
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white text-[10px]">
                  {adminStats.pendingReports}
                </span>
              </Button>
              <Badge variant="secondary" className="bg-red-100 text-red-700">
                Administrator
              </Badge>
              <Link href="/">
                <Button variant="outline">Back to Site</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Monitor and manage the StackIt community</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-blue-600">{adminStats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+{adminStats.activeUsers} active</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Questions</p>
                  <p className="text-2xl font-bold text-green-600">{adminStats.totalQuestions.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+{adminStats.questionsToday} today</p>
                </div>
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Answers</p>
                  <p className="text-2xl font-bold text-purple-600">{adminStats.totalAnswers.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+{adminStats.answersToday} today</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Reports</p>
                  <p className="text-2xl font-bold text-red-600">{adminStats.pendingReports}</p>
                  <p className="text-xs text-red-600">+{adminStats.reportsToday} today</p>
                </div>
                <Flag className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="reports">Reports ({adminStats.pendingReports})</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">New user registered: newdev2024</span>
                      <span className="text-xs text-gray-500 ml-auto">5 min ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Question posted: "React Hooks best practices"</span>
                      <span className="text-xs text-gray-500 ml-auto">15 min ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Content reported: Spam question</span>
                      <span className="text-xs text-gray-500 ml-auto">1 hour ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Answer accepted: JWT Authentication</span>
                      <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Platform Announcement
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Generate Analytics Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    Platform Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Audit
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Monitor and manage platform users</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{user.username}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">
                            Joined {user.joinDate} • {user.reputation} reputation • {user.questions} questions •{" "}
                            {user.answers} answers
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            user.status === "active"
                              ? "default"
                              : user.status === "suspended"
                                ? "destructive"
                                : "secondary"
                          }
                          className={
                            user.status === "active"
                              ? "bg-green-100 text-green-700"
                              : user.status === "suspended"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                          }
                        >
                          {user.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 bg-transparent">
                            <Ban className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Monitor questions, answers, and community content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topQuestions.map((question) => (
                    <div key={question.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">{question.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">by {question.author}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{question.votes} votes</span>
                          <span>{question.answers} answers</span>
                          <span>{question.views} views</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={question.status === "active" ? "default" : "destructive"}
                          className={
                            question.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }
                        >
                          {question.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 bg-transparent">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Content Reports
                </CardTitle>
                <CardDescription>Review and moderate reported content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {report.type}
                          </Badge>
                          <Badge
                            variant={report.status === "pending" ? "secondary" : "default"}
                            className={
                              report.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                            }
                          >
                            {report.status}
                          </Badge>
                          <span className="text-xs text-gray-500">{report.timestamp}</span>
                        </div>
                        <h4 className="font-semibold">{report.title}</h4>
                        <p className="text-sm text-gray-600">
                          Reported by: {report.reporter} • Against: {report.reported}
                        </p>
                        <p className="text-sm text-gray-600">Reason: {report.reason}</p>
                      </div>
                    </div>

                    {report.status === "pending" && (
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Remove Content
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4 mr-2" />
                          Investigate
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>Detailed insights and reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">User Engagement</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Daily Active Users</span>
                        <span className="font-semibold">1,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Questions per Day</span>
                        <span className="font-semibold">47</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Answers per Day</span>
                        <span className="font-semibold">89</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">User Retention</span>
                        <span className="font-semibold">78%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Content Quality</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Accepted Answers</span>
                        <span className="font-semibold">65%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average Question Score</span>
                        <span className="font-semibold">4.2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Spam Detection Rate</span>
                        <span className="font-semibold">99.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Report Resolution Time</span>
                        <span className="font-semibold">2.4h</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-4">Export Reports</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button variant="outline" className="justify-start bg-transparent">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      User Activity Report
                    </Button>
                    <Button variant="outline" className="justify-start bg-transparent">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Content Analytics Report
                    </Button>
                    <Button variant="outline" className="justify-start bg-transparent">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Moderation Report
                    </Button>
                    <Button variant="outline" className="justify-start bg-transparent">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Performance Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
