import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
    @ApiProperty({ example: 'devdev', description: 'The username of the user logging in' })
    username: string;
    @ApiProperty({ example: 'secret', description: 'The password of the user logging in' })
    password: string;
}
