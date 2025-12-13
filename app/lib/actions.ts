'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postBlog from './postBlog';


type CreateBlogState = {
    message: string;
} | null;


export async function createBlog(prevState: CreateBlogState, formData: FormData) {
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const content = formData.get('content') as string;

    if (!title || !author || !content) {
        return { message: 'Missing required fields' };
    }
    try {
        await postBlog({
            url: 'http://localhost:3000/api/blogs',
            content: {
                title,
                author,
                content,
            }
        });
    } catch {
        return { message: 'Failed to create blog post' };
    }

    revalidatePath('/');
    redirect('/');
}
