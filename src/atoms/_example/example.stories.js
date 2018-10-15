import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Component from './index';


storiesOf('Atoms/Example', module)
  .add('default', withInfo()(() => <Component />))
  .add('with text', withInfo()(() => <Component>text</Component>))
  .add('strong', withInfo()(() => <Component strong />));
