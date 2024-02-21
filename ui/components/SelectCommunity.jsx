import { Communities } from '../../communities/communities';
import React, { useEffect, useState, useCallback } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import Select from 'react-select';

/**
 * SelectCommunity component.
 * @param {Object} props - Component props.
 * @param {Function} props.onChange - Function to handle the change event of the select input.
 * @returns {JSX.Element} - The SelectCommunity component.
 */
export function SelectCommunity({ onChange }) {
  // State for the select input options
  const [options, setOptions] = useState([]);

  // Use the useTracker hook to subscribe to the 'communities' publication and fetch the communities data
  const { communities, isCommunitiesLoading } = useTracker(() => {
    const noCommunities = { communities: [] };

    const communitiesHandler = Meteor.subscribe('communities');

    if (!communitiesHandler.ready()) {
      return { ...noCommunities, isCommunitiesLoading: true };
    }

    const communitiesData = Communities.find({}).fetch();

    return { communities: communitiesData, isCommunitiesLoading: false };
  });

  // When the communities data changes, update the select input options
  useEffect(() => {
    if (communities) {
      const newOptions = communities.map(community => ({
        value: community._id,
        label: community.name,
      }));
      setOptions(newOptions);
    }
  }, [communities]);

  // Handle the change event of the select input
  const handleChange = useCallback(
    item => {
      onChange(item.value);
    },
    [onChange]
  );

  return (
    <div>
      {/* Select input for choosing a community */}
      <Select
        onChange={handleChange}
        options={options}
        isLoading={isCommunitiesLoading}
        placeholder="Select a community..."
      />
    </div>
  );
}
