import { notFound } from 'next/navigation';
import { MockBlogRepository } from '../../../lib/data';
import BlogArticle from './components/BlogArticle';
import Modal from '../../../components/Modal';

interface PageProps {
    params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
    const { id } = await params;
    const repository = new MockBlogRepository();
    const post = await repository.getPostById(id);

    if (!post) {
        notFound();
    }

    return (
        <Modal>
            <BlogArticle post={post} />
        </Modal>
    );
}

export default Page;

