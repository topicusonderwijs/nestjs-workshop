import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Response } from 'supertest';
import { AppModule } from './../src/app.module';
import { JwtAuthGuard } from '../src/auth/guards/JwtAuthGuard';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from 'nestjs-pino';
import { applyAppConfig } from '../src/main.config';

describe('Pizza Controller (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue(true)
            .compile();

        app = moduleFixture.createNestApplication();
        const logger = app.get(Logger);
        applyAppConfig(app, logger);
        await app.init();
    });

    it('It should find a Pizza by id', () => {
        return request(app.getHttpServer()).get('/pizza/1').expect(200);
    });

    it('It should return 404 for invalid id', () => {
        return request(app.getHttpServer()).get('/pizza/234').expect(404);
    });

    it('It should return 400 for duplicate pizza name', () => {
        return request(app.getHttpServer())
            .post('/pizza')
            .send({
                id: 1,
                name: 'Salami',
                size: 40,
            })
            .expect(400);
    });

    it('It should create a new pizza', () => {
        const pizzaName = `pizza - ${uuidv4()}`;
        return request(app.getHttpServer())
            .post('/pizza')
            .send({
                name: pizzaName,
                size: 40,
            })
            .expect((res: Response) => {
                console.log(res.body);
            })
            .expect(201)
            .expect((res: Response, err: any) => {
                expect(err).toBeUndefined();
                expect(res.body.name).toEqual(pizzaName);
            });
    });
});
