import { type NextRequest, NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const { email, phone, code } = await req.json()

    console.log("[v0] Verifying code:", { email, phone, code })

    if (!code || (!email && !phone)) {
      return NextResponse.json({ success: false, message: "Code and email or phone required" }, { status: 400 })
    }

    // Check if code is valid and not expired
    const result = await pool.query(
      `SELECT * FROM verification_codes 
       WHERE code = $1 
       AND (email = $2 OR phone = $3)
       AND expires_at > NOW()
       ORDER BY created_at DESC
       LIMIT 1`,
      [code, email || null, phone || null],
    )

    console.log("[v0] Verification query result:", result.rows.length > 0 ? "Found" : "Not found")

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid or expired code" }, { status: 400 })
    }

    // Delete used code
    await pool.query("DELETE FROM verification_codes WHERE code = $1", [code])

    // Create session token
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36)

    // Store session in database (you'll need to create this table)
    await pool.query(
      `INSERT INTO sessions (token, email, phone, created_at, expires_at)
       VALUES ($1, $2, $3, NOW(), NOW() + INTERVAL '30 days')`,
      [token, email || null, phone || null],
    )

    console.log("[v0] Session created successfully")

    // Set cookie
    const response = NextResponse.json({ success: true, message: "Login successful" })
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    })

    return response
  } catch (error) {
    console.error("[v0] Verify error:", error)
    return NextResponse.json({ success: false, message: "Verification failed" }, { status: 500 })
  }
}
