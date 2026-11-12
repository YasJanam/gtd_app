import { NextRequest, NextResponse } from 'next/server';
import { ChatGroq } from '@langchain/groq';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GoogleGenAI } from '@google/genai';


const API_BASE_URL_ZIRESEFR = process.env.NEXT_PUBLIC_API_URL_ZIRESEFR;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL


const recommandSchema = z.object({
  courses: z.array(
    z.object({
        //title: z.string().describe('عنوان کوتاه دوره پیشنهادی'),
       //description: z.string().describe('دلیل پیشنهاد این دوره برای کاربر'),
        wp_id: z.number().describe('شناسه دوره در وردپرس'),
        //wp_url: z.string().describe('لینک مستقیم دوره'), 
        lessons: z.array(
          z.object({
            //title: z.string().describe('عنوان درس'),
            wp_id:z.number().describe('آیدی درس در وردپرس'),
            //wp_url: z.string().describe('لینک درس مربوطه در سایت')
          })
        ).describe(' درسهای دوره')
    })
)
})

export async function POST(request: NextRequest) {
  try {
    const { user_id } = await request.json();

    if (!user_id) {
      return NextResponse.json({ error: 'آیدی کاربر الزامی است' }, { status: 400 });
    }

    // ۱. دریافت دوره‌ها
    const coursesResponse = await fetch(`${API_BASE_URL_ZIRESEFR}/ziresefr-courses/ldlms-courses`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    });
    
    if (!coursesResponse.ok) {
        throw new Error(`Failed to fetch courses: ${coursesResponse.statusText}`);
    }
    const courses = await coursesResponse.json();
    //console.log(courses);

    // ۲. دریافت اطلاعات کاربر
    //console.log(`👉 4. Fetching user from: ${API_BASE_URL}/users/${user_id}`);
    const userResponse = await fetch(`${API_BASE_URL}/users/${user_id}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    });

    if (!userResponse.ok) {
        throw new Error(`Failed to fetch user: ${userResponse.statusText}`);
    }

    console.log(userResponse)
    const user = await userResponse.json();
    console.log(user);


    const simplifiedCourses = courses.map((c: any) => ({
        wp_id: Number(c.wp_id) ,
        //wp_url: c.wp_url,
        title: c.title,
        //description: (c.description || '').slice(0, 300),
        lessons:c.lessons.map((l: any) => ({
          title:l.title,
          wp_id: l.wp_id
        })),
    }));

    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: 'openai/gpt-oss-120b',//'openai/gpt-oss-120b',//'openai/gpt-oss-20b',
      temperature: 0.7,
    });


    const geminiAi = new GoogleGenAI({
    apiKey: process.env.GEMINI_TOKEN,
  });

  

    /*const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_TOKEN, 
      model: "gemini-2.5-flash", 
      temperature: 0.7,
    });*/


    const structuredModel = model.withStructuredOutput(recommandSchema, {
      name: 'recommand_personal_learning_path',
    });

    // ۴. پرامپت تمیز و بدون متغیرهای تکراری
    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `
        شما یک مشاور تحصیلی هوشمند هستید.

        وظیفه شما طراحی یک مسیر یادگیری شخصی‌سازی شده بر اساس اطلاعات کاربر است.
        دوره های لازم رو به ترتیب با انتخاب درس هاشون مطابق هدف کاربر معرفی کن

        اطلاعات کاربر:
        - شغل: {job}
        - درباره کاربر: {aboutMe}
        - هدف اصلی: {mainGoal}

        دوره‌های موجود:
        {courses}

        قوانین:
        . فقط از دوره‌های موجود در لیست انتخاب کن.
        . شناسه wp_id را دقیقاً از اطلاعات دوره بردار.
        . لینک wp_url را دقیقاً از اطلاعات دوره بردار.
        . هیچ دوره یا شناسه جدیدی تولید نکن.
        . دوره‌ها را به ترتیب منطقی یادگیری مرتب کن.
        . برای هر دوره دلیل انتخاب متناسب با هدف کاربر بنویس.
        . فقط دوره‌هایی را پیشنهاد بده که واقعاً به هدف کاربر مرتبط هستند.
        . اگر دوره مناسبی وجود ندارد، آرایه خالی برگردان.
        . از هر دوره اون درسهای مرتبط رو انتخاب کن و معرفی کن.نیازی نیست تمام درسها رو برگردونی. 
        . از خودت درس تولید نکن، فقط از لیست درس های هر دوره انتخاب کن
        `
      ],
      ['human', 'لطفاً مسیر یادگیری من را طراحی کن.'],
    ]);

    const chain = prompt.pipe(structuredModel);
    
    const result = await chain.invoke({
      job: user.job || 'نامشخص',
      aboutMe: user.aboutMe || 'توضیحی داده نشده',
      mainGoal: user.mainGoal || 'توسعه فردی',
      courses: JSON.stringify(simplifiedCourses),
    });



    /*const result = await geminiAi.models.generateContent({
    model: 'gemini-3.8-flash',
    contents:  `
        شما یک مشاور تحصیلی هوشمند هستید.

        وظیفه شما طراحی یک مسیر یادگیری شخصی‌سازی شده بر اساس اطلاعات کاربر است.
        دوره های لازم رو به ترتیب با انتخاب درس هاشون مطابق هدف کاربر معرفی کن

        اطلاعات کاربر:
        - شغل: {job}
        - درباره کاربر: {aboutMe}
        - هدف اصلی: {mainGoal}

        دوره‌های موجود:
        {courses}

        قوانین:
        . فقط از دوره‌های موجود در لیست انتخاب کن.
        . شناسه wp_id را دقیقاً از اطلاعات دوره بردار.
        . لینک wp_url را دقیقاً از اطلاعات دوره بردار.
        . هیچ دوره یا شناسه جدیدی تولید نکن.
        . دوره‌ها را به ترتیب منطقی یادگیری مرتب کن.
        . برای هر دوره دلیل انتخاب متناسب با هدف کاربر بنویس.
        . فقط دوره‌هایی را پیشنهاد بده که واقعاً به هدف کاربر مرتبط هستند.
        . اگر دوره مناسبی وجود ندارد، آرایه خالی برگردان.
        . از هر دوره اون درسهای مرتبط رو انتخاب کن و معرفی کن.نیازی نیست تمام درسها رو برگردونی. 
        . از خودت درس تولید نکن، فقط از لیست درس های هر دوره انتخاب کن
        `,
  });*/

    return NextResponse.json(result);

  } catch (error: any) {
    console.error('AI Error:', error);
    return NextResponse.json(
      { error: 'خطا در تولید مسیر یادگیری', details: error.message },
      { status: 500 }
    );
  }
}