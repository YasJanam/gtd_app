import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZiresefrPostsService } from './ziresefr-posts.service';

@Controller('ziresefr-posts')
export class ZiresefrPostsController {
  constructor(private readonly ziresefrPostsService: ZiresefrPostsService) {}

  @Get('posts')
  async findAll() {
    return this.ziresefrPostsService.findAll();
  }

  @Get('reset-posts')
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

        const posts = data.data.map(p => {

            const categs = p.categories;
            let cats = "دسته ها: ";
            categs?.map((c) => {
                cats = cats + ` ${c}  `
            });

            const tags = p.tags;
            let tgs = "تگ ها: ";
            tags?.map((t) => {
              tgs = tgs + ` ${t} `
            });


            return {
                title: p.title,
                wp_id: p.ID,
                wp_url: p.course_url,
                slug: p.slug,
                content: p.content + categs + tags,
                excerpt: p.excerpt,
                author_name: p.author.name,
                author_wp_id: p.author.ID,
                categories: p.categories,
                }
        })


        const l = await this.ziresefrPostsService.createMany(posts);

        return l;
    } catch (error){
        return [];
    }
  }



}
