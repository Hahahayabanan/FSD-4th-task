import { FollowerPoint } from './FollowerPoint';

class SliderPointer {
  public thumbHTMLElem: HTMLElement;

  public curPos: number;

  public isVertical: boolean = false;

  public followerPoint: FollowerPoint;

  public endPos: number;

  constructor(elemHTML: HTMLElement, isVertical?: boolean) {
    this.thumbHTMLElem = elemHTML;
    this.isVertical = isVertical;
  }

  setCurPosInPercents(newCurrPos: number) {
    this.curPos = newCurrPos;

    this.thumbHTMLElem.dispatchEvent(
      new CustomEvent('changePointer', {
        bubbles: true,
        detail: this,
      }),
    );
  }

  setCurPosInPixels(newCurrPos: number) {
    this.curPos = this.calcPixelsToPercents(newCurrPos);

    this.thumbHTMLElem.dispatchEvent(
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
      ? this.thumbHTMLElem.parentElement.getBoundingClientRect().height ||
        parseInt(this.thumbHTMLElem.parentElement.style.height, 10)
      : this.thumbHTMLElem.parentElement.getBoundingClientRect().width ||
        parseInt(this.thumbHTMLElem.parentElement.style.width, 10);
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
      ? (this.thumbHTMLElem.style.top = `${newPos}%`)
      : (this.thumbHTMLElem.style.left = `${newPos}%`);
    return newCssLeftOrTop;
  }

  createFollowerPoint() {
    this.followerPoint = new FollowerPoint(this.thumbHTMLElem);
    const sliderWrap = this.thumbHTMLElem.parentNode.parentNode as HTMLElement;
    sliderWrap.classList.add('j-plugin-slider_with-point');
  }

  deleteFollowerPoint() {
    if (this.followerPoint !== undefined) {
      this.followerPoint.destroy();
      this.followerPoint = undefined;
      const sliderWrap = this.thumbHTMLElem.parentNode
        .parentNode as HTMLElement;
      sliderWrap.classList.remove('j-plugin-slider_with-point');
    }
  }
}
export { SliderPointer };
export default SliderPointer;
