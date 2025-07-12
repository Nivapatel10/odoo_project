"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Smile,
  X,
  Plus,
  Bell,
  User,
} from "lucide-react"
import Link from "next/link"

export default function AskQuestionPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isPreview, setIsPreview] = useState(false)

  const suggestedTags = [
    "React",
    "JavaScript",
    "Node.js",
    "CSS",
    "HTML",
    "Python",
    "TypeScript",
    "Redux",
    "Next.js",
    "Express",
    "MongoDB",
    "SQL",
    "Git",
    "API",
    "Authentication",
  ]

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim()) && tags.length < 5) {
      setTags([...tags, tag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag(newTag)
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
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Ask a Question
          </h1>
          <p className="text-gray-600">Get help from the community by asking a detailed question</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Question Details</CardTitle>
                <CardDescription>Provide clear and specific information about your question</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., How to implement JWT authentication in React?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg"
                  />
                  <p className="text-xs text-gray-500">
                    Be specific and imagine you're asking a question to another person
                  </p>
                </div>

                {/* Rich Text Editor */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Description <span className="text-red-500">*</span>
                  </Label>

                  {/* Editor Toolbar */}
                  <div className="flex flex-wrap gap-1 p-2 border rounded-t-lg bg-gray-50">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Italic className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Strikethrough className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <List className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ListOrdered className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <LinkIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <AlignLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <AlignCenter className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <AlignRight className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Editor Content */}
                  <div className="flex gap-2 mb-2">
                    <Button variant={!isPreview ? "default" : "ghost"} size="sm" onClick={() => setIsPreview(false)}>
                      Write
                    </Button>
                    <Button variant={isPreview ? "default" : "ghost"} size="sm" onClick={() => setIsPreview(true)}>
                      Preview
                    </Button>
                  </div>

                  {!isPreview ? (
                    <textarea
                      placeholder="Describe your problem in detail. Include what you've tried and what specific help you need..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full h-64 p-4 border rounded-b-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="w-full h-64 p-4 border rounded-b-lg bg-gray-50 overflow-y-auto">
                      {description ? (
                        <div className="prose prose-sm max-w-none">
                          {description.split("\n").map((line, index) => (
                            <p key={index} className="mb-2">
                              {line || "\u00A0"}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">Preview will appear here...</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Tags <span className="text-red-500">*</span>
                  </Label>

                  {/* Selected Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-blue-100 text-blue-700 flex items-center gap-1"
                      >
                        {tag}
                        <X className="w-3 h-3 cursor-pointer hover:text-blue-900" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>

                  {/* Tag Input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag (max 5)"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={tags.length >= 5}
                    />
                    <Button
                      onClick={() => addTag(newTag)}
                      disabled={!newTag.trim() || tags.length >= 5}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Suggested Tags */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Suggested tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedTags
                        .filter((tag) => !tags.includes(tag))
                        .slice(0, 8)
                        .map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="cursor-pointer hover:bg-blue-50 border-blue-200 text-blue-700"
                            onClick={() => addTag(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500">Add up to 5 tags to describe what your question is about</p>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={!title.trim() || !description.trim() || tags.length === 0}
                  >
                    Post Your Question
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    Save as Draft
                  </Button>
                  <Link href="/">
                    <Button variant="ghost">Cancel</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Writing Tips */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Writing a Good Question</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p>Summarize your problem in a one-line title</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p>Describe your problem in more detail</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p>Describe what you tried and what you expected to happen</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p>Add relevant tags to help others find your question</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Formatting Help */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Formatting Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">**bold**</span>
                    <span className="font-bold">bold</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">*italic*</span>
                    <span className="italic">italic</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">`code`</span>
                    <span className="bg-gray-100 px-1 rounded font-mono text-xs">code</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">[link](url)</span>
                    <span className="text-blue-600 underline">link</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Questions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Similar Questions</CardTitle>
                <CardDescription>Check if your question has been asked before</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Link href="/question/1" className="block p-2 rounded hover:bg-gray-50 transition-colors">
                    <p className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      How to implement JWT authentication in React?
                    </p>
                    <p className="text-xs text-gray-500">15 votes • 3 answers</p>
                  </Link>
                  <Link href="/question/2" className="block p-2 rounded hover:bg-gray-50 transition-colors">
                    <p className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      Best practices for React authentication?
                    </p>
                    <p className="text-xs text-gray-500">8 votes • 2 answers</p>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
