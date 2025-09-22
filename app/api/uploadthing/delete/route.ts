import { utapi } from "@/server/uploadthing";

export async function POST(req: Request) {
  try {
    const { files } = await req.json(); 
    // files harus array of string (file keys dari UploadThing)

    await utapi.deleteFiles(files);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return new Response("Failed to delete files", { status: 500 });
  }
}