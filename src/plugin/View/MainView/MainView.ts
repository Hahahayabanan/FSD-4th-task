import bind from 'bind-decorator';
import { PointerView } from '../PointerView/PointerView';
import { PathView } from '../PathView/PathView';
import { EventObserver } from '../../EventObserver/EventObserver';
import { Attributes } from '../../helpers/interfaces';
import styleClasses from '../styleClasses';

class MainView {
  public sliderElement: HTMLElement;

  public path: PathView;

  public firstPointer: PointerView = null;

  public secondPointer: PointerView = null;

  public isVertical: boolean = false;

  public hasTip: boolean = false;

  public hasLine: boolean = true;

  public isRange: boolean = false;

  public lastPointerMoved: PointerView = null;

  public observer: EventObserver = new EventObserver();

  constructor(options: {
    rootElem: HTMLElement;
    isVertical?: boolean;
    hasTip?: boolean;
    isRange?: boolean;
    hasLine?: boolean;
  }) {
    const {
      rootElem, isVertical, hasTip, isRange, hasLine,
    } = options;
    this.sliderElement = rootElem;
    this.isVertical = isVertical;
    this.hasTip = hasTip;
    this.hasLine = hasLine;
    this.isRange = isRange;
    this.lastPointerMoved = this.firstPointer;

    this.createTemplate();
    this.addObservers();
  }

  createTip() {
    if (this.hasTip) {
      this.firstPointer.createTip();
      this.sliderElement.classList.add(styleClasses.SLIDER_WITH_TIP);
      if (this.isRange) this.secondPointer.createTip();
    }
  }

  @bind
  setPointerPosition(data: {
    first?: number,
    second?: number,
    firstTipValue?: number,
    secondTipValue?: number,
    attributes?: Attributes,
  }) {
    const {
      first, second, firstTipValue, secondTipValue, attributes,
    } = data;
    this.firstPointer.applyPointerPosition(first);
    this.firstPointer.updateTipValue(firstTipValue);

    if (this.isRange) {
      this.secondPointer.applyPointerPosition(second);
      this.secondPointer.updateTipValue(secondTipValue);
    }
    this.path.updateLine();

    this.setDataAttributes(attributes);
  }

  setDataAttributes(attributes: Attributes = {}) {
    Object.keys(attributes).forEach(key => {
      this.sliderElement.dataset[key] = `${attributes[key]}`;
    });
  }

  update(data: {
    isRange?: boolean,
    isVertical?: boolean,
    hasTip?: boolean,
    hasLine?: boolean,
    attributes?: Attributes
  }) {
    const {
      isVertical, hasTip, hasLine, isRange, attributes,
    } = data;
    if (isVertical !== undefined) this.isVertical = isVertical;
    if (hasTip !== undefined) this.hasTip = hasTip;
    if (hasLine !== undefined) this.hasLine = hasLine;
    if (isRange !== undefined) this.isRange = isRange;

    this.getClear();
    this.createTemplate();
    this.addObservers();
    this.setDataAttributes(attributes);
  }

  getClear() {
    this.sliderElement.classList.remove(
      styleClasses.SLIDER,
      styleClasses.SLIDER_VERTICAL,
      styleClasses.SLIDER_WITH_TIP,
    );
    this.firstPointer = null;
    this.secondPointer = null;
    this.path = null;
    this.sliderElement.innerHTML = '';
  }

  private addObservers() {
    this.firstPointer.observer.subscribe(this.dispatchPointerPosition);
    if (this.isRange) this.secondPointer.observer.subscribe(this.dispatchPointerPosition);
  }

  private createTemplate() {
    this.sliderElement.classList.add(styleClasses.SLIDER);
    this.createPath();
    this.createPointers();
    this.path.setPointers(this.firstPointer, this.secondPointer);
    this.setOrientationClass();
    this.createTip();
    this.sliderElement.append(this.path.pathElement);
  }

  private createPath() {
    this.path = new PathView({
      isVertical: this.isVertical,
      hasLine: this.hasLine,
    });
  }

  private createPointers() {
    this.firstPointer = new PointerView(this.path.pathElement, this.isVertical);
    if (this.isRange) {
      this.secondPointer = new PointerView(this.path.pathElement, this.isVertical);
    }
  }

  @bind
  private dispatchPointerPosition(data: { position: number, pointerToUpdate: PointerView }) {
    const { position, pointerToUpdate } = data;
    this.updateZIndex(pointerToUpdate);
    this.observer.broadcast({
      position,
      pointerThatChanged: this.checkPointerNumber(pointerToUpdate),
    });
  }

  private checkPointerNumber(pointer: PointerView) {
    switch (pointer) {
      case this.firstPointer: return 'first';
      case this.secondPointer: return 'second';
      default:
    }
  }

  private setOrientationClass() {
    if (this.isVertical) {
      this.sliderElement.classList.add(styleClasses.SLIDER_VERTICAL);
    } else {
      this.sliderElement.classList.remove(styleClasses.SLIDER_VERTICAL);
    }
  }

  private updateZIndex(pointer: PointerView) {
    const wasPointerMoved = pointer.getClassList().indexOf(styleClasses.POINTER_SELECTED);
    if (wasPointerMoved === -1 && this.isRange) {
      switch (pointer) {
        case this.firstPointer:
          this.secondPointer.removeClass(styleClasses.POINTER_SELECTED);
          break;
        case this.secondPointer:
          this.firstPointer.removeClass(styleClasses.POINTER_SELECTED);
          break;
        default:
      }
      pointer.addClass(styleClasses.POINTER_SELECTED);
    }
  }
}

export { MainView };
export default MainView;
