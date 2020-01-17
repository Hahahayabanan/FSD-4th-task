import bind from 'bind-decorator';
import { MainView } from '../View/MainView/MainView';
import { Model } from '../Model/Model';
import { ISliderSettings } from '../Model/ISliderSettings';

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

    this.addObservers();
    this.setSettings({});
  }

  @bind
  getSettings() {
    return this.model.getSettings();
  }

  @bind
  setSettings(options: ISliderSettings) {
    this.model.applySettings(options);
  }

  @bind
  callbackOnUpdate(fn: Function) {
    this.model.settingsObserver.subscribe(() => fn(this.model.getSettings()));
  }

  private addObservers() {
    this.view.observer.subscribe(this.updateModelValue);
    this.view.path.observer.subscribe(this.updateModelValue);
    this.model.settingsObserver.subscribe(this.updateViewSettings);
    this.model.valuesObserver.subscribe(this.updateViewPointer);
  }

  @bind
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
      fromValue: fromInPercents,
      toValue: toInPercents,
      fromValueTipValue: from,
      toValueTipValue: to,
    });
  }

  @bind
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

  @bind
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
