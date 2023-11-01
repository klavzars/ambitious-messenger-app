class Message {
    // Message Types (type of Message Content):
    // Text
    // Images
    // Voice
    // Location (location information in URL format).
    // Files (document messages).

    //******delete this ******
    // Conversation Types:
    // Single Chat (individual one-on-one conversation).
    // Group Chat
    // Voice Chat
    // Video Chat

    // Message Status, including:
    // Sending (0) - The message is currently being sent.
    // Sent (1) - The message has been successfully sent.
    // Send Failure (2) - The message failed to send.
    // Mentioned (3) - The message includes a mention or reminder.
    // All Mentioned (4) - A mention or reminder to all recipients.
    // Unread (5) - The message has not been read.
    // Read (6) - The message has been read.
    // Played (7) - The message has been played (typically for voice messages).

    constructor(id, from, message_text, messageType, conversationId, status, createdAt) {
        this.id = id;
        this.text = text;
        this.from = from;
        this.messageType = messageType;
        this.conversationId = conversationId;
        //this.status = status;
        this.createdAt = createdAt;
    }
}
module.exports = Message;  