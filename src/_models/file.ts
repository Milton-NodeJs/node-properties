import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import { CreatedSchema, LastModSchema } from '../_commons/schemas/schemas';
import { ICreatedBase, ILastModBase } from '../_commons/interfaces/interfaces';
export const FileSchema: Schema = new mongoose.Schema({
  fieldname: {
    type: String,
    required: true
  },
  originalname: {
    type: String,
    required: true
  },
  encoding: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },

  active: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false },
  created: CreatedSchema,
  lastMod: LastModSchema
});
export interface IFileBase{

  fieldname?: String,
  originalname?: String,
  encoding?: String,
  mimetype?: String,
  destination?: String,
  filename?: String,
  path?: String,
  size?: Number
  active:  Boolean,
  deleted: Boolean,
  created?: ICreatedBase,
  lastMod?: ILastModBase
};
export const Filef = mongoose.model<IFileBase>('File', FileSchema, 'File');
