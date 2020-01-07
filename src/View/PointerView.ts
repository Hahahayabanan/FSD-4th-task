import { TipView } from './TipView';
import { EventObserver } from '../EventObserver/EventObserver';
import { MouseSettings } from '../helpers/interfaces';
import { createNode } from './utilities';
import styleClasses from './styleClasses';

class PointerView {
  private moveSettings: MouseSettings;

  public pointerHTML: HTMLElement;

  public pathHTML: HTMLElement;

  public curPos: number = null;

  public endPos: number = null;

  public isVertical: boolean = false;

  public tip: TipView;

  public observer: EventObserver = new EventObserver();

  constructor(pathHTML: HTMLElement, isVertical?: boolean) {
    this.isVertical = isVertical;
    this.pathHTML = pathHTML;

    this.handlePointerHTMLMouseDown = this.handlePointerHTMLMouseDown.bind(this);
    this.handleDocumentMouseMove = this.handleDocumentMouseMove.bind(this);
    this.handleDocumentMouseUp = this.handleDocumentMouseUp.bind(this);

    this.createTemplate();
    this.bindEventListeners();
  }

  createTemplate() {
    this.pointerHTML = createNode('div', styleClasses.POINTER);
    this.pathHTML.append(this.pointerHTML);
  }

  createTip() {
    this.tip = new TipView(this.pointerHTML);
  }

  getPathLength() {
    const pathLength: number = this.isVertical
      ? this.pathHTML.getBoundingClientRect().height
        || parseInt(this.pathHTML.style.height, 10)
      : this.pathHTML.getBoundingClientRect().width
        || parseInt(this.pathHTML.style.width, 10);
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
    this.pointerHTML.dispatchEvent(
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
      ? (this.pointerHTML.style.top = `${newPos}%`)
      : (this.pointerHTML.style.left = `${newPos}%`);
    return newCssLeftOrTop;
  }

  updateTipValue(newValue: number) {
    if (this.tip) this.tip.setValue(newValue);
  }

  private bindEventListeners() {
    this.pointerHTML.addEventListener('mousedown', this.handlePointerHTMLMouseDown);
    this.pointerHTML.addEventListener('dragstart', this.handlePointerHTMLDragStart);
  }

  private handlePointerHTMLMouseDown(event: MouseEvent) {
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

  private handlePointerHTMLDragStart() {
    return false;
  }
}
export { PointerView };
export default PointerView;
