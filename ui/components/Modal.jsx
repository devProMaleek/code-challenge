import React, { useState } from 'react';
import { isEmpty } from '../../utils';
import { CompanyList } from './CompanyList.jsx';

/**
 * Modal component.
 * @param {Object} props - Component props.
 * @param {Object} props.peopleCompany - An object where the keys are company names and the values are the number of people in each company.
 * @returns {JSX.Element} - The Modal component.
 */
export function Modal({ peopleCompany }) {
  // State for controlling whether the modal is open
  const [isOpen, setIsOpen] = useState(false);

  // Function for toggling the modal open and closed
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Styles for the modal button
  const buttonStyles =
    'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';

  // Styles for the modal itself
  const modalStyles = `${
    isOpen ? 'block' : 'hidden'
  } overflow-y-auto overflow-x-hidden absolute flex top-10 right-0 left-0 z-50 justify-center items-start w-full md:inset-y-32 h-[calc(100%-1rem)] max-h-full`;

  return (
    <div>
      {/* Button for opening the modal */}
      <button onClick={toggleModal} className={buttonStyles} type="button">
        View Details
      </button>
      {/* The modal itself */}
      <div tabIndex="-1" aria-hidden="true" className={modalStyles}>
        <div className="relative w-full max-w-2xl max-h-full p-4">
          <div className="relative bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between px-4 py-2 border-b rounded-t md:px-5 md:py-3 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                People by company
              </h3>
              {/* Button for closing the modal */}
              <button
                type="button"
                onClick={toggleModal}
                className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Modal body */}
            <div className="max-w-lg p-4 mx-auto md:p-5">
              {/* If there is no data, display a message */}
              {isEmpty(peopleCompany) ? (
                <div className="py-6 md:py-10">
                  <p className="text-lg font-bold text-center">
                    No data available
                  </p>
                </div>
              ) : (
                // If there is data, display it
                <div className="">
                  <div className="flex items-center justify-between">
                    <div className="font-bold">
                      <h3>Company Name</h3>
                    </div>
                    <div className="font-bold">
                      <h3>Number of people</h3>
                    </div>
                  </div>
                  {/* List of companies and the number of people in each */}
                  <CompanyList peopleCompany={peopleCompany} />
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-center px-4 py-2 border-t border-gray-200 rounded-b md:px-5 md:py-3 dark:border-gray-600">
              {/* Button for closing the modal */}
              <button
                onClick={toggleModal}
                type="button"
                className="px-8 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
