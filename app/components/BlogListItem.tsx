import Link from 'next/link';
import { BlogPost } from '../lib/definitions';

interface BlogListItemProps {
    post: BlogPost;
}

const BlogListItem = ({ post }: BlogListItemProps) => (
    <article className="h-full p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700">
        <Link
            href={`/blog/${post.id}`}
            className="block text-xl font-bold mb-2 hover:underline text-blue-600 dark:text-blue-400"
        >
            {post.title}
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            By <cite className="font-medium">{post.author}</cite> on{' '}
            <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString()}
            </time>
        </p>
    </article>
)

export default BlogListItem;
