import Utils from '../helper/utils';
import { priceFormated } from '../datalayer';

const renderHTML = ({ model, url, price }) => `
    <div class="wch-panel-car-info">
      <p>Confira seu carro:</p>
      <div class="wch-panel-details">
        <div class="wch-cnt-image">
            <img alt="Modelo ${model}" src="${url}" />
        </div> 
        <div class="wch-panel-price">
            <p>Total:</p>
            <span>${priceFormated(price)}</span>
        </div>
      </div>
      <a href="#" class="wch-panel-link">
          Encerrar o monte seu carro
      </a>
    </div>
  `;

const registerEvents = (el, onClosed) => {
  el.querySelector('.wch-panel-link').addEventListener('click', (e) => {
    e.preventDefault();
    onClosed && onClosed();
  });
};

const render = (data, onClosed) => {
  const el = Utils.createElementFromHTML(renderHTML(data));
  registerEvents(el, onClosed);
  return el;
};

export default render;
