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
        .catch(err => console.error('Error executing get query', err.stack))
}

taskController.postTasks = (req, res, next) => {
    console.log('req body', req.body)
    const q = "insert into tasks (content, done) values ('"+`${req.body.text}`+"', false)"
    db
        .query(q)
        .then(next())
        .catch(err => console.error('Error executing post query', err.stack))
}

module.exports = taskController;