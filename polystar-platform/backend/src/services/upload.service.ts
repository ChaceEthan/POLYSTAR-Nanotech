import { Readable } from "node:stream";
import { getCloudinary } from "../config/cloudinary.js";
import { env } from "../config/env.js";
import { AppError } from "../middleware/error.js";

export async function uploadBuffer(buffer: Buffer, folder = "polystar-platform") {
  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    throw new AppError("Cloudinary is not configured", 503, "CLOUDINARY_NOT_CONFIGURED");
  }

  const cloudinary = getCloudinary();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type: "auto" }, (error, result) => {
      if (error) {
        const statusCode = typeof error.http_code === "number" && error.http_code >= 400 && error.http_code < 500 ? 502 : 503;
        reject(
          new AppError("Cloudinary upload failed", statusCode, "CLOUDINARY_UPLOAD_FAILED", {
            providerStatus: error.http_code,
            providerMessage: error.message
          })
        );
      } else {
        resolve(result);
      }
    });

    Readable.from(buffer).pipe(stream);
  });
}
