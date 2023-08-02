# Jenkins Agent

Jenkins build agent with the ability to install the npm keytar package for credential management. Also contains Java 11, nvm, and other utilities.

## Usage

In general, nothing special will need to be done when connecting to the machine with the jenkins username and password.

To build the container, run `docker build .`
To build the container with a non-default node version, i.e. Node 16, run `docker build . --build-arg IMAGE_VERSION_ARG=16`
To run the container locally as a standard user, run `docker run -it -u jenkins --cap-add IPC_LOCK <tag> /bin/bash`
To run the container as root, run `docker run -it -u root --cap-add IPC_LOCK <tag> /bin/bash`

The container is running SSH. The default password for the jenkins user is `jenkins`. The user has passwordless sudo access.
To run the container with ssh and expose the port, run `docker run --cap-add IPC_LOCK -dp 2222:22 <tag>` and connect with `ssh jenkins@localhost -p 2222`

## Requirements

- Access to the internet
- IPC_LOCK capability - Secure credential storage

## Environment Variables

- NODE_JS_NVM_VERSION - Uses NVM to change the version of NPM for the `zowe` user
- ALLOW_PLUGIN_INSTALL_FAIL - Allows plugin installation to fail in the entrypoint without stopping the container if set

## Build Arguments

- IMAGE_VERSION_ARG - The default major node version to install in the built image

## Notes

This image must have the capability `IPC_LOCK` or run as privilaged to properly operate. This can be done on the run command by adding `--cap-add ipc_lock` or `--privileged` respectively. Not specifying this capability will result in the following messages when trying to start the gnome keyring daemon: 

```
gnome-keyring-daemon: Operation not permitted
```


If you have troubles accessing the keyring in the container you will most likely be seeing this error message: 

```
** Message: Remote error from secret service: org.freedesktop.DBus.Error.UnknownMethod: No such interface 'org.freedesktop.Secret.Collection' on object at path /org/freedesktop/secrets/collection/login
```

To correct this, issue the following console command before you attempt to access the keyring:

```
echo 'jenkins' | gnome-keyring-daemon -r -d --unlock
```