import {
  shallow, render, mount, configure,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
// CREATE GLOBALS FOR EASIER TESTS
global.shallow = shallow;
global.render = render;
global.mount = mount;
