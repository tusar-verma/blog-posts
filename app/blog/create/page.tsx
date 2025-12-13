import BlogHeader from '../../components/BlogHeader';
import BlogForm from './components/BlogForm';

const Page = () => (
    <>
        <BlogHeader />
        <main className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="p-4 text-3xl font-bold text-center">Create New Blog Post</h1>
            <BlogForm />
        </main>
    </>
);

export default Page;
