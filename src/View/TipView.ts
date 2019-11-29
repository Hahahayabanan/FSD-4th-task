class TipView {
  public tipHTML: HTMLElement;

  public pointerHTML: HTMLElement;

  constructor(pointerHTML: HTMLElement) {
    this.pointerHTML = pointerHTML;

    this.createTemplate();
  }

  createTemplate() {
    this.tipHTML = document.createElement('div');
    this.tipHTML.classList.add('j-plugin-slider__follower-point');
    this.pointerHTML.appendChild(this.tipHTML);
  }

  setValue(value: number) {
    this.tipHTML.textContent = `${value}`;
  }

  destroy() {
    this.tipHTML.remove();
  }
}
export { TipView };
export default TipView;
