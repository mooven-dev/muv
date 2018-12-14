
import animation from './animations';

/**
 * THE ORDER OF THIS COLORS SETS THE COLOR HIERARCH
 * DO NOT CHANGE THIS
 */
const color = {
  // THEME COLORS
  error: '#dd3333',
  warn: '#dd3333',
  success: '#33bb33',
  secondary: '#00245f',
  primary: '#00528F',
  // GREYSCALE
  white: '#fefefe',
  overlay: 'rgba(0, 0, 0, .15)',
  lightGray: '#e5e5e5',
  gray: '#a9abae',
  darkGray: '#515151',
  black: '#222222',
  // BLUESCALE
  darkBlue: '#002C5F',
};

const shape = {
  // FORMS
  float: `0 .5rem .5rem .125rem ${color.overlay}`,
  shadow: `0 .25rem .25rem 0 ${color.overlay}`,
  border: `.1rem solid ${color.overlay}`,
  radius: '.5rem',
  size: '16px',
  // SPACE
  margin: '.25rem .125rem',
  padding: '.75rem .875rem',
  maxWidth: '1280px', // container size
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
  animation,
  transition,
  shape,
  color,
  font,
};
