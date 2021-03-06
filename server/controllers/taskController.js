const db = require('../models/taskModels');

const taskController = {};

taskController.getTasks = (req, res, next) => {
    db
        .query('SELECT * FROM tasks')
        .then(result => {
            //console.log(result.rows)
            res.locals.tasks = result.rows
            next()
        })
        .catch(err => console.error('Error executing get query', err.stack))
}

taskController.postTasks = async (req, res, next) => {
    //console.log('req body', req.body)
    const q = "insert into tasks (content, done) values ('"+`${req.body.text}`+"', false)"
    await db
        .query(q)
        .then((result)=> {console.log('taskController hello here')
        res.locals.tasks = result
            next()})
        .catch(err => console.error('Error executing post query', err.stack))
}

taskController.deleteTask = (req, res, next) => {
    console.log(req.body)
    q = "delete from tasks where taskid="+`${req.body.key}`
    db
        .query(q)
        .then(next())
        .catch(err => console.error('Error executing delete query', err.stack))
}

taskController.updateTask = (req, res, next) => {
    console.log(req.body)
    q = "update tasks set done ="+`${req.body.done}`+" where taskid="+`${req.body.key}`
    db
        .query(q)
        .then(next())
        .catch(err => console.error('Error executing update done query', err.stack))
}

module.exports = taskController;