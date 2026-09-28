import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';


@Module({
    imports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '1h'},
        }),
        PassportModule,
        UsersModule,
    ],
    providers: [AuthService,JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})

export class AuthModule {}
