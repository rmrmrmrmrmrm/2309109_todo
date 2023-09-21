module.exports = {
  stories: ["../app/components/**/*.stories.js"],
  staticDirs: ["../public"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-interactions",
  ],

  features: {
    postcss: false,
  },

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  docs: {
    autodocs: true,
  },
};
