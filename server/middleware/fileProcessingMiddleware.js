const sharp = require("sharp");
const { countGifFrames, resizeGifBuffer } = require("../helpers/gifHelpers.js");

// for jest testing, cause file-type have only ESM export
async function getFileType(buffer) {
  const { fileTypeFromBuffer } = await import("file-type");
  return fileTypeFromBuffer(buffer);
}

const MAX_IMAGE_WIDTH = 320;
const MAX_IMAGE_HEIGHT = 240;
const MAX_GIF_FRAMES_COUNT = 100;

const fileProcessingMiddleware = async (req, res, next) => {
  if (req.file) {
    const file = req.file;
    const ft = await getFileType(file.buffer);
    let ext = "txt";
    let mime = "text/plain";
    if (ft) {
      ext = ft.ext;
      mime = ft.mime;
    } else if (req.file.mimetype !== "text/plain") {
      return res.status(400).json({ message: "Помилка файлу." });
    }

    let outBuffer = file.buffer;
    if (mime.startsWith("image/")) {
      if (mime.includes("gif")) {
        const frames = await countGifFrames(outBuffer);
        if (frames > MAX_GIF_FRAMES_COUNT) {
          res.status(400).json({ message: "Забагато кадрів в .gif файлі" });
        }

        outBuffer = await resizeGifBuffer(
          outBuffer,
          `${MAX_IMAGE_WIDTH}x${MAX_IMAGE_HEIGHT}`,
        );

        ext = "gif";
        mime = "image/gif";
      } else if (mime.includes("jpeg")) {
        outBuffer = await sharp(file.buffer, {
          limitInputPixels: 10000 * 10000,
        })
          .resize({ width: 320, height: 240, fit: "inside" })
          .withMetadata({ exif: undefined, icc: undefined })
          .jpeg({ quality: 83, mozjpeg: true })
          .toBuffer();
        ext = "jpg";
        mime = "image/jpg";
      } else if (mime.includes("png")) {
        outBuffer = await sharp(file.buffer, {
          limitInputPixels: 10000 * 10000,
        })
          .resize({ width: 320, height: 240, fit: "inside" })
          .withMetadata({ exif: undefined, icc: undefined })
          .png({ compressionLevel: 9, adaptiveFiltering: true })
          .toBuffer();
        ext = "jpg";
        mime = "image/jpg";
      }
    } else {
      const sample = outBuffer.slice(0, 4096);
      const hasBinary = [...sample].some((b) => b === 0);
      if (hasBinary) return res.status(400).json({ error: "Помилка файлу." });
    }

    req.processedFile = {
      ext,
      mime,
      outBuffer,
    };
  }

  next();
};

module.exports = fileProcessingMiddleware;
