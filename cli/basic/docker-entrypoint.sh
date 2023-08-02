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

# Execute passed cmd
exec "$@"
