import Express from "express";
import createHttpError from "http-errors";
import multer from "multer";
import { extname } from "path"
import { findMediaById, findMediaByIdAndUpdate, findMedias, saveNewMedia } from "../../lib/db/tools.js"


const mediasRouter = Express.Router();

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
            next()
        }
    });

//3. Retruns a single media
mediasRouter.get("/:mediaId",
    async (req, res, next) => {
        try {
            const media = await findMediaById(req.params.mediaId)
            if (media) {
                req.send(media)
            } else {
                next(createHttpError(`Media with id: ${req.params.mediaId} not found!`))
            }
        } catch (error) {
            next()
        }
    });

//4. Upload poster to single media
mediasRouter.get("/:mediaId/poster",
    multer().single("poster"),
    async (req, res, next) => {
        try {
            const filename = req.params.mediaId + extname(req.file.originalname)
            const media = await findMediaByIdAndUpdate(req.params.mediaId, { poster: `/img/medias/${filename}` })
        } catch (error) {

        }
    })



export default mediasRouter;