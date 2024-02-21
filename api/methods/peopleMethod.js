import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { People } from '../../people/people';

// Define Meteor methods
Meteor.methods({
  // Method for checking in a person
  'people.checkIn'(personId) {
    // Check that personId is a string
    check(personId, String);

    // Update the person's checkIn field in the database
    People.update(personId, {
      $set: {
        checkIn: new Date(), // Set checkIn to the current date and time
      },
    });
  },

  // Method for checking out a person
  'people.checkOut'(personId) {
    // Check that personId is a string
    check(personId, String);

    // Update the person's checkOut field in the database
    People.update(personId, {
      $set: {
        checkOut: new Date(), // Set checkOut to the current date and time
      },
    });
  },
});
