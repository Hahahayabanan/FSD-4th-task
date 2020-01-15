import { ISliderSettings } from './Model/ISliderSettings';
import { Presenter } from './Presenter/Presenter';

declare global {
  interface Window {
    $: JQuery;
  }
  interface JQuery {
    HYBSlider: (
      options?: ISliderSettings | 'setSettings' | 'getSettings' | 'callbackOnUpdate',
      otherOptions?: ISliderSettings | Function,
    ) => JQuery<Element> | JQuery<Object>;
  }
}

(function initialization($: JQueryStatic) {
  // eslint-disable-next-line no-param-reassign
  $.fn.HYBSlider = function getStart(options?, otherOptions?) {
    return this.map((i: number, htmlElem: HTMLElement) => {
      if (typeof options === 'object' || !options) {
        const data: ISliderSettings = $(htmlElem).data();
        const settings: ISliderSettings = $.extend(data, options);
        const presenter: Presenter = new Presenter(htmlElem, settings);
        this.data('presenter', presenter);
        return this;
      }

      const presenter: Presenter = this.data('presenter');

      if (typeof options === 'string' && presenter) {
        if (presenter[options]) {
          return presenter[options].call(presenter, otherOptions);
        }
        $.error(`Method ${options} doesn't found`);
      } else {
        $.error('To call methods the slider should be initialized');
      }
      return null;
    });
  };
}(jQuery));
