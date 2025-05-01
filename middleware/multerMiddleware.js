import multer from "multer";

import DataParser from 'datauri/parser.js';
import path from 'path';

//Initially we used disk storage - It is not supported in Render free version. So now use memory storage
// const storage = multer.diskStorage({
//     destination : (req, file, cb) => {  //destinaion is a function. cb - call back
//         cb(null, 'public/upload')    //null if there is an error
//     },
//     //use the original filename when we save it with flutter
//     filename : (req, file, cb) => {  
//         //construct filename
//         const filename = file.originalname;
//         cb(null, filename);  
//     },
// });
const storage = multer.memoryStorage();

const upload = multer({storage});

const parser = new DataParser();

export const formatImage = (file) => {
    const fileExtension = path.extname(file.originalname).toString();
    //This is only going to be passed to cloudinary
    return parser.format(fileExtension, file.buffer).content;
  
}

export default upload;