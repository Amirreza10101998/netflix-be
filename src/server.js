import Express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors"
import { badRequestHandler, genericErrorHandler, notFoundHandler } from "../errorHandlers.js";
import mediasRouter from "./api/medias/index.js";

const server = Express()
const Port = process.env.PORT;

/*----------Middlewares----------*/
const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL]

server.use(cors({
    origin: (currentOrigin, corsNext) => {
        if (!currentOrigin || whitelist.indexOf(currentOrigin) !== -1) {
            corsNext(null, true)
        } else {
            corsNext(createHttpError(400, `Origin ${currentOrigin} is not in the whitelist!`))
        }
    },
    // add the following line to add the Access-Control-Allow-Origin header
    exposedHeaders: ['Access-Control-Allow-Origin']
}));


server.use(Express.json());

/*----------Endpoints----------*/
server.use("/medias", mediasRouter);

/*----------Error Handlers----------*/
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);


server.listen(Port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on post: ${Port}`);
})




