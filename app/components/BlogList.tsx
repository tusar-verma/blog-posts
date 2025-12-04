import Link from 'next/link';
import { BlogPost } from '../lib/definitions';

interface BlogListProps {
    posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
    return (
        <section>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <li key={post.id}>
                        <article className="h-full p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700">
                            <Link href={`/blog/${post.id}`} className="block text-xl font-bold mb-2 hover:underline text-blue-600 dark:text-blue-400">
                                {post.title}
                            </Link>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                By <span className="font-medium">{post.author}</span> on{' '}
                                <time dateTime={post.publishedAt}>
                                    {new Date(post.publishedAt).toLocaleDateString()}
                                </time>
                            </p>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
}
