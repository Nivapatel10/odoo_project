"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { MessageCircle, Clock, CheckCircle, XCircle, Star, TrendingUp, Users, Calendar, Bell } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const pendingRequests = [
    {
      id: 1,
      user: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      skillOffered: "React",
      skillWanted: "Python",
      message: "Hi! I'd love to learn Python from you in exchange for React tutoring.",
      timestamp: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      user: "Marcus Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      skillOffered: "Photography",
      skillWanted: "Web Development",
      message: "Interested in trading photography lessons for web dev help!",
      timestamp: "1 day ago",
      status: "pending",
    },
  ]

  const activeSwaps = [
    {
      id: 1,
      user: "Elena Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      skillOffered: "Spanish",
      skillWanted: "UI Design",
      nextSession: "Tomorrow, 3:00 PM",
      progress: 60,
      status: "active",
    },
    {
      id: 2,
      user: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      skillOffered: "Data Science",
      skillWanted: "React",
      nextSession: "Friday, 7:00 PM",
      progress: 30,
      status: "active",
    },
  ]

  const completedSwaps = [
    {
      id: 1,
      user: "Lisa Wang",
      avatar: "/placeholder.svg?height=40&width=40",
      skillOffered: "Digital Marketing",
      skillWanted: "Photography",
      completedDate: "Last week",
      rating: 5,
      feedback: "Amazing teacher! Learned so much about SEO and Google Ads.",
      status: "completed",
    },
    {
      id: 2,
      user: "Ahmed Hassan",
      avatar: "/placeholder.svg?height=40&width=40",
      skillOffered: "Arabic",
      skillWanted: "Programming",
      completedDate: "2 weeks ago",
      rating: 4,
      feedback: "Great cultural insights and language practice sessions.",
      status: "completed",
    },
  ]

  const stats = {
    totalSwaps: 8,
    activeSwaps: 2,
    completedSwaps: 6,
    averageRating: 4.8,
    skillsTaught: 12,
    skillsLearned: 8,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SS</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                SkillSwap
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
              <Link href="/browse">
                <Button variant="ghost">Browse</Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">Manage your skill swaps and track your progress</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Swaps</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalSwaps}</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Swaps</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.activeSwaps}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.averageRating}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Skills Taught</p>
                  <p className="text-2xl font-bold text-green-600">{stats.skillsTaught}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeSwaps.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedSwaps.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest skill swap updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm">Completed swap with Lisa Wang</p>
                    <span className="text-xs text-gray-500 ml-auto">2 days ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-sm">Started new swap with Elena Rodriguez</p>
                    <span className="text-xs text-gray-500 ml-auto">1 week ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <p className="text-sm">Received 5-star rating from Ahmed Hassan</p>
                    <span className="text-xs text-gray-500 ml-auto">2 weeks ago</span>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Sessions */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Sessions
                  </CardTitle>
                  <CardDescription>Your scheduled skill swap sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeSwaps.map((swap) => (
                    <div key={swap.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={swap.avatar || "/placeholder.svg"} alt={swap.user} />
                          <AvatarFallback>
                            {swap.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{swap.user}</p>
                          <p className="text-xs text-gray-600">
                            {swap.skillOffered} ↔ {swap.skillWanted}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{swap.nextSession}</p>
                        <Badge variant="secondary" className="text-xs">
                          Active
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>Skill swap requests waiting for your response</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.user} />
                          <AvatarFallback>
                            {request.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{request.user}</h4>
                          <p className="text-sm text-gray-600">
                            Wants to trade{" "}
                            <Badge variant="secondary" className="mx-1">
                              {request.skillOffered}
                            </Badge>
                            for{" "}
                            <Badge variant="outline" className="mx-1">
                              {request.skillWanted}
                            </Badge>
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{request.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{request.message}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Decline
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Active Swaps</CardTitle>
                <CardDescription>Your ongoing skill exchanges</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeSwaps.map((swap) => (
                  <div key={swap.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={swap.avatar || "/placeholder.svg"} alt={swap.user} />
                          <AvatarFallback>
                            {swap.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{swap.user}</h4>
                          <p className="text-sm text-gray-600">
                            <Badge variant="secondary" className="mr-1">
                              {swap.skillOffered}
                            </Badge>
                            ↔{" "}
                            <Badge variant="outline" className="ml-1">
                              {swap.skillWanted}
                            </Badge>
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">Active</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{swap.progress}%</span>
                      </div>
                      <Progress value={swap.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        Next session: {swap.nextSession}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Completed Swaps</CardTitle>
                <CardDescription>Your finished skill exchanges and feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {completedSwaps.map((swap) => (
                  <div key={swap.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={swap.avatar || "/placeholder.svg"} alt={swap.user} />
                          <AvatarFallback>
                            {swap.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{swap.user}</h4>
                          <p className="text-sm text-gray-600">
                            <Badge variant="secondary" className="mr-1">
                              {swap.skillOffered}
                            </Badge>
                            ↔{" "}
                            <Badge variant="outline" className="ml-1">
                              {swap.skillWanted}
                            </Badge>
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < swap.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">Completed {swap.completedDate}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm text-gray-700 italic">"{swap.feedback}"</p>
                    </div>

                    <div className="flex justify-end">
                      <Button size="sm" variant="outline">
                        View Certificate
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
