export default function Button({ type = 'submit', className = '', ...props }) {
    return (
        <button
            type={type}
            className={`${className} px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900`}
            {...props}
        />
    )
}                         

