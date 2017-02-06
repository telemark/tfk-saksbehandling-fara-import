[![Build Status](https://travis-ci.org/telemark/tfk-saksbehandling-fara-import.svg?branch=master)](https://travis-ci.org/telemark/tfk-saksbehandling-fara-import)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# tfk-saksbehandling-fara-import

[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/tfk-saksbehandling-fara-import.svg)](https://greenkeeper.io/)
Import av skoleskyssøknader i fara

## Innhold


## Docker
Build

```sh
$ docker build -t tfk-saksbehandling-fara-import .
```

### Usage
```sh
$ docker run --env-file=docker.env --volume=/test/data:/src/test/data --rm tfk-saksbehandling-fara-import
```

or from prebuilt image

```sh
$ docker run --env-file=docker.env --volume=/test/data:/src/test/data --rm telemark/tfk-saksbehandling-fara-import
```

This will start a container. Do the job. Stop the container and remove it.
