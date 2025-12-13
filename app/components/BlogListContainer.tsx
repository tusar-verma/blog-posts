'use client';

import useGet from '../hooks/useGet';
import { BlogPost } from '../lib/definitions';
import BlogList from './BlogList';

const BlogListContainer = () => {
    const { data: posts, loading, message } = useGet<BlogPost[]>('/api/blogs');

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (message === 'error' || !posts) {
        return <div className="text-center p-4 text-red-500">Error loading posts.</div>;
    }

    return <BlogList posts={posts} />;
};

export default BlogListContainer;
