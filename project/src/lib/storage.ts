import { supabase } from "./supabase";

type BucketConfig = {
  name: string;
  sizeLimit: number; // in KB
  defaultExt: string;
};

const BUCKET_CONFIGS: Record<string, BucketConfig> = {
  //This is example just replace bucket configurations.
  // events: {
  //   name: "events",
  //   sizeLimit: 150,
  //   defaultExt: "jpg",
  // },
  volunteers: {
    name: import.meta.env.VITE_VOLUNTEERS_BUCKET || "volunteers",
    sizeLimit: parseInt(import.meta.env.VITE_VOLUNTEERS_SIZE_LIMIT) || 50,
    defaultExt: "jpg",
  },
  speakers: {
    name: import.meta.env.VITE_SPEAKERS_BUCKET || "speakers",
    sizeLimit: parseInt(import.meta.env.VITE_SPEAKERS_SIZE_LIMIT) || 100,
    defaultExt: "jpg",
  },
  sponsors: {
    name: import.meta.env.VITE_SPONSORS_BUCKET || "sponsors",
    sizeLimit: parseInt(import.meta.env.VITE_SPONSORS_SIZE_LIMIT) || 200,
    defaultExt: "jpg",
  },
};

export const uploadFile = async (
  file: File,
  bucketType: keyof typeof BUCKET_CONFIGS,
  entityId: string
): Promise<string> => {
  const config = BUCKET_CONFIGS[bucketType];
  if (!config) {
    throw new Error(`Unknown bucket type: ${bucketType}`);
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Please select an image file");
  }

  if (file.size > config.sizeLimit * 1024) {
    throw new Error(`File size must be less than ${config.sizeLimit}KB`);
  }

  const fileExt =
    file.name.split(".").pop()?.toLowerCase() || config.defaultExt;
  const fileName = `${entityId}-${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(config.name)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error);
    throw new Error(`Upload failed: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(config.name).getPublicUrl(fileName);

  return publicUrl;
};

export const deleteFile = async (
  fileUrl: string,
  bucketType: keyof typeof BUCKET_CONFIGS
): Promise<void> => {
  if (!fileUrl) return;

  const config = BUCKET_CONFIGS[bucketType];
  if (!config) return;

  const fileName = fileUrl.split("/").pop();
  if (!fileName) return;

  await supabase.storage.from(config.name).remove([fileName]);
};

// Convenience functions for backward compatibility
export const uploadVolunteerPhoto = (file: File, volunteerId: string) =>
  uploadFile(file, "volunteers", volunteerId);

export const uploadSpeakerPhoto = (file: File, speakerId: string) =>
  uploadFile(file, "speakers", speakerId);

export const uploadSponsorLogo = (file: File, sponsorId: string) =>
  uploadFile(file, "sponsors", sponsorId);

export const deleteVolunteerPhoto = (photoUrl: string) =>
  deleteFile(photoUrl, "volunteers");
