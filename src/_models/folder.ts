import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import { CreatedSchema, LastModSchema } from '../_commons/schemas/schemas';

import { ICreatedBase, ILastModBase } from '../_interfaces/interfaces';
import { FileSchema, IFileBase } from './file';


const FolderSchema: Schema = new mongoose.Schema({
  name: String,
  path: String,
  description: String,
  parentId: String,
  files: [FileSchema],

  active: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false },
  created: CreatedSchema,
  lastMod: LastModSchema
});
export interface IFolderBase extends Document {
  name: String,
  path: String,
  description: String,
  parentId: String,
  files: [IFileBase],

  active:  Boolean,
  deleted: Boolean,
  created?: ICreatedBase,
  lastMod?: ILastModBase
};

export const Folder = mongoose.model<IFolderBase>('Folder', FolderSchema, 'Folder');

