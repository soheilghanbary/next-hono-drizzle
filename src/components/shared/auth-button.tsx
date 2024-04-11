"use client"
import { Button } from "@ui/button"
import { signIn, signOut } from "next-auth/react"
import { useState } from "react"

export const SignInButton = () => {
  const [loading, setLoading] = useState(false)
  return (
    <Button
      onClick={async () => {
        setLoading(true)
        await signIn()
      }}
      disabled={loading}
    >
      Sign In
    </Button>
  )
}

export const SignOutButton = () => {
  const [loading, setLoading] = useState(false)
  return (
    <Button
      variant={"destructive"}
      onClick={async () => {
        setLoading(true)
        await signOut()
      }}
      disabled={loading}
    >
      Sign Out
    </Button>
  )
}
