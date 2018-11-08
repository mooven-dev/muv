const color = {
  overlay: 'rgba(0, 0, 0, .15)',
  secondary: '#00baf2',
  primary: '#0082c8',
  success: '#33bb33',
  white: '#fefefe',
  black: '#484848',
  error: '#dd3333',
  warn: '#dd3333',
  gray: '#f0f0f0',
};

const shape = {
  shadow: `0 .25rem .25rem 0 ${color.overlay}`,
  border: `.125rem solid ${color.overlay}`,
  margin: '.25rem .125rem',
  padding: '.875rem 1rem',
  radius: '.25rem',
  size: '1rem',
};

const text = {
  color: color.black,
  size: shape.size,
};

const transition = {
  time: '.3s ease',
};

export default {
  transition,
  shape,
  color,
  text,
};
