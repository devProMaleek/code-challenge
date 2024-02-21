import React, { useCallback, useState } from 'react';
import { Pagination } from './Pagination.jsx';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { People } from '../../people/people';
import { PersonTableRow } from './PersonTableRow.jsx';

/**
 * Table component.
 * @param {Object} props - Component props.
 * @param {string} props.selectedCommunity - The ID of the selected community.
 * @param {boolean} props.buttonClicked - Whether the button was clicked.
 * @returns {JSX.Element} - The rendered component.
 */
export function Table({ selectedCommunity, buttonClicked }) {
  // State for the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Use the useTracker hook to subscribe to the 'people' publication and fetch the people data
  const { people, isPeopleLoading } = useTracker(() => {
    const noPeople = { people: [] };

    const peopleHandler = Meteor.subscribe('people');

    if (!peopleHandler.ready()) {
      return { ...noPeople, isPeopleLoading: true };
    }

    const peopleData = People.find({ communityId: selectedCommunity }).fetch();

    return { people: peopleData, isPeopleLoading: false };
  }, [selectedCommunity, buttonClicked]);

  // Number of items per page
  const itemsPerPage = 10;

  // Calculate the start and end indices for slicing the people array
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the people array to get the people for the current page
  const currentPeople = people.slice(startIndex, endIndex);

  // Function to go to the previous page
  const goToPreviousPage = useCallback(() => {
    setCurrentPage(prevPage => {
      if (prevPage === 1) {
        return prevPage;
      }
      return prevPage - 1;
    });
  }, []);

  // Function to go to the next page
  const goToNextPage = useCallback(() => {
    setCurrentPage(prevPage => {
      if (prevPage === Math.ceil(people.length / itemsPerPage)) {
        return prevPage;
      }
      return prevPage + 1;
    });
  }, [people.length, itemsPerPage]);

  return (
    <section>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          {/* Table header */}
          <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                Company
              </th>
              <th scope="col" className="px-6 py-3">
                Check in
              </th>
              <th scope="col" className="px-6 py-3">
                Check out
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {currentPeople.length > 0 ? (
              currentPeople.map(person => (
                <PersonTableRow key={person._id} person={person} />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4">
                  <div className="py-10 text-center ps-3 md:py-12">
                    {isPeopleLoading ? (
                      <div className="text-lg font-bold text-black">
                        Loading...
                      </div>
                    ) : (
                      <div>
                        <div className="text-lg font-bold text-black">
                          No Data
                        </div>
                        <div className="text-base font-normal text-gray-500">
                          Kindly, select a community to see their data
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="">
        {people.length > 0 && (
          <Pagination
            people={people}
            startIndex={startIndex}
            endIndex={endIndex}
            handlePrevious={goToPreviousPage}
            handleNext={goToNextPage}
          />
        )}
      </div>
    </section>
  );
}
