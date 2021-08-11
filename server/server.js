const express = require('express');
const app = express();
const path = require('path');
const apiRouter = require('./routes/api');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

// serve index.html on the route '/'
app.use('/api', apiRouter);


app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });


app.listen(3000)