// IMPORTS

// STYLE

export const disabledStyle = `
filter: grayscale(100%);
pointer-events: none;
cursor: not-allowed;
`;

// set color using theme color props [primary, secondary, warn, success]
export const setColor = ({
  theme, primary, secondary, warn, error, success, outline, white, black, gray, overlay,
}, defaultColor = theme.text.color) => {
  // the order matters, has a hierarchy
  if (outline || white) return theme.color.white;
  if (warn || error) return theme.color.warn;
  if (success) return theme.color.success;
  if (primary) return theme.color.primary;
  if (secondary) return theme.color.secondary;
  if (black) return theme.color.black;
  if (gray) return theme.color.gray;
  if (overlay) return theme.color.overlay;
  // defaults
  return defaultColor;
};
