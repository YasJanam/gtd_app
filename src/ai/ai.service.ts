// src/ai/ai.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ConfigService } from '@nestjs/config';
import { nextActionSchema, NextActionOutput } from './schemas/next-action.schema';
import { ChatGroq } from '@langchain/groq';


@Injectable()
export class AiService {
    private model: ChatGroq;
    private structuredModel: any;

    constructor(private configService: ConfigService) {
        
        this.model = new ChatGroq({
            model: 'openai/gpt-oss-20b',
            temperature: 0.7,
            apiKey:process.env.GROQ_API_KEY,
           
            /*configuration: {
                baseURL: 'https://api.groq.com/openai/v1',  
            },*/
        });

           // baseURL: 'https://generativelanguage.googleapis.com/v1beta/models?secret_key' -> مشاهده لست مدل ها در گوگل
           // https://generativelanguage.googleapis.com/v1beta/models?key
        
      


        // ====== Structured Output ======
        this.structuredModel = this.model.withStructuredOutput(nextActionSchema, {
            name: 'generate_next_actions',
        });
    }

    async generateNextActions(
        title: string,
        description?: string,
    ): Promise<NextActionOutput> {
       
        if (!title || title.trim().length === 0) {
            throw new BadRequestException('Project title is required');
        }

        // ====== Prompt ======
        const prompt = ChatPromptTemplate.fromMessages([
            [
                'system',
                `تو یک مربی بهره‌وری هستی که در متدولوژی GTD (Getting Things Done) تخصص داری.

وظیفه تو اینه که با توجه به "عنوان پروژه" و "توضیحات" کاربر، یک لیست از "اقدامات بعدی" (Next Actions) پیشنهاد بدی.

قوانین:
1. هر Next Action باید یک اقدام مشخص و قابل انجام باشه (نه یه هدف کلی)
2. اقدامات رو به ترتیب منطقی پیشنهاد بده
3. از افعال ساده استفاده کن (مثل "تماس بگیر"، "بنویس"، "بخر")
4. حداکثر ۵ اقدام پیشنهاد بده
5. اگه اطلاعات کافی نیست، اقدامات عمومی‌تر پیشنهاد بده

هر اقدامی که لازمه برای انجام پروژه در نظر بگیر و تمام اقدامات ممکن رو پیدا کن
هر تعداد اقدامی که ممکنه برای انجام

خروجی رو دقیقاً مطابق Schema بده.`,
            ],
            [
                'human',
                `عنوان پروژه: {title}

توضیحات: {description}

لطفاً اقدامات بعدی این پروژه رو پیشنهاد بده.`,
            ],
        ]);

        try {
            const chain = prompt.pipe(this.structuredModel);

            const result = await chain.invoke({
                title: title.trim(),
                description: description?.trim() || 'توضیحی داده نشده',
            });

            console.log(result);

            return result as NextActionOutput;

        } catch (error: any) {
            console.error('AI Error:', error);
            throw new BadRequestException(
                error.message || 'خطا در تولید اقدامات بعدی',
            );
        }
    }
}