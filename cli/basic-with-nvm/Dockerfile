# This program and the accompanying materials are made available and may be used, at your option, under either:
# * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
# * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0

# SPDX-License-Identifier: EPL-2.0 OR Apache-2.0

# Copyright Contributors to the Zowe Project.

FROM ubuntu:focal

USER root

ARG tempDir=/tmp/zowe
ARG sshEnv=/etc/profile.d/npm_setup.sh
ARG bashEnv=/etc/bash.bashrc
ARG scriptsDir=/usr/local/bin/

ENV ENV=${bashEnv}
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
ENV DEFAULT_NODE_VERSION=16.17.0
ENV DEBIAN_FRONTEND="noninteractive"
ARG loginFile=pam.d.config

# Upgrade package on image, install locales and supporting software, including node, and delete apt cache
RUN apt-get update -qqy &&\
    apt-get -qqy install locales &&\
    locale-gen en_US.UTF-8 &&\
    apt-get -qqy update &&\
    apt-get -qqy upgrade --no-install-recommends &&\
    apt-get -qqy install --no-install-recommends git curl libxss1 vim nano openssh-server software-properties-common cmake gnome-keyring libsecret-1-dev dbus-x11 &&\
    apt-get -q autoremove &&\
    mkdir -p /var/run/sshd &&\
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - &&\
    apt-get -qqy install nodejs build-essential &&\
    apt-get -q autoremove &&\
    apt-get -qqy clean &&\
    rm -rf /var/lib/apt/lists/* /var/cache/apt/*.bin

# Add Zowe user
RUN useradd zowe --shell /bin/bash --create-home && echo 'zowe:zowe' | chpasswd

# Fix OpenSSL problems with < TLS 1.2
# COPY openssl.cnf /etc/ssl/openssl.cnf

# Install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
RUN groupadd npmusers && usermod -aG npmusers zowe && usermod -aG npmusers root

# Also install nvm for user zowe
USER zowe
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

USER root

# Get rid of dash and use bash instead
RUN echo "dash dash/sh boolean false" | debconf-set-selections
RUN dpkg-reconfigure dash

# First move the template file over
RUN mkdir ${tempDir}
COPY env.bashrc ${tempDir}/env.bashrc

# Create a properties file that is used for all bash sessions on the machine
# Add the environment setup before the exit line in the global bashrc file
RUN sed -i -e "/# If not running interactively, don't do anything/r ${tempDir}/env.bashrc" -e //N ${bashEnv}

# Copy the setup script and node/nvm scripts for execution (allow anyone to run them)
COPY docker-entrypoint.sh ${scriptsDir}
COPY install_node.sh ${scriptsDir}

# Install Node
RUN install_node.sh $DEFAULT_NODE_VERSION
RUN su -c "install_node.sh $DEFAULT_NODE_VERSION" - zowe

# Create a shell file that applies the configuration for sessions.
RUN touch ${sshEnv} \
    && echo '#!bin/sh'>>${sshEnv} \
    && cat ${tempDir}/env.bashrc>>${sshEnv}

# Start in home directory
RUN echo "cd ~" >> ${bashEnv} && echo "cd ~" >> /home/zowe/.bashrc

COPY install_zowe.sh ${scriptsDir}

# Install zowe
RUN su -c "install_zowe.sh" - zowe

# Copy the PAM configuration options to allow auto unlocking of the gnome keyring
COPY ${loginFile} ${tempDir}/${loginFile}

# Enable unlocking for ssh
RUN cat ${tempDir}/${loginFile}>>/etc/pam.d/sshd

# Enable unlocking for regular login
RUN cat ${tempDir}/${loginFile}>>/etc/pam.d/login

# Copy the profile script 
COPY dbus_start ${tempDir}/dbus_start

# Enable dbus for ssh and most other native shells (interactive)
RUN touch ${sshEnv}
RUN echo '#!/bin/sh'>>${sshEnv}
RUN cat ${tempDir}/dbus_start>>${sshEnv}

# Enable for all bash profiles
# Add the dbus launch before exiting when not running interactively
RUN sed -i -e "/# If not running interactively, don't do anything/r ${tempDir}/dbus_start" -e //N ${bashEnv}

RUN printf "\necho zowe | gnome-keyring-daemon --unlock --components=secrets > /dev/null\n" >> /home/zowe/.bashrc

# Cleanup
RUN rm -rdf ${tempDir}

# Standard SSH port
EXPOSE 22

# Execute the setup script when the image is run. Setup will install the desired version via 
# nvm for both the root user and zowe - then start the ssh service
ENTRYPOINT ["docker-entrypoint.sh"]

# Default command
CMD ["/usr/sbin/sshd", "-D"]
