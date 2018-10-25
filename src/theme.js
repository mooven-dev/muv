const color = {
  overlay: 'rgba(0, 0, 0, .15)',
  secondary: '#00baf2',
  primary: '#0082c8',
  success: '#33bb33',
  white: '#fefefe',
  black: '#484848',
  warn: '#dd3333',
  gray: '#f0f0f0',
};

const shape = {
  shadow: `0 .25rem .25rem 0 ${color.overlay}`,
  border: `.125rem solid ${color.overlay}`,
  padding: '.825rem 1.2rem',
  margin: '.25rem 0',
  radius: '.25rem',
  base: '1rem',
};

const text = {
  color: color.black,
  size: shape.base,
};

const transition = {
  time: '.2s',
};

export default {
  transition,
  shape,
  color,
  text,
};
