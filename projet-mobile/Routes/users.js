const express = require('express');
const router = express.Router();
const { User } = require('../models');  

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});



// Create a new user
router.post('/', async (req, res) => {
    try {
        const { first_name, last_name,  email, password, bio, status, age, gender, location } = req.body;

        if (!first_name || !last_name) {
            return res.status(400).send('First name and last name are required.');
        }

        const user = await User.create({
            first_name, 
            last_name,
            email,
            password,
            bio,
            status,
            age,
            gender,
            location
        });

        res.status(201).json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const { first_name, last_name, email, password, bio, status, age, gender, location } = req.body;
       
        const [updated] = await User.update({ 
            first_name,
            last_name,
             email,
            password,
            bio,
            status,
            age,
            gender,
            location
        }, {
            where: { id: req.params.id }
        });

        if (updated > 0) {
            const updatedUser = await User.findByPk(req.params.id);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).send('User not found.');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});






// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id }
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('User not found.');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
