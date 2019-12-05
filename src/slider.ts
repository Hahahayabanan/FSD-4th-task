import { ISliderSettings } from './helpers/interfaces';
import { Presenter } from './Presenter/Presenter';

declare global {
  interface Window {
    $: JQuery;
  }
  interface JQuery {
    HYBSlider: (
      options?: ISliderSettings | 'setSettings' | 'getSettings',
      otherOptions?: ISliderSettings,
    ) => JQuery<Element> | JQuery<Object>;
  }
}

(function initialization($: JQueryStatic) {
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
        $.error('To call methods slider should be initialized');
      }
    });
  };
}(jQuery));
