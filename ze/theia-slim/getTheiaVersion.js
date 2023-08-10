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
    if (process.argv[2] == "next") {
        theiaVersion = "latest";
        dockerTags.push(...expandImageTag("next"));
    } else if (process.argv[2] == null || process.argv[2] == "latest") {
        const release = (await getTheiaReleases()).find(obj => obj.body.includes("community release"));
        theiaVersion = release.tag_name.slice(1);
        dockerTags.push(...expandImageTag("latest"),
            ...expandImageTag(theiaVersion.slice(0, theiaVersion.lastIndexOf("."))));
    } else {
        const release = (await getTheiaReleases()).find(obj => obj.tag_name.startsWith(`v${process.argv[2]}`));
        theiaVersion = release.tag_name.slice(1);
        dockerTags.push(...expandImageTag(theiaVersion.slice(0, theiaVersion.lastIndexOf("."))));
    }
    fs.appendFileSync(outputPath, "DOCKER_TAGS<<EOF\n" + dockerTags.join("\n") + "\nEOF\n");
    fs.appendFileSync(outputPath, `THEIA_VERSION=${theiaVersion}\n`);
})();
