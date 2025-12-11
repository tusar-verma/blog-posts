'use client';

import { useGet } from '../../../../hooks/useGet';
import { BlogPost } from '../../../../lib/definitions';
import BlogArticle from './BlogArticle';

interface BlogArticleContainerProps {
    id: string;
}

const BlogArticleContainer = ({ id }: BlogArticleContainerProps) => {
    const { data: post, loading, message } = useGet<BlogPost>(`/api/blogs/${id}`);

    if (loading) {
        return <div className="text-center p-4 text-white">Loading...</div>;
    }

    if (message === 'error' || !post) {
        return <div className="text-center p-4 text-red-500">Error loading post.</div>;
    }

    return <BlogArticle post={post} />;
};

export default BlogArticleContainer;
