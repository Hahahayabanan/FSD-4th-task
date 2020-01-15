import styleClasses from '../styleClasses';
import createNode from '../utilities';

class TipView {
  public tipElement: HTMLElement;

  public pointerElement: HTMLElement;

  constructor(pointerElement: HTMLElement) {
    this.pointerElement = pointerElement;

    this.createTemplate();
  }

  createTemplate() {
    this.tipElement = createNode('div', styleClasses.TIP);
    this.pointerElement.appendChild(this.tipElement);
  }

  setValue(value: number) {
    this.tipElement.textContent = `${value}`;
  }
}
export { TipView };
export default TipView;
