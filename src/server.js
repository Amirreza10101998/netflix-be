import Express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors"
import { badRequestHandler, genericErrorHandler, notFoundHandler } from "../errorHandlers.js";
import mediasRouter from "./api/medias/index.js";

const server = Express()
const port = 3001;

/*----------Middlewares----------*/
server.use(cors());
server.use(Express.json());

/*----------Endpoints----------*/
server.use("/medias", mediasRouter);

/*----------Error Handlers----------*/
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);


server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on post: ${port}`);
})




