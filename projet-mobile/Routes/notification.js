const express = require('express');
const router = express.Router();
const { Notification } = require('../models');  

// Get all notifications
router.get('/', async (req, res) => {
    try {
        const notifications = await Notification.findAll();
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new notification
router.post('/', async (req, res) => {
    try {
        const { user_id, type, message, read } = req.body;

        const newNotification = await Notification.create({
            user_id,
            type,
            message,
            read
        });

        res.status(201).json(newNotification);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a notification by ID
router.put('/:id', async (req, res) => {
    try {
        const { type, message, read } = req.body;
        const [updated] = await Notification.update({ 
            type,
            message,
            read
        }, {
            where: { id: req.params.id }
        });

        if (updated > 0) {
            const updatedNotification = await Notification.findByPk(req.params.id);
            res.status(200).json(updatedNotification);
        } else {
            res.status(404).send('Notification not found.');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a notification by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Notification.destroy({
            where: { id: req.params.id }
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Notification not found.');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
