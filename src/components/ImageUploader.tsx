import React, { useCallback, useEffect } from "react";
import { useBackgroundRemoval } from "../hooks/use-background-removal";
import styles from "./ImageUploader.module.css";

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded }) => {
  const { removeBackground, imageUrl, isLoading } = useBackgroundRemoval();

  const handleFileDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (!file) return;
      await removeBackground(file);
    },
    [removeBackground]
  );

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    await removeBackground(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (imageUrl && !isLoading) {
      onImageUploaded(imageUrl);
    }
  }, [imageUrl, isLoading, onImageUploaded]);

  return (
    <div
      className={styles.dropZone}
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
    >
      <label htmlFor="fileInput" className={styles.uploadLabel}>
        {isLoading ? (
          <span className={styles.loading}>
            Loading, your image is ready soon!
          </span>
        ) : (
          <span>Drag &amp; Drop your image here or click to upload</span>
        )}
        <input
          type="file"
          accept=".jpg,.png"
          onChange={handleFileUpload}
          className={styles.fileInput}
          id="fileInput"
        />
      </label>
    </div>
  );
};

export default ImageUploader;
