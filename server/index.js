import express from 'express';
import cors from 'cors';
import { config } from './config/init.js';
import { authRouter, accountsRouter ,financeRouter,transferRouter} from './routes/index.js';
const app = express();

const PORT = config.port;

app.use(cors());
app.use('/api/auth', authRouter);
app.use('/api/accounts', accountsRouter);
app.use("/api/finance",financeRouter);
app.use("/api/transfer",transferRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

export default app;