import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const getFilePath = () => path.join(process.cwd(), 'app', 'lib', 'posts.json');

const ensureFileExists = async (filePath: string) => {
    try {
        await fs.access(filePath);
    } catch {
        await fs.writeFile(filePath, JSON.stringify([], null, 2));
    }
};

export async function GET() {
    const filePath = getFilePath();
    await ensureFileExists(filePath);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const posts = JSON.parse(fileContent);
    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    const body = await request.json();

    if (!body.title || !body.author || !body.content) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const filePath = getFilePath();
    await ensureFileExists(filePath);

    const fileContent = await fs.readFile(filePath, 'utf-8');
    const posts = JSON.parse(fileContent);

    const newPost = {
        id: (posts.length + 1).toString(),
        title: body.title,
        author: body.author,
        content: body.content,
        publishedAt: new Date().toISOString(),
    };

    posts.push(newPost);
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2));

    return NextResponse.json(newPost, { status: 201 });
}
