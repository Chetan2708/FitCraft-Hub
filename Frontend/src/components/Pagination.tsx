import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 3;

    for (let i = 1; i <= totalPages; i++) {
      if (i <= maxPageNumbers || (i === totalPages && totalPages > maxPageNumbers) || i === currentPage) {
        pageNumbers.push(
          <li
            key={i}
            className={`flex items-center justify-center shrink-0 ${
              currentPage === i
                ? "bg-blue-500 border-2 border-blue-500 cursor-pointer text-base font-bold text-white"
                : "hover:bg-gray-50 border-2 cursor-pointer text-base font-bold text-[#333]"
            } w-10 h-10 rounded-lg`}
            onClick={() => paginate(i)}
          >
            {i}
          </li>
        );
      }
    }

    if (currentPage > maxPageNumbers) {
      pageNumbers.splice(1, 0, (
        <li
          key="ellipsis"
          className="flex items-center justify-center shrink-0 cursor-default text-base font-bold text-[#333] w-10 h-10"
        >
          ...
        </li>
      ));
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center m-8">
      <ul className="flex flex-wrap space-x-4 justify-center">
        <li
          className={`flex items-center justify-center shrink-0 bg-gray-300 w-10 h-10 rounded-lg cursor-pointer ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => paginate(currentPage - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 fill-gray-400"
            viewBox="0 0 55.753 55.753"
          >
            <path
              d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
              data-original="#000000"
            />
          </svg>
        </li>
        {renderPageNumbers()}
        <li
          className={`flex items-center justify-center shrink-0 bg-gray-300 w-10 h-10 rounded-lg cursor-pointer ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => paginate(currentPage + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 fill-gray-400 rotate-180"
            viewBox="0 0 55.753 55.753"
          >
            <path
              d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
              data-original="#000000"
            />
          </svg>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
