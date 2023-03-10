import Express from "express";
import createHttpError from "http-errors";
import multer from "multer";
import { extname } from "path"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import { findMediaById, findMediaByIdAndUpdate, findMedias, saveNewMedia } from "../../lib/db/tools.js"


const mediasRouter = Express.Router();

const cloudinaryUploader = multer({
    storage: new CloudinaryStorage({
        cloudinary,
        params: {
            folder: "netflix-be/posters"
        }
    }),
}).single("poster")

//1. Post media
mediasRouter.post("/",
    async (req, res, next) => {
        try {
            const id = await saveNewMedia(req.body);
            res.status(201).send({ message: `Media with id: ${id} uploaded successfully!` })
        } catch (error) {
            next(error)
        }
    });

//2. Returns a list of medias
mediasRouter.get("/",
    async (req, res, next) => {
        try {
            const medias = await findMedias();
            res.send(medias)
        } catch (error) {
            next(error)
        }
    });

//3. Retruns a single media
mediasRouter.get("/:mediaId",
    async (req, res, next) => {
        try {
            const media = await findMediaById(req.params.mediaId)
            if (media) {
                res.send(media)
            } else {
                next(createHttpError(`Media with id: ${req.params.mediaId} not found!`))
            }
        } catch (error) {
            next(error)
        }
    });

//4. Upload poster to single media
mediasRouter.post("/:mediaId/poster",
    cloudinaryUploader,
    async (req, res, next) => {
        try {
            res.send({ message: "File Uploaded!" })
        } catch (error) {
            next(error)
        }
    })


export default mediasRouter;