const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('ssh2');
const app = express();

app.use(bodyParser.json());

const users = { 'user1': 'password1' };

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
        res.status(200).send('Login successful!');
    } else {
        res.status(401).send('Invalid username or password');
    }
});

app.post('/rsp', (req, res) => {
    const { host, username, password, command } = req.body;

    const conn = new Client();
    conn.on('ready', () => {
        console.log('Client :: ready');
        conn.exec(command, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                conn.end();
            }).on('data', (data) => {
                console.log('STDOUT: ' + data);
                res.send('STDOUT: ' + data);
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
                res.send('STDERR: ' + data);
            });
        });
    }).connect({
        host: host,
        port: 22,
        username: username,
        password: password
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
