import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';


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
}