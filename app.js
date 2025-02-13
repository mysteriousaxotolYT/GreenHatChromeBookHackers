const express = require('express');
const bodyParser = require('body-parser');
const RdpClient = require('node-rdpjs');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());

const users = { 'user1': 'password1' };

// Read the configuration file
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

app.post('/execute', (req, res) => {
    const { login, rdp } = config;

    // Check login credentials
    const { username, password } = login;
    if (users[username] && users[username] === password) {
        // Proceed with RDP if login is successful
        const { host, rdpUsername, rdpPassword } = rdp;
        const client = RdpClient.createClient({
            domain: '',
            userName: rdpUsername,
            password: rdpPassword,
            ip: host,
            autoLogin: true
        });

        client.on('connect', () => {
            res.send('Connected to Remote Desktop');
        });

        client.on('close', () => {
            console.log('Connection closed');
        });

        client.connect();
    } else {
        res.status(401).send('Invalid username or password');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

