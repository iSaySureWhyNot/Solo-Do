const express = require('express');

const taskContoller = require('../controllers/taskController');

const path = require('path');

const router = express.Router();

router.get('/',
    taskContoller.getTasks,
    (req, res) => res.status(200).sendFile(path.join(__dirname, '../../index.html'))
);

module.exports = router;