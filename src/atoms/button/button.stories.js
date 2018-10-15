import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Component from './index';


storiesOf('Atoms/Button', module)
  .add('default', withInfo()(() => <Component />));
