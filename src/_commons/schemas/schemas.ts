import { Schema } from 'mongoose';
export const AddressSchema = new Schema(
    {
        city: String,
        location: String,
        state: String,
        zipcode: String,
        line1: String,
        line2: String
    },
    { _id: false });
export const ContactSchema = new Schema(
    {
        phone: [String],
        cellphone: [String],
        email: [String],
        fax: [String],
        contactId: String
    },
    { _id: false });
export const CreatedSchema = new Schema(
    {
        createdDate: { type: Date, default: Date.now },
        createdBy: String,
        createdByIp: String
    },
    { _id: false });

export const LastModSchema = new Schema({

    lastModDate: { type: Date, default: Date.now },
    lastModBy: String,
    lastModByIp: String
},
    { _id: false });