import * as sinon from 'sinon'
import * as  chai from 'chai'
import chaiHttp = require ('chai-http')
import { api } from '../api/app'
import {Response} from 'superagent'
import ModelClubs from '../database/sequelize.models/clubs'
import ModelMatchs from '../database/sequelize.models/matchs'
import {allMatchs,allClubs,resultMatchs} from './mockLeader'

chai.use(chaiHttp)
const {expect} = chai
describe('testa o funcionamento da rota ',() => {
  let chaiHttpResponse: Response
  describe('getByAll',() => {
    before(() => {
      sinon.stub(ModelClubs,'findAll').resolves(allClubs as unknown as ModelClubs[]);
      sinon.stub(ModelMatchs,'findAll').resolves(allMatchs as unknown as ModelMatchs[]);
    })
    after(() => {
      (ModelClubs.findAll as sinon.SinonStub).restore();
      (ModelMatchs.findAll as sinon.SinonStub).restore();
    })
    
    it('esperada todos o times com partidas finalizadas',async () => {
      chaiHttpResponse = await chai.request(api).get('/leaderboard')
      expect(chaiHttpResponse).to.be.status(200)
      expect(chaiHttpResponse.body).to.deep.equal(resultMatchs)
    })
  })
})