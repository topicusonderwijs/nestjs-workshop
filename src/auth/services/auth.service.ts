import { Injectable } from '@nestjs/common';
import { User, UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from '../controllers/login.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, pass: string): Promise<User> {
        const user = await this.usersService.findOne(username, pass);
        return user ?? null;
    }

    async generateAccessToken(login: LoginDTO) {
        const user = await this.usersService.findOne(login.username, login.password);
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
