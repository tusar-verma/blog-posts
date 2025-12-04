import { MockBlogRepository } from './lib/data';
import BlogList from './components/BlogList';
import Link from 'next/link';

export default async function Page() {
  const repository = new MockBlogRepository();
  const posts = await repository.getAllPosts();

  return (
    <main className="max-w-4xl mx-auto p-4">
      <header className="mb-8 text-center relative">
        <h1 className="text-3xl font-bold">My Blog Platform</h1>
        <div className="absolute right-0 top-0">
          <Link
            href="/blog/create"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Blog
          </Link>
        </div>
      </header>
      <BlogList posts={posts} />
      <footer className="mt-12 text-center text-gray-500 text-sm">
        Page footer
      </footer>
    </main>
  );
}
