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

function getDataAttrSettings(htmlElem: HTMLElement): ISliderSettings {
  const {
    min, max, step, value, values = '', isRange, hasTip, hasLine = 'true', orientation,
  } = htmlElem.dataset;

  const valuesArray = values.match(/(\d+)/g);
  let valuesAsNumber: number[];
  if (valuesArray) valuesAsNumber = valuesArray.map((val: string) => parseFloat(val));

  return {
    orientation,
    min: isNaN(parseFloat(min)) ? null : parseFloat(min),
    max: isNaN(parseFloat(max)) ? null : parseFloat(max),
    step: isNaN(parseFloat(step)) ? null : parseFloat(step),
    value: isNaN(parseFloat(value)) ? null : parseFloat(value),
    values: valuesAsNumber,
    isRange: isRange === 'true',
    hasTip: hasTip === 'true',
    hasLine: hasLine === 'true',
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
