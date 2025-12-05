import { render, screen } from '@testing-library/react';
import HomeHeader from '../app/components/HomeHeader';

// Mock next/link
jest.mock('next/link', () => {
    return ({ children, href }: { children: React.ReactNode; href: string }) => {
        return <a href={href}>{children}</a>;
    };
});

describe('HomeHeader Component', () => {
    test('should render Create Blog button with correct link', () => {
        render(<HomeHeader />);

        const createBlogLink = screen.getByRole('link', { name: "Create Blog" });
        expect(createBlogLink).toBeInTheDocument();
        expect(createBlogLink).toHaveAttribute('href', '/blog/create');
    });
});
