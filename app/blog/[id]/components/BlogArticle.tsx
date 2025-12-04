import { BlogPost } from '../../../lib/definitions';

interface BlogArticleProps {
    post: BlogPost;
}

export default function BlogArticle({ post }: BlogArticleProps) {
    return (
        <article className="space-y-8">
            <header className="text-center space-y-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                    {post.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    By{' '}
                    <cite className="font-medium text-gray-900 dark:text-white">
                        {post.author}
                    </cite>{' '}
                    on{' '}
                    <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString()}
                    </time>
                </p>
            </header>
            <div className="p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {post.content}
                </p>
            </div>
        </article>
    );
}
