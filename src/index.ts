import config from './config';
import express from 'express';
import logger from './logger/logger';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import requestLogger from './middleware/requestLogger';
import routes from './routes';
import { ApiException } from './repository/util/exceptions/ApiException';
const app=express();

//config helmet
app.use(helmet());

//config body parser
app.use(bodyParser.json());
//localhost : 3000/orders?Limit=10.. to capture query parameter we use the encoder
app.use(bodyParser.urlencoded({ extended: true }));

//config cors cross origin resouce sharing: accessible by only some links-> security.
app.use(cors());

// add middleware for request logging
app.use(requestLogger);

// config routes
app.use('/', routes);

//config 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

//config error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(err instanceof ApiException){
        const apiException= err as ApiException;
        logger.error(`API Exception: ${apiException.status} ${apiException.message}`);
        res.status(apiException.status).json({ error: apiException.message });
    }else{
        logger.error(`Unexpected error: ${err.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(config.port, config.host, () => {
    logger.info(`Server is running on port http://%s:%d`, config.host, config.port);
});