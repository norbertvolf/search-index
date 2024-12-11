import { access as fsAccess, mkdir as fsMkdir, rm as fsRemove, constants as FS_CONSTANTS } from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "path";

const storage = {};

storage.prepareDirectory = function (workingDirectory, recreate = true) {
    return fsAccess(workingDirectory, FS_CONSTANTS.F_OK)
        .then(() => {
            let promise = Promise.resolve();
            if (recreate) {
                promise = fsRemove(workingDirectory, { recursive: true, force: true })
                    .then(() => {
                        return fsMkdir(workingDirectory);
                    })
                    .then(() => {
                        console.log(`${workingDirectory} directory is recreated`);
                    });
            }
            return promise;
        })
        .catch((err) => {
            if (err.code === "ENOENT") {
                return fsMkdir(workingDirectory).then(() => {
                    console.log(`${workingDirectory} directory is created`);
                });
            }
            throw err;
        });
};

storage.statIndexFile = function (filePath, workingDirectory, fileId) {
    const indexFilePath = path.join(workingDirectory, fileId + ".idx");
    return new Promise((resolve, reject) => {
        fsAccess(indexFilePath, FS_CONSTANTS.F_OK)
            .then(() => {
                resolve({
                    exists: true,
                    path: indexFilePath,
                });
            })
            .catch((err) => {
                if (err.code === "ENOENT") {
                    resolve({
                        exists: false,
                        path: indexFilePath,
                    });
                }
                reject(err);
            });
    });
};

storage.readContent = function (contentPositionInfo, filePath) {
    return new Promise((resolve, reject) => {
        let receivedString = "";
        const readStream = createReadStream(filePath, {
            encoding: "utf8",
            start: contentPositionInfo.start,
            end: contentPositionInfo.end,
        });

        readStream.on("data", (chunk) => {
            receivedString += chunk.toString();
        });

        readStream.on("end", () => {
            resolve(receivedString);
        });

        readStream.on("error", (err) => {
            reject(err);
        });
    });
};

export default storage;
