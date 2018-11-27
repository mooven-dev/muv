// IMPORTS

// STYLE

export const disabledStyle = `
filter: grayscale(100%);
pointer-events: none;
cursor: not-allowed;
`;

// set color using theme color props [primary, secondary, warn, success]
export const setColor = ({
  theme,
  primary,
  secondary,
  warn,
  error,
  success,
  outline,
  white,
  black,
  gray,
  lightgray,
  darkgray,
  overlay,
}, defaultColor = theme.font.color) => {
  // the order matters, has a hierarchy
  if (outline || white) return theme.color.white;
  if (error) return theme.color.error;
  if (warn) return theme.color.warn;
  if (success) return theme.color.success;
  if (primary) return theme.color.primary;
  if (secondary) return theme.color.secondary;
  if (black) return theme.color.black;
  if (lightgray) return theme.color.lightgray;
  if (darkgray) return theme.color.darkgray;
  if (gray) return theme.color.gray;
  if (overlay) return theme.color.overlay;
  // defaults
  return defaultColor;
};

export const inputStyle = ({ theme, ...props }) => (`
border-color: ${setColor({ theme, ...props }, theme.color.overlay)};
border-radius: ${theme.shape.radius};
transition: ${theme.transition.time};
font-family: ${theme.font.family};
padding: ${theme.shape.padding};
font-size: ${theme.shape.size};
border: ${theme.shape.border};
color: ${theme.font.color};
box-sizing: border-box;
display: inline-block;
position: relative;
cursor: pointer;
width: 100%;
margin: 0;
&:focus {
  border-color: ${setColor({ theme, ...props }, theme.color.primary)};
  box-shadow: ${theme.shape.shadow};
  outline: none;
}
&:disabled {
  ${disabledStyle}
}
`);
