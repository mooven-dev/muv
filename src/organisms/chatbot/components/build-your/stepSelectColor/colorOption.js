import { priceFormated } from '../datalayer';

const render = ({ filename, hex, categoryName, colorName, price }) => `
    <div class="wch-step-select-item" data-color="${filename}">
      <div class="wch-model-image">
        <div class="wch-step-color" style="background-color:#${hex}"></div>
      </div>
      <div class="wch-select-model-price">
        <p class="wch-step-capitilize">${categoryName}: ${colorName}</p>
        <span>+ R$ ${priceFormated(price)}</span>
      </div>
    </div>
  `;

export default render;
