import path from 'path';
import fs from 'fs';

export const clearImage = (filePath: any) => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};


import multer from 'multer';


const pathRoot = 'D:\\storage_node';

//const uploadFilePath = path.resolve('D:\\storage_node');
//const uploadFilePath = path.resolve('D:\\storage_node', 'uploads');
const uploadFilePath = path.resolve(pathRoot, 'uploads', 'deeper');
const storage = multer.diskStorage({
    destination: uploadFilePath //'D:\\storage_node'
    ,
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.originalname)
    }
});
const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {

        cb(null, true);
    } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
}
export const upload = multer({ storage: storage, fileFilter: fileFilter });

export const uploadFiles = upload.array('files', 35);
export const uploadSingleFile = upload.single('file');
