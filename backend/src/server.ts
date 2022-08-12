import { Api } from './api/app';
import 'dotenv/config';

const PORT = process.env.PORT || 3001;

new Api().start(PORT);
