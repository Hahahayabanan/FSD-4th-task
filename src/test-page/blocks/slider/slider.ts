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
    value?: number;
    values?: Array<number>;
    hasTip?: boolean;
    hasLine?: boolean;
  }) {
    this.$slider.slider(settings);
  }

  getElement() {
    return this.$slider;
  }

  getPropertyValue(property: string, numberOfOneOfTheValues?: number) {
    return this.$slider.slider('option', property, numberOfOneOfTheValues);
  }

  setPropertyValue(
    property: string,
    value: string | boolean | number | number[],
    numberOfOneOfTheValues?: number
  ) {
    this.$slider.slider('option', property, value, numberOfOneOfTheValues);
  }
}

export default Slider;
