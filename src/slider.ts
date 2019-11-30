import { ISliderSettings } from './helpers/interfaces';
import { Presenter } from './Presenter/Presenter';

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
  let valuesAsNumbers: number[];
  if (valuesArray) valuesAsNumbers = valuesArray.map((val: string) => parseFloat(val));

  return {
    orientation,
    min: isNaN(parseFloat(min)) ? null : parseFloat(min),
    max: isNaN(parseFloat(max)) ? null : parseFloat(max),
    step: isNaN(parseFloat(step)) ? null : parseFloat(step),
    value: isNaN(parseFloat(value)) ? null : parseFloat(value),
    values: valuesAsNumbers,
    isRange: isRange === 'true',
    hasTip: hasTip === 'true',
    hasLine: hasLine === 'true',
  };
}

(function initialization($: JQueryStatic) {
  $.fn.slider = function getStart(option?, setting?, value?, numberOfOneOfTheValues?,) {
    const isThatSliderInitializationParameters = typeof option === 'object' || option === undefined;
    const isThatSliderOptionCall = typeof option === 'string';

    if (isThatSliderInitializationParameters) {
      let settings: ISliderSettings = option as ISliderSettings;
      return this.each((i: number, val: HTMLElement) => {
        const htmlElem = val;
        settings = $.extend(getDataAttrSettings(htmlElem), settings);
        const presenter = new Presenter(htmlElem, settings);
        this.data('presenter', presenter);
        return this;
      });
    }

    if (isThatSliderOptionCall) {
      switch (option) {
        case 'option':
          return this.map(() => {
            const presenter = this.data('presenter');
            if (presenter) {
              return presenter.getOrSetOption({
                setting,
                value,
                numberOfOneOfTheValues,
              });
            }
          }).toArray();
        default: console.error('Wrong option');
      }
    }
  };
}(jQuery));
