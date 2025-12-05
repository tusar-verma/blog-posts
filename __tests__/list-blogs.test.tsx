import { render, screen } from '@testing-library/react';
import BlogList from '../app/components/BlogList';
import BlogListItem from '../app/components/BlogListItem';
import { BlogPost } from '../app/lib/definitions';

const posts: BlogPost[] = [
    { id: '1', title: 'Blog 1', author: 'Author 1', content: 'Content 1', publishedAt: '2023-01-01T00:00:00Z' },
    { id: '2', title: 'Blog 2', author: 'Author 2', content: 'Content 2', publishedAt: '2023-01-02T00:00:00Z' },
];

describe('BlogList Component tests', () => {
    test('should render a list of blogs', () => {
        render(<BlogList posts={posts} />);

        posts.forEach(post => {
            expect(screen.getByText(post.title)).toBeInTheDocument();
            expect(screen.getByText(post.author)).toBeInTheDocument();
        });
    });
});

describe('BlogListItem Component tests', () => {
    test('should render blog details', () => {
        const mockPost = posts[0];

        render(<BlogListItem post={mockPost} />);

        expect(screen.getByText(mockPost.title)).toBeInTheDocument();
        expect(screen.getByText(mockPost.author)).toBeInTheDocument();

        const dateString = new Date(mockPost.publishedAt).toLocaleDateString();
        expect(screen.getByText(dateString)).toBeInTheDocument();

        const link = screen.getByRole('link', { name: mockPost.title });
        expect(link).toHaveAttribute('href', `/blog/${mockPost.id}`);
    });
});
