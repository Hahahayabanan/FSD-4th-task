import Slider from '../slider/slider';
import ControlPanel from '../control-panel/control-panel';
import ISliderSettings from '../../../plugin/Model/ISliderSettings';
import { particlesBackgrounds } from '../particles-background/init';

class Example {
  public $example: JQuery<Object>;

  public parameters: ISliderSettings;

  public propertyForChange: 'speed' | 'color' | 'size';

  public slider: Slider;

  public controlPanel: ControlPanel;

  public particlesColor = {
    hue: 273,
    saturation: 100,
    lightness: 50,
  };

  constructor($container: JQuery<Object>, parameters?: ISliderSettings) {
    this.parameters = parameters;
    this.initExample($container);
    this.init();
    this.initBackgroundChanging();
  }

  initExample($container: JQuery<Object>) {
    this.$example = $container.find('.js-example');
    this.propertyForChange = this.$example.data('propertyForChange');
  }

  init() {
    this.slider = new Slider(this.$example, this.parameters);
    this.controlPanel = new ControlPanel(this.$example, this.slider);

    this.changeParticlesSpeed = this.changeParticlesSpeed.bind(this);
    this.changeParticlesSize = this.changeParticlesSize.bind(this);
    this.changeParticlesColor = this.changeParticlesColor.bind(this);
  }

  initBackgroundChanging() {
    switch (this.propertyForChange) {
      case 'speed':
        this.changeParticlesSpeed();
        this.controlPanel.setFieldObserver('from', this.changeParticlesSpeed);
        break;
      case 'size':
        this.changeParticlesSize();
        this.controlPanel.setFieldObserver('from', this.changeParticlesSize);
        break;
      case 'color':
        this.changeParticlesColor();
        this.controlPanel.setFieldObserver('from', this.changeParticlesColor);
        break;
      default:
    }
  }

  changeParticlesColor() {
    const hue = this.controlPanel.textFields.from.getValue() as number;
    this.particlesColor.hue = hue;
    if (hue >= 0 && hue <= 360) {
      particlesBackgrounds[0].setParticleProperties({
        color: `hsla(${hue}, ${this.particlesColor.saturation}%, ${this.particlesColor.lightness}%, 1)`,
      });
    }
  }

  changeParticlesSpeed() {
    const speed: number = this.controlPanel.textFields.from.getValue() as number;
    particlesBackgrounds[0].setParticleProperties({ velocityModifier: speed });
  }

  changeParticlesSize() {
    const size: number = this.controlPanel.textFields.from.getValue() as number;
    particlesBackgrounds[0].setParticleProperties({ radiusModifier: size });
  }
}

export default Example;
