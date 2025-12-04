import { MockBlogRepository } from '../../lib/data';
import { notFound } from 'next/navigation';
import BlogHeader from '../../components/BlogHeader';
import BlogArticle from '../../components/BlogArticle';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const repository = new MockBlogRepository();
    const post = await repository.getPostById(id);

    if (!post) {
        notFound();
    }

    return (
        <>
            <BlogHeader />
            <main className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
                <BlogArticle post={post} />
            </main>
        </>
    );
}
