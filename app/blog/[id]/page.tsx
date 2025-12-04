import { MockBlogRepository } from '../../lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const repository = new MockBlogRepository();
    const post = await repository.getPostById(id);

    if (!post) {
        notFound();
    }

    return (
        <main>
            <article>
                <header>
                    <h1>{post.title}</h1>
                    <p>
                        By <span>{post.author}</span> on{' '}
                        <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString()}
                        </time>
                    </p>
                </header>
                <p>{post.content}</p>
            </article>
        </main>
    );
}
