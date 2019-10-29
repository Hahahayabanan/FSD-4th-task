/* eslint-disable no-param-reassign */
import { ISliderSettings } from './Model/ISliderSettings';
import { Presenter } from './Presenter/Presenter';
import { PresenterAPI } from './Presenter/PresenterAPI';

declare global {
  interface Window {
    $: JQuery;
  }
  interface JQuery {
    slider: (
      ...args: any
    ) => JQuery<Element> | string | number | number[] | boolean | undefined;
  }
}

function checkDataset(dataset: string): number | boolean | undefined {
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
  return undefined;
}

function getDataAttrSettings(htmlElem: HTMLElement): ISliderSettings {
  let values: number[] | RegExpMatchArray;
  if (htmlElem.dataset.values) {
    values = htmlElem.dataset.values.match(/(\d+)/g);
    values = values.map((val: string) => {
      return parseInt(val, 10);
    });
  }
  return {
    minVal: checkDataset(htmlElem.dataset.minVal) as number,
    maxVal: checkDataset(htmlElem.dataset.maxVal) as number,
    stepVal: checkDataset(htmlElem.dataset.stepVal) as number,
    range: checkDataset(htmlElem.dataset.range) as boolean,
    orientation: htmlElem.dataset.orientation,
    values: values as number[],
    value: checkDataset(htmlElem.dataset.value) as number,
    followerPoint: checkDataset(htmlElem.dataset.followerPoint) as boolean,
  };
}

(function initialization($: JQueryStatic) {
  const sliders: Presenter[] = [];

  $.fn.slider = function getStart(
    ...args: any
  ): JQuery<Element> | string | number | number[] | boolean | undefined {
    if (typeof args[0] === 'object' || args[0] === undefined) {
      let settings: ISliderSettings = args[0];
      return this.each((i: number, val: HTMLElement) => {
        const htmlElem = val;
        settings = $.extend(settings, getDataAttrSettings(htmlElem));
        return sliders.push(new Presenter(htmlElem, settings));
      });
    }

    if (typeof args[0] === 'string') {
      const [option, setting, value, valuesOneOfTwoVals] = args;

      let returnValue: any;
      this.each((i: number, val: object) => {
        const htmlElem = val;
        sliders.forEach(htmlItem => {
          if (htmlItem.view.slider === htmlElem) {
            returnValue = PresenterAPI.enterPoint({
              valuesOneOfTwoVals,
              value,
              option,
              setting,
              slider: htmlItem,
            });
          }
        });
      });
      return returnValue;
    }
  };
})(jQuery);
