import * as Jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import path = require('path');
import { IUserJwt } from '../interface/users';

interface Payload {
  id: number,
  username: string,
  role: string,
  email: string
}

class HelpJwt {
  private _data:Jwt.SignOptions = { expiresIn: '10h', algorithm: 'HS256' };

  private _password:string;

  constructor() {
    this.findPassword();
  }

  private async findPassword() {
    this._password = await fs.readFile(
      path.resolve(__dirname, '..', '..', 'jwt.evaluation.key'),
      'utf-8',
    );
  }

  verify(token:string) {
    const result = Jwt.verify(token, this._password);
    return result as unknown as IUserJwt;
  }

  sign(payload:Payload) {
    const token = Jwt.sign(payload, this._password, this._data);
    return token;
  }
}

export default new HelpJwt();
