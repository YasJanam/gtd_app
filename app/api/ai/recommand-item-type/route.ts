// app/api/ai/generate-actions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ChatGroq } from '@langchain/groq';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';


const recommandSchema = z.object({
  
    type: z.string().describe('تایپ آیتم ورودی '),
    reason : z.string().describe('علت انتخاب تایپ')
  
});


export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: 'عنوان پروژه الزامی است' },
        { status: 400 }
      );
    }

    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      //model: 'llama-3.1-8b-instant', 
      model: 'openai/gpt-oss-20b',
      temperature: 0.7,
    });


    const structuredModel = model.withStructuredOutput(recommandSchema, {
      name: 'Recommand',
    });

   
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 
        `تو یک مربی GTD هستی که بر اساس عنوان و توضیحات پروژه، تایپ اقدام وارد شده را پیشنهاد می‌دهد.
        تایپ اقدام وارد شده یکی از گزینه های زیر باید باشد (gtd):
            inbox 
            project
            next action 
            waiting for 
            calendar 
            someday/mabe
            reference
            trash 

            همچنین باید دلیل اینکه چرا این تایپ را انتخاب کردی برای من توضیح دهی
          

            همچنین در مورد این آیتم توضیح بده. بگو چطور میشه انجامش داد،من رو راهنمایی کن.

            از اصلاحات تخصصی gtd استفاده نکن. از اصلاحات عادی روزمره استفاده کن.
            خیلی در مورد این آیتم توضیح بده و بهم بگو چطور میتونم انجامش بدم.
            در کل در مورد این آیتم برام صحبت کن
        `],
      ['human', 'عنوان پروژه: {title}\nتوضیحات: {description}\nلطفاً نوع آیتم را پیشنهاد بده.'],
    ]);

    const chain = prompt.pipe(structuredModel);
    const result = await chain.invoke({
      title: title.trim(),
      description: description?.trim() || 'توضیحی داده نشده',
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