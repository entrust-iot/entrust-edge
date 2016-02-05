# Edge Gateway Server

This server contains 2 docker containers. They simply can be started
on a linux box with the command :

docker-compose build && docker-compose up

# vm guidelines / server configuration

Use a linux machine that supports docker.
- Follow the instruction there : https://docs.docker.com/linux/step_one/
- Follow those instruction too : https://docs.docker.com/compose/install/
- If you use a virtual machine, make sure you use a 'bridged' network configuration.
- Finally do a git-clone https://github.com/entrust-iot/entrust-edge
- get into the bridge/security subdirectory and generate the security files following the README instructions
- get into the top directory and execute
- `$ docker-compose build`
- `$ docker-compose up`


### MQTTS test tool

You can test the server and observe it using mqtt cli tool

install with
`$ sudo npm install -g mqtt`

Examples of mqtt uses
- `mqtt sub -t '#' -h '<server url>'  --key <client key> --cert <client cert> --ca <ca cert>`
- `mqtt pub -t '<topic>' -h '<server url>' -m '<message>'  --key <client key> --cert <client cert> --ca <ca cert>`
