import '../../../slider';
import ISliderSettings from '../../../Model/ISliderSettings';

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
    this.$slider.HYBSlider(settings);
  }

  getElement() {
    return this.$slider;
  }

  getProperties() {
    return this.$slider.HYBSlider('getSettings').get(0) as ISliderSettings;
  }

  setPropertyValue(setting: string, value: string | number | boolean) {
    const settings: ISliderSettings = {};
    settings[setting] = value;
    this.$slider.HYBSlider('setSettings', settings);
  }
}

export default Slider;
