import BlogList from './components/BlogList';
import HomeHeader from './components/HomeHeader';

const Page = async () => {
  const res = await fetch('http://localhost:3000/api/blogs', { cache: 'no-store' });
  const posts = await res.json();

  return (
    <main className="max-w-4xl mx-auto p-4">
      <HomeHeader />
      <BlogList posts={posts} />
    </main>
  );
}

export default Page;
