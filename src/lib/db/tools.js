import { deleteMediaImage, getMedias, writeMedias } from "../fs/tools.js";
import uniqid from "uniqid"

export const saveNewMedia = async newMediaData => {
    const medias = await getMedias();

    const newMedia = { ...newMediaData, createdAt: new Date(), id: uniqid() };

    medias.push(newMedia);

    await writeMedias(medias)

    return newMedia.id
};

export const findMedias = async () => await getMedias();

export const findMediaById = async mediaId => {
    const medias = await getMedias();

    const media = medias.find(media => media.id === mediaId);

    return media
};

export const findMediaByIdAndUpdate = async (mediaId, updates) => {
    const medias = await getMedias();
    const index = medias.findIndex(media => media.id === mediaId);

    if (index !== -1) {
        medias[index] = { ...medias[index], ...updates, updatedAt: new Date() }
        await writeMedias(medias)
        return medias[index]
    } else {
        return null
    }
};

export const findMediaByIdAndDelete = async mediaId => {
    const medias = await getMedias()

    const media = await findMediaById(mediaId);
    if (media) {
        await deleteMediaImage(media.imageURL)
        const remainingMedias = medias.filter(media => media.id !== mediaId)
        await writeMedias(remainingMedias)
    } else {
        return null
    }
};