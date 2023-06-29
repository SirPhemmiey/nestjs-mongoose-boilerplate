import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import { Model } from "mongoose";
import { Constants } from "../utils/constants/constants";
import { CreateUserDto } from "./dto/create-user-dto";
import { IUser } from "./interfaces/user.interface";

@Injectable()
export class UsersService {
    constructor(@InjectModel(Constants.USER_MODEL) private readonly userModel: Model<IUser>,
        private configService: ConfigService) { }

    async createUser(createUserDto: CreateUserDto) {
        const saltRounds = this.configService.get('auth.saltRounds');
        const passwordHash = await bcrypt.hash(createUserDto.password, saltRounds);
        createUserDto.password = passwordHash;
        const createdUser = await this.userModel.create(createUserDto);
        return { id: createdUser.id }
    }

    async findById(id: string, projection?: any): Promise<IUser> {
        const user = await this.userModel.findById({ id, projection });
        if (!user) {
            return null
        }
        return user.toJSON();
    }

    async findByEmail(email: string, projection?: any): Promise<IUser> {
        const user = await this.userModel.findOne({ email, projection });
        if (!user) {
            return null
        }
        return user.toJSON();
    }



}