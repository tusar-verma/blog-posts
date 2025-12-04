import Link from 'next/link';

const HomeHeader = () => {
    return (
        <header className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Blog Platform</h1>
            <Link
                href="/blog/create"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Create Blog
            </Link>
        </header>
    );
}

export default HomeHeader;
