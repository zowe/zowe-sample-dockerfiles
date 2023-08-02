# Zowe CLI Docker Container

This repository contains the files required to create a Zowe CLI docker container with root access
The dockerfile can be easily modified to use different Zowe and Node versions

To build the container, run `docker build .`
To run the container as a standard user, run `docker run -it -u zowe <tag> /bin/bash`
To run the container as root, run `docker run -it -u root <tag> /bin/bash`

Requirements:

- Access to the internet
