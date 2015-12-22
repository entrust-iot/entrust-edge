# Edge Gateway Server

This server contains 2 docker containers. They simply can be started
on a linux box with the command :

docker-compose build && docker-compose up

# vm guidelines / server configuration

Use a linux machine that supports docker.
- Follow the instruction there : https://docs.docker.com/linux/step_one/
- Follow those instruction too : https://docs.docker.com/compose/install/
- If you use a virtual machine, make sure you use a 'bridged' network configuration.
- Finally do a git-clone https://github.com/paxl13/entrust-edge
- get into the subdirectory and execute
- docker-compose build
- docker-compose up

