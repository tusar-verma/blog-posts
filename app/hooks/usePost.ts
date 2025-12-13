'use client';

import { useState } from 'react';

interface UsePostResponse<T> {
    statusCode: number;
    message: string;
    data: T | null;
    loading: boolean;
    postData: (body: unknown) => Promise<void>;
}

const usePost = <T>(url: string): UsePostResponse<T> => {
    const [response, setResponse] = useState<Omit<UsePostResponse<T>, 'postData'>>({
        statusCode: 0,
        message: '',
        data: null,
        loading: false,
    });

    const postData = async (body: unknown) => {
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            setResponse({
                statusCode: res.status,
                message: res.ok ? 'success' : 'error',
                data: res.ok ? data : null,
                loading: false,
            });
        } catch (error) {
            setResponse({
                statusCode: 500,
                message: 'error',
                data: null,
                loading: false,
            });
        }
    };

    return { ...response, postData };
};

export default usePost;
