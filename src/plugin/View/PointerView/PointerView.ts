import bind from 'bind-decorator';
import { TipView } from '../TipView/TipView';
import { EventObserver } from '../../EventObserver/EventObserver';
import { MousePosition } from '../../helpers/interfaces';
import createNode from '../utilities';
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

  createTemplate() {
    this.pointerElement = createNode('div', styleClasses.POINTER);
    this.pathElement.append(this.pointerElement);
  }

  createTip() {
    this.tip = new TipView(this.pointerElement);
  }

  checkIsVertical() {
    return this.pathElement.classList.contains(styleClasses.SLIDER_PATH_VERTICAL);
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
    return this.calculateToPixels(this.currentPosition);
  }

  dispatchPosition(positionInPixels: number) {
    this.observer.broadcast({
      position: this.calculateToPercents(positionInPixels),
      pointerToUpdate: this,
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

  calculateToPercents(valueInPixels: number) {
    const lengthInPixels = this.getPathLength();
    const valueInPercents = (valueInPixels * 100) / lengthInPixels;
    return valueInPercents;
  }

  calculateToPixels(valueInPercents: number) {
    const lengthInPixels = this.getPathLength();
    const valueInPixels = (valueInPercents / 100) * lengthInPixels;
    return valueInPixels;
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
    const startPositionInPixels = this.calculateToPixels(this.startPosition);
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
