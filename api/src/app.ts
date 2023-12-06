import cors, { type CorsOptions } from 'cors';
import express from 'express';
import morgan from 'morgan';

import { mainRouter } from './routes';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/favicon.ico', (req, res) => {
  res.status(204).end();
});

const corsOptions: CorsOptions = {
  origin: '*', // Dominio permitido
  methods: 'GET,PATCH,POST,DELETE', // Métodos HTTP permitidos
  credentials: true, // Permitir enviar cookies y cabeceras de autenticación
};

app.use(cors(corsOptions));
app.use('/', mainRouter);

export { app };
