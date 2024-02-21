import React from 'react';

// Component for the "Previous" icon
function PreviousIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 me-2 rtl:rotate-180"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 5H1m0 0 4 4M1 5l4-4"
      />
    </svg>
  );
}

// Component for the "Next" icon
function NextIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5h12m0 0L9 1m4 4L9 9"
      />
    </svg>
  );
}

/**
 * Pagination component.
 * @param {Object} props - Component props.
 * @param {Array} props.people - Array of people.
 * @param {number} props.startIndex - The index of the first person on the current page.
 * @param {number} props.endIndex - The index of the last person on the current page.
 * @param {Function} props.handlePrevious - Function to handle the "Previous" button click.
 * @param {Function} props.handleNext - Function to handle the "Next" button click.
 * @returns {JSX.Element} - The Pagination component.
 */
export function Pagination({
  people,
  startIndex,
  endIndex,
  handlePrevious,
  handleNext,
}) {
  // Styles for the pagination buttons
  const buttonStyles =
    'flex items-center justify-center cursor-pointer h-8 px-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white';

  return (
    <nav
      className="flex flex-wrap items-center justify-between pt-4 flex-column md:flex-row"
      aria-label="Table navigation"
    >
      {/* Display the range of people currently being shown */}
      <span className="block w-full mb-4 text-sm font-normal text-gray-500 dark:text-gray-400 md:mb-0 md:inline md:w-auto">
        Showing{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {startIndex + 1} - {endIndex}
        </span>{' '}
        of{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {people.length}
        </span>
      </span>

      {/* Pagination buttons */}
      <div className="flex">
        {/* "Previous" button */}
        <div onClick={handlePrevious} className={`${buttonStyles} me-3`}>
          <PreviousIcon />
          Previous
        </div>
        {/* "Next" button */}
        <div onClick={handleNext} className={buttonStyles}>
          Next
          <NextIcon />
        </div>
      </div>
    </nav>
  );
}
