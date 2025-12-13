interface PostBlogParams {
    url: string;
    content: PostBlog;
}

interface PostBlog {
    title: string;
    author: string;
    content: string;
}

const postBlog = async ({ url, content }: PostBlogParams) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
    });

    if (!res.ok) {
        throw new Error('Request failed');
    }
}


export default postBlog;