import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service role key - server side only
);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1️⃣ Find user by email
    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, password, full_name, username")
      .eq("email", email)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 2️⃣ Check password (⚠️ plain-text for now, should hash in real apps)
    if (user.password !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // 3️⃣ Return success data
    return NextResponse.json({
      id: user.id,
      name: user.full_name,
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
