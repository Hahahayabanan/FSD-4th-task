import styleClasses from '../styleClasses';
import { createNode } from '../utilities';

class TipView {
  public tipHTML: HTMLElement;

  public pointerHTML: HTMLElement;

  constructor(pointerHTML: HTMLElement) {
    this.pointerHTML = pointerHTML;

    this.createTemplate();
  }

  createTemplate() {
    this.tipHTML = createNode('div', styleClasses.TIP);
    this.pointerHTML.appendChild(this.tipHTML);
  }

  setValue(value: number) {
    this.tipHTML.textContent = `${value}`;
  }
}
export { TipView };
export default TipView;
