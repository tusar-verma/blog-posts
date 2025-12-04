import Link from 'next/link';
import { BlogPost } from '../lib/definitions';

interface BlogListProps {
    posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
    return (
        <section>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <article>
                            <Link href={`/blog/${post.id}`}>{post.title}</Link>
                            <p>
                                By <span>{post.author}</span> on{' '}
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
