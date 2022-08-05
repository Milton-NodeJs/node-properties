import express, { Request, Response, NextFunction } from 'express';

import multer from 'multer';
import path from 'path';
import { Folder } from '../_models/folder';
const router = express.Router();
const pathRoot = 'D:\\storage_node';

//const uploadFilePath = path.resolve('D:\\storage_node');
//const uploadFilePath = path.resolve('D:\\storage_node', 'uploads');
const uploadFilePath = path.resolve(pathRoot, 'uploads', 'deeper');
const storage = multer.diskStorage({
    destination: uploadFilePath //'D:\\storage_node'
    //cb(null, 'D:\storage_node')

    //destination: function (req, file, cb) {
    //    cb(null, './uploads/')
    //cb(null, 'D:\storage_node')    
    // }
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
const upload = multer({ storage: storage, fileFilter: fileFilter });
router.post('/upload', upload.single('file'), async (req: Request,
    res: Response, next: NextFunction) => {
    console.log(req.file);
    var fileToAdd = {
        files: {
            fieldname: req.file?.fieldname,
            originalname: req.file?.originalname,
            encoding: req.file?.encoding,
            mimetype: req.file?.mimetype,
            destination: req.file?.destination,
            filename: req.file?.filename,
            path: req.file?.path,
            size: req.file?.size,
            active: true,
            deleted: false
        }
    };
    const addedFiles = await Folder.findByIdAndUpdate(req.body.id, { $push: fileToAdd });
    res.send(addedFiles);
});
export default router;