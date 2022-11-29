import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = {
    userId: number;
    username: string;
    password: string;
};

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            userId: 1,
            username: 'devdev',
            password: 'secret',
        },
    ];

    findOne(username: string, password: string): User | undefined {
        return this.users.find((user) => user.username === username && user.password === password);
    }

    getUserById(id: number): User {
        return this.users.find((user) => user.userId === id);
    }
}
