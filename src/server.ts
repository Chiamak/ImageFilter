import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {
  const app = express(); // Init the Express application
  const port = process.env.PORT || 8082;// Set the network port
  app.use(bodyParser.json());// Use the body parser middleware for post requests

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  app.get("/filteredimages", async function (req, res) {
    const image_url = 'https://res.cloudinary.com/practicaldev/image/fetch/s--LXOVBicp--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/jlij1lpng7zusvwjmjld.jpg';
    if (!image_url) {
      res.status(400).send("image_url not valid");
      return;
    }
    const filteredPath = await filterImageFromURL(image_url);
    res.sendFile(filteredPath, function () {
      deleteLocalFiles([filteredPath]);
    });
  });
  // endpoint to filter an image from a public url.
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */


  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (_req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();

function res(res: any) {
  throw new Error('Function not implemented.');
}
