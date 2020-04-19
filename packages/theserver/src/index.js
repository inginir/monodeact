require('dotenv').config();

var path = require('path');
var request = require('request');
const express = require('express');
const app = express()
const config = require('@monodeact/config');

const port = 7000;

console.log(';config', config);

(() => {
    config.map(({ projectPath, url, filePath }) => {
        //for express to know where the static file is I guess?
        app.use(express.static(path.join(__dirname, '..', '..', filePath, 'build')));
        //create the route
        app.get(projectPath, (req, res) => {
            if (process.env.ENVIRONMENT === 'dev') {
                const project_path_entry = path.join(__dirname, '..', '..', filePath, 'build', 'index.html')
                res.sendFile(project_path_entry);
            } else {
                const r = request(url);
                req.pipe(r).pipe(res);
            }
        })
    })


})()

app.use(express.static(path.join(__dirname, '..', '..', 'dashboard', 'build')));
app.get('/apps', (req, res) => {
    const project_path_entry = path.join(__dirname, '..', '..', 'dashboard', 'build', 'index.html')
    res.sendFile(project_path_entry);
    // res.send('Hello World!');
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))