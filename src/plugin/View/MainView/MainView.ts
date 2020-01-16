import bind from 'bind-decorator';
import { PointerView } from '../PointerView/PointerView';
import { PathView } from '../PathView/PathView';
import { EventObserver } from '../../EventObserver/EventObserver';
import { Attributes } from '../../helpers/interfaces';
import styleClasses from '../styleClasses';

class MainView {
  public sliderElement: HTMLElement;

  public path: PathView;

  public fromValuePointer: PointerView = null;

  public toValuePointer: PointerView = null;

  public lastPointerMoved: PointerView = this.fromValuePointer;

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
    fromValue?: number,
    toValue?: number,
    fromValueTipValue?: number,
    toValueTipValue?: number,
    attributes?: Attributes,
  }) {
    const {
      fromValue, toValue, fromValueTipValue, toValueTipValue, attributes
    } = data;
    this.fromValuePointer.applyPosition(fromValue);
    this.fromValuePointer.updateTipValue(fromValueTipValue);

    if (this.toValuePointer) {
      this.toValuePointer.applyPosition(toValue);
      this.toValuePointer.updateTipValue(toValueTipValue);
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
      this.path.setPointers(this.fromValuePointer, this.toValuePointer);
      this.path.updateLine();
    }

    this.setDataAttributes(attributes);
  }

  private addObservers() {
    this.fromValuePointer.observer.subscribe(this.dispatchPointerPosition);
    if (this.toValuePointer) this.toValuePointer.observer.subscribe(this.dispatchPointerPosition);
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
    this.path.setPointers(this.fromValuePointer, this.toValuePointer);
    this.sliderElement.append(this.path.pathElement);
  }

  private toggleTip(hasTip: boolean) {
    if (hasTip) {
      if (!this.fromValuePointer.tip) {
        this.fromValuePointer.createTip();
        this.sliderElement.classList.add(styleClasses.SLIDER_WITH_TIP);
        if (this.toValuePointer) this.toValuePointer.createTip();
      }
    } else {
      this.sliderElement.classList.remove(styleClasses.SLIDER_WITH_TIP);
      this.fromValuePointer.pointerElement.innerHTML = '';
      this.fromValuePointer.tip = null;
      if (this.toValuePointer) {
        this.toValuePointer.pointerElement.innerHTML = '';
        this.fromValuePointer.tip = null;
      }
    }
  }

  private toggleRange(isRange: boolean) {
    if (isRange) {
      if (!this.toValuePointer) {
        this.toValuePointer = new PointerView(this.path.pathElement);
        if (this.fromValuePointer.tip) this.toValuePointer.createTip();
        this.toValuePointer.observer.subscribe(this.dispatchPointerPosition);
      }
    } else if (this.toValuePointer) {
      this.toValuePointer.pointerElement.remove();
      this.toValuePointer = null;
    }
  }

  private createPath() {
    this.path = new PathView();
  }

  private createPointers() {
    this.fromValuePointer = new PointerView(this.path.pathElement);
    if (this.toValuePointer) {
      this.toValuePointer = new PointerView(this.path.pathElement);
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
      case this.fromValuePointer: return 'first';
      case this.toValuePointer: return 'second';
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
    const wasPointerMoved = pointer.getClassList().indexOf(styleClasses.POINTER_SELECTED) !== -1;
    if (!wasPointerMoved && this.toValuePointer) {
      switch (pointer) {
        case this.fromValuePointer:
          this.toValuePointer.removeClass(styleClasses.POINTER_SELECTED);
          break;
        case this.toValuePointer:
          this.fromValuePointer.removeClass(styleClasses.POINTER_SELECTED);
          break;
        default:
      }
      pointer.addClass(styleClasses.POINTER_SELECTED);
    }
  }
}

export { MainView };
export default MainView;
