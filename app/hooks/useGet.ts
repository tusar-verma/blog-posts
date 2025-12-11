'use client';

import { useState, useEffect } from 'react';

interface UseGetResponse<T> {
    statusCode: number;
    message: string;
    data: T | null;
    loading: boolean;
}

export const useGet = <T>(url: string): UseGetResponse<T> => {
    const [response, setResponse] = useState<UseGetResponse<T>>({
        statusCode: 0,
        message: '',
        data: null,
        loading: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            setResponse(prev => ({ ...prev, loading: true }));
            try {
                const res = await fetch(url);
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
                    data: null, // Assuming request content shouldn't be returned on catch
                    loading: false,
                });
            }
        };

        fetchData();
    }, [url]);

    return response;
};
