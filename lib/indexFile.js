import { stat as fsStat, rm as fsRemove, open as fsOpen } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import path from "path";
import crypto from "crypto";
import storage from "./storage.js";

const INT32_SIZE = 4;
const READ_BUFFER_SIZE = INT32_SIZE * 2;
const READ_BLOCK_SIZE = 1024;
const INVALIDATION_STAT_PROPERTIES = [
    "birthtimeMs",
    "blksize",
    "blocks",
    "dev",
    "gid",
    "ino",
    "mode",
    "nlink",
    "rdev",
    "size",
    "uid",
];

const indexFile = {};

indexFile.determineFileId = function (filePath) {
    return fsStat(filePath).then((result) => {
        return crypto
            .createHash("md5")
            .update(
                JSON.stringify(
                    Object.assign(
                        { fileName: path.resolve(filePath) },
                        INVALIDATION_STAT_PROPERTIES.reduce((acc, propertyName) => {
                            acc[propertyName] = result[propertyName];
                            return acc;
                        }, {}),
                    ),
                ),
            )
            .digest("hex");
    });
};

indexFile.getIndexFileInfo = function (filePath, workingDirectory, delimiter) {
    return indexFile
        .determineFileId(filePath)
        .then((fileId) => storage.statIndexFile(filePath, workingDirectory, fileId))
        .then((indexFileInfo) => {
            let promise = Promise.resolve(indexFileInfo);
            if (!indexFileInfo.exists) {
                promise = indexFile
                    .generateIndexFile(filePath, indexFileInfo.path, delimiter, workingDirectory)
                    .then(() => {
                        return indexFileInfo;
                    });
            }
            return promise;
        });
};

storage.promisifyFileStream = function (fileStream, resolveEventName = "end", rejectEventName = "error") {
    return new Promise((resolve, reject) => {
        fileStream.on(resolveEventName, () => {
            resolve();
        });

        fileStream.on(rejectEventName, (err) => {
            reject(err);
        });
    });
};

indexFile.generateIndexFile = function (filePath, indexFilePath, delimiter, workingDirectory) {
    const indexWriteStream = createWriteStream(indexFilePath);
    const fileReadStream = createReadStream(filePath, {
        encoding: "utf8",
        highWaterMark: READ_BLOCK_SIZE,
    });
    const readPromise = storage.promisifyFileStream(fileReadStream);
    const writePromise = storage.promisifyFileStream(indexWriteStream, "finish");

    let buffer = Buffer.alloc(4);
    let position = 0;
    let counter = 0;

    buffer.writeInt32LE(0);
    indexWriteStream.write(buffer);

    console.log(`Start index file ${indexFilePath} generating`);

    fileReadStream.on("data", (chunk) => {
        let delimiterPosition = -1;
        let existDelimiter;
        do {
            delimiterPosition = chunk.indexOf(delimiter, delimiterPosition + 1);
            existDelimiter = delimiterPosition !== -1;
            if (existDelimiter) {
                buffer = Buffer.alloc(4);
                buffer.writeInt32LE(position + delimiterPosition + delimiter.length);
                indexWriteStream.write(buffer);
            }
        } while (existDelimiter);
        position += chunk.length;

        if (++counter % (READ_BLOCK_SIZE * 50) == 0) {
            console.log(`${counter / READ_BLOCK_SIZE}MB processed`);
        }
    });

    return readPromise
        .then(() => {
            indexWriteStream.end();
            console.log(`Index file ${indexFilePath} is generated`);
            console.log(`Generaging index file is completed.`);
            return writePromise;
        })
        .catch((err) => {
            return fsRemove(workingDirectory, { recursive: true, force: true }).then(() => {
                throw err;
            });
        });
};

indexFile.readContentPositionInFile = function (position, indexFilePath, delimiter) {
    const startBufferPosition = parseInt(position, 10) * INT32_SIZE;
    const buffer = Buffer.alloc(READ_BUFFER_SIZE);
    let fileHandle;

    return fsOpen(indexFilePath, "r")
        .then((result) => {
            fileHandle = result;
            return fileHandle.stat();
        })
        .then((fileStat) => {
            if (fileStat.size < startBufferPosition) {
                fileHandle.close();
                throw new Error(`Position ${position} is out of file bounds`);
            }
            return fileHandle.read(buffer, 0, READ_BUFFER_SIZE, startBufferPosition);
        })
        .then(() => {
            fileHandle.close();
        })
        .then(() => ({
            start: buffer.readInt32LE(0),
            end: buffer.readInt32LE(4) - delimiter.length - 1,
        }));
};

export default indexFile;
