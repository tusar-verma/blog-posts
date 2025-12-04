import { MockBlogRepository } from './lib/data';
import BlogList from './components/BlogList';
import HomeHeader from './components/HomeHeader';

export default async function Page() {
  const repository = new MockBlogRepository();
  const posts = await repository.getAllPosts();

  return (
    <main className="max-w-4xl mx-auto p-4">
      <HomeHeader />
      <BlogList posts={posts} />
    </main>
  );
}
