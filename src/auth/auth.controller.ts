import { Controller, HttpStatus, Post, Body, HttpCode } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";


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
}