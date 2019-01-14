import rendeColorOption from './colorOption';
import Utils from '../helper/utils';
import Gallery from '../components/gallery';

const renderHtml = () => `
    <div class="wch-step wch-step-select-color">
      <p>Por último, escolha a cor do seu carro:</p>
      <div class="wch-step-gallery"></div>
    </div>
  `;

const mount = ({ modelColors }) => {
  const children = modelColors.map(model => Utils.createElementFromHTML(rendeColorOption(model)));
  const gallery = new Gallery();
  const elGallery = gallery.render(children);
  const el = Utils.createElementFromHTML(renderHtml());
  el.querySelector('.wch-step-gallery').append(elGallery);
  return el;
};

const registerEvents = (el, onSelect) => {
  const items = el.querySelectorAll('.wch-step-select-item');
  if (!items) return;
  items.forEach((item) => {
    item.addEventListener('click', () => {
      const color = item.getAttribute('data-color');
      onSelect({ color });
    });
  });
};

const render = (data, onSelect) => {
  const el = mount(data);
  registerEvents(el, onSelect);
  return el;
};

export default render;
