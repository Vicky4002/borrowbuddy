"use client";

export type SignedUploadResponse = {
  timestamp: number;
  signature: string;
  cloudName: string;
  apiKey: string;
  folder: string;
  publicId?: string;
};

export async function getSignedUploadPayload(input: {
  folder: string;
  publicId?: string;
}) {
  const res = await fetch("/api/uploads/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error("Failed to get upload signature");
  }

  return (await res.json()) as SignedUploadResponse;
}

export async function uploadToCloudinary(params: {
  file: File;
  folder: string;
  publicId?: string;
  tags?: string[];
}) {
  const signed = await getSignedUploadPayload({
    folder: params.folder,
    publicId: params.publicId,
  });

  const formData = new FormData();
  formData.append("file", params.file);
  formData.append("api_key", signed.apiKey);
  formData.append("timestamp", String(signed.timestamp));
  formData.append("signature", signed.signature);
  formData.append("folder", signed.folder);

  if (signed.publicId) {
    formData.append("public_id", signed.publicId);
  }

  if (params.tags?.length) {
    formData.append("tags", params.tags.join(","));
  }

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${signed.cloudName}/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!uploadRes.ok) {
    throw new Error("Cloudinary upload failed");
  }

  return (await uploadRes.json()) as {
    secure_url: string;
    public_id: string;
    resource_type: string;
  };
}
