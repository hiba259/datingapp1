const express = require('express');
const router = express.Router();
const { Message } = require('../models');  

// Get all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Message.findAll();
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new message
router.post('/', async (req, res) => {
    try {
        const { senderId, receiverId, content, status } = req.body;

        const newMessage = await Message.create({
            
            senderId,
            receiverId,
            content,
            status
        });

        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a message by ID
router.put('/:id', async (req, res) => {
    try {
        const { message, read } = req.body;
        const [updated] = await Message.update({ 
            message,
            read
        }, {
            where: { id: req.params.id }
        });

        if (updated > 0) {
            const updatedMessage = await Message.findByPk(req.params.id);
            res.status(200).json(updatedMessage);
        } else {
            res.status(404).send('Message not found.');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a message by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Message.destroy({
            where: { id: req.params.id }
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Message not found.');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
