import React from 'react';
import {Text, View} from 'react-native';

const FormattedDate = ({timestamp}) => {
  const formatDate = date => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thatDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    const difference = today - thatDay;
    const differenceInDays = difference / (1000 * 3600 * 24);

    // Format the time
    const timeString = date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });

    if (differenceInDays === 0) {
      return `Today - ${timeString}`;
    } else if (differenceInDays === 1) {
      return `Yesterday - ${timeString}`;
    } else {
      return `${date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })} at ${timeString}`;
    }
  };

  return (
    <View style={{paddingTop: 28, paddingLeft: 15}}>
      <Text style={{fontSize: 12, fontWeight: '600', color: '#999'}}>
        {formatDate(new Date(timestamp))}
      </Text>
    </View>
  );
};

export default FormattedDate;
