import { getPrimaryImage, getBasePrice } from '../datalayer';

const render = model => `
    <div class="wch-step-select-item" data-model="${model}">
      <div class="wch-model-image">
        <img alt="Modelo ${model}"
          src="${getPrimaryImage(model)}" />
      </div>
      <div class="wch-select-model-price">
        <p>${model}</p>
        <span>a partir de R$ ${getBasePrice(model)}</span>
      </div>
    </div>
  `;

export default render;
