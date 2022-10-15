import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button, Props } from '../src/Button';
import { action } from '@storybook/addon-actions';

const meta: Meta = {
  title: 'Button',
  component: Button,
  argTypes: {
    onClick: {
      action: 'clicked primary button',
    },
    children: {
      defaultValue: 'Default Button',
    },
  },
};

export default meta;

const Template: Story<Props> = args => <Button {...args} />;

export const Default = Template.bind({});
export const Secondary = Template.bind({});

Secondary.args = {
  variant: 'secondary',
  children: 'Secondary Button',
  onClick: action('Clicked secondary button'),
} as Props;
