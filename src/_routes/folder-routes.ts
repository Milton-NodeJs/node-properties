import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

import { uploadFiles } from '../_commons/helpers/file-helper';

import { FolderController } from '../_controllers/folder-controller';
const _folderController = new FolderController();
router.get('/:id', _folderController._findById);
router.get('/', _folderController._findAll);
router.post('/', uploadFiles, _folderController._save);
router.put('/', _folderController._update);
router.delete('/:id', _folderController._delete);

export default router;