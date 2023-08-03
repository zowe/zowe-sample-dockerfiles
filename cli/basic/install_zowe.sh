#!/bin/bash

# This program and the accompanying materials are made available and may be used, at your option, under either:
# * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
# * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0

# SPDX-License-Identifier: EPL-2.0 OR Apache-2.0

# Copyright Contributors to the Zowe Project.

# Exit if any commands fail
set -e
PKG_TAG=zowe-v2-lts

if [ ! -z "$1" ]; then
    ALLOW_PLUGIN_INSTALL_FAIL=$1
fi

# Install the requested version, use the version, and set the default
# for any further terminals
npm config set @zowe:registry https://zowe.jfrog.io/zowe/api/npm/npm-local-release/
rm -rf ~/.zowe/plugins
npm install -g @zowe/cli@${PKG_TAG}

plugins=( @zowe/zos-ftp-for-zowe-cli@${PKG_TAG} @zowe/cics-for-zowe-cli@${PKG_TAG} @zowe/db2-for-zowe-cli@${PKG_TAG} @zowe/ims-for-zowe-cli@${PKG_TAG} @zowe/mq-for-zowe-cli@${PKG_TAG})

for i in "${plugins[@]}"; do
    if [ ! -z "${ALLOW_PLUGIN_INSTALL_FAIL}" ]; then
        zowe plugins install $i || true
    else
        zowe plugins install $i || exit 1
    fi
done

exit 0
