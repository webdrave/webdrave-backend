import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

// Contact Form Schema
const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  message: z.string(),
  reasonOfContact: z.string(),
});

// POST /api/v1/contact
router.post('/api/v1/contact', async (req, res) => {
  try {
    const validatedData = contactSchema.parse(req.body);
    const newContact = await prisma.contact.create({
      data: validatedData,
    });
    res.status(200).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid data or server error' });
  }
});

// GET /api/v1/Team
router.get('/api/v1/team', async (req, res) => {
  try {
    const teamMembers = await prisma.teamMember.findMany();
    res.status(200).json(teamMembers);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not retrieve team members' });
  }
});

// GET /api/v1/portfolio
router.get('/api/v1/portfolio', async (req, res) => {
  try {
    const portfolioProjects = await prisma.portfolioProject.findMany();
    res.status(200).json(portfolioProjects);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not retrieve portfolio projects' });
  }
});

export default router;
