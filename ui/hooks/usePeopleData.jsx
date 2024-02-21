import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { People } from '../../people/people';

/**
 * Custom hook for fetching people data and calculating summary data.
 * @param {Object} selectedCommunity - The selected community object.
 * @returns {Object} - The people data and summary data.
 */
export function usePeopleData(selectedCommunity) {
  // Use the useTracker hook to subscribe to the 'people' publication and fetch the people data
  const { people } = useTracker(() => {
    const noPeople = { people: [] };
    const peopleHandler = Meteor.subscribe('people');

    if (!peopleHandler.ready()) {
      return noPeople;
    }

    const peopleData = People.find({ communityId: selectedCommunity }).fetch();

    return { people: peopleData };
  }, [selectedCommunity]);

  // Filter the people data to get the people who are currently present
  const peoplePresent = people.filter(
    person => person.checkIn && !person.checkOut
  );
  // Calculate the number of people who are currently present
  const countPeoplePresent = peoplePresent.length;

  // Group the people who are currently present by company
  const peopleByCompany = peoplePresent.reduce((acc, person) => {
    const companyName = person.companyName ?? 'Unknown Companies';
    if (acc[companyName]) {
      acc[companyName] += 1;
    } else {
      acc[companyName] = 1;
    }
    return acc;
  }, {});

  // Convert the people by company object to a string
  const peopleByCompanyText = Object.entries(peopleByCompany).reduce(
    (acc, [company, number], index) => {
      return acc + `${index ? `, ` : ``} ${company}: ${number}`;
    },
    ''
  );

  // Return the people data and summary data
  return { people, countPeoplePresent, peopleByCompanyText };
}
