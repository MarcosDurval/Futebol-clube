import * as express from 'express';
import * as cors from 'cors';
import * as Routes from './routes';
import domain from './controller/erros/handleErros';
// refarotação feita após aprendizados com o Luiz furtado
class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.app.use(cors());
    // this.config();
    this.routes();
  }

  // private config():void {
  //   const accessControl: express.RequestHandler = (_req, res, next) => {
  //     res.header('Access-Control-Allow-Origin', '*');
  //     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  //     res.header('Access-Control-Allow-Headers', '*');
  //     next();
  //   };

  //   this.app.use(accessControl);
  //   // ...
  // }

  public routes() {
    this.app.use(express.json());
    this.app.use('/login', Routes.Login);
    this.app.use('/clubs', Routes.Clubs);
    this.app.use('/matchs', Routes.Matchs);
    this.app.use('/leaderboard', Routes.Leaderboards);
    this.app.use(domain);
  }

  // ...
  public start(PORT: string | number):void {
    // ...

    this.app.listen(PORT, () => {
      console.log(`ouvindo na porta ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
