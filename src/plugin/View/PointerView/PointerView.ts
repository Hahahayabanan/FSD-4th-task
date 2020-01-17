import bind from 'bind-decorator';
import { TipView } from '../TipView/TipView';
import { EventObserver } from '../../EventObserver/EventObserver';
import { MousePosition } from '../../helpers/interfaces';
import { createNode, calculateToPercents, calculateToPixels } from '../utilities';
import styleClasses from '../styleClasses';

class PointerView {
  private mousePosition: MousePosition;

  public pointerElement: HTMLElement;

  public pathElement: HTMLElement;

  public currentPosition: number = null;

  public startPosition: number = null;

  public tip: TipView;

  public observer: EventObserver = new EventObserver();

  constructor(pathElement: HTMLElement) {
    this.pathElement = pathElement;

    this.createTemplate();
    this.bindEventListeners();
  }

  createTip() {
    this.tip = new TipView(this.pointerElement);
  }

  checkIsVertical() {
    return this.pathElement.classList.contains(styleClasses.PATH_VERTICAL);
  }

  getPathLength() {
    const pathLength: number = this.checkIsVertical()
      ? this.pathElement.getBoundingClientRect().height
        || parseInt(this.pathElement.style.height, 10)
      : this.pathElement.getBoundingClientRect().width
        || parseInt(this.pathElement.style.width, 10);
    return pathLength;
  }

  getCurrentPositionInPixels() {
    return calculateToPixels({
      valueInPercents: this.currentPosition,
      pathElement: this.pathElement,
      isVertical: this.checkIsVertical(),
    });
  }

  applyPosition(position: number) {
    this.currentPosition = position;

    this.render(position);
    this.pointerElement.dispatchEvent(
      new CustomEvent('changePointer', {
        bubbles: true,
        detail: this.currentPosition,
      }),
    );
  }

  getClassList() {
    return `${this.pointerElement.classList}`;
  }

  removeClass(targetClass: string) {
    this.pointerElement.classList.remove(targetClass);
  }

  addClass(targetClass: string) {
    this.pointerElement.classList.add(targetClass);
  }

  render(newPosition: number) {
    if (this.checkIsVertical()) {
      this.pointerElement.style.top = `${newPosition}%`;
    } else {
      this.pointerElement.style.left = `${newPosition}%`;
    }
  }

  updateTipValue(newValue: number) {
    if (this.tip) this.tip.setValue(newValue);
  }

  private dispatchPosition(positionInPixels: number) {
    this.observer.broadcast({
      position: calculateToPercents({
        valueInPixels: positionInPixels,
        pathElement: this.pathElement,
        isVertical: this.checkIsVertical(),
      }),
      pointerToUpdate: this,
    });
  }

  private createTemplate() {
    this.pointerElement = createNode('div', styleClasses.POINTER);
    this.pathElement.append(this.pointerElement);
  }

  private bindEventListeners() {
    this.pointerElement.addEventListener('mousedown', this.handlePointerElementMouseDown);
    this.pointerElement.addEventListener('dragstart', this.handlePointerElementDragStart);
  }

  @bind
  private handlePointerElementMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.startPosition = this.currentPosition;

    this.mousePosition = {
      mouseX: event.clientX,
      mouseY: event.clientY,
    };

    document.addEventListener('mousemove', this.handleDocumentMouseMove);
    document.addEventListener('mouseup', this.handleDocumentMouseUp);
  }

  @bind
  private handleDocumentMouseMove(event: MouseEvent) {
    event.preventDefault();
    const { mouseX, mouseY } = this.mousePosition;
    const startPositionInPixels = calculateToPixels({
      valueInPercents: this.startPosition,
      pathElement: this.pathElement,
      isVertical: this.checkIsVertical(),
    });
    const newPosition: number = this.checkIsVertical()
      ? startPositionInPixels - mouseY + event.clientY
      : startPositionInPixels - mouseX + event.clientX;

    this.dispatchPosition(newPosition);
  }

  @bind
  private handleDocumentMouseUp() {
    document.removeEventListener('mouseup', this.handleDocumentMouseUp);
    document.removeEventListener('mousemove', this.handleDocumentMouseMove);
  }

  private handlePointerElementDragStart() {
    return false;
  }
}
export { PointerView };
export default PointerView;
