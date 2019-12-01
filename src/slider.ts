import { ISliderSettings } from './helpers/interfaces';
import { Presenter } from './Presenter/Presenter';

declare global {
  interface Window {
    $: JQuery;
  }
  interface JQuery {
    HYBSlider: (
      options?: ISliderSettings,
    ) => JQuery<Element> | JQuery<Object>;
    HYBUpdate: (
      options: ISliderSettings,
    ) => JQuery<Element>;
    HYBGetOption: (
      option: string,
    ) => JQuery<Object>;
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
  $.fn.HYBSlider = function getStart(options?) {
    let settings: ISliderSettings = options;
    return this.each((i: number, htmlElem: HTMLElement) => {
      settings = $.extend(getDataAttrSettings(htmlElem), settings);
      const presenter = new Presenter(htmlElem, settings);
      this.data('presenter', presenter);
      return this;
    });
  };
  $.fn.HYBUpdate = function update(options) {
    const settings: ISliderSettings = options;
    return this.each((i: number, htmlElem: HTMLElement) => {
      const presenter = this.data('presenter');
      if (presenter) {
        presenter.update(settings);
      } else {
        const newPresenter = new Presenter(htmlElem, settings);
        this.data('presenter', newPresenter);
      }
      return this;
    });
  };
  $.fn.HYBGetOption = function getOption(option) {
    const setting: string = option;
    return this.map(() => {
      const presenter = this.data('presenter');
      if (presenter) {
        return presenter.getSetting(setting);
      }
      console.error('To get setting Slider should be initialized');
    });
  };
}(jQuery));
