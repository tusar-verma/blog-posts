'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createBlog(prevState: any, formData: FormData) {
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const content = formData.get('content') as string;

    if (!title || !author || !content) {
        return { message: 'Missing required fields' };
    }

    try {
        const response = await fetch('http://localhost:3000/aasdasdpi/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                author,
                content,
            }),
        });

        if (!response.ok) {
            return { message: 'Failed to create blog post' };
        }

    } catch (e) {
        return { message: 'Failed to create blog post' };
    }

    revalidatePath('/');
    redirect('/');
}
