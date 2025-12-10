'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createBlog(formData: FormData) {
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const content = formData.get('content') as string;

    if (!title || !author || !content) {
        throw new Error('Missing required fields');
    }

    await fetch('http://localhost:3000/api/blogs', {
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

    revalidatePath('/');
    redirect('/');
}
