import { TipView } from './TipView';
import { EventObserver } from '../EventObserver/EventObserver';

class PointerView {
  public pointerHTML: HTMLElement;

  public curPos: number;

  public endPos: number;

  public isVertical: boolean = false;

  public tip: TipView;

  public observer: EventObserver = new EventObserver();

  constructor(elemHTML: HTMLElement, isVertical?: boolean) {
    this.pointerHTML = elemHTML;
    this.isVertical = isVertical;
    this.bindEventListeners();
  }

  private handlePointerMouseDown = (event: any) => {
    event.preventDefault();

    const mouseX = event.clientX;
    const mouseY = event.clientY;
    this.endPos = this.curPos;

    const handleDocumentMouseMove = (event: any) => {
      event.preventDefault();

      const endPosInPixels = this.calcPercentsToPixels(this.endPos);

      const newCurPos: number = this.isVertical
        ? endPosInPixels - mouseY + event.clientY
        : endPosInPixels - mouseX + event.clientX;

      const newCurPosInPercents = this.calcPixelsToPercents(newCurPos);
      this.dispatchPointerPosition(newCurPosInPercents);
    };

    const handleDocumentMouseUp = () => {
      document.removeEventListener('mouseup', handleDocumentMouseUp);
      document.removeEventListener('mousemove', handleDocumentMouseMove);
    };

    document.addEventListener('mousemove', handleDocumentMouseMove);
    document.addEventListener('mouseup', handleDocumentMouseUp);
  };

  dispatchPointerPosition(newCurPos: number) {
    const updateObject = this;
    this.observer.broadcast({ newCurPos, updateObject });
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


  bindEventListeners() {
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
    const sliderWrap = this.pointerHTML.parentNode.parentNode as HTMLElement;
    sliderWrap.classList.add('j-plugin-slider_with-point');
  }

  deleteTip() {
    if (this.tip !== undefined && this.tip !== null) {
      this.tip.destroy();
      this.tip = null;
      const sliderWrap = this.pointerHTML.parentNode.parentNode as HTMLElement;
      sliderWrap.classList.remove('j-plugin-slider_with-point');
    }
  }

  updateTipValue(newValue: number) {
    this.tip.setValue(newValue);
  }
}
export { PointerView };
export default PointerView;
