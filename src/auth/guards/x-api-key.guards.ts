
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class XApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    const expectedKey = this.configService.get<string>('ZIRESEFR_API_PLUGIN_SECRET_KEY');

    if (!apiKey || apiKey !== expectedKey) {
      throw new UnauthorizedException('Invalid API key');
    }
    return true;
  }
}