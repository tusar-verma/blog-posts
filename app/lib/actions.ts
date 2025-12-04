'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { MockBlogRepository } from './data';

export async function createBlog(formData: FormData) {
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const content = formData.get('content') as string;

    if (!title || !author || !content) {
        throw new Error('Missing required fields');
    }

    const repository = new MockBlogRepository();
    await repository.createPost({
        title,
        author,
        content,
    });

    revalidatePath('/');
    redirect('/');
}
