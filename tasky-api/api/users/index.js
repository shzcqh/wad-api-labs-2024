import express from 'express';
import User from './userModel';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            code: 500,
            msg: 'Failed to fetch users',
            error: error.message,
        });
    }
});

// Register (Create) / Authenticate User
router.post('/', async (req, res) => {
    if (req.query.action === 'register') {
        try {
            const newUser = new User(req.body); // Validate against the Mongoose schema
            await newUser.save(); // Save to the database
            res.status(201).json({
                code: 201,
                msg: 'Successfully created new user.',
            });
        } catch (error) {
            // Capture validation errors (e.g., missing required fields)
            res.status(400).json({
                code: 400,
                msg: 'User registration failed.',
                error: error.message,
            });
        }
    } else { // Authenticate User
        try {
            const user = await User.findOne(req.body);
            if (!user) {
                return res.status(401).json({
                    code: 401,
                    msg: 'Authentication failed. Invalid username or password.',
                });
            }
            res.status(200).json({
                code: 200,
                msg: 'Authentication successful.',
                token: 'TEMPORARY_TOKEN', // Replace with a generated token in production
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                msg: 'Authentication failed due to server error.',
                error: error.message,
            });
        }
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    try {
        if (req.body._id) delete req.body._id; // Prevent changing the ID
        const result = await User.updateOne({ _id: req.params.id }, req.body);
        if (result.matchedCount) {
            res.status(200).json({
                code: 200,
                msg: 'User updated successfully.',
            });
        } else {
            res.status(404).json({
                code: 404,
                msg: 'User not found or update failed.',
            });
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            msg: 'Failed to update user.',
            error: error.message,
        });
    }
});

export default router;
