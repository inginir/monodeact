require('dotenv').config();

var path = require('path');
const express = require('express');
const app = express()

const port = 7000;

app.use(express.static(path.join(__dirname, '..', '..', 'dashboard', 'build')));
app.get('/', (req, res) => {
    const project_path_entry = path.join(__dirname, '..', '..', 'dashboard', 'build', 'index.html')
    res.sendFile(project_path_entry);
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))