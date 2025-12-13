
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createBlog } from '../app/lib/actions';


jest.mock('next/cache', () => ({
    revalidatePath: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

global.fetch = jest.fn();

describe('createBlog Action', () => {
    let formData: FormData;

    beforeEach(() => {
        jest.clearAllMocks();
        formData = new FormData();
        formData.append('title', 'Test Title');
        formData.append('author', 'Test Author');
        formData.append('content', 'Test Content');
    });

    test('should return error if fields are missing', async () => {
        const incompleteFormData = new FormData();
        incompleteFormData.append('title', 'Test Title');
        // Missing author and content

        const result = await createBlog(null, incompleteFormData);

        expect(result).toEqual({ message: 'Missing required fields' });
        expect(revalidatePath).not.toHaveBeenCalled();
        expect(redirect).not.toHaveBeenCalled();
    });

    test('should return error if API call fails (network error)', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        const result = await createBlog(null, formData);

        expect(result).toEqual({ message: 'Failed to create blog post' });
        expect(revalidatePath).not.toHaveBeenCalled();
        expect(redirect).not.toHaveBeenCalled();
    });

    test('should return error if API response is not ok', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        const result = await createBlog(null, formData);

        expect(result).toEqual({ message: 'Failed to create blog post' });
        expect(revalidatePath).not.toHaveBeenCalled();
        expect(redirect).not.toHaveBeenCalled();
    });

    test('should success, revalidate path and redirect', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
        });

        await createBlog(null, formData);

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/blogs', expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({
                title: 'Test Title',
                author: 'Test Author',
                content: 'Test Content',
            }),
        }));

        expect(revalidatePath).toHaveBeenCalledWith('/');
        expect(redirect).toHaveBeenCalledWith('/');
    });
});
