class TipView {
  public tipHTML: HTMLElement;

  public parentHTML: HTMLElement;

  constructor(parentHTML: HTMLElement) {
    this.parentHTML = parentHTML;

    this.createTemplate();
  }

  createTemplate() {
    this.tipHTML = document.createElement('div');
    this.tipHTML.classList.add('j-plugin-slider__follower-point');
    this.parentHTML.appendChild(this.tipHTML);
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
