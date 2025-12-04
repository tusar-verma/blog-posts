interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export default function InputForm({ label, id, className, ...props }: InputFormProps) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <input
                id={id}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm p-2 border ${className || ''}`}
                {...props}
            />
        </div>
    );
}
