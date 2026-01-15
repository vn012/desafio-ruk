import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('User GraphQL (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('getAll deve retornar lista de usuários', async () => {
    const query = `
      query {
        getAll {
          id
          name
          email
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(response.body.data.getAll).toBeInstanceOf(Array);
    expect(response.body.data.getAll.length).toBeGreaterThan(0);
    expect(response.body.data.getAll[0]).toHaveProperty('name');
    expect(response.body.data.getAll[0]).toHaveProperty('email');

  });

  it('getAll deve retornar emails válidos', async () => {
    const query = `
      query {
        getAll {
          email
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    const emails = response.body.data.getAll.map((user: any) => user.email);

    // Regex básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emails.forEach(email => {
      expect(emailRegex.test(email)).toBe(true);
    });
  })
  let param = "algum valor";
  it('teste deve retornar string', async () => {
    const query = `
      query {
        teste(nameTeste2: "${param}")
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(response.body.data.teste).toBe(param || "vazio"); // depende do retorno do seu service
  });
});
