// warpper for express middleware to socket.io middleware

const socketWrapper = (middleware) => {
  return (socket, next) => {
    middleware(socket.request, {}, next);
  };
};

module.exports = socketWrapper;
