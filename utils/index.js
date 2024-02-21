import { format } from 'date-fns';

/**
 * Truncate a string to a specified length and append '...' if it exceeds that length.
 * @param {string} text - The string to truncate.
 * @param {number} length - The maximum length of the string.
 * @returns {string} - The truncated string.
 */
export const truncateText = (text, length) => {
  if (text.length > length) {
    return `${text.substring(0, length)}...`;
  }
  return text;
};

/**
 * Format a date to 'MM/dd/yyyy, HH:mm' format.
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted date.
 */
export const formatDate = date => format(date, 'MM/dd/yyyy, HH:mm');

/**
 * Check if an object is empty.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if the object is empty, false otherwise.
 */
export const isEmpty = obj => Object.keys(obj).length === 0;
