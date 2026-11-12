import { Controller, Get, Post } from '@nestjs/common';
import { ZiresefrCourseService } from './ziresefr-course.service';


@Controller('ziresefr-courses')
export class ZiresefrCourseController {

    constructor (
        private courseService: ZiresefrCourseService,
    ) {}


    @Get('ldlms-courses')
    async findAllCourses() {
        return this.courseService.findAllCourses()
    }


    @Get('ldlms-lessons')
    async findAllLessons() {
        return this.courseService.findAllLessons()
    }

    @Post('reset-ldlms-courses')
    async generateLdlmsCourses() {
        const auth = Buffer.from(
            `${process.env.WP_ZIRESEFR_MAIN_ADMIN}:${process.env.WP_ZIRESEFR_MAIN_ADMIN_APP_PASSWORD}`
        ).toString('base64');

        const url = 'https://ziresefr.org/wp-json/ziresefr/v1/courses-content';

        try {
            // 1. دریافت اطلاعات
            const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Basic ${auth}`,
                'x-api-key':    `${process.env.ZIRESEFR_API_PLUGIN_SECRET_KEY}`,
                'Content-Type': 'application/json',
                //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                Accept: 'application/json',
            },
            });

            if (!response.ok) {
            throw new Error(`WordPress API Error: ${response.status}`);
            }

            const data = await response.json();
           // console.log(data);

            // 2. اعتبارسنجی پاسخ
            if (!data?.data || !Array.isArray(data.data) || data.data.length === 0) {
            throw new Error('Invalid or empty courses response');
            }

            // 3. آماده‌سازی اطلاعات
            const courses = data.data.map((c: any) => {
            let des = 'گام‌ها: ';

            c.steps?.forEach((s: any, index: number) => {
                des += `گام شماره ${index + 1}: ${s.title} `;
            });

            const stepsTitle = c.steps.map((s) => (s.title));

            const lessons = c.steps?.map((l) => ({
                title:l.title,
                wp_id:l.id,
                wp_url:l.url,
            }))

            return {
                title: c.course_title,
                wp_id: c.course_id,
                wp_url: c.course_url,
                description: des,
                lessons: lessons,
            };
            });

            const result = await this.courseService.replaceAll2(courses);

            return data;

            /*return {
            deleted_count: result.deletedCount,
            inserted_count: result.insertedCount,
            };*/

        } catch (error) {
            console.error('Reset courses error:', error);

            throw error;
        }
    }


  @Get('ldlms-lessons')
  async getLdlmsLessons() {
    //const auth = btoa(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`);
    const auth = Buffer.from(`${process.env.WP_ZIRESEFR_MAIN_ADMIN}:${process.env.WP_ZIRESEFR_MAIN_ADMIN_APP_PASSWORD}`).toString('base64');

    const url = '  	https://ziresefr.org/wp-json/ziresefr/v1/lessons';
    //const url = 'https://ziresefr.org/wp-json/ldlms/v1/sfwd-lessons';

    try {
        const response = await fetch(url,{
            method:'GET',
            headers:{
                Authorization: `Basic ${auth}`,
                'x-api-key': `${process.env.ZIRESEFR_API_PLUGIN_SECRET_KEY}`,
                "Content-Type": "application/json",
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
              
            }
        });

        if (!response.ok) {
            //  چاپ خطای دقیق برای دیباگ
            const errorText = await response.text();
            console.error('Error Response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        //console.log(response);

        //console.log('HTTP Status:', response.status);
        //console.log('Content-Type:', response.headers.get('content-type'));

        const data = await response.json();
        //console.log(response)
        //console.log(data)

        return data;
    } catch (error){
       //console.error('❌ Network/Fetch Error:', error.message);
        return [];
    }
  }


  @Post('chunk-courses')
  async chunkCourses() {
    await this.courseService.chunkCourses();
  }

  

}
