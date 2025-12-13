import BlogArticleContainer from './components/BlogArticleContainer';
import Modal from '../../../components/Modal';

interface PageProps {
    params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
    const { id } = await params;

    return (
        <Modal>
            <BlogArticleContainer id={id} />
        </Modal>
    );

}

export default Page;

