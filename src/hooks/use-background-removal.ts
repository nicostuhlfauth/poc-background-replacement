import imglyRemoveBackground, { Config } from "@imgly/background-removal";
import { useState } from "react";

export const useBackgroundRemoval = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const removeBackground = async (file: File) => {
    setIsLoading(true);
    try {
      const config: Config = {
        //publicPath: "http://localhost:5173/model/",
      };
      const result = await imglyRemoveBackground(file, config);
      const url = URL.createObjectURL(result);
      setImageUrl(url);
    } catch (error) {
      // Handle error
    }
    setIsLoading(false);
  };

  return { imageUrl, isLoading, removeBackground };
};
