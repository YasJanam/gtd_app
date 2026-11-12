import { Controller, HttpStatus, Post, Body, HttpCode, UseGuards, } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { XApiKeyGuard } from "./guards/x-api-key.guards";

import { WpRegisterDto } from "./dto/wp-register.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto:LoginDto) {
       // console.log('👤 username:', loginDto.username);
       // console.log('🔑 password:', loginDto.password);

        const res = await this.authService.login(loginDto.username, loginDto.password);
        return {
            statusCode:200,
            success:true,
            message:'Login successful',
            data:res,
        }
    }




    @Post('register-from-wp')
    @UseGuards(XApiKeyGuard)   
    async registerFromWp(@Body() dto: WpRegisterDto) {    
        return this.authService.registerFromWp(dto);
    }

}