import { SliderPointer } from './SliderPointer';

class SliderTemplate {
  public slider: any;

  public sliderPath: any;

  public thumb: SliderPointer;

  public isVertical: boolean = false;

  public isFollowerPoint: boolean = false;

  constructor(elem: any, isVertical?:boolean, isFollowerPoint?:boolean) {
    this.slider = elem;
    this.isVertical = isVertical;
    this.isFollowerPoint = isFollowerPoint;

    this.createTemplate();
    this.thumb.bindEventListeners();
    this.addEventToSliderClick();
  }

  private sliderOnClick = (event:any) => {
    event.preventDefault();

    const isValidClick = event.target.className === 'j-plugin-slider__thumb';
    if (isValidClick) return;

    const newLeft: number = this.isVertical
      ? event.clientY - this.sliderPath.getBoundingClientRect().top
      : event.clientX - this.sliderPath.getBoundingClientRect().left;
    this.thumb.setCurPosInPixels(newLeft);
    this.thumb.endPos = this.thumb.curPos;
  };

  createTemplate() {
    this.sliderPath = document.createElement('div');
    this.slider.classList.add('j-plugin-slider');
    this.sliderPath.classList.add('j-plugin-slider__path');
    this.slider.append(this.sliderPath);
    const thumb = document.createElement('div');
    this.sliderPath.append(thumb);
    this.thumb = new SliderPointer(thumb, this.sliderPath, this.isVertical);
    this.thumb.thumbHTMLElem.classList.add('j-plugin-slider__thumb');


    if (this.isVertical) {
      this.slider.classList.add('j-plugin-slider_vertical');
    }
    if (this.isFollowerPoint) {
      this.slider.classList.add('j-plugin-slider_with-point');
    }
  }

  addEventToSliderClick() {
    this.sliderPath.addEventListener('click', this.sliderOnClick);
  }

  destroy() {
    this.thumb.thumbHTMLElem.remove();
    this.sliderPath.remove();
    this.slider.classList.remove('j-plugin-slider', 'j-plugin-slider_vertical', 'j-plugin-slider_with-point');
  }
}
export {
  SliderTemplate,
};
export default SliderTemplate;
