/* eslint-disable */
import Axios from 'axios';
import Promise from 'core-js/fn/promise';
import { find, findLast, uniq } from 'lodash';

const dataApi = 'https://www.hyundai.com.br/data/datalayer.json';
const urlRequest = 'https://www.hyundai.com.br/templates/solicite-o-seu-map.html';
const urlBuild = 'https://www.hyundai.com.br/monte-o-seu.html';
const theMake = 'hyundai';
const defaultModels = [
  'HB20',
  'HB20S',
  'HB20X',
  'HB20 R spec',
  'Creta',
  'HB20 5 anos',
  'HB20S 5 anos',
  'Creta Sport',
  'HB20 R spec Limited',
  'HB20 Edição Comemorativa 1 Million',
  'HB20S Edição Comemorativa 1 Million',
  'Creta Edição Comemorativa 1 Million',
];

const categories = {
  solidas: {
    name: 'Sólidas',
    order: 1,
  },
  metalicas: {
    name: 'Metálicas',
    order: 2,
  },
  perolizadas: {
    name: 'Perolizadas',
    order: 3,
  },
};

let dataLayer;
const normalizeData = (data = {}) => {
  const modelData = data.BR_modelData;

  const models = modelData.filter(item => typeof item.year === 'string'
      && typeof item.make === 'string'
      && typeof item.model === 'string'
      && typeof item.trim === 'string'
      && item.make.toLowerCase().trim() == theMake
      && defaultModels.indexOf(item.model.trim()) >= 0);

  const uniqueModels = models.reduce((acc, item) => {
    const model = item.model.trim();
    return acc.indexOf(model) < 0 ? [...acc, model] : acc;
  }, []);

  const uniqueEngines = models.reduce((acc, item) => {
    const engine = item.engine.trim();
    return acc.indexOf(engine) < 0 ? [...acc, engine] : acc;
  }, []);

  const uniqueTrims = models.reduce((acc, item) => {
    const trim = item.trim.trim();
    return acc.indexOf(trim) < 0 ? [...acc, trim] : acc;
  }, []);

  return {
    models,
    uniqueModels,
    uniqueEngines,
    uniqueTrims,
  };
};

const getColorImages = (model) => {
  const { models } = dataLayer;
  const modelFind = findLast(models, o => o.model === model && o.colorImages);
  return modelFind ? modelFind.colorImages.split('|') : [];
};

const makeUrlRequestYour = ({ model, engineStr, trimStr, url, price }, type = 'build') => {
  const origin = type === 'build' ? urlBuild : urlRequest;
  return `${origin}?
      make=Hyundai&
      model=${model}&
      engine=${engineStr.replace(/\s/g, '-')}&
      trim=${trimStr.replace(/\s/g, '-')}&
      paint=${url}&
      price=${price}
    `.replace(/\s/g, '');
};

const getImageTrim = (urlImg, model, trimStr, engineStr) => {
  const [trim] = trimStr.split('|');
  const [, transType] = engineStr.split('|');
  const normalTransType = transType === 'Manual' ? transType : 'Automatic';
  const cleanTrim = trim.replace(/[^\s\w-]+/g, '').replace(/\s/g, '_');
  return urlImg.replace(
    `${model}_Exterior`,
    `${model}_Exterior_${cleanTrim}_${normalTransType}`,
  ).trim();
};

export const getPrimaryImage = (model, index = 0) => {
  const targetIndex = (model == 'Creta Sport') ? 4 : index;
  return getColorImages(model)[targetIndex];
};

export const priceFormated = price => price.toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const getBasePrice = (modelName) => {
  let basePrice = '1000000';
  const modelsFiltered = dataLayer.models.filter(modelCar => modelName === modelCar.model.trim() && modelCar.price.trim().length > 0).sort((a, b) => {
    const price1 = a.price.replace(/\D/g, '');
    const price2 = b.price.replace(/\D/g, '');
    return parseInt(price1) > parseInt(price2) ? 1 : -1;
  });
  basePrice = modelsFiltered.length ? modelsFiltered[0].price : basePrice;
  basePrice = parseInt(basePrice.replace(/\D/g, ''));
  return priceFormated(basePrice);
};

