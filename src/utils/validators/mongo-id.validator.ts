import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import mongoose from "mongoose";

@Injectable()
export class ValidateMongoId implements PipeTransform<string> {
    transform(value: string, _: ArgumentMetadata): string {
        if (mongoose.Types.ObjectId.isValid(value)) {
            if ((String)(new mongoose.Types.ObjectId(value)) === value) {
                return value;
            }
        }
        throw new BadRequestException("ID is invalid");

    };
}