const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center space-x-4 py-8">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium disabled:bg-gray-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors disabled:hover:bg-gray-300 dark:disabled:hover:bg-slate-700"
            >
                Previous
            </button>

            <span className="text-gray-700 dark:text-gray-300 font-medium">
                Page {currentPage} of {totalPages > 500 ? 500 : totalPages}
            </span>

            <button
                onClick={handleNext}
                disabled={currentPage >= totalPages || currentPage >= 500}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium disabled:bg-gray-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors disabled:hover:bg-gray-300 dark:disabled:hover:bg-slate-700"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
