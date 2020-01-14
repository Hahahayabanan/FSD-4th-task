import { PointerView } from '../PointerView/PointerView';
import { EventObserver } from '../../EventObserver/EventObserver';
import { Attributes } from '../../helpers/interfaces';
import { createNode } from '../utilities';
import styleClasses from '../styleClasses';

class MainView {
  public sliderHTML: HTMLElement;

  public pathHTML: HTMLElement;

  public firstPointer: PointerView = null;

  public secondPointer: PointerView = null;

  public isVertical: boolean = false;

  public hasTip: boolean = false;

  public hasLine: boolean = true;

  public isRange: boolean = false;

  public lineHTML: HTMLElement;

  public lastPointerMoved: PointerView = null;

  public observer: EventObserver = new EventObserver();

  constructor(options: {
    rootElem: HTMLElement;
    isVertical?: boolean;
    hasTip?: boolean;
    isRange?: boolean;
    hasLine?: boolean;
  }) {
    const {
      rootElem, isVertical, hasTip, isRange, hasLine,
    } = options;
    this.sliderHTML = rootElem;
    this.isVertical = isVertical;
    this.hasTip = hasTip;
    this.hasLine = hasLine;
    this.isRange = isRange;
    this.lastPointerMoved = this.firstPointer;

    this.handlePathHTMLMouseDown = this.handlePathHTMLMouseDown.bind(this);
    this.setPointerPosition = this.setPointerPosition.bind(this);
    this.dispatchPointerPosition = this.dispatchPointerPosition.bind(this);

    this.createTemplate();
    this.bindEventListeners();
    this.addObservers();
  }

  createTip() {
    if (this.hasTip) {
      this.firstPointer.createTip();
      this.sliderHTML.classList.add(styleClasses.SLIDER_WITH_TIP);
      if (this.isRange) this.secondPointer.createTip();
    }
  }

  setPointerPosition(data: {
    first: number,
    second: number,
    firstTipValue: number,
    secondTipValue: number,
    attributes: Attributes,
  }) {
    const {
      first, second, firstTipValue, secondTipValue, attributes,
    } = data;
    this.firstPointer.applyPointerPosition(first);
    this.firstPointer.updateTipValue(firstTipValue);

    if (this.isRange) {
      this.secondPointer.applyPointerPosition(second);
      this.secondPointer.updateTipValue(secondTipValue);
    }
    if (this.hasLine) this.updateLine();

    this.setDataAttributes(attributes);
  }

  setDataAttributes(attributes: Attributes = {}) {
    Object.keys(attributes).forEach(key => {
      this.sliderHTML.dataset[key] = `${attributes[key]}`;
    });
  }

  update(data: {
    isRange?: boolean,
    isVertical?: boolean,
    hasTip?: boolean,
    hasLine?: boolean,
    attributes?: Attributes
  }) {
    const {
      isVertical, hasTip, hasLine, isRange, attributes,
    } = data;
    if (isVertical !== undefined) this.isVertical = isVertical;
    if (hasTip !== undefined) this.hasTip = hasTip;
    if (hasLine !== undefined) this.hasLine = hasLine;
    if (isRange !== undefined) this.isRange = isRange;

    this.getClear();
    this.createTemplate();
    this.bindEventListeners();
    this.addObservers();
    this.setDataAttributes(attributes);
  }

  getClear() {
    this.sliderHTML.classList.remove(
      styleClasses.SLIDER,
      styleClasses.SLIDER_VERTICAL,
      styleClasses.SLIDER_WITH_TIP,
    );
    this.firstPointer = null;
    this.secondPointer = null;
    this.pathHTML = null;
    this.sliderHTML.innerHTML = '';
  }

  private addObservers() {
    this.firstPointer.observer.subscribe(this.dispatchPointerPosition);
    if (this.isRange) this.secondPointer.observer.subscribe(this.dispatchPointerPosition);
  }

