import { useCallback, useRef, useState } from "react";

const useImageUpload = () => {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleSelectedFile = () => {
    const imageFile = fileInputRef.current.files[0];

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }

    if (imageFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };

      reader.readAsDataURL(imageFile);
    }
  };

  const handleSelectFile = () => {
    fileInputRef.current.click();
  };

  const onDelete = useCallback(() => {
    setPreviewImage(null);
    console.log("callback");
  }, []);

  return {
    fileInputRef,
    previewImage,
    setPreviewImage,
    handleSelectedFile,
    handleSelectFile,
    onDelete,
  };
};

export default useImageUpload;
