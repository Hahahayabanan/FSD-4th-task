import { isArray } from 'util';
import { MainView } from '../View/MainView';
import { Model } from '../Model/Model';
import { ISliderSettings } from '../Model/ISliderSettings';
import { EventObserver } from '../EventObserver/EventObserver';

class Presenter {
  public model: Model;

  public view: any;

  public observer: EventObserver = new EventObserver();

  constructor(rootElement: HTMLElement, options: ISliderSettings) {
    this.model = new Model(options);
    this.view = new MainView({
      rootElem: rootElement,
      isVertical: this.checkOrientationIsVertical(),
      hasTip: this.model.getSetting('hasTip'),
      isRange: this.model.getSetting('isRange'),
    });

    this.init();
  }

  init() {
    this.view.observer.subscribe(this.updateModelWithNewPointerPosition.bind(this));
    this.model.settingsObserver.subscribe(this.updateViewWithNewSettings.bind(this));
    this.model.valuesObserver.subscribe(this.updateViewWithNewPointerPosition.bind(this));

    this.initStartValue();
  }

  initStartValue() {
    this.model.setCalculatedStartValues();

    this.updateDataAttributes();
    this.updateValueDataAttributes();
  }

  updateViewWithNewPointerPosition(data: any) {
    const { newValues } = data;
    const newValuesInPercents = isArray(newValues)
      ? newValues.map((val: number) => this.model.calculateFromValueToPercents(val))
      : this.model.calculateFromValueToPercents(newValues);
    this.view.setPointerPosition(newValuesInPercents);
    this.view.setTipValue(newValues);
    this.updateValueDataAttributes();
  }

  updateViewWithNewSettings(data: any) {
    const { isRange, hasTip } = data;
    this.view.update(isRange, this.checkOrientationIsVertical(), hasTip);
    this.updateDataAttributes();
    this.updateValueDataAttributes();
  }

  updateModelWithNewPointerPosition(data: any) {
    this.model.setCalculatedValue(data.newCurPos, data.updateObject);
  }

  checkOrientationIsVertical(): boolean {
    const ordersModule = {
      ORIENTATION: 'vertical',
    };
    if (this.model.getSetting('orientation') === ordersModule.ORIENTATION) {
      return true;
    }
    return false;
  }

  updateDataAttributes() {
    this.view.setDataAttributes([
      { name: 'min', value: `${this.model.getSetting('min')}` },
      { name: 'max', value: `${this.model.getSetting('max')}` },
      { name: 'hasTip', value: `${this.model.getSetting('hasTip')}` },
      { name: 'orientation', value: `${this.model.getSetting('orientation')}` },
      { name: 'isRange', value: `${this.model.getSetting('isRange')}` },
      { name: 'step', value: `${this.model.getSetting('step')}` },
    ]);
  }

  updateValueDataAttributes() {
    if (this.model.getSetting('isRange')) {
      this.view.setDataAttribute('values', `[${this.model.getSetting('values')}]`);
      this.view.removeDataAttribute('value');
    } else {
      this.view.setDataAttribute('value', `${this.model.getSetting('value')}`);
      this.view.removeDataAttribute('values');
    }
  }
}

export { Presenter };
export default Presenter;
