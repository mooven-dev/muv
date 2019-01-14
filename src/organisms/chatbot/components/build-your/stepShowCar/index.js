import Utils from '../helper/utils';
import { priceFormated } from '../datalayer';

const renderHtml = ({
  model,
  url,
  engine,
  transmissionType,
  trim,
  trimYears,
  color,
  price,
  urlRequestYour,
  urlBuildYour,
}) => `
    <div class="wch-step wch-step-show-car">
      <p>Confira o seu carro montado:</p>
      <div class="wch-model-image">
        <img alt="Modelo ${model}" src="${url}" />
      </div>
      <div class="wch-select-details">
        <p>${model}</p>
        <span>Motor: ${engine}  ${transmissionType}</span>
        <span>Versão: ${trim}  ${trimYears}</span>
        <span class="wch-step-capitilize">Cor: ${color}</span>
        <span class="wch-step-capitilize">Total: ${priceFormated(price)}</span>
      </div>
      <ul class="wch-step-ul">
        <li>
          <a target="_blank" href="${urlRequestYour}">Solicite o seu</a>
        </li>
        <li>
          <a target="_blank" href="${urlBuildYour}">Ver detalhes</a>
        </li>
      </ul>
    </div>
  `;

const render = data => Utils.createElementFromHTML(renderHtml(data));

export default render;
