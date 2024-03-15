export const localTime = (utcTime) => {
  //get the time from the message
  const parsedTime = new Date(Date.parse(utcTime));
  //check if the message is from today
  // if (isToday(parsedTime)) return `Today at ${parsedTime.toLocaleTimeString()}`;

  //if not then check if the message was from yesterday
  // if (isYesterday(parsedTime)) return `Yesterday at ${parsedTime.toLocaleTimeString()}`;

  //if it isnt then just return the date and the time
  // return `${parsedTime.toDateString()} at ${parsedTime.toLocaleTimeString()}`;

  var hours = parsedTime.getHours();
  var minutes = parsedTime.getMinutes();

  // Ensure leading zero if necessary
  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;

  // Return formatted string in hh:mm format
  return hours + ":" + minutes;
};

const isToday = (date) => {
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const isYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
};
