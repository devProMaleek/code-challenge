import React from 'react';
import { CheckInButton } from './CheckInButton.jsx';

import { formatDate, truncateText } from '../../utils/index.js';

/**
 * PersonTableRow component.
 * @param {Object} props - Component props.
 * @param {Object} props.person - An object representing a person.
 * @returns {JSX.Element} - The PersonTableRow component.
 */
export function PersonTableRow({ person }) {
  // Full name of the person
  const personFullName = `${person.firstName} ${person.lastName}`;

  // Company of the person, truncated to 20 characters if it exists, otherwise 'Unknown Company'
  const personCompany = person.companyName
    ? truncateText(person.companyName, 20)
    : 'Unknown Company';

  // Title of the person, truncated to 20 characters if it exists, otherwise 'N/A'
  const personTitle = person.title ? truncateText(person.title, 20) : 'N/A';

  // Check-in time of the person, formatted if it exists, otherwise 'N/A'
  const checkInValue = person.checkIn ? formatDate(person.checkIn) : 'N/A';

  // Check-out time of the person, formatted if it exists, otherwise 'N/A'
  const checkOutValue = person.checkOut ? formatDate(person.checkOut) : 'N/A';

  return (
    // Table row for the person
    <tr key={person._id} className="bg-white border-b hover:bg-gray-50">
      {/* Cell for the person's name and title */}
      <th
        scope="row"
        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="ps-3">
          <div className="text-base font-semibold">
            {truncateText(personFullName, 20)}
          </div>
          <div className="font-normal text-gray-500">{personTitle}</div>
        </div>
      </th>
      {/* Cell for the person's company */}
      <td className="px-6 py-4">{personCompany}</td>
      {/* Cell for the person's check-in time */}
      <td className="px-6 py-4">{checkInValue}</td>
      {/* Cell for the person's check-out time */}
      <td className="px-6 py-4">{checkOutValue}</td>
      {/* Cell for the check-in button */}
      <td className="px-6 py-4">
        <CheckInButton isCheckout={person.checkIn} person={person} />
      </td>
    </tr>
  );
}
