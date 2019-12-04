import { ISliderSettings } from './helpers/interfaces';
import { Presenter } from './Presenter/Presenter';

declare global {
  interface Window {
    $: JQuery;
  }
  interface JQuery {
    HYBSlider: (
      method?: ISliderSettings | string,
      options?: ISliderSettings | string,
    ) => JQuery<Element> | JQuery<Object>;
  }
}

function getDataAttrSettings(htmlElem: HTMLElement): ISliderSettings {
  const {
    min, max, step, from, to, isRange, hasTip, hasLine = 'true', orientation,
  } = htmlElem.dataset;

  return {
    orientation,
    min: isNaN(parseFloat(min)) ? null : parseFloat(min),
    max: isNaN(parseFloat(max)) ? null : parseFloat(max),
    step: isNaN(parseFloat(step)) ? null : parseFloat(step),
    from: isNaN(parseFloat(from)) ? null : parseFloat(from),
    to: isNaN(parseFloat(to)) ? null : parseFloat(to),
    isRange: isRange === 'true',
    hasTip: hasTip === 'true',
    hasLine: hasLine === 'true',
  };
}

(function initialization($: JQueryStatic) {
  $.fn.HYBSlider = function getStart(options?, otherOptions?) {
    return this.map((i: number, htmlElem: HTMLElement) => {
      if (typeof options === 'object' || !options) {
        const settings: ISliderSettings = $.extend(getDataAttrSettings(htmlElem), options);
        const presenter: Presenter = new Presenter(htmlElem, settings);
        this.data('presenter', presenter);
        return this;
      }

      const presenter: Presenter = this.data('presenter');

      if (typeof options === 'string' && presenter) {
        if (presenter[options]) {
          return presenter[options].call(presenter, otherOptions);
        }
        console.error(`Method ${options} doesn't found`);
      } else {
        console.error('To get setting Slider should be initialized');
      }

      console.error('Wrong parameters');
    });
  };
}(jQuery));
