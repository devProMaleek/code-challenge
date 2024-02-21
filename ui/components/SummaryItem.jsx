import React from 'react';

/**
 * Component for displaying a piece of summary data.
 * @param {Object} props - Component props.
 * @param {string} props.label - The label of the data.
 * @param {string | number} props.value - The value of the data.
 * @returns {JSX.Element} - The rendered component.
 */
export function SummaryItem({ label, value }) {
  return (
    // Container for the label and value
    <div className="flex items-center justify-center space-x-1 md:space-x-3">
      {/* Display the label */}
      <p className="text-base font-bold leading-normal tracking-normal text-gray-500">
        {label}:
      </p>
      {/* Display the value */}
      <p className="text-lg font-bold leading-normal tracking-normal text-black">
        {value}
      </p>
    </div>
  );
}
