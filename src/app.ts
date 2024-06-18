import Application from './application';
import { configDotenv } from 'dotenv';

// Load environment variables from .env file
configDotenv();

// Create a new instance of the Application class
const app = new Application();

// Start the application by listening on the specified port
// If the PORT environment variable is not set, default to 3000
app.listen(parseInt(process.env.PORT || '3000'));