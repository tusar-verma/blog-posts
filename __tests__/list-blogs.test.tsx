import { render, screen } from '@testing-library/react';
import Page from '../app/page';
import fs from 'fs/promises';

jest.mock('fs/promises');
jest.mock('next/link', () => {
    return ({ children, href }: { children: React.ReactNode; href: string }) => {
        return <a href={href}>{children}</a>;
    };
});

describe('Blog List Page', () => {
    test('should render blogs from JSON', async () => {
        const mockPosts = [
            { id: '1', title: 'Blog 1', author: 'Author 1', content: 'Content 1', publishedAt: '2023-01-01T00:00:00Z' },
            { id: '2', title: 'Blog 2', author: 'Author 2', content: 'Content 2', publishedAt: '2023-01-02T00:00:00Z' },
        ];
        (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockPosts));
        (fs.access as jest.Mock).mockResolvedValue(undefined);

        const jsx = await Page();
        render(jsx);

        expect(screen.getByText('Blog 1')).toBeInTheDocument();
        expect(screen.getByText('Blog 2')).toBeInTheDocument();
        expect(screen.getByText(/Author 1/)).toBeInTheDocument();
        expect(screen.getByText(/Author 2/)).toBeInTheDocument();
    });
});
