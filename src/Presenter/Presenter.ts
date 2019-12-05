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
    const {
      hasLine, hasTip, isRange, isVertical,
    } = this.model.getSettings();
    this.view = new MainView({
      isVertical,
      hasTip,
      hasLine,
      isRange,
      rootElem: rootElement,
    });

    this.addObservers();
    this.applyStartValues();
    this.getSettings = this.getSettings.bind(this);
    this.setSettings = this.setSettings.bind(this);
    this.updateModelValue = this.updateModelValue.bind(this);
    this.updateViewSettings = this.updateViewSettings.bind(this);
    this.updateViewPointer = this.updateViewPointer.bind(this);
  }

  getDataAttributes(): Attribute[] {
    const {
      min, max, step, hasLine, hasTip, isRange, isVertical,
    } = this.model.getSettings();
    return [
      { name: 'min', value: `${min}` },
      { name: 'max', value: `${max}` },
      { name: 'hasTip', value: `${hasTip}` },
      { name: 'hasLine', value: `${hasLine}` },
      { name: 'isVertical', value: `${isVertical}` },
      { name: 'isRange', value: `${isRange}` },
      { name: 'step', value: `${step}` },
    ];
  }

  getValueDataAttributes(): Attribute[] {
    const { from, to } = this.model.getSettings();
    return [
      { name: 'from', value: `${from}` },
      { name: 'to', value: `${to}` },
    ];
  }

  getSettings() {
    return this.model.getSettings();
  }

  setSettings(options: ISliderSettings) {
    this.model.setSettings(options);
  }

  private addObservers() {
    this.view.observer.subscribe(this.updateModelValue.bind(this));
    this.model.settingsObserver.subscribe(this.updateViewSettings.bind(this));
    this.model.valuesObserver.subscribe(this.updateViewPointer.bind(this));
  }

  private applyStartValues() {
    this.model.applyStartValues();
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

  private updateViewSettings(data: ISliderSettings) {
    const {
      isRange, hasTip, hasLine, isVertical,
    } = data;
    const dataAttributes: Attribute[] = this.getDataAttributes();
    dataAttributes.concat(this.getValueDataAttributes());

    this.view.update({
      isRange,
      hasTip,
      hasLine,
      isVertical,
      attributes: dataAttributes,
    });
  }

  private updateModelValue(data: PointerPositionData) {
    const { newCurPos, pointerThatChanged } = data;
    this.model.applyValue(newCurPos, pointerThatChanged);
  }
}

export { Presenter };
export default Presenter;
