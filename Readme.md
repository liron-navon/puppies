![CI](https://github.com/liron-navon/puppies-dott/actions/workflows/github-actions-run-tests/badge.svg)

[![Netlify Status](https://api.netlify.com/api/v1/badges/1350484f-1dde-4535-8569-6e9e233cc4f1/deploy-status)](https://app.netlify.com/sites/musing-mccarthy-2a8e9c/deploys)

# Puppies
 

> A dog breed detection app made for the job interview for Dott

The app is built with as a monorepo with lerna and uses yarn as the package manager of choice - it was requested to make use of a web component library as well as react, and I figured the easy and efficient way to do si is in a monorepo, containing 2 packages -
 **/packages/app (puppies-app)** - written in react and makes use of a web components library.
 **/packages/components (puppies-components)** - written in lit-elements

### Building and setup
As I wrote above, the project is built with lerna, so the first step will be to install lerna, if you don't want lerna to exist globally just install the root dependencies with:

    yarn
    
Then we need to install the dependencies for all the packages

    yarn bootstrap
    
Now we can build all the packages through lerna, if you want to build individual projects, the command is the same but should be run inside the project's directory.

    yarn build


### Testing

The tests in the project are written with Jest for unit tests and Jest + "@testing-library/react" for integration tests.
You can run this command in the root to test all the projects

    yarn test:ci

Or you can run in each project:

    yarn test


### Documentation

Of course no components library is complete without proper documentation, for this I chose to use Storybook, to view the documentation you can run in "packages/components" the command:

    yarn storybook





  https://app.netlify.com/sites/puppies-app/settings/general