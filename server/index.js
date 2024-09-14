import express from 'express';
import {config} from './config/init.js';
import { authRouter } from './routes/index.js';
const app = express();

const PORT = config.port;

app.use('/api/auth', authRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

export default app