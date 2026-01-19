import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('User GraphQL (E2E)', () => {
  let app: INestApplication;
  let createdUserId: number;
  
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

  /**
   * CREATE USER
   */
  it('createUser deve criar um usuário', async () => {
    const mutation = `
      mutation CreateUser($data: UserRequestDto!) {
        createUser(data: $data) {
          id
          name
          email
          password
          created_at
        }
      }
    `;

    const variables = {
      data: {
        name: 'Usuário E2E',
        email: 'e2e.user@email.com',
        password: '123456',
      },
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: mutation, variables })
      .expect(200);

    const user = response.body.data.createUser;

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Usuário E2E');
    expect(user.email).toBe('e2e.user@email.com');
    expect(user.password).toBe(''); // conforme seu resolver
    expect(user.created_at).toBeDefined();

    createdUserId = user.id;
  });

  /**
   * GET USER BY ID
   */
  it('getUserById deve retornar usuário existente', async () => {
    const query = `
      query GetUserById($id: Float!) {
        getUserById(id: $id) {
          id
          name
          email
          password
          created_at
        }
      }
    `;

    const variables = {
      id: createdUserId,
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query, variables })
      .expect(200);

    const user = response.body.data.getUserById;

    expect(user.id).toBe(createdUserId);
    expect(user.name).toBe('Usuário E2E');
    expect(user.email).toBe('e2e.user@email.com');
    expect(user.password).toBe('');
  });

  /**
   * GET USER BY ID - NOT FOUND
   */
  it('getUserById deve retornar null se usuário não existir', async () => {
    const query = `
      query GetUserById($id: Float!) {
        getUserById(id: $id) {
          id
        }
      }
    `;

    const variables = {
      id: 999999,
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query, variables })
      .expect(200);

    expect(response.body.data.getUserById).toBeNull();
  });
});
