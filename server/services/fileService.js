const { randomUUID } = require("node:crypto");
const fs = require("node:fs/promises");

const getFileService = async (path) => {
  const result = await fs.readFile(path);
  return result;
};
const postFileService = async (outBuffer, ext) => {
  let filePath = null;
  let result = null;

  const randomName = randomUUID();
  if (ext === "txt") {
    filePath = `files/txts/${randomName}.${ext}`;
  } else {
    filePath = `files/imgs/${randomName}.${ext}`;
  }

  result = await fs.writeFile(filePath, outBuffer);

  return {
    result,
    filePath,
  };
};

module.exports = {
  getFileService,
  postFileService,
};
