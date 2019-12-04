import '../../../slider';
import { ISliderSettings } from '../../../helpers/interfaces';

class Slider {
  public $slider: JQuery<Object>;

  constructor($container: JQuery<Object>, parameters: ISliderSettings) {
    this.initSlider($container);
    this.initializeSlider(parameters);
  }

  initSlider($container: JQuery<Object>) {
    this.$slider = $container.find('.js-slider');
  }

  initializeSlider(settings?: {
    isRange?: boolean;
    min?: number;
    max?: number;
    step?: number;
    orientation?: string;
    from?: number;
    to?: number;
    hasTip?: boolean;
    hasLine?: boolean;
  }) {
    this.$slider.HYBSlider('initialize', settings);
  }

  getElement() {
    return this.$slider;
  }

  getPropertyValue(property: string) {
    return this.$slider.HYBSlider('getSetting', property).get(0);
  }

  setPropertyValue(setting: string, value: string | number | boolean) {
    const settings: ISliderSettings = {};
    settings[setting] = value;
    this.$slider.HYBSlider('update', settings);
  }
}

export default Slider;