  private createTemplate() {
    this.sliderHTML.classList.add(styleClasses.SLIDER);
    this.createPath();
    this.createPointers();
    this.createLine();
    this.setOrientationClass();
    this.createTip();
    this.sliderHTML.append(this.pathHTML);
  }

  private createPath() {
    this.pathHTML = createNode('div', styleClasses.PATH);
  }

  private createLine() {
    if (this.hasLine) {
      this.lineHTML = createNode('div', styleClasses.LINE);
      this.pathHTML.prepend(this.lineHTML);
    }
  }

  private createPointers() {
    this.firstPointer = new PointerView(this.pathHTML, this.isVertical);
    if (this.isRange) {
      this.secondPointer = new PointerView(this.pathHTML, this.isVertical);
    }
  }

  private bindEventListeners() {
    this.pathHTML.addEventListener('mousedown', this.handlePathHTMLMouseDown);
  }

  private handlePathHTMLMouseDown(event: MouseEvent) {
    event.preventDefault();
    const curTarget: HTMLElement = event.target as HTMLElement;

    const isValidClick: boolean = curTarget.className === styleClasses.PATH
      || curTarget.className === styleClasses.LINE;
    if (!isValidClick) return;
    const newLeft: number = this.isVertical
      ? event.clientY - this.pathHTML.getBoundingClientRect().top
      : event.clientX - this.pathHTML.getBoundingClientRect().left;

    if (this.isRange) {
      const midpointBetweenPoints = this.getMidpointBetweenPointers();
      if (newLeft < midpointBetweenPoints) this.firstPointer.dispatchPointerPosition(newLeft);
      if (newLeft > midpointBetweenPoints) this.secondPointer.dispatchPointerPosition(newLeft);
    } else {
      this.firstPointer.dispatchPointerPosition(newLeft);
    }
  }

  private updateLine() {
    const pos0 = this.firstPointer.curPos;
    if (this.isVertical) {
      this.lineHTML.style.top = this.isRange ? `${pos0}%` : '0px';
      this.lineHTML.style.height = this.isRange ? `${this.secondPointer.curPos - pos0}%` : `${pos0}%`;
    } else {
      this.lineHTML.style.left = this.isRange ? `${pos0}%` : '0px';
      this.lineHTML.style.width = this.isRange ? `${this.secondPointer.curPos - pos0}%` : `${pos0}%`;
    }
  }

  private getMidpointBetweenPointers() {
    const pos0 = this.firstPointer.getCurPosInPixels();
    const pos1 = this.secondPointer.getCurPosInPixels();
    return (pos1 - pos0) / 2 + pos0;
  }

  private dispatchPointerPosition(data: { position: number, pointerToUpdate: PointerView }) {
    const { position, pointerToUpdate } = data;
    this.updateZIndex(pointerToUpdate);
    this.observer.broadcast({
      position,
      pointerThatChanged: this.checkPointerNumber(pointerToUpdate),
    });
  }

  private checkPointerNumber(pointer: PointerView) {
    switch (pointer) {
      case this.firstPointer: return 'first';
      case this.secondPointer: return 'second';
      default:
    }
  }

  private setOrientationClass() {
    if (this.isVertical) {
      this.sliderHTML.classList.add(styleClasses.SLIDER_VERTICAL);
    } else {
      this.sliderHTML.classList.remove(styleClasses.SLIDER_VERTICAL);
    }
  }

  private updateZIndex(pointer: PointerView) {
    const wasPointerMoved = pointer.pointerHTML.classList.contains(
      styleClasses.POINTER_SELECTED
    );
    if (!wasPointerMoved && this.isRange) {
      this.firstPointer.pointerHTML.classList.remove(styleClasses.POINTER_SELECTED);
      this.secondPointer.pointerHTML.classList.remove(styleClasses.POINTER_SELECTED);
      pointer.pointerHTML.classList.add(styleClasses.POINTER_SELECTED);
    }
  }
}

export { MainView };
export default MainView;
