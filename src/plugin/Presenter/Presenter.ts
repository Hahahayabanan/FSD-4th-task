import { MainView } from '../View/MainView/MainView';
import { Model } from '../Model/Model';
import ISliderSettings from '../Model/ISliderSettings';

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

  private updateViewPointer(data: {
    from: number;
    to: number;
    fromInPercents: number;
    toInPercents: number;
  }) {
    const {
      from, to, fromInPercents, toInPercents
    } = data;

    this.view.setPointerPosition({
      attributes: this.getSettings(),
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

    this.view.update({
      isRange,
      hasTip,
      hasLine,
      isVertical,
      attributes: this.getSettings(),
    });
  }

  private updateModelValue(data: {
    position: number,
    pointerThatChanged: string,
  }) {
    const { position, pointerThatChanged } = data;
    this.model.applyValue(position, pointerThatChanged);
  }
}

export { Presenter };
export default Presenter;
