import Application from './application';
import { configDotenv } from 'dotenv';
configDotenv();

const app = new Application();
app.listen(parseInt(process.env.PORT || '3000'));
