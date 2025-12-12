'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const Modal = ({ children }: { children: React.ReactNode }) => {
    const { back } = useRouter();
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    function onDismiss() {
        back();
    }

    return (
        <dialog
            ref={dialogRef}
            className="fixed inset-0 m-auto w-full max-w-3xl rounded-lg bg-white dark:bg-gray-900 p-0 shadow-xl backdrop:bg-black/50 backdrop:backdrop-blur-sm relative overflow-hidden"
            onClose={onDismiss}
            onClick={(e) => {
                if (e.target === dialogRef.current) {
                    onDismiss();
                }
            }}
        >
            <div className='max-h-[90vh] overflow-y-auto p-6'>
                <button
                    onClick={onDismiss}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label="Close modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {children}
            </div>
        </dialog>
    );
}

export default Modal;
