import BlogListContainer from './components/BlogListContainer';
import HomeHeader from './components/HomeHeader';

const Page = async () => {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <HomeHeader />
      <BlogListContainer />
    </main>
  );
}

export default Page;
