import bind from 'bind-decorator';
import styleClasses from '../styleClasses';
import { EventObserver } from '../../EventObserver/EventObserver';
import { createNode, calculateToPercents, calculateToPixels } from '../utilities';
import { PointerView } from '../PointerView/PointerView';

class PathView {
  public lineElement: HTMLElement;

  public pathElement: HTMLElement;

  public fromValuePointer: PointerView = null;

  public toValuePointer: PointerView = null;

  public observer = new EventObserver();

  public isVertical: boolean = false;

  constructor() {
    this.createTemplate();
    this.bindEventListeners();
    this.addObservers();
  }

  createTemplate() {
    this.pathElement = createNode('div', styleClasses.PATH);
    this.fromValuePointer = new PointerView(this.pathElement);
  }

  setPointerPosition(data: {
    fromValue?: number,
    toValue?: number,
    fromValueTipValue?: number,
    toValueTipValue?: number,
  }) {
    const {
      fromValue, toValue, fromValueTipValue, toValueTipValue
    } = data;
    this.fromValuePointer.applyPosition(fromValue);
    this.fromValuePointer.updateTipValue(fromValueTipValue);

    if (this.toValuePointer) {
      this.toValuePointer.applyPosition(toValue);
      this.toValuePointer.updateTipValue(toValueTipValue);
    }

    this.updateLine();
  }

  updateLine() {
    if (this.lineElement) {
      this.lineElement.removeAttribute('style');
      if (this.isVertical) {
        this.lineElement.style.top = this.toValuePointer
          ? `${this.fromValuePointer.currentPosition}%`
          : '0%';
        this.lineElement.style.height = this.toValuePointer
          ? `${this.toValuePointer.currentPosition - this.fromValuePointer.currentPosition}%`
          : `${this.fromValuePointer.currentPosition}%`;
      } else {
        this.lineElement.style.left = this.toValuePointer
          ? `${this.fromValuePointer.currentPosition}%`
          : '0%';
        this.lineElement.style.width = this.toValuePointer
          ? `${this.toValuePointer.currentPosition - this.fromValuePointer.currentPosition}%`
          : `${this.fromValuePointer.currentPosition}%`;
      }
    }
  }

  toggleLine(hasLine: boolean) {
    if (hasLine) {
      if (!this.lineElement) {
        this.lineElement = createNode('div', styleClasses.LINE);
        this.pathElement.prepend(this.lineElement);
        this.updateLine();
      }
    } else if (this.lineElement) {
      this.lineElement.remove();
      this.lineElement = null;
    }
  }

  toggleOrientation(isVertical: boolean) {
    this.isVertical = isVertical;
    this.fromValuePointer.isVertical = isVertical;
    if (this.toValuePointer) this.toValuePointer.isVertical = isVertical;
  }

  toggleRange(isRange: boolean) {
    if (isRange) {
      if (!this.toValuePointer) {
        this.toValuePointer = new PointerView(this.pathElement);
        if (this.fromValuePointer.tip) this.toValuePointer.createTip();
        this.toValuePointer.observer.subscribe(this.dispatchPointerPosition);
      }
    } else if (this.toValuePointer) {
      this.toValuePointer.pointerElement.remove();
      this.toValuePointer = null;
    }
  }

  toggleTip(hasTip: boolean) {
    if (hasTip) {
      if (!this.fromValuePointer.tip) {
        this.fromValuePointer.createTip();
        if (this.toValuePointer) this.toValuePointer.createTip();
      }
    } else {
      this.fromValuePointer.pointerElement.innerHTML = '';
      this.fromValuePointer.tip = null;
      if (this.toValuePointer) {
        this.toValuePointer.pointerElement.innerHTML = '';
        this.fromValuePointer.tip = null;
      }
    }
  }

  private bindEventListeners() {
    this.pathElement.addEventListener('mousedown', this.handlePathElementMouseDown);
  }

  @bind
  private handlePathElementMouseDown(event: MouseEvent) {
    event.preventDefault();
    const currentTarget: HTMLElement = event.target as HTMLElement;

    const isValidClick: boolean = currentTarget.classList.contains(styleClasses.PATH)
      || currentTarget.classList.contains(styleClasses.LINE);

    if (!isValidClick) return;

    const newPosition: number = this.isVertical
      ? event.clientY - this.pathElement.getBoundingClientRect().top
      : event.clientX - this.pathElement.getBoundingClientRect().left;

    const fromValuePointerPositionInPixels = calculateToPixels({
      valueInPercents: this.fromValuePointer.currentPosition,
      pathElement: this.pathElement,
      isVertical: this.isVertical,
    });
    const toValuePointerPositionInPixels = calculateToPixels({
      valueInPercents: this.toValuePointer.currentPosition,
      pathElement: this.pathElement,
      isVertical: this.isVertical,
    });
    const newPositionInPercents = calculateToPercents({
      valueInPixels: newPosition,
      pathElement: this.pathElement,
      isVertical: this.isVertical,
    });

    if (this.toValuePointer) {
      const midpointBetweenPoints = (toValuePointerPositionInPixels
        - fromValuePointerPositionInPixels) / 2 + fromValuePointerPositionInPixels;
      if (newPosition < midpointBetweenPoints) {
        this.dispatchPointerPosition({
          position: newPositionInPercents,
          pointerToUpdate: this.fromValuePointer,
        });
      }
      if (newPosition > midpointBetweenPoints) {
        this.dispatchPointerPosition({
          position: newPositionInPercents,
          pointerToUpdate: this.toValuePointer,
        });
      }
    } else {
      this.dispatchPointerPosition({
        position: newPositionInPercents,
        pointerToUpdate: this.fromValuePointer,
      });
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
      case this.fromValuePointer: return 'fromValue';
      case this.toValuePointer: return 'toValue';
      default: return null;
    }
  }

  private addObservers() {
    this.fromValuePointer.observer.subscribe(this.dispatchPointerPosition);
    if (this.toValuePointer) this.toValuePointer.observer.subscribe(this.dispatchPointerPosition);
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
export { PathView };
export default PathView;
