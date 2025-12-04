import { MockBlogRepository } from './lib/data';
import BlogList from './components/BlogList';

export default async function Page() {
  const repository = new MockBlogRepository();
  const posts = await repository.getAllPosts();

  return (
    <main>
      <header>
        <h1>My Blog Platform</h1>
      </header>
      <BlogList posts={posts} />
      <footer>
        Page footer
      </footer>
    </main>
  );
}
