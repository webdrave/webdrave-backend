import { Router } from 'express';
import client from '../../utils/dbClient.js';
import { contactSchema } from '../../types/index.js';


const router = Router();

// POST /api/v1/contact
router.post('/contact', async (req, res) => {
  try {
    const validatedData = contactSchema.safeParse(req.body);
    if (!validatedData.success) {
      res.status(400).json({ message: "Invalid data" });
      return 
    }
    const newContact = await client.contact.create({
      data: req.body,
    });

    // Send email notification to support mail...

    res.status(200).json({message: "Sucessfully Sent Mail.."});
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid data or server error' });
  }
});

// GET /api/v1/Team
router.get('/team', async (req, res) => {
  try {
    const teamMembers = await client.teamMember.findMany();
    res.status(200).json(teamMembers);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not retrieve team members' });
  }
});

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
