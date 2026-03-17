import { useState } from "react";

export function useImageUpload() {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    setImages((prev) => [...prev, ...arr]);
    arr.forEach((f) => {
      setPreviews((prev) => [...prev, URL.createObjectURL(f)]);
    });
  };

  const removeImage = (i: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[i]);
      return prev.filter((_, idx) => idx !== i);
    });
  };

  return { images, previews, handleFiles, removeImage };
}