import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Response } from 'supertest';
import { AppModule } from './../src/app.module';

describe('Review Controller (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        //[HINT] Probably missing some global pipes, check the main.ts
        await app.init();
    });

    it('It should create review for a pizza', () => {
        return request(app.getHttpServer())
            .post('/review/1')
            .send({
                reviewedBy: 'test-user',
                stars: 5,
            })
            .expect(201)
            .expect((res: Response, err: any) => {
                expect(err).toBeUndefined();
                expect(res.body.stars).toEqual(5);
                expect(res.body.reviewedBy).toEqual('test-user');
            });
    });

    it('It should return a 404 for an unknown pizza id', () => {
        return request(app.getHttpServer())
            .post('/review/123')
            .send({
                reviewedBy: 'test-user',
                stars: 5,
            })
            .expect(404);
    });
    it('It should return a 400 when stars < 0', () => {
        return request(app.getHttpServer())
            .post('/review/1')
            .send({
                reviewedBy: 'test-user',
                stars: -1,
            })
            .expect(400);
    });

    it('It should return a 400 when stars > 5', () => {
        return request(app.getHttpServer())
            .post('/review/1')
            .send({
                reviewedBy: 'test-user',
                stars: 6,
            })
            .expect(400);
    });

    it('It should return a 400 when reviewedBy is not a string', () => {
        return request(app.getHttpServer())
            .post('/review/1')
            .send({
                reviewedBy: 1234,
                stars: 3,
            })
            .expect(400);
    });
});
