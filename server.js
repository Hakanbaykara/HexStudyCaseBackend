const express = require('express');
const promptRouter = require('./routes/route.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', promptRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});