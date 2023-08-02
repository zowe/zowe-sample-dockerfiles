# This program and the accompanying materials are made available and may be used, at your option, under either:
# * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
# * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0

# SPDX-License-Identifier: EPL-2.0 OR Apache-2.0

# Copyright Contributors to the Zowe Project.

FROM ubuntu:focal

USER root

ARG sshEnv=/etc/profile.d/npm_setup.sh
ARG bashEnv=/etc/bash.bashrc
ARG scriptsDir=/usr/local/bin/

ENV ENV=${bashEnv}
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
ENV DEFAULT_NODE_VERSION=16
ENV DEBIAN_FRONTEND="noninteractive"

# Upgrade package on image, install locales and supporting software, including node, and delete apt cache
RUN apt-get update -qqy &&\
    apt-get -qqy install locales &&\
    locale-gen en_US.UTF-8 &&\
    apt-get -qqy update &&\
    apt-get -qqy upgrade --no-install-recommends &&\
    apt-get -qqy install --no-install-recommends git curl libxss1 vim nano software-properties-common cmake openssh-server &&\
    apt-get -q autoremove &&\
    mkdir -p /var/run/sshd &&\
    curl -fsSL https://deb.nodesource.com/setup_${DEFAULT_NODE_VERSION}.x | bash - &&\
    apt-get install -y nodejs build-essential &&\
    apt-get -q autoremove &&\
    apt-get -qqy clean &&\
    rm -rf /var/lib/apt/lists/* /var/cache/apt/*.bin

# Add Zowe user
RUN useradd zowe --shell /bin/bash --create-home &&\
    echo 'zowe:zowe' | chpasswd

# Fix OpenSSL problems with < TLS 1.2
COPY openssl.cnf /etc/ssl/openssl.cnf

# Get rid of dash and use bash instead
RUN echo "dash dash/sh boolean false" | debconf-set-selections
RUN dpkg-reconfigure dash

# Copy the setup script and node scripts for execution (allow anyone to run them)
COPY docker-entrypoint.sh ${scriptsDir}

# Start in home directory
RUN echo "cd ~" >> ${bashEnv} && echo "cd ~" >> /home/zowe/.bashrc

COPY install_zowe.sh ${scriptsDir}

# Install zowe
RUN install_zowe.sh

# Uncomment to enable daemon mode by default
# RUN echo 'export PATH=/home/zowe/.zowe/bin:$PATH' >> ~/.bashrc && zowe daemon enable

# Standard SSH port
EXPOSE 22

# Execute the setup script when the image is run.
ENTRYPOINT ["docker-entrypoint.sh"]

# Default command
CMD ["/usr/sbin/sshd", "-D"]