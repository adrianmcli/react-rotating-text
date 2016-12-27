# dev-react-component
A minimalistic boilerplate for developing a react component as an NPM package:

- No Babel
- No Webpack
- No testing
- No linting

You get to decide how to bring those in yourself if you decide that you need it. All this boilerplate does is get you developing and publishing as fast as possible.

This boilerplate includes the use of [react-build-lib](https://github.com/adrianmcli/react-build-lib) in order to generate CommonJS modules that you can publish and share. Other standalone modules like UMD are not supported yet (see below).

# How to use

1. Clone this repo into a folder of your choice and `cd` into it:

  ```
  git clone https://github.com/adrianmcli/dev-react-component.git my-new-component
  cd my-new-component
  ```

2. Delete the existing git history by running `rm -rf .git` and then run `git init` to start fresh.
3. Run `yarn` or `npm install` to install the dependencies.
4. Change the `name`, `version`, and `description` inside `package.json`.
5. Start developing your component inside `src/index.js`.
6. Run `npm publish` to publish your component.

# Developing Your Component

Here you have two choices:

1. Create your own "example" page that pulls in the component from `src/index.js` and load it up with React and all of its dependencies, or;
2. **(RECOMMENDED)** Checkout the `storybook` branch of this repo and use [React Storybook](https://github.com/storybooks/react-storybook) with its built-in development environment to start building your component.

The first option will probably require you to install a build tool (like [Webpack](https://webpack.github.io/) or [Brunch](http://brunch.io/) and setup all the dependencies you require to have a simple dev server capable of building a react app.

The second option is much more hands off, but many people like to build their own dev environment, especially if there are specific things they want to showcase. Since this is a minimalistic boilerplate, I have left the option up to you.

# Warning

This boilerplate only produces a transpiled CommonJS version of the component in a `lib` folder with `babel-cli`. This should be sufficient if users of your package have a Webpack build step to compile their react app.

UMD compilation may be added later or in a separate branch in order to support standalone usage in the future. See this [issue](https://github.com/adrianmcli/dev-react-component/issues/2) for more details.
