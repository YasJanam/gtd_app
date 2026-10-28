import { Controller, Get } from '@nestjs/common';


@Controller('ldlms-courses')
export class CoursesController {


  @Get()
  async getLdlmsCourses() {
    //const auth = btoa(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`);
    const auth = Buffer.from(`${process.env.WP_ZIRESEFR_MAIN_ADMIN}:${process.env.WP_ZIRESEFR_MAIN_ADMIN_APP_PASSWORD}`).toString('base64');

    const url = 'https://ziresefr.org/wp-json/ziresefr/v1/courses-content';
    //const url = 'https://ziresefr.org/wp-json/wp/v2/sfwd-lessons';

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

        const data = await response.json();

        return data;
    } catch (error){
        return [];
    }
  }


}
