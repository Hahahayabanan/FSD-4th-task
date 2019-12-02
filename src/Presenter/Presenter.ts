import { MainView } from '../View/MainView';
import { Model } from '../Model/Model';
import {
  ISliderSettings, PointerPositionData, Attribute, CalculatedSettings,
} from '../helpers/interfaces';

class Presenter {
  public model: Model;

  public view: MainView;

  constructor(rootElement: HTMLElement, options: ISliderSettings) {
    this.model = new Model(options);
    this.view = new MainView({
      rootElem: rootElement,
      isVertical: this.checkOrientationIsVertical(),
      hasTip: this.model.getSetting('hasTip'),
      hasLine: this.model.getSetting('hasLine'),
      isRange: this.model.getSetting('isRange'),
    });

    this.addObservers();
    this.applyStartValues();
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

  getValueDataAttributes(): Attribute[] {
    return [
      { name: 'from', value: `${this.model.getSetting('from')}` },
      { name: 'to', value: `${this.model.getSetting('to')}` },
    ];
  }

  getSetting(setting: string) {
    return this.model.getSetting(setting);
  }

  update(settings: ISliderSettings) {
    this.model.setSettings(settings);
  }

  updateViewSettings(data: ISliderSettings) {
    const { isRange, hasTip, hasLine } = data;
    const dataAttributes: Attribute[] = this.getDataAttributes();
    dataAttributes.concat(this.getValueDataAttributes());

    this.view.update({
      isRange,
      hasTip,
      hasLine,
      isVertical: this.checkOrientationIsVertical(),
      attributes: dataAttributes,
    });
  }

  private addObservers() {
    this.view.observer.subscribe(this.updateModelValue.bind(this));
    this.model.settingsObserver.subscribe(this.updateViewSettings.bind(this));
    this.model.valuesObserver.subscribe(this.updateViewPointer.bind(this));
  }

  private applyStartValues() {
    this.model.applyStartValues();
    this.view.setDataAttributes(this.getDataAttributes());
  }

  private updateViewPointer(data: CalculatedSettings) {
    const {
      newFrom,
      newTo,
      newFromInPercents,
      newToInPercents,
    } = data;
    const newAttribute = this.getValueDataAttributes();

    this.view.setPointerPosition({
      newAttribute,
      newFirst: newFromInPercents,
      newSecond: newToInPercents,
      newFirstTipValue: newFrom,
      newSecondTipValue: newTo,
    });
  }

  private updateModelValue(data: PointerPositionData) {
    const { newCurPos, pointerThatChanged } = data;
    this.model.applyValue(newCurPos, pointerThatChanged);
  }
}

export { Presenter };
export default Presenter;
