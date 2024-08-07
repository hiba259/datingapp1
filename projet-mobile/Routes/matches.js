const express = require('express');
const router = express.Router();
const { Match } = require('../models');  

// Get all matches
router.get('/', async (req, res) => {
    try {
        const matches = await Match.findAll();
        res.status(200).json(matches);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new match
router.post('/', async (req, res) => {
    try {
        const { user1_id, user2_id, status } = req.body;

        const newMatch = await Match.create({
            user1_id,
            user2_id,
            status
        });

        res.status(201).json(newMatch);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a match by ID
router.put('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const [updated] = await Match.update({ 
            status
        }, {
            where: { id: req.params.id }
        });

        if (updated > 0) {
            const updatedMatch = await Match.findByPk(req.params.id);
            res.status(200).json(updatedMatch);
        } else {
            res.status(404).send('Match not found.');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a match by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Match.destroy({
            where: { id: req.params.id }
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Match not found.');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
