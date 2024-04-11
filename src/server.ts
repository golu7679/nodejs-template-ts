import 'dotenv/config';

import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import type { Express, NextFunction, Response } from 'express';
const app: Express = express();
const PORT = +process.env.PORT || 3001;
import { morganMiddleware } from '@middleware';
import { logger } from '@config/winston-logger';

// Middleware
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(
    cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
);
app.use(cookieParser());
app.use(morganMiddleware);

// security
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                'script-src': ["'self'", 'your_website_url'],
                'img-src': [
                    "'self'",
                    'your_website_url',
                    'your_website_url',
                ],
            },
        },
        crossOriginResourcePolicy: false,
    }),
);

app.use((_, res: Response, next: NextFunction) => {
    res.setHeader('Permissions-Policy', '');
    next();
});
// app.set('trust proxy', 1); // for session

// to access files
app.use(express.static('public'));
app.use('/assets', express.static('assets'));
app.use('/.well-known', express.static('.well-known'));
app.use('/favicon.ico', express.static('favicon.ico'));

app.set('view engine', 'ejs');

app.disable('x-powered-by');


app.listen(PORT, async () => {
    logger.info(`Server is Running at http://localhost:${PORT}`);
});
