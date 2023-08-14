# Zowe CLI Sample Dockerfiles

## Alpine Minimal

Provides a minimal installation of Zowe CLI in an Alpine docker container.
The built container will have a `zowe` user, Node LTS and Zowe V2 LTS.
Secure Credential Management is disabled.
The DB2 Plug-in is not installed.

## Minimal

Provides a minimal installation of Zowe CLI in an Ubuntu docker container.
The built container will have a `zowe` user, Node LTS and Zowe V2 LTS.
Secure Credential Management is disabled.

## Alpine Basic

Builds upon the Alpine Minimal dockerfile by including an SSH server, Python, CMake, G++, and command line based text editors vim and nano.

## Basic

Builds upon the Minimal dockerfile by including an SSH server, properly set locales, and a script that can be called to reinstall the Zowe CLI and Plug-ins from inside the container.
Provides the ability to modify OpenSSL to allow for backwards compatibility with TLS 1.1 and TLS 1.0 servers.

## Basic with NVM

The Basic dockerfile, but also includes Node Version Manager, allowing for quick switching of Node versions.
Useful for testing the CLI on new versions of Node.

## Jenkins Agent

An advanced dockerfile that provides a Jenkins user, JDK 11, JRE 11, and Secure Credential Management.
Also includes NVM, a fallback NodeJS installation, customizable entrypoint logic, passwordless sudo, and an auto-unlocking keyring.
JNLP is not supported on this agent.