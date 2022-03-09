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
// app.use(cors({ credentials:true, origin: process.env.URL_REACT_PRODUCT}));

// fix CORS
// const whitelist = [process.env.URL_REACT, process.env.URL_REACT_PRODUCT];
// app.use(cors({
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     },
//     credentials: true,
//     optionsSuccessStatus: 200,
//     allowedHeaders: [
//         'Content-Type',
//         'Authorization',
//         'X-Requested-With',
//         'device-remember-token',
//         'Access-Control-Allow-Origin',
//         'Origin',
//         'Accept',
//     ]
// }))


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