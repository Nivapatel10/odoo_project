"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Github, Mail, Lock, User, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("signin")

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  // Form Validation State
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [success, setSuccess] = useState("")

  const validateSignIn = () => {
    const newErrors: { [key: string]: string } = {}

    if (!signInData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(signInData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!signInData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateSignUp = () => {
    const newErrors: { [key: string]: string } = {}

    if (!signUpData.username) {
      newErrors.username = "Username is required"
    } else if (signUpData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }

    if (!signUpData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!signUpData.password) {
      newErrors.password = "Password is required"
    } else if (signUpData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!signUpData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (signUpData.password !== signUpData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!signUpData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSuccess("")

    if (!validateSignIn()) return

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccess("Successfully signed in! Redirecting...")

      // Simulate redirect after success
      setTimeout(() => {
        window.location.href = "/"
      }, 1000)
    } catch (error) {
      setErrors({ general: "Invalid email or password. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSuccess("")

    if (!validateSignUp()) return

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSuccess("Account created successfully! Please check your email to verify your account.")
    } catch (error) {
      setErrors({ general: "Failed to create account. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true)
    // Simulate social login
    setTimeout(() => {
      setSuccess(`Redirecting to ${provider}...`)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Back to Home */}
        <div className="mb-6">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to StackIt</span>
          </Link>
        </div>

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">SI</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StackIt
            </span>
          </Link>
          <p className="text-gray-600">Join the developer community</p>
        </div>

        {/* Auth Card */}
        <Card className="bg-white/80 backdrop-blur-md border-0 shadow-2xl">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-50/80 m-4 mb-0">
                <TabsTrigger value="signin" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="signin" className="p-6 pt-4">
                <div className="space-y-4">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800">Welcome back</h2>
                    <p className="text-sm text-gray-600 mt-1">Sign in to your account to continue</p>
                  </div>

                  {/* Error/Success Messages */}
                  {errors.general && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700">{errors.general}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700">{success}</AlertDescription>
                    </Alert>
                  )}

                  {/* Social Login */}
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full bg-white/50 hover:bg-white/80 border-gray-200"
                      onClick={() => handleSocialLogin("Google")}
                      disabled={isLoading}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Continue with Google
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-white/50 hover:bg-white/80 border-gray-200"
                      onClick={() => handleSocialLogin("GitHub")}
                      disabled={isLoading}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Continue with GitHub
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or continue with email</span>
                    </div>
                  </div>

                  {/* Sign In Form */}
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="Enter your email"
                          value={signInData.email}
                          onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                          className={`pl-10 ${errors.email ? "border-red-300 focus:border-red-500" : ""}`}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="signin-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={signInData.password}
                          onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                          className={`pl-10 pr-10 ${errors.password ? "border-red-300 focus:border-red-500" : ""}`}
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={signInData.rememberMe}
                          onCheckedChange={(checked) =>
                            setSignInData({ ...signInData, rememberMe: checked as boolean })
                          }
                          disabled={isLoading}
                        />
                        <Label htmlFor="remember" className="text-sm text-gray-600">
                          Remember me
                        </Label>
                      </div>
                      <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                        Forgot password?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </div>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="p-6 pt-4">
                <div className="space-y-4">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800">Create account</h2>
                    <p className="text-sm text-gray-600 mt-1">Join the StackIt community today</p>
                  </div>

                  {/* Error/Success Messages */}
                  {errors.general && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700">{errors.general}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700">{success}</AlertDescription>
                    </Alert>
                  )}

                  {/* Social Signup */}
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full bg-white/50 hover:bg-white/80 border-gray-200"
                      onClick={() => handleSocialLogin("Google")}
                      disabled={isLoading}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Sign up with Google
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-white/50 hover:bg-white/80 border-gray-200"
                      onClick={() => handleSocialLogin("GitHub")}
                      disabled={isLoading}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Sign up with GitHub
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or create account with email</span>
                    </div>
                  </div>

                  {/* Sign Up Form */}
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-username">Username</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="signup-username"
                          type="text"
                          placeholder="Choose a username"
                          value={signUpData.username}
                          onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                          className={`pl-10 ${errors.username ? "border-red-300 focus:border-red-500" : ""}`}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          value={signUpData.email}
                          onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                          className={`pl-10 ${errors.email ? "border-red-300 focus:border-red-500" : ""}`}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={signUpData.password}
                          onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                          className={`pl-10 pr-10 ${errors.password ? "border-red-300 focus:border-red-500" : ""}`}
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                      <p className="text-xs text-gray-500">Must be at least 8 characters long</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="signup-confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={signUpData.confirmPassword}
                          onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                          className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-300 focus:border-red-500" : ""}`}
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          disabled={isLoading}
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={signUpData.agreeToTerms}
                          onCheckedChange={(checked) =>
                            setSignUpData({ ...signUpData, agreeToTerms: checked as boolean })
                          }
                          disabled={isLoading}
                          className="mt-1"
                        />
                        <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                          I agree to the{" "}
                          <Link href="/terms" className="text-blue-600 hover:text-blue-800 underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                      {errors.agreeToTerms && <p className="text-sm text-red-600">{errors.agreeToTerms}</p>}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            {activeTab === "signin" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setActiveTab(activeTab === "signin" ? "signup" : "signin")}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {activeTab === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
