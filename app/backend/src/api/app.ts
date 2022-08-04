import * as express from 'express';
import * as cors from 'cors';
import * as Routes from './routes';
import domain from './middleware/erros/handleErros';

// refarotação feita após aprendizados com o Luiz furtado
class Api {
  public api: express.Express;
  // ...

  constructor() {
    // ...
    this.api = express();
    this.api.use(cors());
    this.routes();
  }

  public routes() {
    this.api.use(express.json());
    this.api.use('/login', Routes.Login);
    this.api.use('/clubs', Routes.Clubs);
    this.api.use('/matchs', Routes.Matchs);
    this.api.use('/leaderboard', Routes.Leaderboards);
    this.api.use(domain);
  }

  // ...
  public start(PORT: string | number):void {
    // ...

    this.api.listen(PORT, () => {
      console.log(`ouvindo na porta ${PORT}`);
    });
  }
}

export { Api };

// A execução dos testes de cobertura depende dessa exportação
export const { api } = new Api();
