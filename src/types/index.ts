import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  message: z.string(),
  reasonOfContact: z.string(),
});