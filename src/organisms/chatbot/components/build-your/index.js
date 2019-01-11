import React, { Component } from 'react';
import Promise from 'core-js/fn/promise';
import { merge } from 'lodash';
import renderPanelCarInfo from './panelCarInfo';
import {
  loadData,
  //   getEnginesByModel,
  getTrimsByModelEngine,
  getColorsByModel,
  getInfoCar,
} from './datalayer';

class MountYourCar extends Component {
  constructor(postMessage, $elPanelCar, onClosed) {
    super();
    this.postMessage = postMessage;
    this.onClosed = onClosed;
    this.step = 1;
    this.dataLayer = [];
    this.state = {};
    this.$step = null;
    this.$elPanelCar = $elPanelCar;

    this.start = () => new Promise((resolve, reject) => {
      loadData().then((data) => {
        this.dataLayer = data;
        this.render(data);
        resolve();
      }).catch(reject);
    });

    this.atualizePanelCar = () => {
      const selectedCar = getInfoCar(this.state);
      const Closed = () => {
        this.close();
      };
      const el = renderPanelCarInfo(selectedCar, Closed);
      const child = this.$elPanelCar.firstElementChild;
      if (child) {
        this.$elPanelCar.replaceChild(el, child);
      } else {
        this.$elPanelCar.append(el);
      }
    };

    this.disalbleStep = () => {
      this.$step && this.$step.nodeName && this.$step.classList.add('passed');
    };

    this.close = () => {
      if (this.step !== 5) {
        this.disalbleStep();
      }
      this.$elPanelCar.innerHTML = '';
      this.onClosed();
    };

    this.onSelect = (data) => {
      this.state = merge(this.state, data);
      this.disalbleStep();
      this.nextStep();
    };

    this.nextStep = () => {
      this.step = this.step + 1;
      this.render(this.dataLayer);
      if (this.step === 5) {
        this.close();
        return;
      }
      this.atualizePanelCar();
    };
  }


  render(data) {
    const onSelect = (data) => {
      this.onSelect(data);
    };
    let el;
    switch (this.step) {
      case 1:
        const { uniqueModels } = data;
        el = renderStepSelectModel({ uniqueModels }, onSelect);
        break;
      case 2:
        const modelEngines = getEnginesByModel(this.state.model);
        el = renderStepSelectEngine({ modelEngines }, onSelect);
        break;
      case 3:
        const modelTrims = getTrimsByModelEngine(this.state);
        el = renderStepSelectTrim({ modelTrims }, onSelect);
        break;
      case 4:
        const modelColors = getColorsByModel(this.state);
        el = renderStepSelectColors({ modelColors }, onSelect);
        break;
      default:
        const selectedCar = getInfoCar(this.state);
        el = renderStepShowCar(selectedCar);
    }
    this.$step = el;
    this.postMessage(el);
    return (
      <div />
    );
  }
}

export default MountYourCar;
