#!/bin/sh

# This program and the accompanying materials are made available and may be used, at your option, under either:
# * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
# * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0

# SPDX-License-Identifier: EPL-2.0 OR Apache-2.0

# Copyright Contributors to the Zowe Project.

# Check if container has IPC_LOCK capability
if capsh --print | grep -q cap_ipc_lock; then
    # Launch dbus for gnome-keyring
    if test -z "$DBUS_SESSION_BUS_ADDRESS" ; then
        exec dbus-run-session -- $0 "$@"
    fi

    # Unlock gnome-keyring to store credentials
    echo "root" | gnome-keyring-daemon -r -d --unlock
fi

exec "$@"
