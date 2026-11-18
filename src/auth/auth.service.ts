import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import { WpRegisterDto } from "./dto/wp-register.dto";

import * as nodeCrypto from 'crypto';

export interface LoginResponse {
    token: string
    username: string
    uid: string
}



@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(username: string, password: string) : Promise<LoginResponse> {
        
        const user = await this.userService.findByUsername(username)
        if(!user) {
            throw new NotFoundException()
        }

        const passwordIsValid = await bcrypt.compare(password,user.password)
        if(!passwordIsValid) {
            throw new UnauthorizedException()
        }

        const userId = (user as any)._id;
        const payload = { sub:userId, username:user.username }
        const token = await this.jwtService.signAsync(payload);

        console.log(token)

        return { token:token, username:username, uid:userId,}
    }

    async registerFromWp(dto:WpRegisterDto) : Promise<{username:string,uid:string}> {
        console.log('register user from wp : start')
        const user = await this.userService.findByEmail(dto.username);
        if(user) {
            throw new BadRequestException('user already exist')
        }

        const randomPassword = nodeCrypto.randomBytes(16).toString('hex');
        const hashed = await bcrypt.hash(randomPassword, 10);
        let createdUser = await this.userService.create({
            email: dto.email,
            username: dto.username,
            password: hashed,
            first_name: dto.first_name,
            last_name: dto.last_name,
        });

        console.log(createdUser);

        return {username:dto.username , uid:(createdUser as any)._id}
    }
}