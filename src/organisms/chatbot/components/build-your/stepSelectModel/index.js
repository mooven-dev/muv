import rendeModelOption from './modelOption';
import Utils from '../helper/utils';
import Gallery from '../components/gallery';

const renderHtml = () => `
    <div class="wch-step wch-step-select-model">
      <p>Primeiro selecione:</p>
      <div class="wch-step-gallery"></div>
    </div>
  `;

const mount = ({ uniqueModels }) => {
  const children = uniqueModels.map(model => Utils.createElementFromHTML(rendeModelOption(model)));
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
      const type = item.getAttribute('data-model');
      onSelect({ model: type });
    });
  });
};

const render = (data, onSelect) => {
  console.log(data);
  const el = mount(data);
  registerEvents(el, onSelect);
  return el;
};

export default render;
