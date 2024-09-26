
// Pagination component for tables
// Wont show if totalPages is 0
export default function Pagination({ currentPage, totalPages, onPageChange }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) {
    if (totalPages < 2) return <></>
    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
                Previous
            </button>
            <span>{currentPage} of {totalPages}</span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}