import express from 'express';
// import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router} from './routes';
const app: express.Application = express();
app.use(express.json());
app.use(cors());
app.use('/', router);
app.listen(8000, () => {
    console.log('Server is listening on port 8000');
})