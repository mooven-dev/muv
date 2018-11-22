
import theme from './src/theme';

export default {
  title: 'MUV',
  port: '8000',
  dest: '/docz',
  description: 'This is my awesome documentation',
  themeConfig: {
    colors: {
      background: theme.color.white,
      sidebarText: theme.color.black,
      secondary: theme.color.secondary,
      primary: theme.color.primary,
      theadColor: theme.font.color,
      sidebarBg: theme.color.gray,
      link: theme.color.primary,
      theadBg: theme.color.gray,
      border: theme.color.gray,
      text: theme.font.color,
    },
  },
  styles: {
    body: {
      fontSize: theme.shape.size,
    },
  },
};
