import { FaTimesCircle } from "react-icons/fa";

export default function ErrorPage({ message }: { message: string }) {
    return (
        <div className="text-center">
            <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-600">{message}</p>
        </div>
    )
}