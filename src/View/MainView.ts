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

  public lastPointerMoved: PointerView;

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

    this.createTemplate();
    this.bindEventListeners();
    this.addObservers();
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

  private setOrientationClass() {
    if (this.isVertical) {
      this.sliderHTML.classList.add(this.styleClasses.SLIDER_VERTICAL);
    } else {
      this.sliderHTML.classList.remove(this.styleClasses.SLIDER_VERTICAL);
    }
  }

  private bindEventListeners() {
    this.pathHTML.addEventListener('mousedown', this.handlePathHTMLMouseDown);
  }

  private handlePathHTMLMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    const curTarget: HTMLElement = event.target as HTMLElement;

    const isValidClick = curTarget.className === this.styleClasses.PATH
      || curTarget.className === this.styleClasses.LINE;
    if (!isValidClick) return;

    const newLeft: number = this.isVertical
      ? event.clientY - this.pathHTML.getBoundingClientRect().top
      : event.clientX - this.pathHTML.getBoundingClientRect().left;

    if (this.isRange) {
      const midpointBetweenPoints = this.calculateMidpointBetweenPoints();

      if (newLeft < midpointBetweenPoints) {
        this.pointer0.dispatchPointerPosition(this.pointer0.calcPixelsToPercents(newLeft));
      }
      if (newLeft > midpointBetweenPoints) {
        this.pointer1.dispatchPointerPosition(this.pointer0.calcPixelsToPercents(newLeft));
      }
    } else {
      this.pointer0.dispatchPointerPosition(this.pointer0.calcPixelsToPercents(newLeft));
    }
  };

  private calculateAndApplyLine() {
    if (this.isRange) {
      if (this.isVertical) {
        this.lineHTML.style.top = this.pointer0.pointerHTML.style.top;
        const range = parseInt(this.pointer1.pointerHTML.style.top, 10)
          - parseInt(this.pointer0.pointerHTML.style.top, 10);
        this.lineHTML.style.height = `${range}%`;
      } else {
        this.lineHTML.style.left = this.pointer0.pointerHTML.style.left;
        const range = parseInt(this.pointer1.pointerHTML.style.left, 10)
          - parseInt(this.pointer0.pointerHTML.style.left, 10);
        this.lineHTML.style.width = `${range}%`;
      }
    } else if (this.isVertical) {
      this.lineHTML.style.top = '0px';
      this.lineHTML.style.height = `${parseInt(this.pointer0.pointerHTML.style.top, 10)}%`;
    } else {
      this.lineHTML.style.left = '0px';
      this.lineHTML.style.width = `${parseInt(this.pointer0.pointerHTML.style.left, 10)}%`;
    }
  }

  private calculateMidpointBetweenPoints() {
    const res: number = (this.pointer1.getCurPosInPixels() - this.pointer0.getCurPosInPixels())
        / 2
      + this.pointer0.getCurPosInPixels();
    return res;
  }

  private dispatchPointerPosition(data: any) {
    const { newCurPos } = data;
    let { updateObject } = data;
    let updateValueType;
    if (updateObject === this.pointer1) {
      updateValueType = 'secondValue';
    } else if (this.isRange) {
      updateValueType = 'firstValue';
    } else {
      updateValueType = 'singleValue';
    }
    this.updateZIndex(updateObject);
    updateObject = updateValueType;
    this.observer.broadcast({ newCurPos, updateObject });
  }

  private addObservers() {
    this.pointer0.observer.subscribe(this.dispatchPointerPosition.bind(this));
    if (this.isRange) this.pointer1.observer.subscribe(this.dispatchPointerPosition.bind(this));
  }

  setPointerPosition(newCurPos: number[] | number, newTipValue: number, newAttribute: Attribute) {
    if (this.isRange) {
      this.pointer0.setPointerPosition(newCurPos[0]);
      this.pointer1.setPointerPosition(newCurPos[1]);
    } else {
      this.pointer0.setPointerPosition(<number>newCurPos);
    }
    if (this.hasLine) this.calculateAndApplyLine();
    this.setTipValue(newTipValue);
    this.updateDataAttribute(newAttribute.name, newAttribute.value);
  }

  update(isRange: boolean, isVertical: boolean, hasTip: boolean, hasLine: boolean, attributes: Attribute[]) {
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

  updateZIndex(curPointer: PointerView) {
    if (this.isRange) {
      if (curPointer === this.pointer0) {
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

  createTip() {
    if (this.hasTip) {
      this.pointer0.createTip();
      if (this.isRange) {
        this.pointer1.createTip();
      }
    }
  }

  setTipValue(newValue: number | number[]) {
    if (this.hasTip) {
      if (this.isRange) {
        this.pointer0.updateTipValue(newValue[0]);
        this.pointer1.updateTipValue(newValue[1]);
      } else {
        this.pointer0.updateTipValue(newValue as number);
      }
    }
  }

  updateDataAttribute(attr: string, value: string) {
    this.removeDataAttribute(attr);
    this.setDataAttribute(attr, value);
  }

  setDataAttribute(attr: string, value: string) {
    this.sliderHTML.dataset[attr] = value;
  }

  removeDataAttribute(attr: string) {
    delete this.sliderHTML.dataset[attr];
  }

  setDataAttributes(attributes: Attribute[]) {
    attributes.forEach((attribute: Attribute) => {
      const { name, value } = attribute;
      this.setDataAttribute(name, value);
    });
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
}

export { MainView };
export default MainView;
