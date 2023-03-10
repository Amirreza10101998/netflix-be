import fs from "fs-extra";
import { dirname, join } from "path";
import { fileURLToPath } from "url"

const { readJSON, writeJSON, writeFile, unlink } = fs;

const mediasJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../../data/medias.json");

const publicFolderPath = join(process.cwd(), "./public/img/medias");

export const getMedias = () => readJSON(mediasJSONPath);
export const writeMedias = mediasArray => writeJSON(mediasJSONPath, mediasArray);

export const saveMediaImages = (fileContentAsABuffer, filename) =>
    writeFile(join(publicFolderPath, filename), fileContentAsABuffer);

export const deleteMediaImage = poster => unlink(join(publicFolderPath, "../..", poster));