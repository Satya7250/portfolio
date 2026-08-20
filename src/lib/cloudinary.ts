import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export function getCloudinaryPublicId(imageUrl: string | null | undefined) {
  if (!imageUrl?.includes("res.cloudinary.com")) return null;

  const path = decodeURIComponent(new URL(imageUrl).pathname);
  const uploadMarker = "/upload/";
  const uploadIndex = path.indexOf(uploadMarker);
  if (uploadIndex === -1) return null;

  const assetPath = path.slice(uploadIndex + uploadMarker.length);
  const withoutVersion = assetPath.replace(/^v\d+\//, "");
  return withoutVersion.replace(/\.[^/.]+$/, "") || null;
}

export async function removeCloudinaryImage(publicId: string | null) {
  if (!publicId || !publicId.startsWith("portfolio/certificates/")) return;

  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });

  if (result.result === "not found") {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
    });
  }
}