export const getEnginesByModel = (model) => {
  const { uniqueEngines, models } = dataLayer;
  const enginesModel = models.reduce((acc, item) => {
    if (item['model'] !== model || uniqueEngines.indexOf(item['engine']) < 0) {
      return acc;
    }
    const engine = [
      item['engine'],
      item['transmissionType'],
      item['transmission'],
      item['fuel'],
      item['doors']
    ];
    return [...acc, engine.join('|')]
  }, []);
  return uniq(enginesModel);
};


export const getTrimsByModelEngine = ({ model, engine }) => {
    const { uniqueTrims, models } = dataLayer;
    const arrEngine = engine.split('|');
    const trimsModel = models.reduce((acc, item) => {
      if (
        item['model'] !== model ||
        item['engine'] !== arrEngine[0] ||
        item['transmissionType'] !== arrEngine[1] ||
        uniqueTrims.indexOf(item['trim']) < 0
      ) {
        return acc;
      }
      const trims = [
        item['trim'],
        item['trimYears'],
        item['price'].replace(/\D/g, '')
      ];
      return [...acc, trims.join('|')]
    }, []);
    return uniq(trimsModel);
};

export const getColorsByModel = ({ model }) => {
    const arrImgs = getColorImages(model);
    const collectImages =  arrImgs.map(img => {
      const filename = img.slice(img.lastIndexOf('/')+1);
      const [ category, color, hex, price ] = filename.split('.');
      return {
        category,
        categoryName: categories[category].name,
        color,
        colorName: color.replace('_', ' '),
        hex,
        price: parseFloat(price.replace(/\D/g, '')),
        filename,
        url: img
      }
    });
    return collectImages.sort((a,b) => {
      return categories[a.category].order > categories[b.category].order ? 1 : -1;
    })
};

export const getInfoCar = ({
    model,
    engine: engineStr,
    trim: trimStr,
    color: colorDetails
  }) => {
    let imgPath, colorName,
      urlRequestYour, urlBuildYour,
      totalPrice = 0;
    const modelFinded = find(dataLayer.models, (o) => {
      if (model && model !== o['model']) {
        return false;
      }
      if (engineStr) {
        const [engine, transmissionType] = engineStr.split('|');
        if (engine !== o['engine'] || transmissionType !== o['transmissionType']) {
          return false;
        }
      }
      if (trimStr) {
        const [trim, trimYears] = trimStr.split('|');
        if (trim !== o['trim'] || trimYears !== o['trimYears']) {
          return false;
        }
      }
      return true;
    });
  
    if(!modelFinded) {
      return {};
    }
  
    totalPrice += parseFloat(modelFinded['price'].replace(/\D/g, ''));
  
    if (colorDetails) {
      const [, color, , price] = colorDetails.split('.');
      const imgs = getColorImages(model);
      const findImg = imgs.find(o => o.indexOf(colorDetails) > -1);
      totalPrice += parseFloat(price.replace(/\D/g, ''));
      colorName = color.replace('_', ' ');
      imgPath = getImageTrim(findImg, model, trimStr, engineStr)
    }
  
    if (!imgPath) {
      imgPath = getPrimaryImage(model);
    }
  
    if (engineStr && trimStr) {
      urlRequestYour = makeUrlRequestYour({
        model, engineStr, trimStr, url: imgPath, price: totalPrice
      }, 'request');
      urlBuildYour = makeUrlRequestYour({
        model, engineStr, trimStr, url: imgPath, price: totalPrice
      });
    }
  
    return {
      model,
      engine: modelFinded['engine'],
      trim: modelFinded['trim'],
      trimYears: modelFinded['trimYears'],
      transmissionType: modelFinded['transmissionType'],
      color: colorName,
      price: totalPrice,
      url: imgPath,
      urlRequestYour,
      urlBuildYour
    }
};

export const loadData = () => {
  console.log('#TOAQUI')
    return new Promise((resolve, reject) => {
      if (dataLayer) {
        resolve(dataLayer);
      }
      Axios.get(dataApi)
        .then((res) => {
            dataLayer = normalizeData(res);
            resolve(res);
        })
        .catch(err => console.log(err));     
    });
  };
