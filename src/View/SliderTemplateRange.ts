import { SliderPointer } from './SliderPointer';

class SliderTemplateRange {
  public slider: HTMLElement;

  public sliderPath: HTMLElement;

  public isVertical: boolean = false;

  public isFollowerPoint: boolean = false;

  public thumb1: SliderPointer;

  public thumb2: SliderPointer;

  public range: HTMLElement;

  public styleClasses = {
    SLIDER: 'j-plugin-slider',
    PATH: 'j-plugin-slider__path',
    THUMB: 'j-plugin-slider__thumb',
    RANGE: 'j-plugin-slider__range',
    SLIDER_VERTICAL: 'j-plugin-slider_vertical',
    SLIDER_WITH_POINT: 'j-plugin-slider_with-point',
  };

  constructor(elem: HTMLElement, isVertical?: boolean, isFollowerPoint?: boolean) {
    this.slider = elem;
    this.isVertical = isVertical;
    this.isFollowerPoint = isFollowerPoint;

    this.createTemplate();
    this.bindEventListeners();
  }

  sliderOnClick = (event:any) => {
    event.preventDefault();

    const isValidClick = event.currentTarget.className === this.styleClasses.THUMB;
    if (isValidClick) return;

    const newLeft: number = this.isVertical
      ? event.clientY - this.sliderPath.getBoundingClientRect().top
      : event.clientX - this.sliderPath.getBoundingClientRect().left;

    const pointersRange = this.calculatePointersRange();

    if (newLeft < pointersRange) {
      this.thumb1.setCurPosInPixels(newLeft);
      this.thumb1.endPos = this.thumb1.curPos;
    }
    if (newLeft > pointersRange) {
      this.thumb2.setCurPosInPixels(newLeft);
      this.thumb2.endPos = this.thumb2.curPos;
    }
  };

  createTemplate() {
    this.slider.classList.add(this.styleClasses.SLIDER);
    this.sliderPath = document.createElement('div');
    this.sliderPath.classList.add(this.styleClasses.PATH);
    this.slider.append(this.sliderPath);

    const thumb1 = document.createElement('div');
    const thumb2 = document.createElement('div');
    thumb1.classList.add(this.styleClasses.THUMB);
    thumb2.classList.add(this.styleClasses.THUMB);

    this.range = document.createElement('div');
    this.range.classList.add(this.styleClasses.RANGE);

    this.sliderPath.append(this.range);
    this.sliderPath.append(thumb1);
    this.sliderPath.append(thumb2);

    this.thumb1 = new SliderPointer(thumb1, this.sliderPath, this.isVertical);
    this.thumb2 = new SliderPointer(thumb2, this.sliderPath, this.isVertical);

    if (this.isVertical) {
      this.slider.classList.add(this.styleClasses.SLIDER_VERTICAL);
    }
    if (this.isFollowerPoint) {
      this.slider.classList.add(this.styleClasses.SLIDER_WITH_POINT);
    }
  }

  initRangeLine() {
    const calcRangeLine = () => {
      if (this.isVertical) {
        this.range.style.top = this.thumb1.thumbHTMLElem.style.top;
        this.range.style.height = `${parseInt(this.thumb2.thumbHTMLElem.style.top, 10)
          - parseInt(this.thumb1.thumbHTMLElem.style.top, 10)}%`;
      } else {
        this.range.style.left = this.thumb1.thumbHTMLElem.style.left;
        this.range.style.width = `${parseInt(this.thumb2.thumbHTMLElem.style.left, 10)
          - parseInt(this.thumb1.thumbHTMLElem.style.left, 10)}%`;
      }
    };
    calcRangeLine();
    this.slider.addEventListener('changePointer', calcRangeLine);
  }


  bindEventListeners() {
    this.sliderPath.addEventListener('click', this.sliderOnClick);
    this.thumb1.bindEventListeners(this.thumb2);
    this.thumb2.bindEventListeners(this.thumb1);
  }


  calculatePointersRange() {
    const res:number = ((this.thumb2.getCurPosInPixels() - this.thumb1.getCurPosInPixels()) / 2)
      + this.thumb1.getCurPosInPixels();
    return res;
  }

  destroy() {
    this.range.remove();
    this.thumb1.thumbHTMLElem.remove();
    this.thumb2.thumbHTMLElem.remove();
    this.sliderPath.remove();
    this.slider.classList.remove(
      this.styleClasses.SLIDER,
      this.styleClasses.SLIDER_VERTICAL,
      this.styleClasses.SLIDER_WITH_POINT,
    );
  }
}

export {
  SliderTemplateRange,
};
export default SliderTemplateRange;
