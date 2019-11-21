/* eslint-disable no-param-reassign */
import { ISliderSettings } from './helpers/interfaces';
import { Presenter } from './Presenter/Presenter';
import { PresenterAPI } from './Presenter/PresenterAPI';

declare global {
  interface Window {
    $: JQuery;
  }
  interface JQuery {
    slider: (
      ...args: any
    ) => JQuery<Element> | string | number | number[] | boolean;
  }
}

function checkDataset(dataset: string): number | boolean {
  if (dataset === 'true') {
    return true;
  }
  if (dataset === 'false') {
    return false;
  }
  const number = parseInt(dataset, 10);
  if (!isNaN(number)) {
    return number;
  }
}

function getDataAttrSettings(htmlElem: HTMLElement): ISliderSettings {
  let values: number[] | RegExpMatchArray;
  if (htmlElem.dataset.values) {
    values = htmlElem.dataset.values.match(/(\d+)/g);
    values = values.map((val: string) => parseInt(val, 10));
  }
  return {
    min: checkDataset(htmlElem.dataset.min) as number,
    max: checkDataset(htmlElem.dataset.max) as number,
    step: checkDataset(htmlElem.dataset.step) as number,
    isRange: checkDataset(htmlElem.dataset.isRange) as boolean,
    orientation: htmlElem.dataset.orientation,
    values: values as number[],
    value: checkDataset(htmlElem.dataset.value) as number,
    hasTip: checkDataset(htmlElem.dataset.hasTip) as boolean,
    hasLine: checkDataset(htmlElem.dataset.hasLine) as boolean,
  };
}

(function initialization($: JQueryStatic) {
  const sliders: Presenter[] = [];

  $.fn.slider = function getStart(
    ...args: any
  ): JQuery<Element> | string | number | number[] | boolean | null {
    const [receivedParameter] = args;
    if (typeof receivedParameter === 'object' || receivedParameter === undefined) {
      let settings: ISliderSettings = receivedParameter;
      return this.each((i: number, val: HTMLElement) => {
        const htmlElem = val;
        settings = $.extend(settings, getDataAttrSettings(htmlElem));
        return sliders.push(new Presenter(htmlElem, settings));
      });
    }

    if (typeof receivedParameter === 'string') {
      const [option, setting, value, oneOfTwoValues] = args;
      let returnValue: any;
      this.each((i: number, val: object) => {
        const htmlSlider = val;
        sliders.forEach(presenter => {
          if (presenter.view.sliderHTML === htmlSlider) {
            returnValue = PresenterAPI.enterPoint({
              oneOfTwoValues,
              value,
              option,
              setting,
              slider: presenter,
            });
          }
        });
      });
      return returnValue;
    }
  };
}(jQuery));
