import bind from 'bind-decorator';
import styleClasses from '../styleClasses';
import { createNode } from '../utilities';
import { PointerView } from '../PointerView/PointerView';

class PathView {
  public lineElement: HTMLElement;

  public pathElement: HTMLElement;

  public isVertical: boolean = false;

  public hasLine: boolean = true;

  public firstPointer: PointerView;

  public secondPointer: PointerView;

  constructor(options: {
    isVertical: boolean,
    hasLine: boolean,
  }) {
    const {
      isVertical, hasLine
    } = options;
    this.isVertical = isVertical;
    this.hasLine = hasLine;

    this.init();
  }

  init() {
    this.createPath();
    this.createLine();
    this.bindEventListeners();
  }

  createPath() {
    this.pathElement = createNode('div', styleClasses.PATH);
  }

  createLine() {
    if (this.hasLine) {
      this.lineElement = createNode('div', styleClasses.LINE);
      this.pathElement.prepend(this.lineElement);
    }
  }

  setPointers(firstPointer: PointerView, secondPointer: PointerView) {
    this.firstPointer = firstPointer;
    this.secondPointer = secondPointer;
  }

  updateLine() {
    if (this.lineElement) {
      const firstPointerPosition = this.firstPointer.currentPosition;
      if (this.isVertical) {
        this.lineElement.style.top = this.secondPointer ? `${firstPointerPosition}%` : '0%';
        this.lineElement.style.height = this.secondPointer
          ? `${this.secondPointer.currentPosition - firstPointerPosition}%`
          : `${firstPointerPosition}%`;
      } else {
        this.lineElement.style.left = this.secondPointer
          ? `${firstPointerPosition}%`
          : '0%';
        this.lineElement.style.width = this.secondPointer
          ? `${this.secondPointer.currentPosition - firstPointerPosition}%`
          : `${firstPointerPosition}%`;
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

    const isValidClick: boolean = currentTarget.className === styleClasses.PATH
      || currentTarget.className === styleClasses.LINE;
    if (!isValidClick) return;
    const newLeft: number = this.isVertical
      ? event.clientY - this.pathElement.getBoundingClientRect().top
      : event.clientX - this.pathElement.getBoundingClientRect().left;

    if (this.secondPointer) {
      const midpointBetweenPoints = this.getMidpointBetweenPointers();
      if (newLeft < midpointBetweenPoints) this.firstPointer.dispatchPointerPosition(newLeft);
      if (newLeft > midpointBetweenPoints) this.secondPointer.dispatchPointerPosition(newLeft);
    } else {
      this.firstPointer.dispatchPointerPosition(newLeft);
    }
  }

  private getMidpointBetweenPointers() {
    const firstPointerPosition = this.firstPointer.getCurPosInPixels();
    const secondPointerPosition = this.secondPointer.getCurPosInPixels();
    return (secondPointerPosition - firstPointerPosition) / 2 + firstPointerPosition;
  }
}
export { PathView };
export default PathView;
