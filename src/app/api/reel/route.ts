import { NextRequest, NextResponse } from "next/server";
import formidable, { File } from "formidable";
import fs from "fs";
import { supabase } from "@/lib/supabaseClient";

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Wrap formidable in a Promise for async/await
const parseForm = (req: NextRequest) =>
  new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    const form = new formidable.IncomingForm({
      keepExtensions: true,
      multiples: false,
    });

    form.parse(req as unknown as any, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

export async function POST(req: NextRequest) {
  try {
    const { fields, files } = await parseForm(req);

    const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
    const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
    const by = Array.isArray(fields.by) ? fields.by[0] : fields.by;

    if (!title || !description || !by) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let videoFile: File | undefined;
    if (Array.isArray(files.video)) {
      videoFile = files.video[0];
    } else if (files.video) {
      videoFile = files.video as unknown as File;
    }

    if (!videoFile) return NextResponse.json({ error: "No video uploaded" }, { status: 400 });

    // Read file as buffer
    const buffer = videoFile.filepath
      ? await fs.promises.readFile(videoFile.filepath)
      : undefined;

    if (!buffer) return NextResponse.json({ error: "Failed to read video file" }, { status: 500 });

    // Insert placeholder record
    const { data: insertData, error: insertError } = await supabase
      .from("reel")
      .insert([{ title, description, by, video: "" }])
      .select("id")
      .single();

    if (insertError) throw insertError;

    const reelId = insertData.id.toString();
    const fileName = `${reelId}.mp4`;

    // Upload video to Supabase Storage
    const { error: uploadError } = await supabase.storage.from("reel").upload(fileName, buffer, {
      contentType: "video/mp4",
      upsert: true,
    });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage.from("reel").getPublicUrl(fileName);
    const publicUrl = data?.publicUrl;
    if (!publicUrl) throw new Error("Failed to get public URL");

    // Update record with actual video URL
    const { error: updateError } = await supabase.from("reel").update({ video: publicUrl }).eq("id", reelId);
    if (updateError) throw updateError;

    return NextResponse.json({
      message: "Reel uploaded successfully",
      id: reelId,
      video: publicUrl,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
