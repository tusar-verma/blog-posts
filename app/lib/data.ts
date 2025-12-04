import { BlogPost } from './definitions';

export interface IBlogRepository {
    getAllPosts(): Promise<BlogPost[]>;
    getPostById(id: string): Promise<BlogPost | null>;
    createPost(post: Omit<BlogPost, 'id' | 'publishedAt'>): Promise<BlogPost>;
}

export class MockBlogRepository implements IBlogRepository {
    private static posts: BlogPost[] = [
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
        {
            id: '4',
            title: 'CSS Grid vs Flexbox',
            content: 'A comprehensive guide on when to use Grid and when to use Flexbox for modern layouts.',
            author: 'Sarah Drasner',
            publishedAt: '2023-10-12T11:00:00Z',
        },
        {
            id: '5',
            title: 'Mastering React Hooks',
            content: 'Deep dive into useEffect, useState, and custom hooks for cleaner React components.',
            author: 'Dan Abramov',
            publishedAt: '2023-10-15T16:20:00Z',
        },
        {
            id: '6',
            title: 'TypeScript Generics Explained',
            content: 'Learn how to write reusable and type-safe code using TypeScript generics.',
            author: 'Matt Pocock',
            publishedAt: '2023-10-18T09:00:00Z',
        },
        {
            id: '7',
            title: 'Web Accessibility 101',
            content: 'Essential tips for making your web applications accessible to everyone.',
            author: 'Marcy Sutton',
            publishedAt: '2023-10-20T13:45:00Z',
        },
        {
            id: '8',
            title: 'Frontend Performance Optimization',
            content: 'Strategies to improve load times and runtime performance of your web apps.',
            author: 'Addy Osmani',
            publishedAt: '2023-10-22T10:30:00Z',
        },
        {
            id: '9',
            title: 'State Management in 2024',
            content: 'Comparing Redux, Zustand, Recoil, and Context API for modern state management.',
            author: 'Mark Erikson',
            publishedAt: '2023-10-25T15:10:00Z',
        },
        {
            id: '10',
            title: 'Lorem Ipsum',
            content: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet facilisis nunc. Curabitur velit orci, faucibus non purus vitae, placerat ultrices metus. Vestibulum sed egestas dui. Sed ac gravida mi. Nullam ex quam, fringilla non vehicula eu, scelerisque cursus mauris. Integer porta egestas venenatis. Praesent auctor tristique enim, ut fringilla mauris lobortis sed. Mauris blandit elementum lectus, quis dapibus augue.

In convallis mattis euismod. Phasellus tincidunt facilisis augue, vitae blandit elit sodales vitae. Etiam tristique justo vel augue viverra imperdiet. Ut dictum fringilla imperdiet. Vivamus placerat sed elit eget varius. Maecenas sodales magna pretium, tempor sapien sed, condimentum lectus. Suspendisse tristique sagittis finibus. Ut eu lorem pellentesque, tempor turpis a, pulvinar mauris. Quisque sed sagittis enim. Sed id egestas nisi.

Phasellus elit turpis, tempor a pretium in, mattis quis diam. Cras tincidunt est erat, id fermentum urna congue quis. Nam vitae ultrices risus. Praesent sit amet purus elit. Aenean sagittis dictum dui, id semper arcu venenatis id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper, libero dapibus volutpat facilisis, eros est maximus odio, eget egestas tortor risus nec nisi. Sed at turpis quis libero malesuada vestibulum. Mauris a pulvinar tortor, sed rutrum augue.

Sed vel tellus vitae ex hendrerit lobortis. Morbi sit amet sem sem. Donec risus metus, mattis ac volutpat eu, iaculis et sem. Duis urna ligula, euismod ac viverra vel, condimentum sed quam. Duis dui lectus, dignissim in mattis ac, placerat et lacus. Pellentesque at ullamcorper ante, at tempus arcu. Phasellus porttitor urna sit amet dui bibendum, nec porttitor velit tincidunt. Integer varius id nisl non porta. Vestibulum feugiat tellus eget posuere egestas. Sed vel massa mauris. Ut risus ipsum, scelerisque in felis non, molestie tempus libero. Sed ex diam, elementum sit amet lacinia id, elementum eu neque. In nisl dolor, viverra non vestibulum sed, gravida eu odio. Curabitur feugiat ultricies lacinia. Cras at velit est.

Mauris commodo tellus arcu, nec porta sem viverra non. Nunc sit amet luctus justo, sit amet vulputate erat. Donec neque augue, suscipit in metus eu, rutrum hendrerit libero. Aliquam nec scelerisque libero, aliquet feugiat ex. Fusce id felis vel lorem tempus consequat a et augue. Integer posuere scelerisque enim ac fringilla. In id diam commodo, posuere ante ut, feugiat mi. Praesent efficitur, ex vel ultricies feugiat, turpis erat pulvinar eros, gravida tempus nisl quam at lacus. `,
            author: 'Tim Berners-Lee',
            publishedAt: '2023-10-28T12:00:00Z',
        },
    ];

    async getAllPosts(): Promise<BlogPost[]> {
        // Simulate network delay
        return new Promise((resolve) => {
            setTimeout(() => resolve(MockBlogRepository.posts), 100);
        });
    }

    async getPostById(id: string): Promise<BlogPost | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const post = MockBlogRepository.posts.find((p) => p.id === id);
                resolve(post || null);
            }, 100);
        });
    }

    async createPost(post: Omit<BlogPost, 'id' | 'publishedAt'>): Promise<BlogPost> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newPost: BlogPost = {
                    ...post,
                    id: (MockBlogRepository.posts.length + 1).toString(),
                    publishedAt: new Date().toISOString(),
                };
                MockBlogRepository.posts.push(newPost);
                resolve(newPost);
            }, 100);
        });
    }
}
