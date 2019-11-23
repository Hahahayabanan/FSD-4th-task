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
      option?: ISliderSettings | string,
      setting?: string,
      value?: string | number | number[] | boolean,
      numberOfOneOfTheValues?: number,
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
  const number = parseFloat(dataset);
  if (!isNaN(number)) {
    return number;
  }
}

function getDataAttrSettings(htmlElem: HTMLElement): ISliderSettings {
  let values: number[] | RegExpMatchArray;
  if (htmlElem.dataset.values) {
    values = htmlElem.dataset.values.match(/(\d+)/g);
    values = values.map((val: string) => parseFloat(val));
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
  $.fn.slider = function getStart(
    option?: ISliderSettings | string,
    setting?: string,
    value?: string | number | number[] | boolean,
    numberOfOneOfTheValues?: number,
  ): JQuery<Element> | string | number | number[] | boolean {
    const isThatSliderInitializationParameters = typeof option === 'object' || option === undefined;
    const isThatSliderOptionCall = typeof option === 'string';

    if (isThatSliderInitializationParameters) {
      let settings: ISliderSettings = option as ISliderSettings;
      this.each((i: number, val: HTMLElement) => {
        const htmlElem = val;
        settings = $.extend(settings, getDataAttrSettings(htmlElem));
        const presenter = new Presenter(htmlElem, settings);
        this.data('presenter', presenter);
        return this;
      });
    }

    if (isThatSliderOptionCall) {
      let returnValue: string | number | number[] | boolean;
      this.each(() => {
        const presenter = this.data('presenter');
        if (presenter) {
          returnValue = PresenterAPI.enterPoint({
            setting,
            value,
            numberOfOneOfTheValues,
            option: option as string,
            slider: presenter,
          });
        }
      });
      return returnValue;
    }
  };
}(jQuery));
