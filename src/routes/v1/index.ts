import dotenv from 'dotenv';
dotenv.config();

import { Router } from 'express';
import client from '../../utils/dbClient.js';
import { contactSchema } from '../../types/index.js';
import { sendContactEmail } from '../../utils/emailClient.js';
import teamRouter from './team.js';


const router = Router();

// POST /api/v1/contact
router.post('/contact', async (req: any, res: any) => {
  try {
    const validatedData = contactSchema.safeParse(req.body);
    if (!validatedData.success) {
      console.error(validatedData.error); // Log validation errors
      return res.status(400).json({ message: "Invalid data", errors: validatedData.error.errors });
    }

    const { fullname, email, mobile, reason, message } = req.body;

    // Send email notification to support email
    await sendContactEmail(fullname, email, mobile, reason, message);

    res.status(200).json({ message: "Successfully sent the email.", fullname, email, mobile, reason });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid data or server error' });
  }
});

// GET /api/v1/Team
router.use('/team', teamRouter );

// GET /api/v1/portfolio
router.get('/portfolio', async (req, res) => {
  try {
    const portfolioProjects = await client.portfolioProject.findMany();
    res.status(200).json(portfolioProjects);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not retrieve portfolio projects' });
  }
});

export default router;

