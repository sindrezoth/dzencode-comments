const { spawn } = require("child_process");

function resizeGifBuffer(inputBuffer, size = "320x240") {
  return new Promise((resolve, reject) => {
    const convert = spawn("convert", [
      "gif:-",
      "-coalesce",
      "-resize",
      size,
      "-layers",
      "Optimize",
      "gif:-",
    ]);

    let chunks = [];
    let error = [];

    convert.stdout.on("data", (data) => chunks.push(data));
    convert.stderr.on("data", (data) => error.push(data));

    convert.on("close", (code) => {
      if (code !== 0) {
        reject(Buffer.concat(error).toString() || "ImageMagick failed");
      } else {
        resolve(Buffer.concat(chunks));
      }
    });

    // send buffer in, then close stdin
    convert.stdin.write(inputBuffer);
    convert.stdin.end();
  });
}

function countGifFrames(buffer) {
  return new Promise((resolve, reject) => {
    const { spawn } = require("child_process");
    const identify = spawn("identify", ["gif:-"]);

    let output = "";
    let error = "";

    identify.stdout.on("data", (data) => (output += data.toString()));
    identify.stderr.on("data", (data) => (error += data.toString()));

    identify.on("close", (code) => {
      if (code !== 0) return reject(error || "identify failed");
      const frames = output
        .split("\n")
        .filter((line) => line.trim() !== "").length;
      resolve(frames);
    });

    identify.stdin.write(buffer);
    identify.stdin.end();
  });
}

module.exports = {
  resizeGifBuffer,
  countGifFrames,
};
