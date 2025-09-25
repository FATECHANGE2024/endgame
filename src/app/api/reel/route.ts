import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import { supabase } from '@/lib/supabaseClient';
import fs from 'fs';

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Wrap formidable in a Promise to use async/await
const parseForm = (req: NextApiRequest) =>
  new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    const form = new formidable.IncomingForm({
      keepExtensions: true,
      multiples: false,
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { fields, files } = await parseForm(req);

    const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
    const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
    const by = Array.isArray(fields.by) ? fields.by[0] : fields.by;

    if (!title || !description || !by) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let videoFile: File | undefined;
    if (Array.isArray(files.video)) {
      videoFile = files.video[0];
    } else if (files.video) {
      videoFile = files.video as unknown as File;
    } else {
      videoFile = undefined;
    }

    if (!videoFile) return res.status(400).json({ error: 'No video uploaded' });

    // Read file as buffer
    const buffer = videoFile.filepath
      ? await fs.promises.readFile(videoFile.filepath)
      : undefined;

    if (!buffer) return res.status(500).json({ error: 'Failed to read video file' });

    // Insert placeholder record
    const { data: insertData, error: insertError } = await supabase
      .from('reel')
      .insert([{ title, description, by, video: '' }])
      .select('id')
      .single();

    if (insertError) throw insertError;

    const reelId = insertData.id.toString();
    const fileName = `${reelId}.mp4`;

    // Upload video to Supabase Storage
    const { error: uploadError } = await supabase.storage.from('reel').upload(fileName, buffer, {
      contentType: 'video/mp4',
      upsert: true,
    });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage.from('reel').getPublicUrl(fileName);
    const publicUrl = data?.publicUrl;
    if (!publicUrl) throw new Error('Failed to get public URL');

    // Update record with actual video URL
    const { error: updateError } = await supabase.from('reel').update({ video: publicUrl }).eq('id', reelId);
    if (updateError) throw updateError;

    res.status(200).json({
      message: 'Reel uploaded successfully',
      id: reelId,
      video: publicUrl,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
