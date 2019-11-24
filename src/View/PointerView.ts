import { TipView } from './TipView';
import { EventObserver } from '../EventObserver/EventObserver';
import { MouseSettings } from '../helpers/interfaces';

class PointerView {
  private moveSettings: MouseSettings;

  public pointerHTML: HTMLElement;

  public parentHTML: HTMLElement;

  public curPos: number;

  public endPos: number;

  public isVertical: boolean = false;

  public tip: TipView;

  public observer: EventObserver = new EventObserver();

  constructor(elemHTML: HTMLElement, parentHTML?: HTMLElement, isVertical?: boolean) {
    this.pointerHTML = elemHTML;
    this.isVertical = isVertical;
    this.parentHTML = parentHTML;
    this.bindEventListeners();
  }

  private handlePointerMouseDown(event: MouseEvent) {
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

    const endPosInPixels = this.calcPercentsToPixels(this.endPos);

    const newCurPos: number = this.isVertical
      ? endPosInPixels - mouseY + event.clientY
      : endPosInPixels - mouseX + event.clientX;

    const newCurPosInPercents = this.calcPixelsToPercents(newCurPos);
    this.dispatchPointerPosition(newCurPosInPercents);
  }

  private handleDocumentMouseUp() {
    document.removeEventListener('mouseup', this.handleDocumentMouseUp);
    document.removeEventListener('mousemove', this.handleDocumentMouseMove);
  }

  private bindEventListeners() {
    this.handlePointerMouseDown = this.handlePointerMouseDown.bind(this);
    this.handleDocumentMouseMove = this.handleDocumentMouseMove.bind(this);
    this.handleDocumentMouseUp = this.handleDocumentMouseUp.bind(this);
    this.pointerHTML.addEventListener('mousedown', this.handlePointerMouseDown);
    this.pointerHTML.ondragstart = function onDragStart() {
      return false;
    };
  }

  getPathLength() {
    const widthOrHeight: number = this.isVertical
      ? this.pointerHTML.parentElement.getBoundingClientRect().height
        || parseInt(this.pointerHTML.parentElement.style.height, 10)
      : this.pointerHTML.parentElement.getBoundingClientRect().width
        || parseInt(this.pointerHTML.parentElement.style.width, 10);
    return widthOrHeight;
  }

  dispatchPointerPosition(newCurPos: number) {
    const pointerToUpdate: PointerView = this;
    this.observer.broadcast({ newCurPos, pointerToUpdate });
  }

  setPointerPosition(newCurPos: number) {
    this.curPos = newCurPos;

    this.renderCurrentPosInPercents(newCurPos);
    this.pointerHTML.dispatchEvent(
      new CustomEvent('changePointer', {
        bubbles: true,
        detail: this,
      }),
    );
  }

  getCurPosInPixels() {
    return this.calcPercentsToPixels(this.curPos);
  }

  calcPixelsToPercents(valueInPixels: number) {
    const lengthInPixels = this.getPathLength();
    const valueInPercents = (valueInPixels * 100) / lengthInPixels;
    return valueInPercents;
  }

  calcPercentsToPixels(valueInPercents: number) {
    const lengthInPixels = this.getPathLength();
    const valueInPixels = (valueInPercents / 100) * lengthInPixels;
    return valueInPixels;
  }

  renderCurrentPosInPercents(newPos: number) {
    const newCssLeftOrTop: string = this.isVertical
      ? (this.pointerHTML.style.top = `${newPos}%`)
      : (this.pointerHTML.style.left = `${newPos}%`);
    return newCssLeftOrTop;
  }

  createTip() {
    this.tip = new TipView(this.pointerHTML);
  }

  updateTipValue(newValue: number) {
    if (this.tip) this.tip.setValue(newValue);
  }
}
export { PointerView };
export default PointerView;
