/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

const fs = require("fs");
const outputPath = process.env.GITHUB_OUTPUT || process.stdout.fd;

function expandImageTag(shortTag) {
    return [
        `ghcr.io/zowe/zowe-sample-dockerfiles-ze-theia-slim:${shortTag}`,
        `zowe-docker-snapshot.jfrog.io/ompzowe/zowe-sample-dockerfiles-ze-theia-slim:${shortTag}`
    ];
}

async function getTheiaReleases() {
    const response = await fetch("https://api.github.com/repos/eclipse-theia/theia/releases");
    return await response.json();
}

(async () => {
    const dockerTags = [];
    let theiaVersion;
    if (process.argv[2] == null || process.argv[2] === "latest") {
        // "latest" tag (default) = latest community release of Theia
        const release = (await getTheiaReleases()).find(obj => obj.body.includes("community release"));
        theiaVersion = release.tag_name.slice(1);
        dockerTags.push(...expandImageTag("latest"),
            ...expandImageTag(theiaVersion.slice(0, theiaVersion.lastIndexOf("."))));
    } else if (process.argv[2] === "next") {
        // "next" tag = latest version of Theia on master branch
        theiaVersion = "latest";
        dockerTags.push(...expandImageTag("next"));
    } else {
        // "1.XX" tag = older community release of Theia
        const release = (await getTheiaReleases()).find(obj => obj.body.includes("community release") &&
            obj.tag_name.startsWith(`v${process.argv[2]}`));
        theiaVersion = release.tag_name.slice(1);
        dockerTags.push(...expandImageTag(theiaVersion.slice(0, theiaVersion.lastIndexOf("."))));
    }
    fs.appendFileSync(outputPath, "DOCKER_TAGS<<EOF\n" + dockerTags.join("\n") + "\nEOF\n");
    fs.appendFileSync(outputPath, `THEIA_VERSION=${theiaVersion}\n`);
})();
