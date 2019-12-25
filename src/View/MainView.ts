import { PointerView } from './PointerView';
import { EventObserver } from '../EventObserver/EventObserver';
import { Attribute } from '../helpers/interfaces';


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

  public styleClasses = {
    SLIDER: 'j-plugin-slider',
    PATH: 'j-plugin-slider__path',
    THUMB: 'j-plugin-slider__thumb',
    THUMB_SELECTED: 'j-plugin-slider__thumb_selected',
    LINE: 'j-plugin-slider__path-line',
    SLIDER_VERTICAL: 'j-plugin-slider_vertical',
    SLIDER_WITH_POINT: 'j-plugin-slider_with-point',
  };

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
      this.sliderHTML.classList.add('j-plugin-slider_with-point');
      if (this.isRange) {
        this.pointer1.createTip();
      }
    }
  }

  setPointerPosition(options: {
    first: number,
    second: number,
    firstTipValue: number,
    secondTipValue: number,
    attributes: Attribute[],
  }) {
    const {
      first, second, firstTipValue, secondTipValue, attributes,
    } = options;
    this.pointer0.setPointerPosition(first);
    this.pointer0.updateTipValue(firstTipValue);

    if (this.isRange) {
      this.pointer1.setPointerPosition(second);
      this.pointer1.updateTipValue(secondTipValue);
    }
    if (this.hasLine) this.calculateAndApplyLine();

    this.setDataAttributes(attributes);
  }

  setDataAttributes(attributes: Attribute[]) {
    attributes.forEach((attribute: Attribute) => {
      const { name, value } = attribute;
      this.sliderHTML.dataset[name] = value;
    });
  }

  update(options: {
    isRange: boolean,
    isVertical: boolean,
    hasTip: boolean,
    hasLine: boolean,
    attributes: Attribute[]
  }) {
    const {
      isVertical, hasTip, hasLine, isRange, attributes,
    } = options;
    this.isVertical = isVertical;
    this.hasTip = hasTip;
    this.hasLine = hasLine;
    this.isRange = isRange;

    this.getClear();
    this.createPointers();
    this.setOrientationClass();
    this.createTip();
    this.addObservers();
    this.setDataAttributes(attributes);
  }

  removeDataAttribute(attr: string) {
    delete this.sliderHTML.dataset[attr];
  }

  getClear() {
    this.sliderHTML.classList.remove(
      this.styleClasses.SLIDER_VERTICAL,
      this.styleClasses.SLIDER_WITH_POINT,
    );
    this.pointer0 = null;
    this.pointer1 = null;
    this.pathHTML.innerHTML = '';
  }

  private addObservers() {
    this.pointer0.observer.subscribe(this.dispatchPointerPosition);
    if (this.isRange) this.pointer1.observer.subscribe(this.dispatchPointerPosition);
  }

  private createTemplate() {
    this.createPath();
    this.createPointers();
    this.setOrientationClass();
    this.createTip();
    this.sliderHTML.append(this.pathHTML);
    this.lastPointerMoved = this.pointer0;
  }

  private createPath() {
    this.pathHTML = document.createElement('div');
    this.sliderHTML.classList.add(this.styleClasses.SLIDER);
    this.pathHTML.classList.add(this.styleClasses.PATH);
  }

  private createPointers() {
    let thumb = document.createElement('div');
    thumb.classList.add(this.styleClasses.THUMB);
    this.pathHTML.append(thumb);
    this.pointer0 = new PointerView(thumb, this.pathHTML, this.isVertical);

    if (this.hasLine) {
      this.lineHTML = document.createElement('div');
      this.lineHTML.classList.add(this.styleClasses.LINE);
      this.pathHTML.prepend(this.lineHTML);
    }
    if (this.isRange) {
      thumb = document.createElement('div');
      thumb.classList.add(this.styleClasses.THUMB);
      this.pathHTML.append(thumb);
      this.pointer1 = new PointerView(thumb, this.pathHTML, this.isVertical);
    }
  }

  private bindEventListeners() {
    this.pathHTML.addEventListener('mousedown', this.handlePathHTMLMouseDown);
  }

  private handlePathHTMLMouseDown(event: MouseEvent) {
    event.preventDefault();
    const curTarget: HTMLElement = event.target as HTMLElement;

    const isValidClick: boolean = curTarget.className === this.styleClasses.PATH
      || curTarget.className === this.styleClasses.LINE;
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

  private calculateAndApplyLine() {
    if (this.isRange) {
      if (this.isVertical) {
        this.lineHTML.style.top = this.pointer0.pointerHTML.style.top;
        const range = parseFloat(this.pointer1.pointerHTML.style.top)
          - parseFloat(this.pointer0.pointerHTML.style.top);
        this.lineHTML.style.height = `${range}%`;
      } else {
        this.lineHTML.style.left = this.pointer0.pointerHTML.style.left;
        const range = parseFloat(this.pointer1.pointerHTML.style.left)
          - parseFloat(this.pointer0.pointerHTML.style.left);
        this.lineHTML.style.width = `${range}%`;
      }
    } else if (this.isVertical) {
      this.lineHTML.style.top = '0px';
      this.lineHTML.style.height = `${parseFloat(this.pointer0.pointerHTML.style.top)}%`;
    } else {
      this.lineHTML.style.left = '0px';
      this.lineHTML.style.width = `${parseFloat(this.pointer0.pointerHTML.style.left)}%`;
    }
  }

  private getMidpointBetweenPointers() {
    const pos0 = this.pointer0.getCurPosInPixels();
    const pos1 = this.pointer1.getCurPosInPixels();
    return (pos1 - pos0) / 2 + pos0;
  }

  private dispatchPointerPosition(data: { position: number, pointerToUpdate: PointerView }) {
    const { position, pointerToUpdate } = data;
    let pointerThatChanged: string;
    if (pointerToUpdate === this.pointer0) pointerThatChanged = 'first';
    if (pointerToUpdate === this.pointer1) pointerThatChanged = 'second';

    this.updateZIndex(pointerToUpdate);
    this.observer.broadcast({ position, pointerThatChanged });
  }

  private setOrientationClass() {
    if (this.isVertical) {
      this.sliderHTML.classList.add(this.styleClasses.SLIDER_VERTICAL);
    } else {
      this.sliderHTML.classList.remove(this.styleClasses.SLIDER_VERTICAL);
    }
  }

  private updateZIndex(pointer: PointerView) {
    const wasPointerMoved = pointer.pointerHTML.classList.contains(
      this.styleClasses.THUMB_SELECTED
    );
    if (!wasPointerMoved && this.isRange) {
      this.pointer0.pointerHTML.classList.remove(this.styleClasses.THUMB_SELECTED);
      this.pointer1.pointerHTML.classList.remove(this.styleClasses.THUMB_SELECTED);
      pointer.pointerHTML.classList.add(this.styleClasses.THUMB_SELECTED);
    }
  }
}

export { MainView };
export default MainView;
