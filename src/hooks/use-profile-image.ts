import { useEffect, useState, useCallback } from "react";

type UseProfileImageResult = {
  image: string | null;
  updateImage: (file: File) => void;
  clearImage: () => void;
};

const STORAGE_KEY = "profile_image";

export function useProfileImage(): UseProfileImageResult {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setImage(stored);
    }
  }, []);

  const updateImage = useCallback((file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : null;
      if (result) {
        setImage(result);
        try {
          window.localStorage.setItem(STORAGE_KEY, result);
        } catch {
          // ignore quota errors
        }
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const clearImage = useCallback(() => {
    setImage(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return { image, updateImage, clearImage };
}

