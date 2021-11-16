# nextjs-github-browser

[![ci](https://github.com/topheman/nextjs-github-browser/actions/workflows/ci.yml/badge.svg)](https://github.com/topheman/nextjs-github-browser/actions/workflows/ci.yml)
[![e2e](https://github.com/topheman/nextjs-github-browser/actions/workflows/e2e.yml/badge.svg)](https://github.com/topheman/nextjs-github-browser/actions/workflows/e2e.yml)
[![Demo](https://img.shields.io/badge/demo-online-blue.svg)](http://nextjs-github-browser.vercel.app/)

This project is a reimplementation of the main features of the [github.com](https://github.com) website in **NextJS**.

## Prerequisites

- Nodejs v14
- npm

## Install

```sh
git clone https://github.com/topheman/nextjs-github-browser.git
cd nextjs-github-browser
npm install
```

## Setup

TODO

## Development

```shell
npm run dev
```

This will start a development server on [http://localhost:3000](http://localhost:3000).

## Storybook

TODO

## Build

```shell
npm run build
```

This will build the a production version of the website in the `.next` folder.

## Production

First, you need to build your project running `npm run build`, then:

```shell
npm start
```

This will launch a production server on [http://localhost:3000](http://localhost:3000).

You can change the port passing a `PORT` env var like: `PORT=8080 npm start`.

## Test

TODO

## Next steps

TODO

## Resources

This project is based on previous work:

- ⚛️ [topheman/nextjs-movie-browser](https://github.com/topheman/nextjs-movie-browser)
- ⚛️ [topheman/npm-registry-browser](https://github.com/topheman/npm-registry-browser)
- ️⚛️ [topheman/react-fiber-experiments](https://github.com/topheman/react-fiber-experiments)
- 📝 [Cypress.io advanced setup](http://dev.topheman.com/cypress-io-advanced-setup/)
