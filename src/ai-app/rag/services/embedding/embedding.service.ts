import { Injectable } from '@nestjs/common';
import { ChatGroq } from '@langchain/groq';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';


@Injectable()
export class EmbeddingService {
    private groq: ChatGroq;
    private openai = new OpenAI({ 
        apiKey: process.env.GROQ_TOKEN ,
        baseURL: 'https://api.x.ai/v1',
    });

    private voyageKey : string;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.getOrThrow<string>('GROQ_TOKEN');
        this.groq = new ChatGroq({
            model: 'openai/gpt-oss-20b',
            temperature: 0.7,
            apiKey:apiKey,
        });

        this.voyageKey = this.configService.getOrThrow<string>('VOYAGE_API_KEY');
    }


    /*async embed(text: string) : Promise<number[]> {
        const res = await this.openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: text,
        });
        return res.data[0].embedding;
    }*/


    /*async embed(text: string) : Promise<number[]> {
        const res = await this.openai.embeddings.create({
            model: 'v1',
            input: text,
            encoding_format: 'float',
        });
        return res.data[0].embedding;
    }*/


    async embed(text: string): Promise<number[]> {
        const response = await fetch('https://api.voyageai.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.voyageKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: [text],
                model: 'voyage-4-lite',
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Voyage AI Error:', errorData);
            throw new Error(`Embedding failed: ${response.statusText}`);
        }

        const data = await response.json();
        
        return data.data[0].embedding;
    }
    
}
