import { createBlog } from '../../../lib/actions';
import InputForm from './InputForm';

const BlogForm = () => (
    <form action={createBlog} className="space-y-6">
        <InputForm
            label="Title"
            type="text"
            name="title"
            id="title"
            required
        />
        <InputForm
            label="Author"
            type="text"
            name="author"
            id="author"
            required
        />
        <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Content
            </label>
            <textarea
                name="content"
                id="content"
                rows={8}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
            />
        </div>
        <div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Create Post
            </button>
        </div>
    </form>
)

export default BlogForm;
