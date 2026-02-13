import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth & Protected Routes (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should register a new user', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      })
      .expect(201);
  });

  it('should login and return JWT token', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      })
      .expect(201);

    expect(response.body.access_token).toBeDefined();

    accessToken = response.body.access_token;
  });

  it('should access protected route with token', async () => {
    await request(app.getHttpServer())
      .post('/articles')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'E2E Article',
        content: 'Testing JWT',
      })
      .expect(201);
  });

  it('should fail without token', async () => {
    await request(app.getHttpServer())
      .post('/articles')
      .send({
        title: 'Fail Article',
        content: 'No Token',
      })
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
