import { isArray } from 'util';
import { MainView } from '../View/MainView';
import { Model } from '../Model/Model';
import {
  ISliderSettings, PointerPositionData, Attribute, CalculatedSettings,
} from '../helpers/interfaces';
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
      hasLine: this.model.getSetting('hasLine'),
      isRange: this.model.getSetting('isRange'),
    });

    this.init();
  }

  init() {
    this.view.observer.subscribe(this.updateModelWithNewPointerPosition.bind(this));
    this.model.settingsObserver.subscribe(this.updateViewWithNewSettings.bind(this));
    this.model.valuesObserver.subscribe(this.updateViewWithNewPointerPosition.bind(this));

    this.initStartValues();
  }

  initStartValues() {
    this.model.setCalculatedStartValues();
    this.view.setDataAttributes(this.getDataAttributes());
  }

  updateViewWithNewPointerPosition(data: CalculatedSettings) {
    const { newValues } = data;
    const newValuesInPercents = isArray(newValues)
      ? newValues.map((val: number) => this.model.calculateFromValueToPercents(val))
      : this.model.calculateFromValueToPercents(newValues);
    this.view.setPointerPosition(newValuesInPercents, newValues, this.getValueDataAttributes());
  }

  updateViewWithNewSettings(data: ISliderSettings) {
    const { isRange, hasTip, hasLine } = data;
    const dataAttributes: Attribute[] = this.getDataAttributes();
    dataAttributes.push(this.getValueDataAttributes());

    this.view.update({
      isRange,
      hasTip,
      hasLine,
      isVertical: this.checkOrientationIsVertical(),
      attributes: dataAttributes,
    });
  }

  updateModelWithNewPointerPosition(data: PointerPositionData) {
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

  getDataAttributes(): Attribute[] {
    return [
      { name: 'min', value: `${this.model.getSetting('min')}` },
      { name: 'max', value: `${this.model.getSetting('max')}` },
      { name: 'hasTip', value: `${this.model.getSetting('hasTip')}` },
      { name: 'hasLine', value: `${this.model.getSetting('hasLine')}` },
      { name: 'orientation', value: `${this.model.getSetting('orientation')}` },
      { name: 'isRange', value: `${this.model.getSetting('isRange')}` },
      { name: 'step', value: `${this.model.getSetting('step')}` },
    ];
  }

  getValueDataAttributes(): Attribute {
    if (this.model.getSetting('isRange')) {
      return { name: 'values', value: `[${this.model.getSetting('values')}]` };
    }
    return { name: 'value', value: `${this.model.getSetting('value')}` };
  }
}

export { Presenter };
export default Presenter;
