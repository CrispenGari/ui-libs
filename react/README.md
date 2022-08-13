### Creating as Simple UI Lib for React.

In this one we are going to create a simple react component library and publish it to the npm registry. First of all we need to initialize a nodejs application by running the following command:

```shell
yarn init -y
```

### Installing React and React Dom

Since this is a component library for react, we need to install react and react-dom as there are the peer dependence for our component library as follows:

```shell
yarn add react react-dom
```

Once that is finished we need to add these two dependence in the `peerDependencies` property in our package.json file as follows:

```json
{
  "name": "00_getting_started",
  "version": "1.0.0",
  "main": "index.js",
  "author": "CrispenGari",
  "license": "MIT",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

Create a file called `src/index.js` this will be the entrypoint of our component library. Unlike in normal react, where we have an html file where all our components are going to be injected. We need a way of see how our components will look as we develop them. For that we are going to use a library called [storybook](https://storybook.js.org/). To initialize a storybook project we are going to run the following command in our project:

```shell
npx storybook init
```

So storybook by default it will be able to detect that we are using react and we want to create a React library. You can see the following logs during initialization:

```shell
 • Detecting project type. ✓
 • Adding Storybook support to your "React" library
```

Now that we have storybook setup we can open the package.json file and customize the storybook scripts:

```json
{
  "scripts": {
    "start": "start-storybook -p 6006",
    "build": "build-storybook"
  }
}
```

Now when we want to start a storybook server we run the command:

```shell
yarn start
```

Our Components will be in the folder called `stories`. And we are going to export them in the `index.js` file that is in the `src` folder. For the generated folders theres a file called `.stories/main.js` which is exporting an object. In that object we have a property called stories which looks as follows:

```js
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  ...
};
```

> Storybook will look for the files with the given extensions.

### stories

I'm going to go through one component that was created by default by storybook which is a `Button`. If we open the `src/stories` we will be presented by a lot of components with their styles. First let's look at a component called `Button`. If we open the `Button.jsx` it looks look as follows:

```jsx
import React from "react";
import PropTypes from "prop-types";
import "./button.css";
export const Button = ({ primary, backgroundColor, size, label, ...props }) => {
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";
  return (
    <button
      type="button"
      className={["storybook-button", `storybook-button--${size}`, mode].join(
        " "
      )}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: "medium",
  onClick: undefined,
};
```

This component is a simple react component which takes in props `{primary, backgroundColor, size, label}` and other props that are going to be passed to the button component. Within this button component we can actually use react hooks since it is a react function based component. We can use component life cycle method if we define our component as a class based component. One thing that you have noticed is that we defined we are defining the `propTypes` and `defaultProps` for our component, this is a very basic thing we can do in react when using javascript, but when we are using typescript we normally don't do this. Now the button will be styled based on the classNames in the `./button.css` file.

If we were to open the `Button.stories.jsx` file we will be able to see following code in it:

```jsx
import React from "react";
import { Button } from "./Button";
export default {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
};
```

The first piece of code that is very import is:

```jsx
export default {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
};
```

The title is the title that will be shown in storybook. Example will be the name of your component library for example and Button will be the title of the button. So we can make our title like `ReactUI/Controls/Button`. The component property will be the component that we have created and imported. Then the argTypes allow us to specify the type of controls that we want based on the property during development. You can find more about them here https://storybook.js.org/docs/react/api/argtypes.

Next we are going to create a Template based on our button. And this template will takes in the `args` as props. So for this button we are to bind in the `args` for each Button component that we are going to clone from the template as follows:

```jsx
const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};
...
```

### Writing the docs for a component

Let's say we want to show the documentation for a created Component. What we can do is to create a `.stories.mdx` file for example in our case for the button we can create a `Button.stories.mdx` file that looks as follows:

```mdx
import { Meta, Story, Canvas } from "@storybook/addon-docs/blocks";
import { Button } from "./Button";

<Meta title="Example" component={Button} />

### Button

A simple button component.

<Canvas>
  <Story name="Button">
    <Button label="Button" primary />

  </Story>
</Canvas>
```

> To get the syntax highlighting we may need to install the `MDX` extension on visual studio code

Now in our `index.js` file we can export our component as follows.

```js
export { Button } from "./stories/Button";
```

### Publishing our Component library to npm registry.

Next we are going to publish our component library to `npm`. First we need to compile our component application. In order for us to do that we are going to use a library called `rollup`. We need to install the following packages:

```shell
yarn add -D rollup-plugin-babel @rollup/plugin-node-resolve rollup-plugin-peer-deps-external rollup-plugin-terser rollup-plugin-postcss rollup postcss @rollup/plugin-replace
```

Then we need to create a `rollup.config.js` and add the following code into it:

```js
import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
export default [
  {
    input: "./src/index.js",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
      },
      {
        file: "dist/index.es.js",
        format: "es",
        exports: "named",
      },
    ],
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
      postcss({
        plugins: [],
        minimize: true,
      }),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
      }),
      external(),
      resolve(),
      terser(),
    ],
    external: ["react", "react-dom", "prop-types"],
  },
];
```

> Our component library will support both `common js` and `es modules`.

After doing that we are going to create a `build-lib` script that will build the library for us by using the rollup configurations that we have defined.

```json
{
  "name": "crisp-rcl",
  "main": "dist/index.js",
  "module": "dist/index.es.js",
  ...
  "scripts": {
    "start": "start-storybook -p 6006",
    "build": "build-storybook",
    "build-lib": "rollup -c",
  }
}

```

Now we can run the command:

```shell
yarn build-lib
```

Now we can publish our package to npm by running the following command:

```shell
npm publish
```

### Refs

1. [storybook](https://storybook.js.org/docs/react/get-started/install)
2. [rollupjs](https://rollupjs.org/guide/en/)
