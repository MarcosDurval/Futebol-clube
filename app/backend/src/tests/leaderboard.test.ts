import * as sinon from 'sinon'
import * as  chai from 'chai'
import chaiHttp = require ('chai-http')
import { app } from '../app'
import {Response} from 'superagent'
import ModelClubs from '../database/models/sequelize/clubs'
import ModelMatchs from '../database/models/sequelize/matchs'
import {arrayMatch,arrayClubs,allMatch} from './mockLeader'

chai.use(chaiHttp)
const {expect} = chai
describe('testa o funcionamento da rota ',() => {
  let chaiHttpResponse: Response
  describe('getByAll',() => {
    before(() => {
      sinon.stub(ModelClubs,'findAll').resolves(arrayClubs as unknown as ModelClubs[]);
      sinon.stub(ModelMatchs,'findAll').resolves(arrayMatch as unknown as ModelMatchs[]);
    })
    after(() => {
      (ModelClubs.findAll as sinon.SinonStub).restore();
      (ModelMatchs.findAll as sinon.SinonStub).restore();
    })
    
    it('esperada todos o times com partidas finalizadas',async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard')
      expect(chaiHttpResponse).to.be.status(200)
      expect(chaiHttpResponse.body).to.deep.equal(allMatch)
    })
  })
})