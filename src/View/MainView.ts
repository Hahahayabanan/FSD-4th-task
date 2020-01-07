import { PointerView } from './PointerView';
import { EventObserver } from '../EventObserver/EventObserver';
import { Attributes } from '../helpers/interfaces';
import { createNode } from './utilities';
import styleClasses from './styleClasses';

class MainView {
  public sliderHTML: HTMLElement;

  public pathHTML: HTMLElement;

  public pointer0: PointerView = null;

  public pointer1: PointerView = null;

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
    this.lastPointerMoved = this.pointer0;

    this.handlePathHTMLMouseDown = this.handlePathHTMLMouseDown.bind(this);
    this.setPointerPosition = this.setPointerPosition.bind(this);
    this.dispatchPointerPosition = this.dispatchPointerPosition.bind(this);

    this.createTemplate();
    this.bindEventListeners();
    this.addObservers();
  }

  createTip() {
    if (this.hasTip) {
      this.pointer0.createTip();
      this.sliderHTML.classList.add(styleClasses.SLIDER_WITH_TIP);
      if (this.isRange) this.pointer1.createTip();
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
    this.pointer0.applyPointerPosition(first);
    this.pointer0.updateTipValue(firstTipValue);

    if (this.isRange) {
      this.pointer1.applyPointerPosition(second);
      this.pointer1.updateTipValue(secondTipValue);
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
    this.pointer0 = null;
    this.pointer1 = null;
    this.pathHTML = null;
    this.sliderHTML.innerHTML = '';
  }

  private addObservers() {
    this.pointer0.observer.subscribe(this.dispatchPointerPosition);
    if (this.isRange) this.pointer1.observer.subscribe(this.dispatchPointerPosition);
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
    this.pointer0 = new PointerView(this.pathHTML, this.isVertical);
    if (this.isRange) {
      this.pointer1 = new PointerView(this.pathHTML, this.isVertical);
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
      if (newLeft < midpointBetweenPoints) this.pointer0.dispatchPointerPosition(newLeft);
      if (newLeft > midpointBetweenPoints) this.pointer1.dispatchPointerPosition(newLeft);
    } else {
      this.pointer0.dispatchPointerPosition(newLeft);
    }
  }

  private updateLine() {
    const pos0 = this.pointer0.curPos;
    if (this.isVertical) {
      this.lineHTML.style.top = this.isRange ? `${pos0}%` : '0px';
      this.lineHTML.style.height = this.isRange ? `${this.pointer1.curPos - pos0}%` : `${pos0}%`;
    } else {
      this.lineHTML.style.left = this.isRange ? `${pos0}%` : '0px';
      this.lineHTML.style.width = this.isRange ? `${this.pointer1.curPos - pos0}%` : `${pos0}%`;
    }
  }

  private getMidpointBetweenPointers() {
    const pos0 = this.pointer0.getCurPosInPixels();
    const pos1 = this.pointer1.getCurPosInPixels();
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
      case this.pointer0: return 'first';
      case this.pointer1: return 'second';
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
      this.pointer0.pointerHTML.classList.remove(styleClasses.POINTER_SELECTED);
      this.pointer1.pointerHTML.classList.remove(styleClasses.POINTER_SELECTED);
      pointer.pointerHTML.classList.add(styleClasses.POINTER_SELECTED);
    }
  }
}

export { MainView };
export default MainView;
