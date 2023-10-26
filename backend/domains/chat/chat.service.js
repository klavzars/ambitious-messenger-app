const createChat = (user, isPrivate, members) => {
  //will first check if room its private
  // TODO implement your own personal chat room for you only

  // since this is a new chat, would want the user to be added as a member in both cases
  const userWithMembers = [user, ...members];

  // is there are re
  if (isPrivate && members.length === 1) {
    // create private chat
  } else {
    // create group chat
  }
};

const addMember = () => {};
