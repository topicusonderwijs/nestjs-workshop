import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Pizza {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'The unique id of this pizza' })
    id: number;

    @Column()
    @ApiProperty({
        example: 'Salami',
        description: 'The unique name of this pizza',
    })
    name: string;

    @Column()
    @ApiProperty({ example: 25, description: 'The size of this pizza in cm' })
    size: number;
}
