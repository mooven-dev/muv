// IMPORTS
import _ from 'lodash';

import animation from './animations';
import defaultTheme from './theme';

// THEME CREATOR METHOD (MERGES CUSTOM THEME WITH DEFAULT)
export const animator = ({ time = defaultTheme.transition.time, name, from, to, middle = '' }) => (`
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

export const createTheme = (customTheme = {}) => _.merge(
  defaultTheme, customTheme, { animation: animation(animator) },
);

// COMMOM STYLES FOR DISABLED ELEMENTS
export const disabledStyle = `
filter: grayscale(100%);
pointer-events: none;
cursor: not-allowed;
`;

// LIST ALL COLOR FROM THE THEME
const themeColors = Object.keys(defaultTheme.color);

// FILTER COLOR PROPS FROM PROPS
export const getColorProps = (props) => {
  const propsList = Object.keys(props);
  const colorProps = {};
  const rest = {};
  // eslint-disable-next-line
  propsList.map(key => {
    if (themeColors.indexOf(key) === -1) rest[key] = props[key];
    else colorProps[key] = props[key];
  });
  return { colorProps, ...rest };
};

// RETURNS THE FIRST COLOR FOUND ON THEME BASED ON THE PROPS RECEIVED
export const setColor = (props, defaultColor = props.theme.font.color) => {
  const { colorProps, theme } = getColorProps(props);
  const choosedColors = themeColors.filter(color => colorProps[color]);
  const firstColor = theme.color[choosedColors[0]];
  if (firstColor) return firstColor;
  return defaultColor;
};

// COMMOM STYLES FOR INPUTS
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

// useful defaults
export const userAvatarImg = 'http://www.robots-and-dragons.de/sites/default/files/styles/artikel_-_bild__ber_artikel/public/field/image/preview/terminator-linda-hamilton.jpg?itok=J4P32hm8';

export const botAvatarImg = 'https://slm-assets2.secondlife.com/assets/6327589/view_large/Snapshot_025.jpg?1348721138';


export const avatarHyunImg = 'https://s3-sa-east-1.amazonaws.com/muv-assets/hyun.gif';

export const avatarDayImg = 'https://s3-sa-east-1.amazonaws.com/muv-assets/hyun.gif';
