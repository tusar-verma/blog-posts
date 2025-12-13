import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface Props {
    params: Promise<{ id: string }>;
}

export async function GET(request: Request, props: Props) {
    const params = await props.params;
    const { id } = params;

    const filePath = path.join(process.cwd(), 'app', 'lib', 'posts.json');

    try {
        await fs.access(filePath);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const posts = JSON.parse(fileContent);
        const post = posts.find((p: any) => p.id === id);

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
