import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import V1Routes from './routes/v1/index.js';

const app = express();
const PORT = process.env.PORT || 3000;
console.log("PORT:", PORT);

app.use(express.json()); 
app.use(cors());

// Use version 1 API routes
app.use("/api/v1", V1Routes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
