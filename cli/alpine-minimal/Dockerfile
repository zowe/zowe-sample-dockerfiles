# This program and the accompanying materials are made available and may be used, at your option, under either:
# * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
# * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0

# SPDX-License-Identifier: EPL-2.0 OR Apache-2.0

# Copyright Contributors to the Zowe Project.

FROM alpine:latest

USER root
ENV ZOWE_VERSION=zowe-v2-lts
ENV DEBIAN_FRONTEND="noninteractive"

# Install Node, plugin prereqs
RUN apk update && apk upgrade && apk add curl doas nodejs npm  && rm -rf /var/cache/apk/*

# Add Zowe user and update password
RUN adduser -D -g "Zowe" zowe; adduser zowe wheel; echo 'zowe:zowe' | chpasswd
RUN echo "permit persist :wheel" >> /etc/doas.d/doas.conf

# Install Zowe CLI

RUN npm config set @zowe:registry https://zowe.jfrog.io/zowe/api/npm/npm-local-release/
RUN npm install -g @zowe/cli@${ZOWE_VERSION} --ignore-scripts
RUN zowe plugins install @zowe/cics-for-zowe-cli@${ZOWE_VERSION} @zowe/ims-for-zowe-cli@${ZOWE_VERSION} @zowe/mq-for-zowe-cli@${ZOWE_VERSION} @zowe/zos-ftp-for-zowe-cli@${ZOWE_VERSION}
RUN echo '{"overrides":{"CredentialManager":false}}' > ~/.zowe/settings/imperative.json

# Uncomment to enable daemon mode by default for root
# RUN echo 'export PATH=/home/zowe/.zowe/bin:$PATH' >> ~/.ashrc && zowe daemon enable

USER zowe
RUN npm config set @zowe:registry https://zowe.jfrog.io/zowe/api/npm/npm-local-release/
RUN zowe plugins install @zowe/cics-for-zowe-cli@${ZOWE_VERSION} @zowe/ims-for-zowe-cli@${ZOWE_VERSION} @zowe/mq-for-zowe-cli@${ZOWE_VERSION} @zowe/zos-ftp-for-zowe-cli@${ZOWE_VERSION}
RUN echo '{"overrides":{"CredentialManager":false}}' > ~/.zowe/settings/imperative.json

# Uncomment to enable daemon mode by default for zowe
# RUN echo 'export PATH=/home/zowe/.zowe/bin:$PATH' >> ~/.ashrc && zowe daemon enable

CMD ["/bin/ash"]