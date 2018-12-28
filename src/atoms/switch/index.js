import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled components
const ToggleSwitchWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Toggle = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  transform: translate3d(0, 0, 0);
  background-color: ${props => props.bgClear};
  height: ${props => (props.width / 2)}px;
  width: ${props => props.width}px;
  border-radius: ${props => props.width / 4}px;
  padding: ${props => props.padding}px;
  border: 1px solid ${props => (props.toggled
    ? props.bgToggled
    : props.borderColor)
};
`;

const ToggleBall = styled.div`
  z-index: 2;
  border-radius: 50%;
  box-shadow: 0px 0px 3px rgba(0,0,0,0.2);
  transition: transform 0.3s cubic-bezier(1,.19,.15,.7);
  transition-delay: 0.1s;
  will-change: transform;
  background-color: ${props => props.ballColor};
  border: 1px solid ${props => props.borderColor};
  height: ${props => (props.width / 2) - (props.padding * 2)}px;
  width: ${props => (props.width / 2) - (props.padding * 2)}px;
  transform: ${props => (props.toggled
    ? `translateX(${props.width - (props.width / 2)}px)`
    : 'translateX(0px)')
};
  &:active {
    background-color: ${props => props.ballColorActive};
  }
`;

const RippleBg = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: radial-gradient(
    circle, ${props => props.bgToggled} 10%, transparent 10.01%
  );
  background-repeat: no-repeat;
  background-position: 50%;
  pointer-events: none;
  transition: transform 0.5s, opacity 0.3s ease;
  transform: ${props => (props.visible ? 'scale(10, 10)' : 'scale(0, 0)')};
  opacity: ${props => (props.visible ? 1 : 0)};
  position: absolute;
  z-index: 1;
`;

const propTypes = {
  onClick: PropTypes.func,
  initial: PropTypes.bool,
  width: PropTypes.number,
  padding: PropTypes.number,
  ballColor: PropTypes.string,
  ballColorActive: PropTypes.string,
  bgToggled: PropTypes.string,
  borderColor: PropTypes.string,
};

class ToggleSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: this.props.value,
    };

    this.toggle = (e) => {
      if (e) e.stopPropagation();
      this.setState(prevState => ({ toggled: !prevState.toggled }),
        () => this.props.onClick(this.state.toggled));
    };
  }

  render() {
    const { toggled } = this.state;
    return (
      <ToggleSwitchWrapper primary onClick={this.toggle}>
        <Toggle
          toggled={toggled}
          {...this.props}
        >
          <ToggleBall
            toggled={toggled}
            {...this.props}
          />
          <RippleBg
            visible={toggled}
            {...this.props}
          />
        </Toggle>
        {toggled}
      </ToggleSwitchWrapper>
    );
  }
}

ToggleSwitch.propTypes = propTypes;

// Default colors
const darkBlue = '#00245f';
const lightGrey = '#f5f5f5';
const grey = '#ddd';
const white = '#fff';

ToggleSwitch.defaultProps = {
  onClick: (value) => { console.log('', value); },
  initial: false,
  width: 40,
  padding: 3,
  ballColor: white,
  ballColorActive: lightGrey,
  bgToggled: darkBlue,
  borderColor: grey,
};

export default ToggleSwitch;
