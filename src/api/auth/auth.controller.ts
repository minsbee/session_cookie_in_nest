import { Controller } from '@nestjs/common';
import { LocalAuthGuard } from './guards/session-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
