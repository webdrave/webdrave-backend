import { z } from 'zod';

export const contactSchema = z.object({
  fullname: z.string().min(1, "Fullname is required"),
  email: z.string().email("Invalid email format"),
  mobile: z.string().optional(),
  reason: z.string().min(1, "Reason is required"),
  message: z.string().min(1, "Message is required"),
});
