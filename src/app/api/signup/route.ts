export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


// ✅ Create Supabase client with service role (server-side only!)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ service role key — do NOT expose in client
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          email: body.email,
          full_name: body.fullName,
          username: body.username,
          phone: body.phone,
          birthdate: body.birthdate,
          how_heard: body.howHeard,
          terms_accepted: body.terms,
          password: body.password, // ⚠️ recommend hashing or using Supabase Auth
        },
      ])
      .select("id, full_name")
      .single(); // return single row

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ id: data.id, name: data.full_name });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
