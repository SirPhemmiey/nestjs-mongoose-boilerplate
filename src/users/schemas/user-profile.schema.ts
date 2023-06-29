import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { RelationshipStatus, Religion } from '../interfaces/user-profile.interface';
import { Transform } from 'class-transformer';

export type UserProfileDocument = HydratedDocument<UserProfile>;

@Schema({
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc: any, ret: any) {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class UserProfile {

  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop()
  dob: Date;

  @Prop()
  height: number;

  @Prop()
  hometown: string;

  @Prop()
  gender: string;

  @Prop()
  sexuality: string;

  @Prop()
  ethnicity: string;

  @Prop()
  pronouns: string;

  @Prop({ enum: Object.values(RelationshipStatus) })
  relationshipStatus: string;

  @Prop()
  vices: string;

  @Prop({ enum: Object.values(Religion) })
  religion: string;

  @Prop()
  language: string;

}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
