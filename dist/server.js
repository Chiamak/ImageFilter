"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const util_1 = require("./util/util");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)(); // Init the Express application
    const port = process.env.PORT || 8082; // Set the network port
    app.use(body_parser_1.default.json()); // Use the body parser middleware for post requests
    // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
    // GET /filteredimage?image_url={{URL}}
    app.get("/filteredimages", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const image_url = 'https://res.cloudinary.com/practicaldev/image/fetch/s--LXOVBicp--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/jlij1lpng7zusvwjmjld.jpg';
            if (!image_url) {
                res.status(400).send("image_url not valid");
                return;
            }
            const filteredPath = yield (0, util_1.filterImageFromURL)(image_url);
            res.sendFile(filteredPath, function () {
                (0, util_1.deleteLocalFiles)([filteredPath]);
            });
        });
    });
    // endpoint to filter an image from a public url.
    
    // Displays a simple message to the user
    app.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send("try GET /filteredimage?image_url={{}}");
    }));
    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
}))();
function res(res) {
    throw new Error('Function not implemented.');
}
