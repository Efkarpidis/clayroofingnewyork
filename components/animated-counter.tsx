"use client"

import { useState, useEffect, useRef } from "react"

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  className?: string
  startAnimation?: boolean
}

export function AnimatedCounter({
  end,
  duration = 1200,
  suffix = "",
  className = "",
  startAnimation = false,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!startAnimation || hasAnimated) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation (ease-out-quart)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setHasAnimated(true)
      }
    }

    // Start animation after a short delay
    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate)
    }, 200)

    return () => {
      clearTimeout(timer)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, startAnimation, hasAnimated])

  // Format numbers for display (short format)
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return Math.floor(num / 1000000).toString() + "M"
    } else if (num >= 1000) {
      return Math.floor(num / 1000).toString() + "K"
    }
    return num.toString()
  }

  return (
    <span ref={counterRef} className={className}>
      {formatNumber(count)}
      {suffix}
    </span>
  )
}
