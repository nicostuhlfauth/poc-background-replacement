import { useState } from "react";
import ImageUploader from "./components/ImageUploader";

import styles from "./App.module.css";

function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUploaded = (url: string) => {
    setImageUrl(url);
  };

  return (
    <div className={styles.container}>
      <h1>Image Background Removal</h1>
      <ImageUploader onImageUploaded={handleImageUploaded} />
      {imageUrl ? (
        <div className={styles.imageContainer}>
          <img src={imageUrl} alt="Processed Image" className={styles.image} />
          <a href={imageUrl} download className={styles.downloadButton}>
            Download Image
          </a>
        </div>
      ) : (
        <div className={styles.loading}>Loading...</div>
      )}
    </div>
  );
}

export default App;
