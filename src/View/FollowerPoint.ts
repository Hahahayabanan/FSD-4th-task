class FollowerPoint {
  public elemHTMLElement: HTMLElement;

  public isVertical: boolean;

  public thumbHTMLElement: HTMLElement;

  constructor(thumbHTML: HTMLElement, isVertical: boolean) {
    this.elemHTMLElement = document.createElement('div');
    this.isVertical = isVertical;
    this.thumbHTMLElement = thumbHTML;

    this.createTemplate();
  }

  createTemplate() {
    this.elemHTMLElement.classList.add('j-plugin-slider__follower-point');
    this.thumbHTMLElement.appendChild(this.elemHTMLElement);
  }

  setValue(value: number) {
    this.elemHTMLElement.textContent = `${value}`;
  }

  destroy() {
    this.elemHTMLElement.remove();
  }
}
export {
  FollowerPoint,
};
export default FollowerPoint;
