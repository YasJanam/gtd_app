import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { RetrievalService } from '../retrieval/retrieval.service';


@Injectable()
export class GenerationService {
    private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    constructor(
        private retrievalService: RetrievalService
    ) {}


    async answer(question: string) {
        const chunks = await this.retrievalService.retrieve(question, 5);

        if(chunks.length === 0) {
            return 'متأسفم، محتوای مرتبطی پیدا نکردم که بتوانم به آن پاسخ دهم.';
        }

        const context = chunks.map((c,i) => 
            `[بخش ${i + 1}] (منبع: ${c.sourceType} / ${c.title || c.sourceId})\n${c.content}`
        ).join('\n\n');


        const res = await this.openai.chat.completions.create({
            model: 'gpt-40-mini',
            messages: [
                {
                    role: 'system',
                    content: 
                    'شما یک دستیار پاسخگویی هستید. لطفاً فقط بر اساس "محتوای مرجع" ارائه شده به سؤال کاربر پاسخ دهید. اگر محتوای مرجع برای پاسخ کافی نیست، صادقانه بگویید که اطلاعات مرتبطی پیدا نشده و از خودتان پاسخ نسازید.'
                },
                {
                    role: 'user',
                    content: `【محتوای مرجع】\n${context}\n\n【سؤال】\n${question}`,
                }
            ],
            temperature: 0.2,
        });

        return res.choices[0].message.content;
    }
}
