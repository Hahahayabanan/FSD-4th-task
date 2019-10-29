import { TipView } from './TipView';

class PointerView {
  public pointerHTML: HTMLElement;

  public curPos: number;

  public endPos: number;

  public isVertical: boolean = false;

  public followerPoint: TipView;

  constructor(elemHTML: HTMLElement, isVertical?: boolean) {
    this.pointerHTML = elemHTML;
    this.isVertical = isVertical;
  }

  setCurPosInPercents(newCurrPos: number) {
    this.curPos = newCurrPos;

    this.pointerHTML.dispatchEvent(
      new CustomEvent('changePointer', {
        bubbles: true,
        detail: this,
      }),
    );
  }

  setCurPosInPixels(newCurrPos: number) {
    this.curPos = this.calcPixelsToPercents(newCurrPos);

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

  getPathLength() {
    const widthOrHeight: number = this.isVertical
      ? this.pointerHTML.parentElement.getBoundingClientRect().height ||
        parseInt(this.pointerHTML.parentElement.style.height, 10)
      : this.pointerHTML.parentElement.getBoundingClientRect().width ||
        parseInt(this.pointerHTML.parentElement.style.width, 10);
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

  renderCurrentPosInPixels(newPos: number) {
    const newPosition = this.calcPixelsToPercents(newPos);
    return this.renderCurrentPosInPercents(newPosition);
  }

  renderCurrentPosInPercents(newPos: number) {
    const newCssLeftOrTop: string = this.isVertical
      ? (this.pointerHTML.style.top = `${newPos}%`)
      : (this.pointerHTML.style.left = `${newPos}%`);
    return newCssLeftOrTop;
  }

  createFollowerPoint() {
    this.followerPoint = new TipView(this.pointerHTML);
    const sliderWrap = this.pointerHTML.parentNode.parentNode as HTMLElement;
    sliderWrap.classList.add('j-plugin-slider_with-point');
  }

  deleteFollowerPoint() {
    if (this.followerPoint !== undefined) {
      this.followerPoint.destroy();
      this.followerPoint = undefined;
      const sliderWrap = this.pointerHTML.parentNode.parentNode as HTMLElement;
      sliderWrap.classList.remove('j-plugin-slider_with-point');
    }
  }
}
export { PointerView };
export default PointerView;
