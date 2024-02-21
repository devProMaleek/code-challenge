import React, { memo, useMemo } from 'react';
// import { Modal } from './Modal.jsx';
import { usePeopleData } from '../hooks/usePeopleData.jsx';
import { SummaryItem } from './SummaryItem.jsx';

/**
 * EventSummary component.
 * Renders the summary of an event, including the number of people who have not checked in,
 * the number of people currently present at the event, and a modal displaying the number of people
 * from each company currently at the event.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.selectedCommunity - The selected community for the event.
 * @returns {JSX.Element} The rendered EventSummary component.
 */

// The EventSummary component is memoized to prevent unnecessary re-renders
export const EventSummary = memo(({ selectedCommunity }) => {
  // Use the usePeopleData hook to get data about the people in the selected community
  const { people, countPeoplePresent, peopleByCompanyText } = usePeopleData(
    selectedCommunity
  );

  // Calculate the number of people who have not checked in
  // This is memoized to prevent unnecessary calculations
  const peopleNotCheckedIn = useMemo(
    () => people.filter(person => !person.checkIn).length,
    [people]
  );

  return (
    <div className="">
      <div className="max-w-2xl p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-center">
          <div className="flex flex-col justify-center space-y-1 md:space-y-3">
            {/* Display the number of people who have not checked in */}
            <SummaryItem
              label="People not checked-in"
              value={peopleNotCheckedIn}
            />
            {/* Display the number of people currently present at the event */}
            <SummaryItem
              label="People in the event right now"
              value={countPeoplePresent}
            />
            <div className="flex flex-col items-center justify-center">
              <p className="mb-4 text-base font-bold leading-normal tracking-normal text-gray-500">
                People by company in the event right now
              </p>
              {/* Display the number of people from each company currently at the event */}
              <p className="text-base font-bold leading-normal tracking-normal text-black">
                {peopleByCompanyText}
              </p>
              {/* Display a modal with the number of people from each company currently at the event */}
              {/* <Modal peopleCompany={peopleByCompany} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
