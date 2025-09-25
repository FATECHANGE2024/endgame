import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';
import formidable from 'formidable';
import fs from 'fs';

// Disable default body parser so formidable can handle multipart/form-data
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        try {
            if (err) throw err;

            const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
            const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
            const by = Array.isArray(fields.by) ? fields.by[0] : fields.by;

            let videoFile: formidable.File | undefined;

            if (Array.isArray(files.video)) {
                videoFile = files.video[0]; // take the first file
            } else {
                videoFile = files.video; // already a single file or undefined
            }

            if (!videoFile) {
                return res.status(400).json({ error: 'No video uploaded' });
            }
            if (!title || !description || !by) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // 1️⃣ Insert record with placeholder video
            const { data: insertData, error: insertError } = await supabase
                .from('reel')
                .insert([{ title, description, by, video: '' }])
                .select('id')
                .single();

            if (insertError) throw insertError;

            const reelId = insertData.id.toString();
            const fileName = `${reelId}.mp4`;

            // 2️⃣ Read file as buffer
            const buffer = fs.readFileSync(videoFile.filepath);

            // 3️⃣ Upload to Supabase Storage
            const { error: uploadError } = await supabase
                .storage
                .from('reel')
                .upload(fileName, buffer, {
                    contentType: 'video/mp4',
                    upsert: true,
                });

            if (uploadError) throw uploadError;

            // 4️⃣ Get public URL
            const { data } = supabase.storage.from('reel').getPublicUrl(fileName);
            const publicUrl = data.publicUrl;

            // 5️⃣ Update record with actual video URL
            const { error: updateError } = await supabase
                .from('reel')
                .update({ video: publicUrl })
                .eq('id', reelId);

            if (updateError) throw updateError;

            res.status(200).json({
                message: 'Reel uploaded successfully',
                id: reelId,
                video: publicUrl,
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    });
}
