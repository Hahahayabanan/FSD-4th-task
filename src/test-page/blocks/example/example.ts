import Slider from '../slider/slider';
import ControlPanel from '../control-panel/control-panel';
import { ISliderSettings } from '../../../plugin/Model/ISliderSettings';

class Example {
  public $example: JQuery<Object>;

  public parameters: ISliderSettings;

  public slider: Slider;

  public controlPanel: ControlPanel;

  constructor($container: JQuery<Object>, parameters?: ISliderSettings) {
    this.parameters = parameters;
    this.initExample($container);
    this.init();
  }

  initExample($container: JQuery<Object>) {
    this.$example = $container.find('.js-example');
  }

  init() {
    this.slider = new Slider(this.$example, this.parameters);
    this.controlPanel = new ControlPanel(this.$example, this.slider);
  }
}

export default Example;
