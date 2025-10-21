"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"

interface ClientLoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ClientLoginModal({ isOpen, onClose }: ClientLoginModalProps) {
  const [step, setStep] = useState<"input" | "verify">("input")
  const [loginType, setLoginType] = useState<"email" | "phone">("email")
  const [identifier, setIdentifier] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidPhone = (phone: string): boolean => {
    // Phone should start with + and have at least 10 digits
    const phoneRegex = /^\+[1-9]\d{10,14}$/
    return phoneRegex.test(phone)
  }

  const handleSendCode = async () => {
    setError("")

    if (loginType === "email") {
      if (!identifier.trim()) {
        setError("Please enter your email address")
        return
      }
      if (!isValidEmail(identifier)) {
        setError("Please enter a valid email address (e.g., user@example.com)")
        return
      }
    } else {
      if (!identifier.trim()) {
        setError("Please enter your phone number")
        return
      }
      if (!isValidPhone(identifier)) {
        setError("Please enter a valid phone number with country code (e.g., +12125551234)")
        return
      }
    }

    setLoading(true)

    try {
      console.log("[v0] Sending verification code to:", identifier, "via", loginType)

      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [loginType]: identifier,
          type: loginType === "phone" ? "sms" : "email",
        }),
      })

      const data = await res.json()
      console.log("[v0] Send code response:", data)

      if (res.ok && data.success) {
        setStep("verify")
      } else {
        setError(data.message || "Failed to send code")
      }
    } catch (e) {
      console.error("[v0] Send code error:", e)
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    setError("")
    setLoading(true)

    try {
      console.log("[v0] Verifying code:", code)

      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [loginType]: identifier,
          code,
        }),
      })

      const data = await res.json()
      console.log("[v0] Verify code response:", data)

      if (res.ok && data.success) {
        window.location.href = "/dashboard"
      } else {
        setError(data.message || "Invalid code")
      }
    } catch (e) {
      console.error("[v0] Verify code error:", e)
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const resetModal = () => {
    setStep("input")
    setIdentifier("")
    setCode("")
    setError("")
    setLoading(false)
  }

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center backdrop-blur-sm"
      style={{ backgroundColor: "rgba(182, 169, 153, 0.35)" }}
    >
      <div className="bg-parchment rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
        <button
          onClick={() => {
            resetModal()
            onClose()
          }}
          className="absolute top-4 right-4 text-old-copper/60 hover:text-old-copper transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold text-old-copper mb-2">Client Login</h2>
        <p className="text-sm text-old-copper/80 mb-6">
          {step === "input" ? "Enter your email or phone to receive a verification code" : "Enter the code we sent you"}
        </p>

        {step === "input" ? (
          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setLoginType("email")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  loginType === "email"
                    ? "bg-muted-terracotta text-merino"
                    : "bg-merino text-old-copper hover:bg-parchment"
                }`}
              >
                Email
              </button>
              <button
                onClick={() => setLoginType("phone")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  loginType === "phone"
                    ? "bg-muted-terracotta text-merino"
                    : "bg-merino text-old-copper hover:bg-parchment"
                }`}
              >
                Phone
              </button>
            </div>

            {loginType === "email" ? (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-old-copper mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-11 rounded-xl border border-stone-gray bg-parchment px-3 py-2 text-base text-old-copper shadow-sm focus:border-muted-terracotta focus:ring-2 focus:ring-muted-terracotta/20 focus:outline-none placeholder:text-stone-gray"
                />
              </div>
            ) : (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-old-copper mb-2">
                  Phone Number
                </label>
                <PhoneInput
                  id="phone"
                  international
                  defaultCountry="US"
                  value={identifier}
                  onChange={(value) => setIdentifier(value || "")}
                  placeholder="(718) 000-0000"
                  className="w-full h-11 rounded-xl border border-stone-gray bg-parchment px-3 py-2 text-base text-old-copper shadow-sm focus:border-muted-terracotta focus:ring-2 focus:ring-muted-terracotta/20 focus:outline-none placeholder:text-stone-gray"
                />
              </div>
            )}

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              onClick={handleSendCode}
              disabled={loading || !identifier}
              className="w-full bg-muted-terracotta hover:bg-[#c25a42] text-merino"
            >
              {loading ? "Sending..." : "Send Code"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-old-copper mb-2">
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                maxLength={6}
                className="w-full h-11 rounded-xl border border-stone-gray bg-parchment px-3 py-2 text-base text-old-copper shadow-sm focus:border-muted-terracotta focus:ring-2 focus:ring-muted-terracotta/20 focus:outline-none text-center text-2xl tracking-widest font-mono placeholder:text-stone-gray"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              onClick={handleVerifyCode}
              disabled={loading || code.length !== 6}
              className="w-full bg-muted-terracotta hover:bg-[#c25a42] text-merino"
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </Button>

            <button
              onClick={() => {
                setStep("input")
                setCode("")
                setError("")
              }}
              className="w-full text-sm text-old-copper/80 hover:text-old-copper transition-colors"
            >
              ← Back to enter {loginType}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
