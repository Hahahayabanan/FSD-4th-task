/* eslint-disable no-param-reassign */
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

function getOrSetSingleSliderOption(options: {
  slider: Presenter;
  setting: string;
  value?: string | number | number[] | boolean;
  numberOfOneOfTheValues?: number;
}) {
  const {
    slider, setting, value, numberOfOneOfTheValues
  } = options;

  let currentReturn: string | number | number[] | boolean;
  if (value !== undefined && value !== null) {
    if (setting === 'values') {
      const isValueNumber = typeof value === 'number';
      const isOneOfValuesUndefined = numberOfOneOfTheValues === undefined;

      if (isOneOfValuesUndefined && !isValueNumber) {
        slider.model.setSetting('values', value);
      }
      if (isOneOfValuesUndefined && isValueNumber) {
        currentReturn = slider.model.getSetting('values')[value];
      }
      if (!isOneOfValuesUndefined && typeof value === 'number') {
        const currentValueNumber: number = value;
        slider.model.setSetting('values', numberOfOneOfTheValues, currentValueNumber);
      }
    } else {
      slider.model.setSetting(setting, value);
    }
  } else {
    currentReturn = slider.model.getSetting(setting);
  }

  return currentReturn;
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
        settings = $.extend(settings, getDataAttrSettings(htmlElem));
        const presenter = new Presenter(htmlElem, settings);
        this.data('presenter', presenter);
        return this;
      });
    }

    if (isThatSliderOptionCall) {
      let returnValue: string | number | number[] | boolean;
      switch (option) {
        case 'option':
          this.each(() => {
            const presenter = this.data('presenter');
            if (presenter) {
              returnValue = getOrSetSingleSliderOption({
                setting,
                value,
                numberOfOneOfTheValues,
                slider: presenter,
              });
            }
          });
          return returnValue;
        default: console.error('Wrong option');
      }
    }
  };
}(jQuery));
