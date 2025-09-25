import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ✅ server-side only
);

export async function POST(req: Request) {
  try {
    // Parse incoming data
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const latitude = formData.get("latitude") as string;
    const longitude = formData.get("longitude") as string;
    const image = formData.get("image") as File | null;
    const by = formData.get("id") as string;

    // 1️⃣ Insert report row
    const { data, error } = await supabase
      .from("reports")
      .insert([
        {
          title,
          description,
          location: `SRID=4326;POINT(${longitude} ${latitude})`,
          by,
        },
      ])
      .select("id")
      .single();

    if (error) throw error;

    const reportId = data.id;

    // 2️⃣ Upload image (if provided)
    if (image) {
      const { error: uploadError } = await supabase.storage
        .from("reports")
        .upload(`${reportId}.jpg`, image, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;
    }

    return NextResponse.json({ success: true, id: reportId });
  } catch (err: any) {
    console.error("API error:", err.message);
    return NextResponse.json({ error: "Failed to submit report" }, { status: 500 });
  }
}
