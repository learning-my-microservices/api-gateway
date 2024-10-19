import { z } from 'zod';

export const RegisterDto = z.object({
  name: z.string().min(1, 'Name is required'),
  personalDoc: z.string().min(1, 'Personal document is required'),
  email: z
    .string({ required_error: 'E-mail is required' })
    .email('Invalid e-mail format'),
  password: z.string().min(1, 'Password is required'),
});

export type IRegisterDto = z.infer<typeof RegisterDto>;
