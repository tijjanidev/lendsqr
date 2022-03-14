export default function Errors({ errors = [], ...props }) {
    return (
        <>
            {errors.length > 0 && (
                <div {...props}>
                    <div className="font-medium text-red-400 m-2">
                        Whoops! Something went wrong.
                    </div>

                    <ul className="list-disc list-inside text-sm text-red-600">
                        {errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}