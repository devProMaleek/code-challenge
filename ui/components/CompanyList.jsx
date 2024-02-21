import React from 'react';

/**
 * CompanyList component.
 * @param {Object} props - Component props.
 * @param {Object} props.peopleCompany - An object where the keys are company names and the values are the number of people in each company.
 * @returns {JSX.Element[]} - A list of div elements representing each company and the number of people in it.
 */
export function CompanyList({ peopleCompany }) {
  // Convert the peopleCompany object into an array of [company, number] pairs
  // Then map over the array to create a div element for each pair
  return Object.entries(peopleCompany).map(([company, number], index) => (
    // The key for each div is the company name
    <div key={company} className="flex items-center justify-between">
      <div className="flex items-center space-x-2 ms-2">
        {/* Display the index (1-based) and the company name */}
        <span>{index + 1}.</span>
        <p>{company}</p>
      </div>
      <div className="">
        {/* Display the number of people in the company */}
        <p>{number}</p>
      </div>
    </div>
  ));
}
