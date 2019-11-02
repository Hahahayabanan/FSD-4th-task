import { PointerView } from './PointerView';
import { EventObserver } from '../EventObserver/EventObserver';

class TemplateView {
  public sliderHTML: HTMLElement;

  public pathHTML: HTMLElement;

  public pointer0: PointerView = undefined;

  public pointer1: PointerView = undefined;

  public isVertical: boolean = false;

  public hasTip: boolean = false;

  public isRange: boolean = false;

  public rangeHTML: HTMLElement;

  public lastPointerMoved: PointerView;

  public observer: EventObserver = new EventObserver();

  public styleClasses = {
    SLIDER: 'j-plugin-slider',
    PATH: 'j-plugin-slider__path',
    THUMB: 'j-plugin-slider__thumb',
    THUMB_SELECTED: 'j-plugin-slider__thumb_selected',
    RANGE: 'j-plugin-slider__range',
    SLIDER_VERTICAL: 'j-plugin-slider_vertical',
    SLIDER_WITH_POINT: 'j-plugin-slider_with-point',
  };

  constructor(options: {
    rootElem: HTMLElement;
    isVertical?: boolean;
    hasTip?: boolean;
    isRange?: boolean;
  }) {
    const {
      rootElem, isVertical, hasTip, isRange
    } = options;
    this.sliderHTML = rootElem;
    this.isVertical = isVertical;
    this.hasTip = hasTip;
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
    this.pointer0 = new PointerView(thumb, this.isVertical);
    this.pointer0.pointerHTML.classList.add(this.styleClasses.THUMB);

    if (this.isRange) {
      thumb = document.createElement('div');
      this.pathHTML.append(thumb);
      this.pointer1 = new PointerView(thumb, this.isVertical);
      this.pointer1.pointerHTML.classList.add(this.styleClasses.THUMB);

      this.rangeHTML = document.createElement('div');
      this.rangeHTML.classList.add(this.styleClasses.RANGE);
      this.pathHTML.prepend(this.rangeHTML);
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
    this.pathHTML.addEventListener('mousedown', this.sliderOnClick);
  }


  private sliderOnClick = (event: any) => {
    event.preventDefault();
    const curTarget: HTMLElement = event.target;

    const isValidClick = curTarget.className === this.styleClasses.PATH
      || curTarget.className === this.styleClasses.RANGE;
    if (!isValidClick) return;

    const newLeft: number = this.isVertical
      ? event.clientY - this.pathHTML.getBoundingClientRect().top
      : event.clientX - this.pathHTML.getBoundingClientRect().left;

    if (this.isRange) {
      const pointersRange = this.calculatePointersRange();

      if (newLeft < pointersRange) {
        this.pointer0.dispatchPointerPosition(this.pointer0.calcPixelsToPercents(newLeft));
      }
      if (newLeft > pointersRange) {
        this.pointer1.dispatchPointerPosition(this.pointer0.calcPixelsToPercents(newLeft));
      }
    } else {
      this.pointer0.dispatchPointerPosition(this.pointer0.calcPixelsToPercents(newLeft));
    }
  };

  private calculateAndApplyRangeLine() {
    if (this.isRange) {
      if (this.isVertical) {
        this.rangeHTML.style.top = this.pointer0.pointerHTML.style.top;
        const range = parseInt(this.pointer1.pointerHTML.style.top, 10)
          - parseInt(this.pointer0.pointerHTML.style.top, 10);
        this.rangeHTML.style.height = `${range}%`;
      } else {
        this.rangeHTML.style.left = this.pointer0.pointerHTML.style.left;
        const range = parseInt(this.pointer1.pointerHTML.style.left, 10)
          - parseInt(this.pointer0.pointerHTML.style.left, 10);
        this.rangeHTML.style.width = `${range}%`;
      }
    }
  }

  private calculatePointersRange() {
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

  setPointerPosition(newCurPos: number[] | number) {
    if (this.isRange) {
      this.pointer0.setPointerPosition(newCurPos[0]);
      this.pointer1.setPointerPosition(newCurPos[1]);
      this.calculateAndApplyRangeLine();
    } else {
      this.pointer0.setPointerPosition(<number>newCurPos);
    }
  }

  update(isRange: boolean, isVertical: boolean, hasTip: boolean) {
    this.isVertical = isVertical;
    this.hasTip = hasTip;
    this.isRange = isRange;

    this.getClear();
    this.createPointers();
    this.setOrientationClass();
    this.createTip();
    this.bindEventListeners();
    this.addObservers();
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

  setDataAttribute(attr: string, value: string) {
    this.sliderHTML.dataset[attr] = value;
  }

  removeDataAttribute(attr: string) {
    delete this.sliderHTML.dataset[attr];
  }

  setDataAttributes(attributes: any) {
    attributes.forEach((attribute: any) => {
      this.setDataAttribute(attribute.name, attribute.value);
    });
  }

  getClear() {
    this.sliderHTML.classList.remove(
      this.styleClasses.SLIDER_VERTICAL,
      this.styleClasses.SLIDER_WITH_POINT,
    );
    this.pointer0 = undefined;
    this.pointer1 = undefined;
    this.pathHTML.innerHTML = '';
  }
}

export { TemplateView };
export default TemplateView;
