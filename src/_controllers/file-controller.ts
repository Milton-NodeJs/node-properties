import { Request, Response, NextFunction } from 'express';
//import { FileService } from '../_services/file-service';
export class FileController {
   // public _fileService:FileService;
    constructor() { 
    //    this._fileService= new FileService();
    }
    public _upload = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.file) {
                return res.status(200).json({ message: 'No file provided!' });
            }   
            return res
                .status(201)
                .json({ message: 'File stored.', filePath: req.file.path });
        } catch (err) {
            res.status(500).send(err);
        }
    }



}