#!/bin/bash

# This program and the accompanying materials are made available and may be used, at your option, under either:
# * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
# * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0

# SPDX-License-Identifier: EPL-2.0 OR Apache-2.0

# Copyright Contributors to the Zowe Project.

#########################################################
# Setup ENTRYPOINT script when running the image:       #
# - Installs Zowe CLI and plugins for root              #
# - Installs Zowe CLI and plugins for zowe           #
#########################################################

# Exit if any commands fail
set -e

# Do the original entrypoint
# Extract Node.js version from env var
VERSION=$NODE_JS_NVM_VERSION
APIF=$ALLOW_PLUGIN_INSTALL_FAIL

if [ -z "$VERSION" ]; then
    :
else
    # Execute the node installation script
    echo "Installing Node.js version $VERSION for current user..."
    install_node.sh $VERSION

    if [[ $EUID -ne 1000 ]]; then
        # Execute the script for user zowe
        echo "Installing Node.js version $VERSION for zowe user..."
        su -c "install_node.sh $VERSION" - zowe
    fi

    # Do the install for zowe
    su -c "install_zowe.sh $APIF" - zowe
fi

# Execute passed cmd
exec "$@"
