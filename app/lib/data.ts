import fs from 'fs/promises';
import path from 'path';
import { BlogPost } from './definitions';

export interface IBlogRepository {
    getAllPosts(): Promise<BlogPost[]>;
    getPostById(id: string): Promise<BlogPost | null>;
    createPost(post: Omit<BlogPost, 'id' | 'publishedAt'>): Promise<BlogPost>;
}

export class MockBlogRepository implements IBlogRepository {
    private readonly defaultPosts: BlogPost[] = [
        {
            id: '1',
            title: 'Understanding SOLID Principles',
            content: 'SOLID principles are the foundation of good software architecture...',
            author: 'Uncle Bob',
            publishedAt: '2023-10-01T10:00:00Z',
        },
        {
            id: '2',
            title: 'The Power of Semantic HTML',
            content: 'Semantic HTML improves accessibility and SEO...',
            author: 'Jane Doe',
            publishedAt: '2023-10-05T14:30:00Z',
        },
        {
            id: '3',
            title: 'Next.js App Router Basics',
            content: 'The App Router introduces a new paradigm for building React apps...',
            author: 'John Smith',
            publishedAt: '2023-10-10T09:15:00Z',
        },
    ];

    private getFilePath() {
        return path.join(process.cwd(), 'app', 'lib', 'posts.json');
    }

    private async ensureFileExists(filePath: string): Promise<void> {
        try {
            await fs.access(filePath);
        } catch {
            await fs.writeFile(filePath, JSON.stringify(this.defaultPosts, null, 2));
        }
    }

    async getAllPosts(): Promise<BlogPost[]> {
        const filePath = this.getFilePath();
        await this.ensureFileExists(filePath);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    }

    async getPostById(id: string): Promise<BlogPost | null> {
        const posts = await this.getAllPosts();
        return posts.find((p) => p.id === id) || null;
    }

    async createPost(post: Omit<BlogPost, 'id' | 'publishedAt'>): Promise<BlogPost> {
        const filePath = this.getFilePath();
        await this.ensureFileExists(filePath);

        const posts = await this.getAllPosts();
        const newPost: BlogPost = {
            ...post,
            id: (posts.length + 1).toString(),
            publishedAt: new Date().toISOString(),
        };
        posts.push(newPost);

        await fs.writeFile(filePath, JSON.stringify(posts, null, 2));

        return newPost;
    }
}
