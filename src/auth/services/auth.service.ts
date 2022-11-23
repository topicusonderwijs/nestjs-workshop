import { Injectable } from '@nestjs/common';
import { User, UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, pass: string): Promise<User> {
        const user = await this.usersService.findOne(username, pass);
        return user ?? null;
    }

    generateAccessToken(user: User): { access_token: string } {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
