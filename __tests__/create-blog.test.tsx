import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BlogForm from '../app/blog/create/components/BlogForm';
import fs from 'fs/promises';

jest.mock('fs/promises');

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
    test('should write the new blog post to the JSON file', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue('[]');
        (fs.writeFile as jest.Mock).mockResolvedValue(undefined);
        (fs.access as jest.Mock).mockResolvedValue(undefined);

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
            expect(fs.writeFile).toHaveBeenCalled();
        });

        const writeCall = (fs.writeFile as jest.Mock).mock.calls[0];
        const writtenContent = JSON.parse(writeCall[1]);

        expect(writtenContent).toHaveLength(1);
        expect(writtenContent[0]).toMatchObject({
            title: 'Integration Test Title',
            author: 'Integration Author',
            content: 'Integration Content'
        });
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
