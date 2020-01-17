import bind from 'bind-decorator';
import styleClasses from '../styleClasses';
import { EventObserver } from '../../EventObserver/EventObserver';
import { createNode, calculateToPercents, calculateToPixels } from '../utilities';

class PathView {
  public lineElement: HTMLElement;

  public pathElement: HTMLElement;

  public fromValuePointerPosition: number = 0;

  public toValuePointerPosition: number = null;

  public observer = new EventObserver();

  constructor() {
    this.init();
  }

  init() {
    this.createPath();
    this.bindEventListeners();
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
    if (isVertical) {
      this.pathElement.classList.add(styleClasses.PATH_VERTICAL);
    } else {
      this.pathElement.classList.remove(styleClasses.PATH_VERTICAL);
    }
  }

  toggleLineType(isRange: boolean) {
    if (this.lineElement) {
      if (isRange) {
        this.lineElement.classList.add(styleClasses.LINE_RANGE);
      } else {
        this.lineElement.classList.remove(styleClasses.LINE_RANGE);
      }
    }
  }

  setLineScope(fromValuePointerPosition: number, toValuePointerPosition: number) {
    this.fromValuePointerPosition = fromValuePointerPosition;
    this.toValuePointerPosition = toValuePointerPosition !== undefined
      ? toValuePointerPosition : null;

    this.updateLine();
  }

  updateLine() {
    if (this.lineElement) {
      this.lineElement.removeAttribute('style');
      if (this.checkIsVertical()) {
        this.lineElement.style.top = this.checkIsRange()
          ? `${this.fromValuePointerPosition}%`
          : '0%';
        this.lineElement.style.height = this.checkIsRange()
          ? `${this.toValuePointerPosition - this.fromValuePointerPosition}%`
          : `${this.fromValuePointerPosition}%`;
      } else {
        this.lineElement.style.left = this.checkIsRange()
          ? `${this.fromValuePointerPosition}%`
          : '0%';
        this.lineElement.style.width = this.checkIsRange()
          ? `${this.toValuePointerPosition - this.fromValuePointerPosition}%`
          : `${this.fromValuePointerPosition}%`;
      }
    }
  }

  checkIsVertical() {
    return this.pathElement.classList.contains(styleClasses.PATH_VERTICAL);
  }

  checkIsRange() {
    return this.lineElement.classList.contains(styleClasses.LINE_RANGE);
  }

  private createPath() {
    this.pathElement = createNode('div', styleClasses.PATH);
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

    const newPosition: number = this.checkIsVertical()
      ? event.clientY - this.pathElement.getBoundingClientRect().top
      : event.clientX - this.pathElement.getBoundingClientRect().left;

    const fromValuePointerPositionInPixels = calculateToPixels({
      valueInPercents: this.fromValuePointerPosition,
      pathElement: this.pathElement,
      isVertical: this.checkIsVertical(),
    });
    const toValuePointerPositionInPixels = calculateToPixels({
      valueInPercents: this.toValuePointerPosition,
      pathElement: this.pathElement,
      isVertical: this.checkIsVertical(),
    });
    const newPositionInPercents = calculateToPercents({
      valueInPixels: newPosition,
      pathElement: this.pathElement,
      isVertical: this.checkIsVertical(),
    });

    if (this.checkIsRange()) {
      const midpointBetweenPoints = (toValuePointerPositionInPixels
        - fromValuePointerPositionInPixels) / 2 + fromValuePointerPositionInPixels;
      if (newPosition < midpointBetweenPoints) {
        this.dispatchPointerPosition({ position: newPositionInPercents, pointerThatChanged: 'fromValue' });
      }
      if (newPosition > midpointBetweenPoints) {
        this.dispatchPointerPosition({ position: newPositionInPercents, pointerThatChanged: 'toValue' });
      }
    } else {
      this.dispatchPointerPosition({ position: newPositionInPercents, pointerThatChanged: 'fromValue' });
    }
  }

  private dispatchPointerPosition(data: { position: number, pointerThatChanged: string }) {
    this.observer.broadcast(data);
  }
}
export { PathView };
export default PathView;
