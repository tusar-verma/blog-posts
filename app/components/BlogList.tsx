import { BlogPost } from '../lib/definitions';
import BlogListItem from './BlogListItem';

interface BlogListProps {
    posts: BlogPost[];
}

const BlogList = ({ posts }: BlogListProps) => (
    <section>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <li key={post.id}>
                    <BlogListItem post={post} />
                </li>
            ))}
        </ul>
    </section>
)

export default BlogList;
