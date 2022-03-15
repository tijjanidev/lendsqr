export default function Message({ message = '',color = 'text-gray-500', ...props }) {
    
    return (
        <>
            <div {...props}>
                <div className="font-medium">
                    <span className={color}>{message}</span> 
                </div>
            </div>
        </>
    )
}