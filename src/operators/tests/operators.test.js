const mongoose = require('mongoose');

const {
  describe, it, expect, beforeAll, afterAll, beforeEach,
} = require('@jest/globals');
const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { createServer } = require('../../server');

const app = createServer();

describe('Operators Routes', () => {
  const mockOperator = {
    ansRegister: "12597654863",
    cnpj: "37914667000693",
    corporateName: "Serviços LTDA",
    fantasyName: "Serviços shows",
    modality: "Saúde",
    adress: "Rua da Saúde, 50, sala 1015",
    district: "Bairro",
    city: "Recife",
    state: "PE",
    cep: "50070110",
    telephone: "81996096812",
    fax: "12345698",
    email: "empresa@email.com",
    representative: "Maria Luísa",
    representativeJob: "Gerente de Vendas"
    };
  
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await supertest(app)
      .post('/api/operators')
      .send(mockOperator);
  })

  it('should register a new operator by request body', async () => {
    const mockOperatorLocal = {
      ...mockOperator,
      ansRegister: '176259846'
    }

    const { statusCode, body } = await supertest(app)
      .post('/api/operators')
      .send(mockOperatorLocal);
    
    expect(statusCode).toBe(200);
    expect(body).toEqual({
      message: "Operator registered.",
      operator: {
        __v: expect.any(Number),
        _id: expect.any(String),
        ansRegister: expect.any(String),
        cnpj: expect.any(String),
        corporateName: expect.any(String),
        fantasyName: expect.any(String),
        modality: expect.any(String),
        adress: expect.any(String),
        createdAt: expect.any(String),
        district: expect.any(String),
        city: expect.any(String),
        state: expect.any(String),
        cep: expect.any(String),
        telephone: expect.any(String),
        fax: expect.any(String),
        email: expect.any(String),
        representative: expect.any(String),
        representativeJob: expect.any(String)
      }
    });
  });

  it('should not register operator with the same ans register', async () => {
    const { statusCode, body } = await supertest(app)
      .post('/api/operators')
      .send(mockOperator);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ message: `ANS Register ${mockOperator.ansRegister} already exists` });
  });

  it('should search all operators', async () => {
    const { statusCode } = await supertest(app)
      .get('/api/operators');

    expect(statusCode).toBe(200);
  });


  it('should search operator by register filter', async () => {
    const { statusCode, body } = await supertest(app)
      .get(`/api/operators/search?searchBy=register&filter=${mockOperator.ansRegister}&page=1&limit=1`)
    
    expect(statusCode).toBe(200);
    expect(body).toEqual([{
        ...mockOperator,
        createdAt: expect.any(String),
        __v: expect.any(Number),
        _id: expect.any(String)
    }]);
  });

  it('should search operator by city filter', async () => {
    const { statusCode, body } = await supertest(app)
      .get(`/api/operators/search?searchBy=city&filter=${mockOperator.city}&page=1&limit=1`)
    
    expect(statusCode).toBe(200);
    expect(body).toEqual([{
        ...mockOperator,
        createdAt: expect.any(String),
        __v: expect.any(Number),
        _id: expect.any(String)
    }]);
  });

  it('should search operator by representative filter', async () => {
    const { statusCode, body } = await supertest(app)
      .get(`/api/operators/search?searchBy=representative&filter=${mockOperator.representative}&page=1&limit=1`)
    
    expect(statusCode).toBe(200);
    expect(body).toEqual([{
        ...mockOperator,
        createdAt: expect.any(String),
        __v: expect.any(Number),
        _id: expect.any(String)
    }]);
  });

  it('should search operator by city filter', async () => {
    const { statusCode, body } = await supertest(app)
      .get(`/api/operators/search?searchBy=city&filter=${mockOperator.city}&page=1&limit=1`)
    
    expect(statusCode).toBe(200);
    expect(body).toEqual([{
        ...mockOperator,
        createdAt: expect.any(String),
        __v: expect.any(Number),
        _id: expect.any(String)
    }]);
  });

  it('should not search if the filter does not exist', async () => {
    const { statusCode, body } = await supertest(app)
      .get(`/api/operators/search?searchBy=city&filter=cidade&page=1&limit=1`)
    
    expect(statusCode).toBe(400);
    expect(body).toEqual({ message: `There is no operator with this city: cidade` });
  });

  it('should update operator successfully', async () => {
    const { statusCode, body } = await supertest(app)
      .put(`/api/operators/${mockOperator.ansRegister}`)
      .send({ representative: 'Representante' })
    
    expect(statusCode).toBe(200);
    expect(body).toEqual({ message: `Operator with ANS Register ${mockOperator.ansRegister} updated.` });
  });

  it('should not update operator with ans register inexistent', async () => {
    const { statusCode, body } = await supertest(app)
      .put(`/api/operators/1111111`)
      .send({ representative: 'Representante' })
    
    expect(statusCode).toBe(400);
    expect(body).toEqual({ message: 'ANS Register 1111111 does not exist.' });
  });

  it('should search all operators and return empty', async () => {
    await supertest(app)
      .delete('/api/operators/176259846')

      await supertest(app)
      .delete('/api/operators/12597654863')
    
    const { statusCode, body } = await supertest(app)
      .get('/api/operators')
    
    expect(statusCode).toBe(400);
    expect(body).toEqual({ message: 'There is no operators on database.' })
  })

  it('should register all operators from csv file', async() => {
    const { statusCode } = await supertest(app)
      .post('/api/operators/csv')

    expect(statusCode).toBe(200);
  }, 10000);

  it('should not register an operator successfully', async () => {
    await supertest(app)
      .post('/api/operators/csv');
    
    const { statusCode, body } = await supertest(app)
      .post('/api/operators/csv');
    
    expect(statusCode).toBe(200);
    expect(body).toEqual({
      message: 'All operators were already registered',
    })
  }, 20000)

  it('should delete operator successfully', async () => {
    const { statusCode, body } = await supertest(app)
      .delete(`/api/operators/${mockOperator.ansRegister}`);
    
    expect(statusCode).toBe(200);
    expect(body).toEqual({ message: `Operator with ANS Register ${mockOperator.ansRegister} deleted` });
  });

  it('should not delete operator with ans register inexistent', async () => {
    const { statusCode, body } = await supertest(app)
      .delete(`/api/operators/12368724`);
    
    expect(statusCode).toBe(400);
    expect(body).toEqual({ message: 'ANS Register does not exist.' });
  });
});