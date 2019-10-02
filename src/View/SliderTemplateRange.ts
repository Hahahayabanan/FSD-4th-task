// eslint-disable-next-line import/no-named-as-default
import SliderPointer from './SliderPointer';

class SliderTemplateRange {
  public slider: any;

  public sliderPath: any;

  public isVertical: boolean = false;

  public isFollowerPoint: boolean = false;

  public thumb1: SliderPointer;

  public thumb2: SliderPointer;

  public range: any;

  constructor(elem: any, isVertical?: boolean, isFollowerPoint?: boolean) {
    this.slider = elem;
    this.isVertical = isVertical;
    this.isFollowerPoint = isFollowerPoint;
    this.createTemplate();

    this.thumb1.bindEventListeners(this.thumb2);
    this.thumb2.bindEventListeners(this.thumb1);
    this.addEventToSliderClick();
  }

  private sliderOnClick = (event:any) => {
    event.preventDefault();

    const isValidClick = event.target.className === 'j-plugin-slider__thumb';
    if (isValidClick) return;

    const newLeft: number = this.isVertical
      ? event.clientY - this.slider.getBoundingClientRect().top
      : event.clientX - this.slider.getBoundingClientRect().left;


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
    this.slider.classList.add('j-plugin-slider');
    this.sliderPath = document.createElement('div');
    this.sliderPath.classList.add('j-plugin-slider__path');
    this.slider.append(this.sliderPath);

    this.thumb1 = new SliderPointer(document.createElement('div'), this.sliderPath, this.isVertical);
    this.thumb2 = new SliderPointer(document.createElement('div'), this.sliderPath, this.isVertical);
    this.range = document.createElement('div');

    this.sliderPath.append(this.range);
    this.sliderPath.append(this.thumb1.thumbHTMLElem);
    this.sliderPath.append(this.thumb2.thumbHTMLElem);
    this.thumb1.thumbHTMLElem.classList.add('j-plugin-slider__thumb');
    this.thumb2.thumbHTMLElem.classList.add('j-plugin-slider__thumb');
    this.range.classList.add('j-plugin-slider__range');
    if (this.isVertical) {
      this.slider.classList.add('j-plugin-slider_vertical');
    }
    if (this.isFollowerPoint) {
      this.slider.classList.add('j-plugin-slider_with-point');
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


  addEventToSliderClick() {
    this.sliderPath.addEventListener('click', this.sliderOnClick);
  }


  calculatePointersRange() {
    const res:number = ((this.thumb2.getCurPosInPixels() - this.thumb1.getCurPosInPixels()) / 2) + this.thumb1.getCurPosInPixels();
    return res;
  }

  destroy() {
    this.range.remove();
    this.thumb1.thumbHTMLElem.remove();
    this.thumb2.thumbHTMLElem.remove();
    this.sliderPath.remove();
    this.slider.classList.remove('j-plugin-slider_vertical', 'j-plugin-slider', 'j-plugin-slider_with-point');
  }
}

export {
  SliderTemplateRange,
};
export default SliderTemplateRange;
