import multer from "multer";

const storage = multer.diskStorage({
    destination : (req, file, cb) => {  //destinaion is a function. cb - call back
        cb(null, 'public/upload')    //null if there is an error
    },
    //use the original filename when we save it with flutter
    filename : (req, file, cb) => {  
        //construct filename
        const filename = file.originalname;
        cb(null, filename);  
    },
});

const upload = multer({storage});

export default upload;