import Utils from '../helper/utils';

const renderHtml = ({ modelEngines }) => `
    <div class="wch-step wch-step-select-engine">
      <p>Agora escolha o seu motor:</p>
      <ul class="wch-step-ul">
      ${
  modelEngines.map((engineStr) => {
    const [engine, transmissionType] = engineStr.split('|');
    return `
            <li data-engine="${engineStr}">
              ${engine} ${transmissionType}
            </li>
          `;
  }).join('')
}
      </ul>
    </div>
  `;

const registerEvents = (el, onSelect) => {
  const items = el.querySelectorAll('ul li');
  if (!items) return;
  items.forEach((item) => {
    item.addEventListener('click', () => {
      const engine = item.getAttribute('data-engine');
      onSelect({ engine });
    });
  });
};

const render = (data, onSelect) => {
  const $el = Utils.createElementFromHTML(renderHtml(data));
  registerEvents($el, onSelect);
  return $el;
};

export default render;
