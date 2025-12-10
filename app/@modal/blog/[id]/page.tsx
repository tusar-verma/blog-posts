import { notFound } from 'next/navigation';
import BlogArticle from './components/BlogArticle';
import Modal from '../../../components/Modal';

interface PageProps {
    params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:3000/api/blogs/${id}`, { cache: 'no-store' });

    if (res.status === 404) {
        notFound();
    }

    if (!res.ok) {
        throw new Error('Failed to fetch post');
    }

    const post = await res.json();


    return (
        <Modal>
            <BlogArticle post={post} />
        </Modal>
    );

}

export default Page;

