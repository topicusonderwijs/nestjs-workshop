import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Response } from 'supertest';
import { AppModule } from './../src/app.module';
import { v4 as uuidv4 } from 'uuid';

describe('Pizza Controller (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        //[HINT] Probably missing some global pipes, check the main.ts
        await app.init();
    });

    it('It should find a Pizza by id', () => {
        return request(app.getHttpServer()).get('/pizza/1').expect(200);
    });

    it('It should return 404 for invalid id', () => {
        return request(app.getHttpServer()).get('/pizza/234').expect(404);
    });

    it('It should create a new pizza', () => {
        const pizzaName = `pizza - ${uuidv4()}`;
        return request(app.getHttpServer())
            .post('/pizza')
            .send({
                name: pizzaName,
                size: 40,
            })
            .expect(201)
            .expect((res: Response, err: any) => {
                expect(err).toBeUndefined();
                expect(res.body.name).toEqual(pizzaName);
            });
    });

    it('It should return 400 when you create a pizza without a name', () => {
        return request(app.getHttpServer())
            .post('/pizza')
            .send({
                size: 40,
            })
            .expect(400);
    });

    it('It should return 400 for duplicate pizza name', () => {
        //There is a hardcoded pizza in the service with the name Salami, so we should not be able to create a new one
        return request(app.getHttpServer())
            .post('/pizza')
            .send({
                name: 'Salami',
                size: 40,
            })
            .expect(400);
    });

    it('It should return a 400 when name is not a string', () => {
        return request(app.getHttpServer())
            .post('/pizza')
            .send({
                name: 1234,
                size: 40,
            })
            .expect(400);
    });
});
