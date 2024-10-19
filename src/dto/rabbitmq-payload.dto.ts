import { z } from 'zod';

export const RabbitMQDto = z.object({
  accountId: z.string().min(1, 'accountId is required'),
  title: z.string().default('account-create-title'),
  message: z.string().default('account-create-message'),
  time: z.string().default(new Date().toISOString()),
});

export type IRabbitMQDto = z.infer<typeof RabbitMQDto>;
