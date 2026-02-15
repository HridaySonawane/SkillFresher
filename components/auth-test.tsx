/* eslint-disable @typescript-eslint/no-explicit-any */
// components/auth-test.tsx
"use client"

import { useState } from "react"
import { authService } from "@/lib/supabase/auth"

export function AuthTest() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignUp = async () => {
    setLoading(true)
    try {
      await authService.signUp(email, "testpassword123")
      alert("Check your email for verification!")
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4">
      <h2>Auth Test</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
        className="border p-2 mr-2"
      />
      <button
        onClick={handleSignUp}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>
    </div>
  )
}