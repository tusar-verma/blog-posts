import { render, screen } from '@testing-library/react';
import BlogArticle from '../app/@modal/blog/[id]/components/BlogArticle';
import BlogHeader from '../app/components/BlogHeader';
import { BlogPost } from '../app/lib/definitions';

describe('BlogArticle Component tests', () => {
    const post: BlogPost = {
        id: '1',
        title: 'Test Blog Title',
        author: 'Test Author',
        content: 'This is the test content for the blog post.',
        publishedAt: '2023-10-01T12:00:00Z'
    };

    test('should display blog content correctly', () => {
        render(<BlogArticle post={post} />);

        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByText(post.author)).toBeInTheDocument();
        expect(screen.getByText(post.content)).toBeInTheDocument();

        const dateString = new Date(post.publishedAt).toLocaleDateString();
        expect(screen.getByText(dateString)).toBeInTheDocument();
    });
});

describe('BlogHeader Component tests', () => {
    test('should render back button with link to home', () => {
        render(<BlogHeader />);

        const link = screen.getByRole('link', { name: /Back/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/');
    });
});
