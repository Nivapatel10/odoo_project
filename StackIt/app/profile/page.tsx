"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, X, Camera, MapPin, Clock, Eye, EyeOff, Save } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [isPublic, setIsPublic] = useState(true)
  const [skillsOffered, setSkillsOffered] = useState(["React", "JavaScript", "UI/UX Design"])
  const [skillsWanted, setSkillsWanted] = useState(["Python", "Data Science"])
  const [newSkillOffered, setNewSkillOffered] = useState("")
  const [newSkillWanted, setNewSkillWanted] = useState("")
  const [availability, setAvailability] = useState({
    weekdays: false,
    weekends: true,
    evenings: true,
    mornings: false,
  })

  const addSkillOffered = () => {
    if (newSkillOffered.trim() && !skillsOffered.includes(newSkillOffered.trim())) {
      setSkillsOffered([...skillsOffered, newSkillOffered.trim()])
      setNewSkillOffered("")
    }
  }

  const addSkillWanted = () => {
    if (newSkillWanted.trim() && !skillsWanted.includes(newSkillWanted.trim())) {
      setSkillsWanted([...skillsWanted, newSkillWanted.trim()])
      setNewSkillWanted("")
    }
  }

  const removeSkillOffered = (skill: string) => {
    setSkillsOffered(skillsOffered.filter((s) => s !== skill))
  }

  const removeSkillWanted = (skill: string) => {
    setSkillsWanted(skillsWanted.filter((s) => s !== skill))
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
              <Link href="/browse">
                <Button variant="ghost">Browse</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Your Profile
          </h1>
          <p className="text-gray-600">Manage your skills and preferences</p>
        </div>

        {/* Profile Visibility */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {isPublic ? <Eye className="w-5 h-5 text-green-600" /> : <EyeOff className="w-5 h-5 text-gray-400" />}
                  Profile Visibility
                </CardTitle>
                <CardDescription>
                  {isPublic ? "Your profile is public and discoverable" : "Your profile is private"}
                </CardDescription>
              </div>
              <Switch checked={isPublic} onCheckedChange={setIsPublic} className="data-[state=checked]:bg-green-600" />
            </div>
          </CardHeader>
        </Card>

        {/* Basic Information */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Tell others about yourself</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Photo */}
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
                <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white text-xl">
                  JD
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Camera className="w-4 h-4" />
                Change Photo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location (Optional)</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input id="location" placeholder="San Francisco, CA" className="pl-10" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell others about yourself, your experience, and what you're passionate about..."
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Skills Offered */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-green-700">Skills I Can Teach</CardTitle>
            <CardDescription>What skills can you share with others?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {skillsOffered.map((skill, index) => (
                <Badge key={index} className="bg-green-100 text-green-700 hover:bg-green-200 flex items-center gap-1">
                  {skill}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-green-900"
                    onClick={() => removeSkillOffered(skill)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill you can teach..."
                value={newSkillOffered}
                onChange={(e) => setNewSkillOffered(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSkillOffered()}
              />
              <Button onClick={addSkillOffered} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Skills Wanted */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-700">Skills I Want to Learn</CardTitle>
            <CardDescription>What would you like to learn from others?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {skillsWanted.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 flex items-center gap-1"
                >
                  {skill}
                  <X className="w-3 h-3 cursor-pointer hover:text-blue-900" onClick={() => removeSkillWanted(skill)} />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill you want to learn..."
                value={newSkillWanted}
                onChange={(e) => setNewSkillWanted(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSkillWanted()}
              />
              <Button onClick={addSkillWanted} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Availability */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Availability
            </CardTitle>
            <CardDescription>When are you available for skill swaps?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="weekdays"
                  checked={availability.weekdays}
                  onCheckedChange={(checked) => setAvailability({ ...availability, weekdays: checked as boolean })}
                />
                <Label htmlFor="weekdays">Weekdays</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="weekends"
                  checked={availability.weekends}
                  onCheckedChange={(checked) => setAvailability({ ...availability, weekends: checked as boolean })}
                />
                <Label htmlFor="weekends">Weekends</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="mornings"
                  checked={availability.mornings}
                  onCheckedChange={(checked) => setAvailability({ ...availability, mornings: checked as boolean })}
                />
                <Label htmlFor="mornings">Mornings</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="evenings"
                  checked={availability.evenings}
                  onCheckedChange={(checked) => setAvailability({ ...availability, evenings: checked as boolean })}
                />
                <Label htmlFor="evenings">Evenings</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                  <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                  <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                  <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Profile
          </Button>
        </div>
      </div>
    </div>
  )
}

