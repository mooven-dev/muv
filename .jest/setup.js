import { shallow, render, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

configure({ adapter: new Adapter() });
// CREATE GLOBALS FOR EASIER TESTS
global.shallow = shallow;
global.render = render;
global.mount = mount;

// IGNORE CREATE ELEMENT ERRORS
console.error = (message) => { // eslint-disable-line
  if (!/(React.createElement: type should not be null)/.test(message)) {
    throw new Error(message);
  }
};
