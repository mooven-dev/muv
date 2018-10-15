import { configure } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';

// CONFIG ADDONS
setDefaults({
  inline: true,
});

// AUTOMATICALLY IMPORT ALL STORIES
const req = require.context('../src', true, /stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
