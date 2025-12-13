import { render, screen } from '@testing-library/react';
import BlogArticle from '../app/@modal/blog/[id]/components/BlogArticle';
import BlogHeader from '../app/components/BlogHeader';
import { BlogPost } from '../app/lib/definitions';

import posts from '../app/lib/posts.json';

describe('BlogArticle Component tests', () => {
    const post: BlogPost = posts[0] as BlogPost;

    if (!post) {
        throw new Error('No posts found in posts.json');
    }

    test('should display blog content correctly', () => {
        render(<BlogArticle post={post} />);

        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByText(post.author)).toBeInTheDocument();
        expect(screen.getByText(post.content)).toBeInTheDocument();

        const dateString = new Date(post.publishedAt).toLocaleDateString();
        expect(screen.getByText(dateString)).toBeInTheDocument();
    });

    test('should render back button with link to home', () => {
        render(<BlogHeader />);

        const link = screen.getByRole('link', { name: /back/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/');
    });
});
