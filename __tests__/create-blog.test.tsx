import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BlogForm from '../app/blog/create/components/BlogForm';

jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));
jest.mock('next/cache', () => ({
    revalidatePath: jest.fn(),
}));

jest.mock('next/link', () => {
    return ({ children, href }: { children: React.ReactNode; href: string }) => {
        return <a href={href}>{children}</a>;
    };
});

describe('BlogForm component tests', () => {
    test('should call API to create a new blog post', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: true }),
            })
        ) as jest.Mock;

        render(<BlogForm />);

        const titleInput = screen.getByLabelText(/Title/i);
        const authorInput = screen.getByLabelText(/Author/i);
        const contentInput = screen.getByLabelText(/Content/i);
        const submitButton = screen.getByRole('button', { name: /Create Post/i });

        fireEvent.change(titleInput, { target: { value: 'Integration Test Title' } });
        fireEvent.change(authorInput, { target: { value: 'Integration Author' } });
        fireEvent.change(contentInput, { target: { value: 'Integration Content' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/blogs', expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({
                title: 'Integration Test Title',
                author: 'Integration Author',
                content: 'Integration Content'
            })
        }));
    });

    test('should require title, author, and content fields', () => {
        render(<BlogForm />);

        const titleInput = screen.getByLabelText(/Title/i);
        const authorInput = screen.getByLabelText(/Author/i);
        const contentInput = screen.getByLabelText(/Content/i);

        expect(titleInput).toBeRequired();
        expect(authorInput).toBeRequired();
        expect(contentInput).toBeRequired();
    });
});
