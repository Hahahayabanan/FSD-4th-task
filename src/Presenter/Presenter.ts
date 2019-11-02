import { TemplateView } from '../View/TemplateView';
import { Model } from '../Model/Model';
import { ISliderSettings } from '../Model/ISliderSettings';
import { EventObserver } from '../EventObserver/EventObserver';

class Presenter {
  public model: Model;

  public view: any;

  public observer: EventObserver = new EventObserver();

  constructor(rootElement: HTMLElement, options: ISliderSettings) {
    this.model = new Model(options);
    this.view = new TemplateView({
      rootElem: rootElement,
      isVertical: this.checkOrientationIsVertical(),
      hasTip: this.model.getHasTip(),
      isRange: this.model.getRange(),
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
    this.model.calculateStartValues();

    this.updateDataAttributes();
    this.updateValueDataAttributes();
  }

  updateViewWithNewPointerPosition(data: any) {
    const { newValues } = data;
    const newValuesInPercents = this.model.getRange()
      ? newValues.map((val: number) => this.model.calculateFromValueToPercents(val))
      : this.model.calculateFromValueToPercents(newValues);
    this.view.setPointerPosition(newValuesInPercents);
    this.view.setTipValue(newValues);
    this.updateValueDataAttributes();
  }

  updateViewWithNewSettings(data: any) {
    const { range, hasTip } = data;
    this.view.update(range, this.checkOrientationIsVertical(), hasTip);
    this.updateDataAttributes();
    this.updateValueDataAttributes();
  }

  updateModelWithNewPointerPosition(data: any) {
    this.model.calculateValue(data.newCurPos, data.updateObject);
  }

  checkOrientationIsVertical(): boolean {
    const ordersModule = {
      ORIENTATION: 'vertical',
    };
    if (this.model.getOrientation() === ordersModule.ORIENTATION) {
      return true;
    }
    return false;
  }

  updateDataAttributes() {
    this.view.setDataAttributes([
      { name: 'min', value: `${this.model.getMin()}` },
      { name: 'max', value: `${this.model.getMax()}` },
      { name: 'hasTip', value: `${this.model.getHasTip()}` },
      { name: 'orientation', value: `${this.model.getOrientation()}` },
      { name: 'range', value: `${this.model.getRange()}` },
      { name: 'step', value: `${this.model.getStep()}` },
    ]);
  }

  updateValueDataAttributes() {
    if (this.model.getRange()) {
      this.view.setDataAttribute('values', `[${this.model.getValues()}]`);
      this.view.removeDataAttribute('value');
    } else {
      this.view.setDataAttribute('value', `${this.model.getValue()}`);
      this.view.removeDataAttribute('values');
    }
  }
}

export { Presenter };
export default Presenter;
