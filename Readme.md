# Puppies

> A dog breed detection app made for Dott

![CI](https://github.com/liron-navon/puppies/actions/workflows/tests.yml/badge.svg) CI pipelines

[![Netlify Status](https://api.netlify.com/api/v1/badges/82f63a09-de0e-4741-aa72-bd223ed10c1c/deploy-status)](https://app.netlify.com/sites/puppies-components-documentation/deploys) Components docs

[![Netlify Status](https://api.netlify.com/api/v1/badges/0bec6d93-60c8-4fa9-9f32-1f59cd87056d/deploy-status)](https://app.netlify.com/sites/puppies-app/deploys) App website

The app is built as a monorepo with lerna and uses yarn as the package manager of choice - it was requested to make use of a web component library (lit) or react - I chose to just use both, and I figured the easy and efficient way to do so is in a monorepo, containing 2 packages -

**/packages/app (puppies-app)** - written in react and makes use of a web components library, tested in jest with enzyme.

**/packages/components (puppies-components)** - written in lit-elements, tested with jest-puppeteer

### Building and setup

Install dependencies

yarn

Now we can build all the packages through lerna.

yarn build

### Testing

The tests in the project are written with Jest for unit tests and Jest + puppeteer for integration tests for the web components.

You can run this command in the root to test all the projects

yarn test:ci

Or you can run in each project:

yarn test

* notice, in 'packages/components' most tests are integration, and require the running of the live documentation to test, check the documentation section for instructions.

### Documentation

Of course no components library is complete without proper documentation, for this I chose to use Storybook, to view the documentation you can go [here](https://puppies-components-documentation.netlify.app/) or run in "packages/components" the command:

yarn start