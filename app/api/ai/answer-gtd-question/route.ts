// app/api/ai/generate-actions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ChatGroq } from '@langchain/groq';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';


const answerSchema = z.object({
    answer: z.boolean().describe('پاسخ سوال'),
    reason : z.string().describe('علت انتخاب پاسخ')
  
});


export async function POST(request: NextRequest) {
  try {
    const { question, title ,description } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: 'عنوان پروژه الزامی است' },
        { status: 400 }
      );
    }

    if (!question) {
      return NextResponse.json(
        { error: 'سوال الزامی است' },
        { status: 400 }
      );
    }

    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      //model: 'llama-3.1-8b-instant', 
      model: 'openai/gpt-oss-20b',
      temperature: 0.7,
    });


    const structuredModel = model.withStructuredOutput(answerSchema, {
      name: 'answer_question',
    });

   
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 
        `تو یک مربی GTD هستی که بر اساس عنوان و توضیحات پروژه،پاسخ سوال وارد شده را  می‌دهد.
       
            همچنین باید دلیل اینکه چرا این پاسخ را انتخاب کردی برای کاربر توضیح دهی
            این توضیح باید با شرح دلیل و استناد به مراحل gtd باشد.
        `],
      ['human', 'سوال: {question}\nعنوان آیتم inbox: {title}\nتوضیحات: {description}\nلطفاً پاسخ سوال را با توجه با موضوع بده.'],
    ]);

    const chain = prompt.pipe(structuredModel);
    const result = await chain.invoke({
      title: String(title).trim(),
      description: String(description || 'توضیحی داده نشده').trim(),
      question:String(question).trim(),
    });

    return NextResponse.json(result);

  } catch (error: any) {
    console.error('AI Error:', error);
    return NextResponse.json(
      { error: 'خطا در پیشنهاد تایپ' },
      { status: 500 }
    );
  }
}