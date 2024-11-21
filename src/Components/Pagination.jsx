const Pagination = ({ currentPage, totalPages, setPage }) => {
    return (
      <div className="flex justify-center mt-4">
        <button
          className="p-2 bg-gray-800 text-white"
          disabled={currentPage === 1}
          onClick={() => setPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="mx-4 text-white">{currentPage} / {totalPages}</span>
        <button
          className="p-2 bg-gray-800 text-white"
          disabled={currentPage === totalPages}
          onClick={() => setPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  