import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import connectDB from "./config/connectDB";
import cors from 'cors';
import cookieParser from "cookie-parser";

require('dotenv').config();
let app = express();

app.use(cors({ credentials:true, origin: process.env.URL_REACT}));


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}))

app.use(cookieParser());
app.use(express.json());

viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("Backend NodeJs is running on the port: " + port)
})