
import { Folder } from '../_models/folder';
//import MongoDb from 'mongodb';


export class FolderService {
    constructor() { }
    public _findAll = async () => {
        try {
            return await Folder.find().then(
                response => {
                    return ({ success: true, data: response });
                });
        } catch (err) {
            return { success: false, error: err };
        }
    }
    public _findById = async (id: string) => {
        try {
            return await Folder.findOne({ _id: id }).then(
                response => {
                    return ({ success: true, data: response });
                });
        } catch (err) {
            return { success: false, error: err };
        }
    }
    public _findOneByName = async (req: any) => {
        return await Folder.findOne(req);
    };

    public _save = async (req: any) => {
        try {
            let parentId = await (req.body.parentId ? req.body.parentId : 'Root')
            let newFolder = new Folder({
                name: req.body.name,
                path: req.body.path,
                description: req.body.description,
                parentId: parentId,
                files: req.files,
                active:true,
                deleted:false
            });
            console.log(newFolder);
            let _folderSaved = await newFolder.save();
            return { success: true, data: _folderSaved };
        } catch (err) {
            return { success: false, error: err };
        }
    }
    public _update = async (req: any) => {
        try {
            let _dataUpdate = {
                name: req.body.name,
                shortName: req.body.shortName,
                standardFolder: req.body.standardFolder
            };
            return await Folder.findByIdAndUpdate(req.body.id, { $set: _dataUpdate })
                .then(
                    response => {
                        return ({ success: true, data: response });
                    });
        } catch (err) {
            return { success: false, error: err };
        }
    }
    public _delete = async (id: string) => {
        try {
            return await Folder.findByIdAndRemove(id)
                .then(
                    response => {
                        return ({ success: true, message: 'Deleted Successfully!' });
                    });
        } catch (err) {
            return { success: false, error: err };
        }
    }
}