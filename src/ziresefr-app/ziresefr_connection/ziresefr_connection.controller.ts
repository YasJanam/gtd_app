import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZiresefrConnectionService } from './ziresefr_connection.service';
import { CreateZiresefrConnectionDto } from './dto/create-ziresefr_connection.dto';
import { UpdateZiresefrConnectionDto } from './dto/update-ziresefr_connection.dto';
import { ConfigService } from '@nestjs/config';


@Controller('ziresefr-connection')
export class ZiresefrConnectionController {
  constructor(private readonly ziresefrConnectionService: ZiresefrConnectionService,
    private configService: ConfigService
  ) {
    const  wp_usernam = this.configService.getOrThrow<string>('WP_USERNAME');
    const wp_app_pass = this.configService.getOrThrow<string>('WP_APP_PASSWORD');
  }

  @Post()
  create(@Body() createZiresefrConnectionDto: CreateZiresefrConnectionDto) {
    return this.ziresefrConnectionService.create(createZiresefrConnectionDto);
  }


  /*
  @Get('users')
  async getWpUsers() {
    //const auth = btoa(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`);
    const auth = Buffer.from(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`).toString('base64');

    
    //const url = 'https://ziresefr.org/wp-json/wp/v2/users';
    const url = 'https://ziresefr.org/wp-json/ziresefr/v1/users';
    
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

        //console.log(response);

        //console.log(response);

        const data = await response.json();
        return data;
    } catch {

    }
  }
  */


  @Get('products')
  async getWpUsers() {
      //const auth = btoa(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`);
      const auth = Buffer.from(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`).toString('base64');

      //const url = 'https://ziresefr.org/wp-json/wp/v2/users';
      const url = 'https://ziresefr.org/wp-json/ziresefr/v1/products';
      
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
      } catch {
          return [];
      }
  }



  



  @Get('woocomerce-products')
  async getWoocomerceProducts() {
    //const auth = btoa(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`);
    const auth = Buffer.from(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`).toString('base64');

    const url = 'https://ziresefr.org/wp-json/wc/v3/products';
    try {
        const response = await fetch(url,{
            method:'GET',
            headers:{
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/json",
            }
        });

        //console.log(response);

        const data = await response.json();
        return data;
    } catch {

    }
  }



  /*
  @Get('ldlms-courses')
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
  }*/

 

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


  
  @Get('posts')
  async getWpPosts() {
    //const auth = btoa(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`);
    const auth = Buffer.from(`${process.env.WP_ZIRESEFR_MAIN_ADMIN}:${process.env.WP_ZIRESEFR_MAIN_ADMIN_APP_PASSWORD}`).toString('base64');

    const url = 'https://ziresefr.org/wp-json/ziresefr/v1/posts';
    //const url = 'https://ziresefr.org/wp-json/wp/v2/posts';

    try {
        const response = await fetch(url,{
            method:'GET',
            headers:{
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/json",
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
              
            }
        });


        const data = await response.json();

        /*const striptags = require('striptags');

      const contents = data.map(post => (post.content.rendered))
      const cleanData = contents.map(c => ( striptags(c) ));*/
        

        return data;
    } catch (error){
        return [];
    }
  }
  



  @Get()
  findAll() {
    return this.ziresefrConnectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ziresefrConnectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZiresefrConnectionDto: UpdateZiresefrConnectionDto) {
    return this.ziresefrConnectionService.update(+id, updateZiresefrConnectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ziresefrConnectionService.remove(+id);
  }
}
