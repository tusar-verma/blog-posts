import { MockBlogRepository } from './lib/data';
import BlogList from './components/BlogList';

export default async function Page() {
  const repository = new MockBlogRepository();
  const posts = await repository.getAllPosts();

  return (
    <main className="max-w-4xl mx-auto p-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold">My Blog Platform</h1>
      </header>
      <BlogList posts={posts} />
      <footer className="mt-12 text-center text-gray-500 text-sm">
        Page footer
      </footer>
    </main>
  );
}
