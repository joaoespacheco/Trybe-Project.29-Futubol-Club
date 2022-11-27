import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Team from '../database/models/Team';

import { 
  allTeamsMock,
  oneTeamMock
} from './mocks/teamsMocks';

import {
  payloadMock,
  tokenMock,
} from './mocks/userMocks'

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Verifica a rota /teams', () => {
  describe('Testes relacionados as requisições do tipo GET: /teams/', () => {
    afterEach(() => sinon.restore());

    it('Testando resposta caso requisição seja concluída', async () => {
      sinon.stub(Team, 'findAll').resolves(allTeamsMock as Team[])
      sinon.stub(jwt, 'verify').resolves(payloadMock);

      const response = await chai
      .request(app)
      .get('/teams')
      .set('authorization', tokenMock)

      expect(response.status).to.be.eq(200);
      expect(response.body).to.deep.eq(allTeamsMock);
    });

  });

  describe('Testes relacionados as requisições do tipo GET: /teams/:id', () => {
    afterEach(() => sinon.restore());

    it('Testando resposta caso id e teamName estejam corretos', async () => {
      sinon.stub(Team, 'findByPk').resolves(oneTeamMock as Team)
      sinon.stub(jwt, 'verify').resolves(payloadMock);

      const response = await chai
      .request(app)
      .get('/teams/5')
      .set('authorization', tokenMock)

      expect(response.status).to.be.eq(200);
      expect(response.body).to.deep.eq(oneTeamMock);
    });

  });

});
