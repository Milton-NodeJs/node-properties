import { Request, Response, NextFunction } from 'express';
import { FolderService } from '../_services/folder-service';
export class FolderController {
    public _folderService:FolderService;
    constructor() { 
        this._folderService= new FolderService();
    }
    public _findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allrecords = await this._folderService._findAll();
            return res.send(allrecords);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    public _findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const oneRecord = await this._folderService._findById(req.params.id);
            return res.send(oneRecord);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    public _save = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createdRecord = await this._folderService._save(req);
            return res.send(createdRecord);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    public _update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updatedRecord = await this._folderService._update(req);
            return res.send(updatedRecord);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    public _delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deletedRecord = await this._folderService._delete(req.params.id);
            return res.send(deletedRecord);
        } catch (err) {
            res.status(500).send(err);
        }
    }

}