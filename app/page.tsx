import { MockBlogRepository } from './lib/data';
import BlogList from './components/BlogList';
import HomeHeader from './components/HomeHeader';

const Page = async () => {
  const repository = new MockBlogRepository();
  const posts = await repository.getAllPosts();

  return (
    <main className="max-w-4xl mx-auto p-4">
      <HomeHeader />
      <BlogList posts={posts} />
    </main>
  );
}

export default Page;
