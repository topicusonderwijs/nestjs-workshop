import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('/login')
export class LoginController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post()
    public async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
