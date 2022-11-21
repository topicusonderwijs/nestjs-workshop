import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            username: 'devdev',
            password: 'secret',
        },
    ];

    async findOne(username: string, password: string): Promise<User | undefined> {
        return this.users.find((user) => user.username === username && user.password === password);
    }
}
