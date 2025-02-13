## welcome!
this is the Lightspeed remote desktop project for use on school chromebooks
## how to install
## step 1 get IP for your Windows machine
press (win+r)
type
`` ipconfig ``
and find the iPV4 adress and place it in a safe place, you will need it!
## step 2 set up node.js
we will use a ubuntu server
ensure node and npm is installed first
``` bash
npm install node-rdpjs express body-parser
```
next clone the repo on your server by executing-
``` bash
git clone https://github.com/pancakes-proxy/GreenHatChromeBookHackers.git
```
OR if you have a home server and perfer to download get the newest relace
take your windows IP 
go into ``config.json`` and replace the info with yours
now ths is what your ``config.json`` should look like:
``` json
{
    "login": {
        "username": "the username of your choice",
        "password": "password of your choice"
    },
    "rdp": {
        "host": "windows-machine-ip",
        "username": "your pc username",
        "password": "your pc password"
    }
}
```
once you have confirmed everything is the way you want we cn moe on to 
## deployment
