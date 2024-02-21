import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { truncateText } from '../../utils';

/**
 * CheckInButton component.
 * @param {Object} props - Component props.
 * @param {boolean} props.isCheckout - Indicates if the button is for checking out.
 * @param {Object} props.person - The person object.
 * @returns {JSX.Element} - The CheckInButton component.
 */
export function CheckInButton({ isCheckout, person }) {
  // State for storing whether the person is allowed to check out
  const [isAllowedToCheckout, setIsAllowedToCheckout] = useState();

  // Effect hook for setting isAllowedToCheckout state
  useEffect(() => {
    // If the person has checked in but not checked out
    if (person.checkIn && !person.checkOut) {
      // If less than 5 seconds have passed since the person checked in
      if ((new Date() - person.checkIn) / 1000 < 5) {
        // Set isAllowedToCheckout to true after 5 seconds
        setTimeout(() => setIsAllowedToCheckout(true), 5 * 1000);
      } else {
        // If more than 5 seconds have passed, set isAllowedToCheckout to true immediately
        setIsAllowedToCheckout(true);
      }
    }
  }, [person]);

  /**
   * Handles the check-in or check-out action.
   * @param {Object} value - The person object.
   */
  const handleCheck = value => {
    // Determine the method to call based on whether the person has checked in
    const method = value.checkIn ? 'people.checkOut' : 'people.checkIn';
    // Call the method with the person's ID
    Meteor.call(method, value._id);
  };

  // Styles for the button
  const buttonStyles = `px-5 py-2 mb-2 text-sm font-medium text-white ${
    isCheckout ? 'bg-red-700' : 'bg-green-700'
  } rounded-lg focus:outline-none ${
    isCheckout ? 'hover:bg-red-800' : 'hover:bg-green-800'
  } focus:ring-4 ${
    isCheckout ? 'focus:ring-red-300' : 'focus:ring-green-300'
  }  me-2 `;

  return (
    <div>
      {/* If the person has not checked in and checked out */}
      {!(person.checkIn && person.checkOut) ? (
        <button
          type="button"
          onClick={() => handleCheck(person)}
          disabled={isCheckout && !isAllowedToCheckout}
          className={buttonStyles}
        >
          {/* If the person is checking out and is not allowed to check out yet, display "Loading..." */}
          {/* Otherwise, display the check-in or check-out text with the person's name */}
          {isCheckout && !isAllowedToCheckout
            ? 'Loading...'
            : truncateText(
                `${isCheckout ? 'Check Out' : 'Check In'} ${person.firstName} ${
                  person.lastName
                }`,
                20
              )}
        </button>
      ) : (
        // If the person has checked in and checked out, display a message
        <p className="text-sm font-bold">This person has been checked out</p>
      )}
    </div>
  );
}
