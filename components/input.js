export default function Input({ disabled = false, className = '', ...props }) {
    return (
        <input
            disabled={disabled}
            className={`${className} w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600`}
            {...props}
        />
    )
}