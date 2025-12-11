import { render, screen } from '@testing-library/react';
import BlogList from '../app/components/BlogList';
import BlogListItem from '../app/components/BlogListItem';
import { BlogPost } from '../app/lib/definitions';
import posts from '../app/lib/posts.json';

describe('BlogList Components tests', () => {
    const post: BlogPost = posts[0] as BlogPost;

    if (!post) {
        throw new Error('No posts found in posts.json');
    }

    test('should render a list of blogs', () => {
        render(<BlogList posts={posts} />);

        posts.forEach(post => {
            expect(screen.getAllByText(post.title).length).toBeGreaterThan(0);
            expect(screen.getAllByText(post.author).length).toBeGreaterThan(0);
        });
    });

    test('should render blog details', () => {
        render(<BlogListItem post={post} />);

        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByText(post.author)).toBeInTheDocument();

        const dateString = new Date(post.publishedAt).toLocaleDateString();
        expect(screen.getByText(dateString)).toBeInTheDocument();

        const link = screen.getByRole('link', { name: post.title });
        expect(link).toHaveAttribute('href', `/blog/${post.id}`);
    });
});