# Zowe CLI Sample Dockerfiles

## Minimal

Provides a minimal installation of Zowe CLI in a docker container.
The built container will have a `zowe` user, Node LTS and Zowe V2 LTS.
Secure Credential Management is disabled.

## Basic

Builds upon the Minimal dockerfile by including an SSH server, properly set locales, and a script that can be called to reinstall the Zowe CLI and Plug-ins from inside the container.
Modifies OpenSSL to allow for backwards compatibility with TLS 1.1 and TLS 1.0 servers.

## Basic with NVM

The Basic dockerfile, but also includes Node Version Manager, allowing for quick switching of Node versions.
Useful for testing the CLI on new versions of Node.

## Jenkins Agent

An advanced dockerfile that provides a Jenkins user, JDK 11, JRE 11, and Secure Credential Management.
Requires additional capabilities to work properly, namely `IPC_LOCK`, or to be privileged in order for Secure Credential Management to function properly.
Also includes NVM, a fallback NodeJS installation, customizable entrypoint logic, passwordless sudo, and an auto-unlocking keyring.
JNLP is not supported on this agent.