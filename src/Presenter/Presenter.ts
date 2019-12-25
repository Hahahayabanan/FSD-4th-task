import { MainView } from '../View/MainView';
import { Model } from '../Model/Model';
import ISliderSettings from '../Model/ISliderSettings';
import {
  PointerPositionData, Attribute, CalculatedSettings,
} from '../helpers/interfaces';

class Presenter {
  public model: Model;

  public view: MainView;

  constructor(rootElement: HTMLElement, options: ISliderSettings) {
    const {
      hasLine, hasTip, isRange, isVertical,
    } = options;
    this.view = new MainView({
      isVertical,
      hasTip,
      hasLine,
      isRange,
      rootElem: rootElement,
    });
    this.model = new Model(options);

    this.getSettings = this.getSettings.bind(this);
    this.setSettings = this.setSettings.bind(this);
    this.callbackOnUpdate = this.callbackOnUpdate.bind(this);
    this.updateModelValue = this.updateModelValue.bind(this);
    this.updateViewSettings = this.updateViewSettings.bind(this);
    this.updateViewPointer = this.updateViewPointer.bind(this);

    this.addObservers();
    this.setSettings({});
  }

  getDataAttributes(): Attribute[] {
    const {
      from, to, min, max, step, hasLine, hasTip, isRange, isVertical,
    } = this.model.getSettings();
    return [
      { name: 'min', value: `${min}` },
      { name: 'max', value: `${max}` },
      { name: 'hasTip', value: `${hasTip}` },
      { name: 'hasLine', value: `${hasLine}` },
      { name: 'isVertical', value: `${isVertical}` },
      { name: 'isRange', value: `${isRange}` },
      { name: 'step', value: `${step}` },
      { name: 'from', value: `${from}` },
      { name: 'to', value: `${to}` },
    ];
  }

  getSettings() {
    return this.model.getSettings();
  }

  setSettings(options: ISliderSettings) {
    this.model.applySettings(options);
  }

  callbackOnUpdate(fn: Function) {
    this.model.settingsObserver.subscribe(() => fn(this.model.getSettings()));
  }

  private addObservers() {
    this.view.observer.subscribe(this.updateModelValue);
    this.model.settingsObserver.subscribe(this.updateViewSettings);
    this.model.valuesObserver.subscribe(this.updateViewPointer);
  }

  private updateViewPointer(data: CalculatedSettings) {
    const {
      from,
      to,
      fromInPercents,
      toInPercents,
    } = data;
    const attributes = this.getDataAttributes();

    this.view.setPointerPosition({
      attributes,
      first: fromInPercents,
      second: toInPercents,
      firstTipValue: from,
      secondTipValue: to,
    });
  }

  private updateViewSettings(data: ISliderSettings) {
    const {
      isRange, hasTip, hasLine, isVertical,
    } = data;
    const dataAttributes: Attribute[] = this.getDataAttributes();

    this.view.update({
      isRange,
      hasTip,
      hasLine,
      isVertical,
      attributes: dataAttributes,
    });
  }

  private updateModelValue(data: PointerPositionData) {
    const { position, pointerThatChanged } = data;
    this.model.applyValue(position, pointerThatChanged);
  }
}

export { Presenter };
export default Presenter;
