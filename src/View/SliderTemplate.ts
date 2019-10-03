import { SliderPointer } from './SliderPointer';

class SliderTemplate {
  public slider: HTMLElement;

  public sliderPath: HTMLElement;

  public thumb: SliderPointer;

  public isVertical: boolean = false;

  public isFollowerPoint: boolean = false;

  public styleClasses = {
    SLIDER: 'j-plugin-slider',
    PATH: 'j-plugin-slider__path',
    THUMB: 'j-plugin-slider__thumb',
    SLIDER_VERTICAL: 'j-plugin-slider_vertical',
    SLIDER_WITH_POINT: 'j-plugin-slider_with-point',
  };

  constructor(elem: HTMLElement, isVertical?:boolean, isFollowerPoint?:boolean) {
    this.slider = elem;
    this.isVertical = isVertical;
    this.isFollowerPoint = isFollowerPoint;

    this.createTemplate();
    this.bindEventListeners();
  }

  sliderOnClick = (event:any) => {
    event.preventDefault();
    const curHTML = event.currentTarget;

    const isValidClick = curHTML.className === this.styleClasses.THUMB;
    if (isValidClick) return;

    const newLeft: number = this.isVertical
      ? event.clientY - this.sliderPath.getBoundingClientRect().top
      : event.clientX - this.sliderPath.getBoundingClientRect().left;
    this.thumb.setCurPosInPixels(newLeft);
    this.thumb.endPos = this.thumb.curPos;
  };

  createTemplate() {
    this.sliderPath = document.createElement('div');
    this.slider.classList.add(this.styleClasses.SLIDER);
    this.sliderPath.classList.add(this.styleClasses.PATH);
    this.slider.append(this.sliderPath);
    const thumb = document.createElement('div');
    this.sliderPath.append(thumb);
    this.thumb = new SliderPointer(thumb, this.sliderPath, this.isVertical);
    this.thumb.thumbHTMLElem.classList.add(this.styleClasses.THUMB);

    if (this.isVertical) {
      this.slider.classList.add(this.styleClasses.SLIDER_VERTICAL);
    }
    if (this.isFollowerPoint) {
      this.slider.classList.add(this.styleClasses.SLIDER_WITH_POINT);
    }
  }

  bindEventListeners() {
    this.sliderPath.addEventListener('click', this.sliderOnClick);
    this.thumb.bindEventListeners();
  }

  destroy() {
    this.thumb.thumbHTMLElem.remove();
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
