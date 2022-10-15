### Storybook with React

In this repository we are going to learn how to create react components using storybook and typescript.

### Getting started

To initialize the project we run the following command:

```shell
npx tsdx create .
```

> _After selecting a `react-with-storybook`, this will essentially generate a storybook-react project in the current directory._

[TSDX](https://tsdx.io/) - Zero-config CLI for TypeScript package development

### Starting Storybook

To start the storybook we will open two terminals and run the following commands in different terminals:

```shell
# first terminal
yarn start
# second terminal
yarn storybook
```

### Creating a New Component

To create a new component we are going to open the `src` folder and create a file called `Button.tsx` this will be our button component that we are going to create.

In our `Button.tsx` we are going to have the following code in it:

```tsx
import React, { FC, HTMLAttributes, ReactNode } from "react";
import "./Button.css";
export interface Props extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant: "primary" | "secondary";
}

export const Button: FC<Props> = ({
  children,
  variant,
  style,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`button ${className ?? ""}`}
      style={{
        backgroundColor: variant === "primary" ? "black" : "red",
        ...style,
      }}
    >
      {children}
    </button>
  );
};
```

To render our stories we will open the `Button.stories.tsx` file and do it as follows:

```tsx
import React from "react";
import { Meta } from "@storybook/react";
import { Button, Props } from "../src/Button";

const meta: Meta = {
  title: "Button",
  component: Button,
};

export default meta;

export const Default = () => <Button variant="primary">Default</Button>;
export const Secondary = () => <Button variant="secondary">Secondary</Button>;
```

This is the bare minimum of code to make our components. Let's say we have different variants for our components. In that case we will make use of the `Template` as follows in our `Button.stories.tsx`.

```tsx
import React from "react";
import { Meta, Story } from "@storybook/react";
import { Button, Props } from "../src/Button";

const meta: Meta = {
  title: "Button",
  component: Button,
  argTypes: {
    children: {
      defaultValue: "Default Button",
    },
  },
};

export default meta;

const Template: Story<Props> = (args) => <Button {...args} />;

export const Default = Template.bind({});
export const Secondary = Template.bind({});

Secondary.args = {
  variant: "secondary",
  children: "Secondary Button",
} as Props;
```

We also added a default value for `children` prop in the `meta`. For the `variant` of the default button we are going to set the default value in the `Button.tsx` as follows:

```tsx
import React, { FC, HTMLAttributes, ReactNode } from "react";
import "./Button.css";
export interface Props extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant: "primary" | "secondary";
}

export const Button: FC<Props> = ({
  children,
  variant = "primary",
  style,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`button ${className ?? ""}`}
      style={{
        backgroundColor: variant === "primary" ? "black" : "red",
        ...style,
      }}
    >
      {children}
    </button>
  );
};
```

### Actions on Components

Now that our components are rendered, we want to listen to certain events or actions on that component. These will be logged on the browser under the actions tab. We can pass a default action on a component as well as an individual action on a component:

```tsx
import React from "react";
import { Meta, Story } from "@storybook/react";
import { Button, Props } from "../src/Button";
import { action } from "@storybook/addon-actions";

const meta: Meta = {
  title: "Button",
  component: Button,
  argTypes: {
    onClick: {
      action: "clicked primary button",
    },
    children: {
      defaultValue: "Default Button",
    },
  },
};

export default meta;

const Template: Story<Props> = (args) => <Button {...args} />;

export const Default = Template.bind({});
export const Secondary = Template.bind({});

Secondary.args = {
  variant: "secondary",
  children: "Secondary Button",
  onClick: action("Clicked secondary button"),
} as Props;
```

### MDX

Let's use `MDX` to create stories and docs. I will create a file called `Button.stories.mdx` and add the following code in it:

```mdx
import { Meta, Story, Canvas, ArgsTable } from "@storybook/addon-docs";
import { Button, Props } from "../src/Button";

<Meta title="MDX/Button" component={Button} />

export const Template: Story<Props> = (args) => <Button {...args} />;

## Button

This is our simple `button`

<Story name="Default Button" args={{children:"I'm primary"}}>
{{Template.bind({})}}
    </Story>

<ArgsTable story="Default Button" />

Some other contents goes here
```

### Publishing to

To publish to npm, first we need to run the `build` command as follows:

```shell
yarn build
```

A `dist` folder will be created. But before running the `build` command make sure that you exported the components that you want to use in the `src/index.tsx` as follows:

```tsx
export { Button } from "./Button";
```

### Generating the Docs

To use build the docs as a static file that can be deployed we run the following command:

```shell
yarn build-storybook
```
