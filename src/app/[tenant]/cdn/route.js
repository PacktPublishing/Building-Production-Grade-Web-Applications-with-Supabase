import { getSupabaseCookiesUtilClient } from "@/supabase-utils/cookiesUtilClient";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const image = searchParams.get("image");

  const supabase = getSupabaseCookiesUtilClient();

  const { data: cdnImage, error } = await supabase
    .from("comment_attachments")
    .select("file_path")
    .eq("file_path", image)
    .single();

  if (error) {
    return new Response("Error fetching image", { status: 500 });
  } else {
    // deliver the image
    return supabase.storage
      .from("comment-attachments")
      .download(cdnImage.file_path, {
        transform: {
          quality: 70,
          width: 100,
        },
      })
      .then(({ data: imageBlob, error }) => {
        return new Response(imageBlob);
      });
  }
}
