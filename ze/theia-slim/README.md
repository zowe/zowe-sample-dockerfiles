# Theia Docker Container

Based on https://github.com/theia-ide/theia-apps/tree/master/theia-docker

## How to Use

To build the container, run `docker build .`

The following runs Theia IDE on http://localhost:3000 with the current directory as a workspace. The option of `--init` is added to fix the [defunct process problem](https://github.com/theia-ide/theia-apps/issues/195).

```bash
# Linux, macOS, or PowerShell
docker run -it --init -p 3000:3000 -v "$(pwd):/home/project:cached" <tag>

# Windows (cmd.exe)
docker run -it --init -p 3000:3000 -v "%cd%:/home/project:cached" <tag>
```

You can pass additional arguments to Theia after the image name, for example to enable debugging:

```bash
# Linux, macOS, or PowerShell
docker run -it --init -p 3000:3000 --expose 9229 -p 9229:9229 -v "$(pwd):/home/project:cached" <tag> --inspect=0.0.0.0:9229

# Windows (cmd.exe)
docker run -it --init -p 3000:3000 --expose 9229 -p 9229:9229 -v "%cd%:/home/project:cached" <tag> --inspect=0.0.0.0:9229
```

## Tips and Tricks

* To install a VS Code extension, copy the VSIX file into the container with the following command. Then run "Extensions: Install from VSIX" from the command palette in Theia and browse to the VSIX file.
    ```bash
    docker cp <path-to-vsix> ${containerId}:/home/theia/plugins
    ```
* To unlock the keyring so that Keytar can store secure credentials, pass these arguments to the `docker run` command: `--cap-add IPC_LOCK`
