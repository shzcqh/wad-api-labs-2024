import express from 'express';
import Task from './taskModel';
import asyncHandler from 'express-async-handler';
const errHandler = (err, req, res, next) => {
    /* if the error in development then send stack trace to display whole error,
    if it's in production then just send error message  */
    if(process.env.NODE_ENV === 'production') {
      return res.status(500).send(`Something went wrong!`);
    }
    res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
  };
const router = express.Router(); // eslint-disable-line

// Get all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
});

// create a task
router.post('/', async (req, res) => {
    const task = await Task(req.body).save();
    res.status(201).json(task);
});
// Update Task
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await Task.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'Task Updated Successfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find Task' });
    }
});

// delete Task
router.delete('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await Task.deleteOne({
        _id: req.params.id,
    });
    if (result.deletedCount) {
        res.status(204).json();
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find Task' });
    }
});
// create a task
router.post('/', asyncHandler(async (req, res) => {
    const task = await Task(req.body).save();
    res.status(201).json(task);
}));
router.use(errHandler);
export default router;