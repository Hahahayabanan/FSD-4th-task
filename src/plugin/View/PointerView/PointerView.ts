import { TipView } from '../TipView/TipView';
import { EventObserver } from '../../EventObserver/EventObserver';
import { MousePosition, UpdateData } from '../../types/interfaces';
import { createNode, calculateToPercents, calculateToPixels } from '../utilities';
import styleClasses from '../styleClasses';

class PointerView {
  public pointerElement: HTMLElement;

  public pathElement: HTMLElement;

  public currentPosition: number = null;

  public startPosition: number = null;

  public tip: TipView;

  public observer: EventObserver = new EventObserver();

  private mousePosition: MousePosition;

  private handleDocumentMouseMoveBoundWithData: EventListenerOrEventListenerObject;

  private handlePointerElementMouseDownBoundWithData: EventListenerOrEventListenerObject;

  private handleDocumentMouseUpBoundWithData: EventListenerOrEventListenerObject;

  constructor(pathElement: HTMLElement) {
    this.pathElement = pathElement;

    this.createTemplate();
  }

  createTip() {
    this.tip = new TipView(this.pointerElement);
  }

  getPathLength(isVertical: boolean) {
    const pathLength: number = isVertical
      ? this.pathElement.getBoundingClientRect().height
        || parseInt(this.pathElement.style.height, 10)
      : this.pathElement.getBoundingClientRect().width
        || parseInt(this.pathElement.style.width, 10);
    return pathLength;
  }

  getCurrentPositionInPixels(isVertical: boolean) {
    return calculateToPixels({
      valueInPercents: this.currentPosition,
      pathElement: this.pathElement,
      isVertical,
    });
  }

  applyPosition(position: number, isVertical: boolean) {
    this.currentPosition = position;

    this.updatePointerPosition(position, isVertical);
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

  updatePointerPosition(newPosition: number, isVertical: boolean) {
    if (isVertical) {
      this.pointerElement.style.left = '';
      this.pointerElement.style.top = `${newPosition}%`;
    } else {
      this.pointerElement.style.top = '';
      this.pointerElement.style.left = `${newPosition}%`;
    }
  }

  updateTipValue(newValue: number) {
    if (this.tip) this.tip.setValue(newValue);
  }

  updateEventListeners(data: UpdateData) {
    this.removeEventListeners();
    this.bindEventListeners(data);
  }

  private bindEventListeners(data: UpdateData) {
    const { isVertical } = data;
    this.handlePointerElementMouseDownBoundWithData = this.handlePointerElementMouseDown.bind(
      this, isVertical,
    );

    this.pointerElement.addEventListener('mousedown', this.handlePointerElementMouseDownBoundWithData);
    this.pointerElement.addEventListener('dragstart', this.handlePointerElementDragStart);
  }

  private removeEventListeners() {
    document.removeEventListener('mousedown', this.handlePointerElementMouseDownBoundWithData);
    document.removeEventListener('dragstart', this.handlePointerElementDragStart);
  }

  private handlePointerElementMouseDown(isVertical: boolean, event: MouseEvent) {
    event.preventDefault();
    this.startPosition = this.currentPosition;

    this.mousePosition = {
      mouseX: event.clientX,
      mouseY: event.clientY,
    };

    this.handleDocumentMouseMoveBoundWithData = this.handleDocumentMouseMove.bind(this, isVertical);
    document.addEventListener('mousemove', this.handleDocumentMouseMoveBoundWithData);
    this.handleDocumentMouseUpBoundWithData = this.handleDocumentMouseUp.bind(
      null,
      this.handleDocumentMouseMoveBoundWithData,
      this.handleDocumentMouseUpBoundWithData,
    );
    document.addEventListener('mouseup', this.handleDocumentMouseUpBoundWithData);
  }

  private handleDocumentMouseMove(isVertical: boolean, event: MouseEvent) {
    event.preventDefault();
    const { mouseX, mouseY } = this.mousePosition;
    const startPositionInPixels = calculateToPixels({
      isVertical,
      valueInPercents: this.startPosition,
      pathElement: this.pathElement,
    });
    const newPosition: number = isVertical
      ? startPositionInPixels - mouseY + event.clientY
      : startPositionInPixels - mouseX + event.clientX;

    this.dispatchPosition(newPosition, isVertical);
  }

  private handleDocumentMouseUp(
    handleDocumentMouseMoveBoundWithData: EventListenerOrEventListenerObject,
    handleDocumentMouseUpBoundWithData: EventListenerOrEventListenerObject,
  ) {
    document.removeEventListener('mousemove', handleDocumentMouseMoveBoundWithData);
    document.removeEventListener('mouseup', handleDocumentMouseUpBoundWithData);
  }

  private handlePointerElementDragStart() {
    return false;
  }

  private dispatchPosition(positionInPixels: number, isVertical: boolean) {
    this.observer.broadcast({
      position: calculateToPercents({
        valueInPixels: positionInPixels,
        pathElement: this.pathElement,
        isVertical,
      }),
      pointerToUpdate: this,
    });
  }

  private createTemplate() {
    this.pointerElement = createNode('div', styleClasses.POINTER);
    this.pathElement.append(this.pointerElement);
  }
}
export { PointerView };
export default PointerView;
