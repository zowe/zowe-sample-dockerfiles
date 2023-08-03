# Zowe CLI Docker Container

This repository contains the files required to create a Zowe CLI docker container with root access on Alpine.
Does not contain the DB2 plug-in.
This dockerfile does not provide secure credential support

To build the container, run `docker build .`
To run the container as a standard user, run `docker run -it -u zowe <tag> /bin/ash`
To run the container as root, run `docker run -it -u root <tag> /bin/ash`

Requirements:

- Access to the internet
