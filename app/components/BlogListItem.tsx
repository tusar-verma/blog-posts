import Link from 'next/link';
import { BlogPost } from '../lib/definitions';

interface BlogListItemProps {
    post: BlogPost;
}

export default function BlogListItem({ post }: BlogListItemProps) {
    return (
        <article className="h-full p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700">
            <Link
                href={`/blog/${post.id}`}
                className="block text-xl font-bold mb-2 hover:underline text-blue-600 dark:text-blue-400"
            >
                {post.title}
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                By <span className="font-medium">{post.author}</span> on{' '}
                <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString()}
                </time>
            </p>
            <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                {post.content}
            </p>
        </article>
    );
}
