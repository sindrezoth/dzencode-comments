const { randomUUID } = require("node:crypto");
const fsPromise = require("fs/promises");
const fs= require("fs");

const postFileService = async (outBuffer, ext) => {
  let filePath = null;
  let result = null;

  const randomName = randomUUID();

  const filesFolderExist = fs.existsSync(path.resolve(__dirname, "files"));
  if (!filesFolderExist) {
    await fsPromise.mkdir(path.resolve(__dirname, "files"));
  }

  const imgsFolderExist = fs.existsSync(
    path.resolve(__dirname, "files", "imgs"),
  );
  if (!imgsFolderExist) {
    await fsPromise.mkdir(path.resolve(__dirname, "files", "imgs"));
  }

  const txtsFolderExist = fs.existsSync(
    path.resolve(__dirname, "files", "txts"),
  );
  if (!txtsFolderExist) {
    await fsPromise.mkdir(path.resolve(__dirname, "files", "txts"));
  }

  if (ext === "txt") {
    filePath = `files/txts/${randomName}.${ext}`;
  } else {
    filePath = `files/imgs/${randomName}.${ext}`;
  }

  result = await fsPromise.writeFile(filePath, outBuffer);

  return {
    result,
    filePath,
  };
};

module.exports = {
  postFileService,
};
