import { TipView } from '../TipView/TipView';
import { EventObserver } from '../../EventObserver/EventObserver';
import { MouseSettings } from '../../helpers/interfaces';
import { createNode } from '../utilities';
import styleClasses from '../styleClasses';

class PointerView {
  private moveSettings: MouseSettings;

  public pointerElement: HTMLElement;

  public pathElement: HTMLElement;

  public curPos: number = null;

  public endPos: number = null;

  public isVertical: boolean = false;

  public tip: TipView;

  public observer: EventObserver = new EventObserver();

  constructor(pathElement: HTMLElement, isVertical?: boolean) {
    this.isVertical = isVertical;
    this.pathElement = pathElement;

    this.handlepointerElementMouseDown = this.handlepointerElementMouseDown.bind(this);
    this.handleDocumentMouseMove = this.handleDocumentMouseMove.bind(this);
    this.handleDocumentMouseUp = this.handleDocumentMouseUp.bind(this);

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
    return this.calculateToPixels(this.curPos);
  }

  dispatchPointerPosition(positionInPixels: number) {
    this.observer.broadcast({
      position: this.calculateToPercents(positionInPixels),
      pointerToUpdate: this,
    });
  }

  applyPointerPosition(position: number) {
    this.curPos = position;

    this.render(position);
    this.pointerElement.dispatchEvent(
      new CustomEvent('changePointer', {
        bubbles: true,
        detail: this.curPos,
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
    this.pointerElement.addEventListener('mousedown', this.handlepointerElementMouseDown);
    this.pointerElement.addEventListener('dragstart', this.handlepointerElementDragStart);
  }

  private handlepointerElementMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.endPos = this.curPos;

    this.moveSettings = {
      mouseX: event.clientX,
      mouseY: event.clientY,
    };

    document.addEventListener('mousemove', this.handleDocumentMouseMove);
    document.addEventListener('mouseup', this.handleDocumentMouseUp);
  }

  private handleDocumentMouseMove(event: MouseEvent) {
    event.preventDefault();
    const { mouseX, mouseY } = this.moveSettings;
    const endPosInPixels = this.calculateToPixels(this.endPos);
    const newCurPos: number = this.isVertical
      ? endPosInPixels - mouseY + event.clientY
      : endPosInPixels - mouseX + event.clientX;

    this.dispatchPointerPosition(newCurPos);
  }

  private handleDocumentMouseUp() {
    document.removeEventListener('mouseup', this.handleDocumentMouseUp);
    document.removeEventListener('mousemove', this.handleDocumentMouseMove);
  }

  private handlepointerElementDragStart() {
    return false;
  }
}
export { PointerView };
export default PointerView;
