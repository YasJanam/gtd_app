import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZiresefrProductsService } from './ziresefr-products.service';

@Controller('ziresefr-products')
export class ZiresefrProductsController {
  constructor(private readonly ziresefrProductsService: ZiresefrProductsService) {}


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


  @Get('products')
  async findAll() {
    return this.ziresefrProductsService.findAll()
  }


  @Get('reset-products')
  async resetProducts() {
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

        const products = data.data.map(p => {

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
                name: p.name,
                wp_id: p.ID,
                wp_url: p.permalink,
                slug: p.slug,
                description: p.description + categs + tags,
                short_desc: p.short_desc,
                price: p.price,
                type: p.type,
                categories: p.categories,
                tags: p.tags,
                }
        })

        const l = await this.ziresefrProductsService.createMany(products);

        return l;
    } catch {
        return [];
    }
  }

 
}
