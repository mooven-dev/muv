const color = {
  // THEME COLORS
  secondary: '#00245f',
  primary: '#0081c8',
  success: '#33bb33',
  error: '#dd3333',
  warn: '#dd3333',
  // GREYSCALE
  white: '#fefefe',
  lightgray: '#e5e5e5',
  gray: '#a9abae',
  darkgray: '#515151',
  black: '#222222',
  overlay: 'rgba(0, 0, 0, .15)',
};

const shape = {
  // FORMS
  shadow: `0 .25rem .25rem 0 ${color.overlay}`,
  float: `0 .5rem .5rem 0 ${color.overlay}`,
  border: `.125rem solid ${color.overlay}`,
  radius: '.25rem',
  size: '16px',
  // SPACE
  margin: '.25rem .125rem',
  padding: '.75rem .875rem',
};

const font = {
  // JUST ONE SET
  family: '"Ubuntu", sans-serif',
  color: color.black,
  // PROPORTIONAL TO LAYOUT FORMS
  size: shape.size,
  spacing: 0,
};

const transition = {
  // MAKE IT SMOOTH
  time: '.3s ease',
};

export default {
  transition,
  shape,
  color,
  font,
};
