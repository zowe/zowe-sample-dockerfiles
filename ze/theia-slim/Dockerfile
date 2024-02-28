# This program and the accompanying materials are made available and may be used, at your option, under either:
# * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
# * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0

# SPDX-License-Identifier: EPL-2.0 OR Apache-2.0

# Copyright Contributors to the Zowe Project.

ARG NODE_VERSION=lts
FROM node:${NODE_VERSION}-alpine
RUN apk add --no-cache curl make pkgconfig gcc g++ python3 libx11-dev libxkbfile-dev libsecret-dev chromium
WORKDIR /home/theia
ADD buildPackageJson.js ./buildPackageJson.js
ARG THEIA_VERSION=latest
RUN echo "$(node buildPackageJson.js ${THEIA_VERSION})" > package.json
ARG GITHUB_TOKEN
RUN yarn global add node-gyp && \
    yarn --pure-lockfile && \
    NODE_OPTIONS="--max_old_space_size=4096" yarn theia build && \
    yarn theia download:plugins && \
    yarn --production && \
    yarn autoclean --init && \
    echo *.ts >> .yarnclean && \
    echo *.ts.map >> .yarnclean && \
    echo *.spec.* >> .yarnclean && \
    echo "!@theia/test" >> .yarnclean && \
    yarn autoclean --force && \
    yarn cache clean
# Uncomment the following lines to install Zowe Explorer in the container
# ARG ZOWE_EXPLORER_VERSION=2.9.2
# RUN cd /home/theia/plugins && \
#   curl -fLOJ https://github.com/zowe/vscode-extension-for-zowe/releases/download/v${ZOWE_EXPLORER_VERSION}/vscode-extension-for-zowe-${ZOWE_EXPLORER_VERSION}.vsix && \
#   curl -fLOJ https://github.com/zowe/vscode-extension-for-zowe/releases/download/v${ZOWE_EXPLORER_VERSION}/zowe-explorer-ftp-extension-${ZOWE_EXPLORER_VERSION}.vsix

FROM node:${NODE_VERSION}-alpine
# See : https://github.com/theia-ide/theia-apps/issues/34
RUN addgroup theia && \
    adduser -G theia -s /bin/sh -D theia;
RUN chmod g+rw /home && \
    mkdir -p /home/project && \
    chown -R theia:theia /home/theia && \
    chown -R theia:theia /home/project;
RUN apk add --no-cache git openssh bash dbus gnome-keyring libcap libsecret
ENV HOME /home/theia
WORKDIR /home/theia
COPY --from=0 --chown=theia:theia /home/theia /home/theia
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 3000
ENV SHELL=/bin/bash \
    THEIA_DEFAULT_PLUGINS=local-dir:/home/theia/plugins
ENV USE_LOCAL_GIT true
USER theia
ENTRYPOINT [ "/entrypoint.sh", "node", "/home/theia/src-gen/backend/main.js", "/home/project", "--hostname=0.0.0.0" ]
