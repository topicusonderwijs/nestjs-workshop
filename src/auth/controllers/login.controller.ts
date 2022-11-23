 import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './login.dto';

@Controller('/login')
@ApiTags('Login')
export class LoginController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post()
    @ApiOperation({ description: `Login a user to get a JWT token` })
    @ApiCreatedResponse({ description: `The JWT token for this user` })
    public async login(@Body() login: LoginDTO) {
        return this.authService.generateAccessToken(login);
    }
}
