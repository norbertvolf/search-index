import { createWriteStream, createReadStream } from "node:fs";
import { rm as fsRemove } from "node:fs/promises";
import path from "path";

const storage = {};

storage.downloadFile = function (fileUrl, workingDirectory) {
    const filePath = path.join(workingDirectory, path.basename(fileUrl));

    console.log(`Start downloading the file from ${fileUrl}`);
    return fetch(fileUrl).then((response) => {
        if (!response.ok) {
            throw new Error(`Error while downloading the file: ${response.statusText}`);
        }

        const fileStream = createWriteStream(filePath);
        const writeWebStream = new WritableStream({
            write(chunk) {
                fileStream.write(chunk);
            },
        });

        return response.body.pipeTo(writeWebStream).then(() => {
            console.log(`Downloading of the file ${filePath} is completed`);
            return filePath;
        });
    });
};

storage.concatFiles = function (inputFilePaths, outputFilePath) {
    return inputFilePaths.reduce(
        (promise, inputFilePath, index) =>
            promise.then(
                () =>
                    new Promise((resolve, reject) => {
                        const writeStream = createWriteStream(outputFilePath, index === 0 ? {} : { flags: "a" });
                        const readStream = createReadStream(inputFilePath);
                        readStream.pipe(writeStream);
                        writeStream.on("finish", () => {
                            fsRemove(inputFilePath, { force: true }).then(() => resolve());
                        });
                        writeStream.on("error", (err) => {
                            reject(err);
                        });
                    }),
            ),
        Promise.resolve(),
    );
};

export default storage;
