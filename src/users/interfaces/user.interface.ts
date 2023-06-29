import { Document } from 'mongoose';

export interface IUser extends Document {
    fullname: string,
    email: string,
    phone: string,
    password: string,
}