import { BlogPost } from './definitions';

export interface IBlogRepository {
    getAllPosts(): Promise<BlogPost[]>;
    getPostById(id: string): Promise<BlogPost | null>;
}

export class MockBlogRepository implements IBlogRepository {
    private posts: BlogPost[] = [
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

    async getAllPosts(): Promise<BlogPost[]> {
        // Simulate network delay
        return new Promise((resolve) => {
            setTimeout(() => resolve(this.posts), 100);
        });
    }

    async getPostById(id: string): Promise<BlogPost | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const post = this.posts.find((p) => p.id === id);
                resolve(post || null);
            }, 100);
        });
    }
}
