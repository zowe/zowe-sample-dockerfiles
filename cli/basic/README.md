# Zowe CLI Docker Container

This repository contains the files required to create a Zowe CLI docker container with root access

To build the container, run `docker build .`
To run the container as a standard user, run `docker run -it -u zowe <tag> /bin/bash`
To run the container as root, run `docker run -it -u root <tag> /bin/bash`

The container is running SSH. The default password for the zowe user is `zowe`.
To run the container with ssh and expose the port, run `docker run -dp 2222:22 <tag>` and connect with `ssh zowe@localhost -p 2222`

Requirements:

- Access to the internet

Environment variables:

- ALLOW_PLUGIN_INSTALL_FAIL - Allows plugin installation to fail in the entrypoint without stopping the container if set