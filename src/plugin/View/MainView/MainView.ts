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

  public lastPointerMoved: PointerView = this.firstPointer;

  public observer: EventObserver = new EventObserver();

  constructor(options: {
    rootElem: HTMLElement;
    isVertical: boolean;
    hasTip: boolean;
    isRange: boolean;
    hasLine: boolean;
  }) {
    const {
      isVertical, hasTip, isRange, hasLine,
    } = options;

    this.createTemplate(options);
    this.addObservers();
    this.update({
      isRange, isVertical, hasLine, hasTip,
    });
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
      first, second, firstTipValue, secondTipValue, attributes
    } = data;
    this.firstPointer.applyPointerPosition(first);
    this.firstPointer.updateTipValue(firstTipValue);

    if (this.secondPointer) {
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
    if (isVertical !== undefined) {
      this.toggleOrientationClass(isVertical);
      this.path.updateLine();
    }
    if (hasTip !== undefined) {
      this.toggleTip(hasTip);
    }
    if (hasLine !== undefined) {
      this.path.toggleLine(hasLine);
      this.path.updateLine();
    }
    if (isRange !== undefined) {
      this.toggleRange(isRange);
      this.path.setPointers(this.firstPointer, this.secondPointer);
      this.path.updateLine();
    }

    this.setDataAttributes(attributes);
  }

  private addObservers() {
    this.firstPointer.observer.subscribe(this.dispatchPointerPosition);
    if (this.secondPointer) this.secondPointer.observer.subscribe(this.dispatchPointerPosition);
  }

  private createTemplate(options: {
    rootElem: HTMLElement;
    isVertical: boolean;
    hasTip: boolean;
    isRange: boolean;
    hasLine: boolean;
  }) {
    const { rootElem } = options;

    this.sliderElement = rootElem;
    this.sliderElement.classList.add(styleClasses.SLIDER);
    this.createPath();
    this.createPointers();
    this.path.setPointers(this.firstPointer, this.secondPointer);
    this.sliderElement.append(this.path.pathElement);
  }

  private toggleTip(hasTip: boolean) {
    if (hasTip) {
      if (!this.firstPointer.tip) {
        this.firstPointer.createTip();
        this.sliderElement.classList.add(styleClasses.SLIDER_WITH_TIP);
        if (this.secondPointer) this.secondPointer.createTip();
      }
    } else {
      this.sliderElement.classList.remove(styleClasses.SLIDER_WITH_TIP);
      this.firstPointer.pointerElement.innerHTML = '';
      this.firstPointer.tip = null;
      if (this.secondPointer) {
        this.secondPointer.pointerElement.innerHTML = '';
        this.firstPointer.tip = null;
      }
    }
  }

  private toggleRange(isRange: boolean) {
    if (isRange) {
      if (!this.secondPointer) {
        this.secondPointer = new PointerView(this.path.pathElement);
        if (this.firstPointer.tip) this.secondPointer.createTip();
        this.secondPointer.observer.subscribe(this.dispatchPointerPosition);
      }
    } else if (this.secondPointer) {
      this.secondPointer.pointerElement.remove();
      this.secondPointer = null;
    }
  }

  private createPath() {
    this.path = new PathView();
  }

  private createPointers() {
    this.firstPointer = new PointerView(this.path.pathElement);
    if (this.secondPointer) {
      this.secondPointer = new PointerView(this.path.pathElement);
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
      default: return null;
    }
  }

  private toggleOrientationClass(isVertical: boolean) {
    if (isVertical) {
      this.sliderElement.classList.add(styleClasses.SLIDER_VERTICAL);
    } else {
      this.sliderElement.classList.remove(styleClasses.SLIDER_VERTICAL);
    }
    this.path.toggleOrientationClass(isVertical);
  }

  private updateZIndex(pointer: PointerView) {
    const wasPointerMoved = pointer.getClassList().indexOf(styleClasses.POINTER_SELECTED);
    if (wasPointerMoved === -1 && this.secondPointer) {
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
