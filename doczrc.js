
import theme from './src/theme';

export default {
  title: 'MUV',
  port: '8000',
  dest: '/dist',
  description: 'This is my awesome documentation',
  themeConfig: {
    colors: {
      background: theme.color.white,
      sidebarText: theme.color.black,
      secondary: theme.color.secondary,
      primary: theme.color.primary,
      theadColor: theme.font.color,
      sidebarBg: theme.color.lightgray,
      link: theme.color.primary,
      theadBg: theme.color.lightgray,
      border: theme.color.lightgray,
      text: theme.font.color,
    },
  },
  styles: {
    body: {
      fontSize: theme.shape.size,
    },
  },
};
