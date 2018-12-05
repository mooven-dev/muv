

export default animator => ({
  popIn: animator({
    from: 'transform: scale(0);',
    to: 'transform: scale(1);',
    name: 'popIn',
    middle: '',
  }),
  popOut: animator({
    from: 'transform: scale(1);',
    to: 'transform: scale(0);',
    name: 'popOut',
    middle: '',
  }),
  fadeIn: animator({
    from: 'opacity: 0;',
    to: 'opacity: 1;',
    name: 'fadeIn',
    middle: '',
  }),
  fadeOut: animator({
    from: 'opacity: 1;',
    to: 'opacity: 0;',
    name: 'fadeOut',
    middle: '',
  }),
  bounce: animator({
    from: 'bottom: 0;',
    to: 'bottom: 0',
    name: 'bounce',
    middle: '25% {bottom: .5rem;}',
  }),
});
