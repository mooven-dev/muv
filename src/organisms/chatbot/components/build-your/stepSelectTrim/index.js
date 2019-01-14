import Utils from '../helper/utils';

const renderHtml = ({ modelTrims }) => `
    <div class="wch-step wch-step-select-engine">
      <p>Escolha a versão:</p>
      <ul class="wch-step-ul">
      ${
  modelTrims.map((trimStr) => {
    const [trim, trimYears] = trimStr.split('|');
    return `
            <li data-trim="${trimStr}">
              ${trim} ${trimYears}
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
      const trim = item.getAttribute('data-trim');
      onSelect({ trim });
    });
  });
};

const render = (data, onSelect) => {
  const $el = Utils.createElementFromHTML(renderHtml(data));
  registerEvents($el, onSelect);
  return $el;
};

export default render;
