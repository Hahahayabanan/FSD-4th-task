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
    newFirst: number,
    newSecond: number,
    newFirstTipValue: number,
    newSecondTipValue: number,
    newAttribute: Attribute[],
  }) {
    const {
      newFirst, newSecond, newFirstTipValue, newSecondTipValue, newAttribute,
    } = options;
    this.pointer0.setPointerPosition(newFirst);
    this.pointer0.updateTipValue(newFirstTipValue);

    if (this.isRange) {
      this.pointer1.setPointerPosition(newSecond);
      this.pointer1.updateTipValue(newSecondTipValue);
    }
    if (this.hasLine) this.calculateAndApplyLine();

    this.setDataAttributes(newAttribute);
  }

  setDataAttribute(attr: string, value: string) {
    this.sliderHTML.dataset[attr] = value;
  }

  setDataAttributes(attributes: Attribute[]) {
    attributes.forEach((attribute: Attribute) => {
      const { name, value } = attribute;
      this.setDataAttribute(name, value);
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
    this.bindEventListeners();
    this.addObservers();
    attributes.forEach((attr: Attribute) => {
      const { name, value } = attr;
      this.updateDataAttribute(name, value);
    });
  }

  updateDataAttribute(attr: string, value: string) {
    this.removeDataAttribute(attr);
    this.setDataAttribute(attr, value);
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
    this.lastPointerMoved = this.pointer0;
  }

  private createPath() {
    this.pathHTML = document.createElement('div');
    this.sliderHTML.classList.add(this.styleClasses.SLIDER);
    this.pathHTML.classList.add(this.styleClasses.PATH);
    this.sliderHTML.append(this.pathHTML);
  }

  private createPointers() {
    let thumb = document.createElement('div');
    this.pathHTML.append(thumb);
    this.pointer0 = new PointerView(thumb, this.pathHTML, this.isVertical);
    this.pointer0.pointerHTML.classList.add(this.styleClasses.THUMB);

    if (this.hasLine) {
      this.lineHTML = document.createElement('div');
      this.lineHTML.classList.add(this.styleClasses.LINE);
      this.pathHTML.prepend(this.lineHTML);
    }
    if (this.isRange) {
      thumb = document.createElement('div');
      this.pathHTML.append(thumb);
      this.pointer1 = new PointerView(thumb, this.pathHTML, this.isVertical);
      this.pointer1.pointerHTML.classList.add(this.styleClasses.THUMB);
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
      const midpointBetweenPoints = this.calculateMidpointBetweenPointers();

      if (newLeft < midpointBetweenPoints) {
        this.pointer0.dispatchPointerPosition(this.pointer0.calculatePixelsToPercents(newLeft));
      }
      if (newLeft > midpointBetweenPoints) {
        this.pointer1.dispatchPointerPosition(this.pointer0.calculatePixelsToPercents(newLeft));
      }
    } else {
      this.pointer0.dispatchPointerPosition(this.pointer0.calculatePixelsToPercents(newLeft));
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

  private calculateMidpointBetweenPointers() {
    const res: number = (this.pointer1.getCurPosInPixels() - this.pointer0.getCurPosInPixels())
        / 2
      + this.pointer0.getCurPosInPixels();
    return res;
  }

  private dispatchPointerPosition(data: { newCurPos: number, pointerToUpdate: PointerView }) {
    const { newCurPos, pointerToUpdate } = data;
    let pointerThatChanged: string;
    if (pointerToUpdate === this.pointer0) pointerThatChanged = 'first';
    if (pointerToUpdate === this.pointer1) pointerThatChanged = 'second';

    this.updateZIndex(pointerThatChanged);
    this.observer.broadcast({ newCurPos, pointerThatChanged });
  }

  private setOrientationClass() {
    if (this.isVertical) {
      this.sliderHTML.classList.add(this.styleClasses.SLIDER_VERTICAL);
    } else {
      this.sliderHTML.classList.remove(this.styleClasses.SLIDER_VERTICAL);
    }
  }

  private updateZIndex(curPointer: string) {
    if (this.isRange) {
      if (curPointer === 'first') {
        this.pointer0.pointerHTML.classList.add(this.styleClasses.THUMB_SELECTED);
        this.pointer1.pointerHTML.classList.remove(
          this.styleClasses.THUMB_SELECTED,
        );
      } else {
        this.pointer1.pointerHTML.classList.add(this.styleClasses.THUMB_SELECTED);
        this.pointer0.pointerHTML.classList.remove(
          this.styleClasses.THUMB_SELECTED,
        );
      }
    }
  }
}

export { MainView };
export default MainView;
