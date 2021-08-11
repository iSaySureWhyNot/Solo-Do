const express = require('express');

const taskContoller = require('../controllers/taskController');

const path = require('path');

const router = express.Router();

// router.get('/',
     
//     (req, res) => res.status(200).sendFile(path.join(__dirname, '../../index.html'))
// );

router.get('/tasks',
    taskContoller.getTasks,
    (req, res) => res.status(200).json(res.locals.tasks)
);

module.exports = router;