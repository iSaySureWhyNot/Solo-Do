const db = require('../models/taskModels');

const taskController = {};

taskController.getTasks = (req, res, next) => {
    db
        .query('SELECT * FROM tasks')
        .then(result => {
            console.log(result.rows)
            res.locals.tasks = result.rows
            next()
        })
        .catch(err => console.error('Error executing query', err.stack))
}

module.exports = taskController;