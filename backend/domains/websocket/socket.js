// domains/websocket/socket.api.js

const socketIO = require("socket.io");
const { createMessage, updateMessage } = require("../message/message.service");
const { deleteMessage } = require("../message/message.dao");

const initializeSocket = (server) => {
  const onlineUsers = {};
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // --- Connection Events ---
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

    // --- Authentication Events ---
    socket.on("auth", (data) => {
      // Example: Validate authentication
      const isAuthenticated = true; // Implement your authentication logic
      if (isAuthenticated) {
        // Add the user to the online users list
        onlineUsers[socket.id] = data.username;
        socket.emit("auth-success", "Authentication successful");
      } else {
        socket.emit("auth-fail", "Authentication failed");
      }
    });

    // --- Message Events ---
    socket.on("message-send", async (message) => {
      // Example: Store the message in the database
      const { from, message_text, sent, chat_id } = message;
      console.log("Received message:", message);
      // Implement your logic to save the message in the database
      const date = new Date().toISOString();
      const saveMessage = await createMessage(from, message_text, date, chat_id);
      console.log("Message saved:", saveMessage);
      // Broadcast the message to all connected clients
      io.emit("message-received", saveMessage);
    });

    socket.on("message-delete", async (message) => {
      // Example: Implement logic to delete the message
      console.log("Delete message with ID:", message);
      const { id } = message;
      // Implement your logic to delete the message from the database
      await deleteMessage(id);
      // Broadcast the event to all connected clients
      io.emit("message-deleted", { msg: "success" });
    });

    socket.on("message-update", async (newMessage) => {
      // Example: Implement logic to update the message
      console.log("Update message:", newMessage);
      const { id, updated_text } = newMessage;
      // Implement your logic to update the message in the database
      const updatedMessage = await updateMessage(id, updated_text);
      // Broadcast the updated message to all connected clients
      io.emit("message-updated", updatedMessage);
    });

    // --- Friend Request Events ---
    socket.on("invitation", (invitation) => {
      // Example: Implement logic to handle friend invitation
      console.log("Received invitation:", invitation);
      // Implement your logic to process the friend invitation

      // Broadcast the invitation to all connected clients
      io.emit("invitation-received", invitation);
    });

    socket.on("accept", (invitation) => {
      // Example: Implement logic to accept friend request
      console.log("Accepted invitation:", invitation);
      // Implement your logic to accept the friend request

      // Broadcast the acceptance to all connected clients
      io.emit("invitation-accepted", invitation);
    });

    socket.on("decline", (invitation) => {
      // Example: Implement logic to decline friend request
      console.log("Declined invitation:", invitation);
      // Implement your logic to decline the friend request

      // Broadcast the decline to all connected clients
      io.emit("invitation-declined", invitation);
    });
  });

  return io;
};

module.exports = initializeSocket;
