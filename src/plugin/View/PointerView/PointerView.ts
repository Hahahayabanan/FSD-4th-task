import bind from 'bind-decorator';
import { TipView } from '../TipView/TipView';
import { EventObserver } from '../../EventObserver/EventObserver';
import { MousePosition } from '../../helpers/interfaces';
import createNode from '../utilities';
import styleClasses from '../styleClasses';

class PointerView {
  private mousePosition: MousePosition;

  public pointerElement: HTMLElement;

  public pathElement: HTMLElement;

  public currentPosition: number = null;

  public startPosition: number = null;

  public isVertical: boolean = false;

  public tip: TipView;

  public observer: EventObserver = new EventObserver();

  constructor(pathElement: HTMLElement, isVertical?: boolean) {
    this.isVertical = isVertical;
    this.pathElement = pathElement;

    this.createTemplate();
    this.bindEventListeners();
  }

  createTemplate() {
    this.pointerElement = createNode('div', styleClasses.POINTER);
    this.pathElement.append(this.pointerElement);
  }

  createTip() {
    this.tip = new TipView(this.pointerElement);
  }

  getPathLength() {
    const pathLength: number = this.isVertical
      ? this.pathElement.getBoundingClientRect().height
        || parseInt(this.pathElement.style.height, 10)
      : this.pathElement.getBoundingClientRect().width
        || parseInt(this.pathElement.style.width, 10);
    return pathLength;
  }

  getCurPosInPixels() {
    return this.calculateToPixels(this.currentPosition);
  }

  dispatchPointerPosition(positionInPixels: number) {
    this.observer.broadcast({
      position: this.calculateToPercents(positionInPixels),
      pointerToUpdate: this,
    });
  }

  applyPointerPosition(position: number) {
    this.currentPosition = position;

    this.render(position);
    this.pointerElement.dispatchEvent(
      new CustomEvent('changePointer', {
        bubbles: true,
        detail: this.currentPosition,
      }),
    );
  }

  calculateToPercents(valueInPixels: number) {
    const lengthInPixels = this.getPathLength();
    const valueInPercents = (valueInPixels * 100) / lengthInPixels;
    return valueInPercents;
  }

  calculateToPixels(valueInPercents: number) {
    const lengthInPixels = this.getPathLength();
    const valueInPixels = (valueInPercents / 100) * lengthInPixels;
    return valueInPixels;
  }

  getClassList() {
    return `${this.pointerElement.classList}`;
  }

  removeClass(targetClass: string) {
    this.pointerElement.classList.remove(targetClass);
  }

  addClass(targetClass: string) {
    this.pointerElement.classList.add(targetClass);
  }

  render(newPos: number) {
    const newCssLeftOrTop: string = this.isVertical
      ? (this.pointerElement.style.top = `${newPos}%`)
      : (this.pointerElement.style.left = `${newPos}%`);
    return newCssLeftOrTop;
  }

  updateTipValue(newValue: number) {
    if (this.tip) this.tip.setValue(newValue);
  }

  private bindEventListeners() {
    this.pointerElement.addEventListener('mousedown', this.handlePointerElementMouseDown);
    this.pointerElement.addEventListener('dragstart', this.handlePointerElementDragStart);
  }

  @bind
  private handlePointerElementMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.startPosition = this.currentPosition;

    this.mousePosition = {
      mouseX: event.clientX,
      mouseY: event.clientY,
    };

    document.addEventListener('mousemove', this.handleDocumentMouseMove);
    document.addEventListener('mouseup', this.handleDocumentMouseUp);
  }

  @bind
  private handleDocumentMouseMove(event: MouseEvent) {
    event.preventDefault();
    const { mouseX, mouseY } = this.mousePosition;
    const startPositionInPixels = this.calculateToPixels(this.startPosition);
    const newCurrentPosition: number = this.isVertical
      ? startPositionInPixels - mouseY + event.clientY
      : startPositionInPixels - mouseX + event.clientX;

    this.dispatchPointerPosition(newCurrentPosition);
  }

  @bind
  private handleDocumentMouseUp() {
    document.removeEventListener('mouseup', this.handleDocumentMouseUp);
    document.removeEventListener('mousemove', this.handleDocumentMouseMove);
  }

  private handlePointerElementDragStart() {
    return false;
  }
}
export { PointerView };
export default PointerView;
