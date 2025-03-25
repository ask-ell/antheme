import '!style-loader!css-loader!sass-loader!./main.scss';
import type { Preview } from '@storybook/web-components';

document.querySelector('html')?.classList.add('antheme-html');

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
