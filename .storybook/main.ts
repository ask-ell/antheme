import type { StorybookConfig } from "@storybook/web-components-webpack5";
import path from 'path';

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials",
    {
      name: '@storybook/addon-styling',
      options: {
        sass: {
          implementation: require('sass'),
        },
      },
    },
  ],
  framework: {
    name: "@storybook/web-components-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    config.module?.rules?.push(
      {
        test: /\.s(a|c)ss$/,
        include: path.resolve(__dirname, '../'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'sass-loader'
        ],
      },
    );
    return config;
  },
};
export default config;
