import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "../config.js";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(nombre, image) {
  return await cloudinary.uploader.upload(image, {
    folder: `vehiculos/${nombre}`,
    transformation: [{ format: "webp" }],
  });
}

export async function deleteImage(public_id) {
  return await cloudinary.uploader.destroy(public_id);
}

export async function uploadVideo(nombre, video) {
  return await cloudinary.uploader.upload(video, {
    folder: `vehiculos/${nombre}`,
    resource_type: "video",
  });
}

export async function deleteVideo(public_id) {
  return await cloudinary.uploader.destroy(public_id, {
    resource_type: "video",
  });
}
