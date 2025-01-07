import { Router } from 'express';
import client from '../../utils/dbClient.js';

const teamRouter = Router();

teamRouter.get('/', async (req, res) => {
  try {
    const teamMembers = await client.teamMember.findMany();
    res.status(200).json(teamMembers);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not retrieve team members' });
  }
});

export default teamRouter;

