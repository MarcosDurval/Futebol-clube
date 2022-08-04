import * as sinon from 'sinon'
import chaiHttp = require('chai-http') 
import * as chai from 'chai'
import { api } from '../api/app'
import ModelClubs from '../database/sequelize.models/clubs'
import { Response } from 'superagent'
import {allClubs, oneClub, IClubDTO } from './mock'
chai.use(chaiHttp)
const { expect } = chai


describe("Clubs mudar nome", () => {
  let chaiHttpResponse: Response

  describe("Buscando todos os clubs", () => {
    before(async () => {
      sinon.stub(ModelClubs, "findAll").resolves(allClubs as unknown as ModelClubs[])
    })
    after(() => {
      (ModelClubs.findAll as sinon.SinonStub).restore()

    })
    it("get na rota /clubs", async () => {
      chaiHttpResponse = await chai.request(api).get('/clubs')
      expect(chaiHttpResponse.body).to.be.an("array")
      const clubs = chaiHttpResponse.body as unknown as IClubDTO[]
      clubs.forEach((club) => {
        expect(club).to.be.all.keys('id', 'clubName')
      })
    })
  })
  describe("Buscando clubs por id", () => {
    before(async () => {
      sinon.stub(ModelClubs, "findByPk").resolves(oneClub as unknown as ModelClubs)
    })

    after(() => {
      (ModelClubs.findByPk as sinon.SinonStub).restore()
    })

    it("get na rota /clubs/id", async () => {
      chaiHttpResponse = await chai.request(api).get('/clubs/1')
      expect(chaiHttpResponse.body).to.be.an('object')
      expect(chaiHttpResponse.body).to.be.all.keys('id', 'clubName')

    })
  })
})