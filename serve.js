const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Body parser middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/messageDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Message Model
const Message = mongoose.model('Message', {
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

// Routes
// POST /messages - Create a new message
app.post('/messages', (req, res) => {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });
    newMessage.save()
        .then(message => res.json(message))
        .catch(err => res.status(500).json({ error: 'Failed to save message' }));
});

// GET /messages - Retrieve all messages
app.get('/messages', (req, res) => {
    Message.find().sort('-createdAt')
        .then(messages => res.json(messages))
        .catch(err => res.status(500).json({ error: 'Failed to retrieve messages' }));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
