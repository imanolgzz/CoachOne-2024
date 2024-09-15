import express from 'express';
import cors from 'cors';
import { config } from './config/init.js';
import { authRouter, accountsRouter ,financeRouter,chatBot} from './routes/index.js';
const app = express();

const PORT = config.port;

app.use(cors());
app.use('/api/auth', authRouter);
app.use('/api/accounts', accountsRouter);
app.use("/api/accounts",financeRouter);
app.use("/chatBot",chatBot);
app.use("/api/finance",financeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

export default app;