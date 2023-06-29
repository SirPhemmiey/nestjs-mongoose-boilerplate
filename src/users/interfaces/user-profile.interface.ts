import { Document } from 'mongoose';

export interface IUserProfile extends Document {
    userId: string
    dob: Date,
    height: number,
    hometown: string,
    gender: string,
    sexuality: string,
    ethnicity: string,
    pronouns: string,
    relationshipStatus: RelationshipStatus,
    vices: string,
    religion: Religion,
    language: string
}

export enum RelationshipStatus {
    Single = 'Single',
    Married = 'Married',
}

export enum Religion {
    Christianity = 'Christianity',
    Islam = 'Islam',
    Atheist = 'Atheist',
}