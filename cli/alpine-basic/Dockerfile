# This program and the accompanying materials are made available and may be used, at your option, under either:
# * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
# * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0

# SPDX-License-Identifier: EPL-2.0 OR Apache-2.0

# Copyright Contributors to the Zowe Project.

FROM alpine:latest

USER root

ARG scriptsDir=/usr/local/bin/

# Upgrade package on image, install supporting software, including node, and delete apk cache
RUN apk update && apk upgrade && apk add curl vim nano cmake openssh-server nodejs npm g++ python3 doas && rm -rf /var/cache/apk/* 

# Add Zowe user and update password
RUN adduser -D -g "Zowe" zowe; adduser zowe wheel; echo 'zowe:zowe' | chpasswd
RUN echo "permit persist :wheel" >> /etc/doas.d/doas.conf

# Copy the setup script and node scripts for execution (allow anyone to run them)
COPY docker-entrypoint.sh ${scriptsDir}

# Install zowe for root
RUN npm config set @zowe:registry https://zowe.jfrog.io/zowe/api/npm/npm-local-release/
RUN npm install -g @zowe/cli@${ZOWE_VERSION} --ignore-scripts
RUN zowe plugins install @zowe/cics-for-zowe-cli@${ZOWE_VERSION} @zowe/ims-for-zowe-cli@${ZOWE_VERSION} @zowe/mq-for-zowe-cli@${ZOWE_VERSION} @zowe/zos-ftp-for-zowe-cli@${ZOWE_VERSION}
RUN echo '{"overrides":{"CredentialManager":false}}' > ~/.zowe/settings/imperative.json

# Uncomment to enable daemon mode by default for root
# RUN echo 'export PATH=/home/zowe/.zowe/bin:$PATH' >> ~/.ashrc && zowe daemon enable

USER zowe

# Install zowe for zowe
RUN npm config set @zowe:registry https://zowe.jfrog.io/zowe/api/npm/npm-local-release/
RUN zowe plugins install @zowe/cics-for-zowe-cli@${ZOWE_VERSION} @zowe/ims-for-zowe-cli@${ZOWE_VERSION} @zowe/mq-for-zowe-cli@${ZOWE_VERSION} @zowe/zos-ftp-for-zowe-cli@${ZOWE_VERSION}
RUN echo '{"overrides":{"CredentialManager":false}}' > ~/.zowe/settings/imperative.json

# Uncomment to enable daemon mode by default for zowe
# RUN echo 'export PATH=/home/zowe/.zowe/bin:$PATH' >> ~/.ashrc && zowe daemon enable

USER root

# Generate SSH keys
RUN ssh-keygen -A

# Standard SSH port
EXPOSE 22

# Execute the setup script when the image is run.
ENTRYPOINT ["docker-entrypoint.sh"]

# Default command
CMD ["/usr/sbin/sshd", "-D"]