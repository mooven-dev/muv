// IMPORTS

// STYLE

// set color using theme color props [primary, secondary, warn, success]
export const setColor = ({ theme, primary, secondary, warn, success, outline }, defaultColor) => {
  if (outline) return theme.color.white; // keep this line first
  if (secondary) return theme.color.secondary;
  if (primary) return theme.color.primary;
  if (success) return theme.color.success;
  if (warn) return theme.color.warn;
  // defaults
  if (!defaultColor) return theme.text.color;
  return defaultColor;
};

export const disabledStyle = `
filter: grayscale(100%);
pointer-events: none;
cursor: not-allowed;
`;
