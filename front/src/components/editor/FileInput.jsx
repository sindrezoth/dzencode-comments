import { useEffect, useRef, useState } from "react";

const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
const MAX_FILE_SIZE = 100 * 1024;

const ALLOWED_IMAGE_TYPES = ["gif", "png", "jpeg"].map((t) => `image/${t}`);
const ALLOWED_TEXT_TYPES = ["text/plain"];

const FileInput = ({ selectedFile, setSelectedFile }) => {
  const inputRef = useRef(null);
  const [error, setError] = useState(null);

  function selectHandle(e) {
    const { files } = e.target;
    if (files && !!files.length) {
      const file = files[0];
      if (ALLOWED_IMAGE_TYPES.includes(file.type)) {
        if (file.size < MAX_IMAGE_SIZE) {
          setSelectedFile(file);
          setError(null);
        } else {
          inputRef.current.value = "";
          setError(
            `Картинка має бути не більшою за ${(MAX_IMAGE_SIZE / 1024).toFixed(2)}kb, завантажена картинка: ${(file.size / 1024).toFixed(2)}kb`,
          );
        }
      } else if (ALLOWED_TEXT_TYPES.includes(file.type)) {
        if (file.size < MAX_FILE_SIZE) {
          setSelectedFile(file);
          setError(null);
        } else {
          inputRef.current.value = "";
          setError(
            `Файл має бути не більшим за ${MAX_FILE_SIZE}kb, завантажений файл: ${(file.size / 1024).toFixed(2)}kb`,
          );
        }
      }
    }
  }

  return (
    <div className="file-input">
      <input
        ref={inputRef}
        onInput={selectHandle}
        type="file"
        id="fileinput"
        accept="image/png,image/gif,image/jpeg,.txt"
      />
      <button
        type="button"
        disabled={!inputRef?.current && selectedFile}
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.value = "";
            if (selectedFile) {
              setSelectedFile(null);
            }
          }
        }}
      >
        очистити
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default FileInput;
