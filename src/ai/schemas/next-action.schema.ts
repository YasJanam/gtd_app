// src/ai/schemas/next-action.schema.ts
import { z } from 'zod';

export const nextActionSchema = z.object({
    actions: z.array(
        z.object({
            title: z.string().describe('عنوان کوتاه و واضح اقدام (حداکثر ۵۰ کاراکتر)'),
            description: z.string().describe('توضیح مفصل‌تر اقدام و دلیل انجامش'),
            order: z.number().describe('ترتیب پیشنهادی (از ۱ شروع کن)'),
            estimatedMinutes: z.number().describe('زمان تقریبی تخمینی (دقیقه)'),
        })
    ).describe('لیست اقدامات بعدی پیشنهادی'),
});

export type NextActionOutput = z.infer<typeof nextActionSchema>;