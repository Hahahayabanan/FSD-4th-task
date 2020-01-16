import bind from 'bind-decorator';
import styleClasses from '../styleClasses';
import createNode from '../utilities';
import { PointerView } from '../PointerView/PointerView';

class PathView {
  public lineElement: HTMLElement;

  public pathElement: HTMLElement;

  public fromValuePointer: PointerView;

  public toValuePointer: PointerView;

  constructor() {
    this.init();
  }

  init() {
    this.createPath();
    this.bindEventListeners();
  }

  createPath() {
    this.pathElement = createNode('div', styleClasses.PATH);
  }

  toggleLine(hasLine: boolean) {
    if (hasLine) {
      if (!this.lineElement) {
        this.lineElement = createNode('div', styleClasses.LINE);
        this.pathElement.prepend(this.lineElement);
      }
    } else if (this.lineElement) {
      this.lineElement.remove();
      this.lineElement = null;
    }
  }

  toggleOrientationClass(isVertical: boolean) {
    if (isVertical) {
      this.pathElement.classList.add(styleClasses.SLIDER_PATH_VERTICAL);
    } else {
      this.pathElement.classList.remove(styleClasses.SLIDER_PATH_VERTICAL);
    }
  }

  setPointers(fromValuePointer: PointerView, toValuePointer: PointerView) {
    this.fromValuePointer = fromValuePointer;
    this.toValuePointer = toValuePointer;
  }

  updateLine() {
    if (this.lineElement) {
      this.lineElement.removeAttribute('style');
      const fromValuePointerPosition = this.fromValuePointer.currentPosition;
      if (this.checkIsVertical()) {
        this.lineElement.style.top = this.toValuePointer ? `${fromValuePointerPosition}%` : '0%';
        this.lineElement.style.height = this.toValuePointer
          ? `${this.toValuePointer.currentPosition - fromValuePointerPosition}%`
          : `${fromValuePointerPosition}%`;
      } else {
        this.lineElement.style.left = this.toValuePointer
          ? `${fromValuePointerPosition}%`
          : '0%';
        this.lineElement.style.width = this.toValuePointer
          ? `${this.toValuePointer.currentPosition - fromValuePointerPosition}%`
          : `${fromValuePointerPosition}%`;
      }
    }
  }

  checkIsVertical() {
    return this.pathElement.classList.contains(styleClasses.SLIDER_PATH_VERTICAL);
  }

  private bindEventListeners() {
    this.pathElement.addEventListener('mousedown', this.handlePathElementMouseDown);
  }

  @bind
  private handlePathElementMouseDown(event: MouseEvent) {
    event.preventDefault();
    const currentTarget: HTMLElement = event.target as HTMLElement;

    const isValidClick: boolean = currentTarget.className === styleClasses.PATH
      || currentTarget.className === styleClasses.LINE;
    if (!isValidClick) return;

    const newPosition: number = this.checkIsVertical()
      ? event.clientY - this.pathElement.getBoundingClientRect().top
      : event.clientX - this.pathElement.getBoundingClientRect().left;

    if (this.toValuePointer) {
      const midpointBetweenPoints = this.getMidpointBetweenPointers();
      if (newPosition < midpointBetweenPoints) this.fromValuePointer.dispatchPosition(newPosition);
      if (newPosition > midpointBetweenPoints) this.toValuePointer.dispatchPosition(newPosition);
    } else {
      this.fromValuePointer.dispatchPosition(newPosition);
    }
  }

  private getMidpointBetweenPointers() {
    const fromValuePointerPosition = this.fromValuePointer.getCurrentPositionInPixels();
    const toValuePointerPosition = this.toValuePointer.getCurrentPositionInPixels();
    return (toValuePointerPosition - fromValuePointerPosition) / 2 + fromValuePointerPosition;
  }
}
export { PathView };
export default PathView;
