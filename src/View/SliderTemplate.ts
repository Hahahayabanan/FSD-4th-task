import { SliderPointer } from './SliderPointer';

class SliderTemplate {
  public slider: HTMLElement;

  public sliderPath: HTMLElement;

  public thumb0: SliderPointer = undefined;

  public thumb1: SliderPointer = undefined;

  public isVertical: boolean = false;

  public isFollowerPoint: boolean = false;

  public isRange: boolean = false;

  public range: HTMLElement;

  public styleClasses = {
    SLIDER: 'j-plugin-slider',
    PATH: 'j-plugin-slider__path',
    THUMB: 'j-plugin-slider__thumb',
    RANGE: 'j-plugin-slider__range',
    SLIDER_VERTICAL: 'j-plugin-slider_vertical',
    SLIDER_WITH_POINT: 'j-plugin-slider_with-point',
  };

  constructor(
    elem: HTMLElement,
    isVertical?:boolean,
    isFollowerPoint?:boolean,
    isRange?:boolean,
  ) {
    this.slider = elem;
    this.isVertical = isVertical;
    this.isFollowerPoint = isFollowerPoint;
    this.isRange = isRange;

    this.createTemplate();
    this.bindEventListeners();
  }

  createTemplate() {
    this.sliderPath = document.createElement('div');
    this.slider.classList.add(this.styleClasses.SLIDER);
    this.sliderPath.classList.add(this.styleClasses.PATH);
    this.slider.append(this.sliderPath);

    let thumb = document.createElement('div');
    this.sliderPath.append(thumb);
    this.thumb0 = new SliderPointer(thumb, this.sliderPath, this.isVertical);
    this.thumb0.thumbHTMLElem.classList.add(this.styleClasses.THUMB);

    if (this.isRange) {
      thumb = document.createElement('div');
      this.sliderPath.append(thumb);
      this.thumb1 = new SliderPointer(thumb, this.sliderPath, this.isVertical);
      this.thumb1.thumbHTMLElem.classList.add(this.styleClasses.THUMB);

      this.range = document.createElement('div');
      this.range.classList.add(this.styleClasses.RANGE);
      this.sliderPath.prepend(this.range);
    }

    if (this.isVertical) {
      this.slider.classList.add(this.styleClasses.SLIDER_VERTICAL);
    }
    if (this.isFollowerPoint) {
      this.slider.classList.add(this.styleClasses.SLIDER_WITH_POINT);
    }
  }

  bindEventListeners() {
    this.sliderPath.addEventListener('click', this.sliderOnClick);

    if (this.isRange) {
      this.thumb0.bindEventListeners(this.thumb1);
      this.thumb1.bindEventListeners(this.thumb0);
      this.calculateAndApplyRangeLine();
      this.slider.addEventListener('changePointer', this.calculateAndApplyRangeLine);
    } else {
      this.thumb0.bindEventListeners();
    }
  }

  sliderOnClick = (event:any) => {
    event.preventDefault();
    const curTarget: HTMLElement = event.currentTarget;

    const isValidClick = curTarget.className === this.styleClasses.THUMB;
    if (isValidClick) return;

    const newLeft: number = this.isVertical
      ? event.clientY - this.sliderPath.getBoundingClientRect().top
      : event.clientX - this.sliderPath.getBoundingClientRect().left;

    if (this.isRange) {
      const pointersRange = this.calculatePointersRange();

      if (newLeft < pointersRange) {
        this.thumb0.setCurPosInPixels(newLeft);
        this.thumb0.endPos = this.thumb0.curPos;
      }
      if (newLeft > pointersRange) {
        this.thumb1.setCurPosInPixels(newLeft);
        this.thumb1.endPos = this.thumb1.curPos;
      }
    } else {
      this.thumb0.setCurPosInPixels(newLeft);
      this.thumb0.endPos = this.thumb0.curPos;
    }
  };

  calculateAndApplyRangeLine = () => {
    if (this.isVertical) {
      this.range.style.top = `${this.thumb0.curPos}%`;
      this.range.style.height = `${this.thumb1.curPos - this.thumb0.curPos}%`;
    } else {
      this.range.style.left = `${this.thumb0.curPos}%`;
      this.range.style.width = `${this.thumb1.curPos - this.thumb0.curPos}%`;
    }
  };

  calculatePointersRange() {
    const res:number = ((this.thumb1.getCurPosInPixels() - this.thumb0.getCurPosInPixels()) / 2)
      + this.thumb0.getCurPosInPixels();
    return res;
  }

  destroy() {
    this.thumb0.thumbHTMLElem.remove();
    if (this.isRange) this.thumb1.thumbHTMLElem.remove();
    this.sliderPath.remove();
    this.slider.classList.remove(
      this.styleClasses.SLIDER,
      this.styleClasses.SLIDER_VERTICAL,
      this.styleClasses.SLIDER_WITH_POINT,
    );
  }
}
export {
  SliderTemplate,
};
export default SliderTemplate;
