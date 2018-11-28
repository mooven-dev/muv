
const animator = ({ time, name, from, to, middle = '' }) => (`
  @keyframes ${name} {
    from {
      ${from}
    }
    ${middle}
    to {
      ${to}
    }
  }
  animation: ${name} ${time}
`);

export default time => ({
  popIn: animator({
    from: 'transform: scale(0);',
    to: 'transform: scale(1);',
    name: 'popIn',
    middle: '',
    time,
  }),
  popOut: animator({
    from: 'transform: scale(1);',
    to: 'transform: scale(0);',
    name: 'popOut',
    middle: '',
    time,
  }),
  fadeIn: animator({
    from: 'opacity: 0;',
    to: 'opacity: 1;',
    name: 'fadeIn',
    middle: '',
    time,
  }),
  fadeOut: animator({
    from: 'opacity: 1;',
    to: 'opacity: 0;',
    name: 'fadeOut',
    middle: '',
    time,
  }),
  bounce: animator({
    from: 'bottom: 0;',
    to: 'bottom: 0',
    name: 'bounce',
    middle: '25% {bottom: .5rem;}',
    time,
  }),
});
