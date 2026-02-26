import { useState, useEffect } from "react";

const STORAGE_KEY = "mjc_profile_image";

export function useProfileImage() {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setImage(saved);
  }, []);

  const updateImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      localStorage.setItem(STORAGE_KEY, base64);
      setImage(base64);
    };
    reader.readAsDataURL(file);
  };

  return { image, updateImage };
}
