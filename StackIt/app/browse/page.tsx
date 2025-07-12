"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Star, Clock, MessageCircle, Heart } from "lucide-react"
import Link from "next/link"

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  const users = [
    {
      id: 1,
      name: "Sarah Chen",
      location: "San Francisco, CA",
      avatar: "/placeholder.svg?height=60&width=60",
      skillsOffered: ["React", "UI/UX Design", "Figma", "JavaScript"],
      skillsWanted: ["Python", "Data Analysis", "Machine Learning"],
      rating: 4.9,
      swapsCompleted: 12,
      availability: ["Weekends", "Evenings"],
      isOnline: true,
      bio: "Frontend developer with 5+ years experience. Love teaching React and learning about data science!",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      location: "New York, NY",
      avatar: "/placeholder.svg?height=60&width=60",
      skillsOffered: ["Photography", "Video Editing", "Adobe Suite", "Lightroom"],
      skillsWanted: ["Web Development", "SEO", "Digital Marketing"],
      rating: 4.8,
      swapsCompleted: 8,
      availability: ["Weekdays", "Mornings"],
      isOnline: false,
      bio: "Professional photographer looking to expand into web development. Happy to teach photo editing!",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      location: "Austin, TX",
      avatar: "/placeholder.svg?height=60&width=60",
      skillsOffered: ["Spanish Translation", "Content Writing", "Copywriting"],
      skillsWanted: ["Graphic Design", "Social Media", "Branding"],
      rating: 5.0,
      swapsCompleted: 15,
      availability: ["Weekends", "Evenings"],
      isOnline: true,
      bio: "Bilingual content creator passionate about helping others communicate effectively.",
    },
    {
      id: 4,
      name: "David Kim",
      location: "Seattle, WA",
      avatar: "/placeholder.svg?height=60&width=60",
      skillsOffered: ["Python", "Data Science", "Machine Learning", "SQL"],
      skillsWanted: ["React", "Frontend Development", "UI Design"],
      rating: 4.7,
      swapsCompleted: 6,
      availability: ["Weekdays", "Evenings"],
      isOnline: true,
      bio: "Data scientist transitioning to full-stack development. Love working with Python and ML!",
    },
    {
      id: 5,
      name: "Lisa Wang",
      location: "Los Angeles, CA",
      avatar: "/placeholder.svg?height=60&width=60",
      skillsOffered: ["Digital Marketing", "SEO", "Google Ads", "Analytics"],
      skillsWanted: ["Photography", "Video Production", "Creative Writing"],
      rating: 4.9,
      swapsCompleted: 11,
      availability: ["Weekends", "Mornings"],
      isOnline: false,
      bio: "Marketing professional with expertise in digital campaigns. Looking to develop creative skills!",
    },
    {
      id: 6,
      name: "Ahmed Hassan",
      location: "Chicago, IL",
      avatar: "/placeholder.svg?height=60&width=60",
      skillsOffered: ["Arabic Language", "Cultural Consulting", "Translation"],
      skillsWanted: ["Web Development", "App Development", "Programming"],
      rating: 4.8,
      swapsCompleted: 9,
      availability: ["Weekdays", "Evenings"],
      isOnline: true,
      bio: "Native Arabic speaker and cultural consultant. Eager to learn programming and tech skills!",
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.skillsOffered.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      user.skillsWanted.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSearch
  })

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
              <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Browse Skills
          </h1>
          <p className="text-gray-600">Discover talented people ready to share their knowledge</p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by skill, name, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="language">Languages</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="ca">California</SelectItem>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="tx">Texas</SelectItem>
                  <SelectItem value="wa">Washington</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredUsers.length} {filteredUsers.length === 1 ? "person" : "people"}
          </p>
        </div>

        {/* User Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card
              key={user.id}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 text-sm">
                        <MapPin className="w-3 h-3" />
                        {user.location}
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-2">{user.bio}</p>

                <div>
                  <h4 className="font-semibold text-sm text-green-700 mb-2">Offers:</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsOffered.slice(0, 3).map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-green-100 text-green-700 hover:bg-green-200 text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {user.skillsOffered.length > 3 && (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                        +{user.skillsOffered.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-blue-700 mb-2">Wants:</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsWanted.slice(0, 3).map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-blue-200 text-blue-700 hover:bg-blue-50 text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {user.skillsWanted.length > 3 && (
                      <Badge variant="outline" className="border-gray-200 text-gray-600 text-xs">
                        +{user.skillsWanted.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{user.rating}</span>
                    <span>({user.swapsCompleted} swaps)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{user.availability.join(", ")}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Request Swap
                  </Button>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No results found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
