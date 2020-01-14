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
      const pos0 = this.firstPointer.curPos;
      if (this.isVertical) {
        this.lineElement.style.top = this.secondPointer ? `${pos0}%` : '0%';
        this.lineElement.style.height = this.secondPointer ? `${this.secondPointer.curPos - pos0}%` : `${pos0}%`;
      } else {
        this.lineElement.style.left = this.secondPointer ? `${pos0}%` : '0%';
        this.lineElement.style.width = this.secondPointer ? `${this.secondPointer.curPos - pos0}%` : `${pos0}%`;
      }
    }
  }

  private bindEventListeners() {
    this.pathElement.addEventListener('mousedown', this.handlePathElementMouseDown);
  }

  @bind
  private handlePathElementMouseDown(event: MouseEvent) {
    event.preventDefault();
    const curTarget: HTMLElement = event.target as HTMLElement;

    const isValidClick: boolean = curTarget.className === styleClasses.PATH
      || curTarget.className === styleClasses.LINE;
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
    const pos0 = this.firstPointer.getCurPosInPixels();
    const pos1 = this.secondPointer.getCurPosInPixels();
    return (pos1 - pos0) / 2 + pos0;
  }
}
export { PathView };
export default PathView;
