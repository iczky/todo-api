import 'dotenv/config';
import express from 'express';
import databaseMiddleware from './middleware/database-middleware.js';
import todosRoute from './router/todos-route.js';
import authRouter from './router/auth-route.js';
import authMiddleware from './middleware/authentication-middleware.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(databaseMiddleware);

app.use('/api', authRouter);
app.use('/api', authMiddleware, todosRoute);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(port, () => {
  console.log(`========Server Run========`);
});
