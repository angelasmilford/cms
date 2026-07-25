var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const User = require('../models/user');

console.log('Users route loaded');

router.get('/', (req, res, next) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })

        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

// Register
router.post('/', (req, res, next) => {
    const maxUserId = sequenceGenerator.nextId('users');

    const user = new User({
        id: maxUserId,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    user.save()
        .then(createdUser => {
            res.status(201).json({
                message: 'User added successfully',
                user: createdUser
            });
        })

        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

// Login
router.post('/login', (req, res, next) => {

    User.findOne({
        email: req.body.email
    })

    .then(user => {

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email.'
            });
        }

        if (user.password !== req.body.password) {
            return res.status(401).json({
                message: 'Invalid password.'
            });
        }

        res.status(200).json({
            message: 'Login successful',
            user: user
        });

    })

    .catch(error => {

        res.status(500).json({
            message: 'An error occurred',
            error: error
        });

    });

});

router.put('/:id', (req, res, next) => {
    User.findOne({ id: req.params.id })

        .then(user => {
            user.username = req.body.username;
            user.email = req.body.email;
            user.password = req.body.password;
            user.role = req.body.role;

            User.updateOne(
                { id: req.params.id },
                user
            )

            .then(result => {
                res.status(204).json({
                    message: 'User updated successfully'
                });
            })

            .catch(error => {

                res.status(500).json({
                    message: 'An error occurred',
                    error: error
                });
            });
        })

        .catch(error => {
            res.status(500).json({
                message: 'User not found.',
                error: { user: 'User not found' }
            });
        });
});

router.delete('/:id', (req, res, next) => {
    User.findOne({ id: req.params.id })

        .then(user => {
            User.deleteOne({ id: req.params.id })

            .then(result => {
                res.status(204).json({
                    message: 'User deleted successfully'
                });

            })

            .catch(error => {
                res.status(500).json({
                    message: 'An error occurred',
                    error: error
                });
            });
        })

        .catch(error => {
            res.status(500).json({
                message: 'User not found.',
                error: { user: 'User not found' }
            });
        });
});

module.exports = router;