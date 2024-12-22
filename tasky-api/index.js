import express from 'express';
import Task from './api/tasks/taskModel.js'; // Fixed the path
import asyncHandler from 'express-async-handler';
import usersRouter from './api/users/index.js'; // Ensure the path is correct
import './db'; // Database initialization
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Error handling middleware
const errHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        return res.status(500).send('Something went wrong!');
    }
    res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack}`);
};

// Task routes
app.use('/api/tasks', asyncHandler(async (req, res) => {
    const tasks = await Task.find(); // Fetch tasks from the database
    res.status(200).json(tasks);
}));

// User routes
app.use('/api/users', usersRouter);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Register error handling middleware
app.use(errHandler);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
