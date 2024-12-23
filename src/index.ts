import express, { Request, Response } from 'express';
import aboutRoutes from './routes/about.routes.js';
import dotenv from 'dotenv';
dotenv.config(); // This will load the variables from the .env file

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); // To parse JSON request bodies

app.use(aboutRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});